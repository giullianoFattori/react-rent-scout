// Minimal Node.js type stubs required for the build in restricted environments.

declare type BufferEncoding = string;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Buffer extends Uint8Array {}

interface BufferConstructor {
  from(input: string | ArrayBufferLike | ArrayBufferView, encoding?: BufferEncoding): Buffer;
  isBuffer(input: unknown): input is Buffer;
}

declare const Buffer: BufferConstructor;

declare const process: {
  env: Record<string, string | undefined>;
};

declare const __dirname: string;

declare function require(moduleName: string): unknown;

declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface EventEmitter {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface WritableStream {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface WriteStream extends WritableStream {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ReadStream {}
}

interface SymbolConstructor {
  readonly asyncDispose: symbol;
}

declare class Console {}

declare module 'node:events' {
  export class EventEmitter {}
}

declare module 'node:fs' {
  export namespace fs {
    interface Stats {
      size?: number;
    }
  }

  export class Stats {
    size?: number;
  }

  export class FSWatcher {}
}

declare module 'node:http' {
  export type OutgoingHttpHeaders = Record<string, unknown>;
  export type ClientRequestArgs = Record<string, unknown>;

  export class IncomingMessage {
    url?: string;
  }

  export class ClientRequest {}
  export class Agent {}
  export class Server {}
  export class ServerResponse {}
}

declare module 'node:http2' {
  export class Http2SecureServer {}
}

declare module 'node:https' {
  export class ServerOptions {}
  export class Server {}
}

declare module 'node:net' {
  export class Socket {}
  export class Server {}
}

declare module 'node:stream' {
  export class Stream {}
  export class Writable extends Stream {}
  export class Duplex extends Stream {}
  export class DuplexOptions {}
}

declare module 'node:tls' {
  export class SecureContextOptions {}
}

declare module 'node:url' {
  export class URL {}
  export class Url {}
}

declare module 'node:worker_threads' {
  export class MessagePort {}
}

declare module 'node:zlib' {
  export class ZlibOptions {}
}

declare module 'rollup/parseAst' {
  export function parseAst(...args: any[]): any;
  export function parseAstAsync(...args: any[]): Promise<any>;
}
