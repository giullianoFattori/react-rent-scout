const ts = require('typescript');
const espree = require('espree');
const { KEYS: visitorKeys } = require('eslint-visitor-keys');
const eslintScope = require('eslint-scope');

const defaultCompilerOptions = {
  allowJs: true,
  jsx: ts.JsxEmit.Preserve,
  module: ts.ModuleKind.ESNext,
  target: ts.ScriptTarget.ESNext,
  useDefineForClassFields: false,
};

const defaultEspreeOptions = {
  ecmaVersion: 'latest',
  sourceType: 'module',
  ecmaFeatures: { jsx: true },
  loc: true,
  range: true,
  tokens: true,
  comment: true,
};

function createEspreeOptions(options = {}) {
  const ecmaFeatures = {
    ...defaultEspreeOptions.ecmaFeatures,
    ...(options.ecmaFeatures || {}),
  };

  return {
    ...defaultEspreeOptions,
    ...options,
    ecmaFeatures,
  };
}

function transpile(code, filePath) {
  return ts.transpileModule(code, {
    compilerOptions: defaultCompilerOptions,
    fileName: filePath,
    reportDiagnostics: false,
  }).outputText;
}

function analyzeScope(ast, parserOptions = {}) {
  return eslintScope.analyze(ast, {
    ecmaVersion: parserOptions.ecmaVersion === 'latest' ? 2024 : parserOptions.ecmaVersion,
    sourceType: parserOptions.sourceType || 'module',
    ecmaFeatures: parserOptions.ecmaFeatures || {},
    impliedStrict: parserOptions.sourceType === 'module',
  });
}

function parseSource(code, parserOptions = {}) {
  const filePath = parserOptions.filePath || 'unknown.tsx';
  const espreeOptions = createEspreeOptions(parserOptions);

  if (filePath.endsWith('.d.ts')) {
    const ast = espree.parse('', espreeOptions);
    return { ast, espreeOptions };
  }

  const output = transpile(code, filePath);
  const ast = espree.parse(output, espreeOptions);

  return { ast, espreeOptions };
}

module.exports = {
  parse(code, options = {}) {
    return this.parseForESLint(code, options).ast;
  },

  parseForESLint(code, options = {}) {
    const { ast, espreeOptions } = parseSource(code, options);
    const scopeManager = analyzeScope(ast, espreeOptions);

    return {
      ast,
      scopeManager,
      visitorKeys,
      services: {},
    };
  },
};
