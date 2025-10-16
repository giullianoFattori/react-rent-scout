import { FormEvent, useState } from 'react';
import { Modal, Tabs } from 'flowbite-react';

import { Button, Stack, Text, TextInput } from '../../Core';

type AuthMode = 'login' | 'register';

export interface AuthCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuthenticate: (credentials: AuthCredentials, mode: AuthMode) => void;
  initialMode?: AuthMode;
  loading?: boolean;
}

export const AuthModal = ({ open, onClose, onAuthenticate, initialMode = 'login', loading = false }: AuthModalProps) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [credentials, setCredentials] = useState<AuthCredentials>({ email: '', password: '' });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onAuthenticate(credentials, mode);
  };

  return (
    <Modal show={open} onClose={onClose} initialFocus="#auth-email" aria-labelledby="auth-modal-title">
      <Modal.Header>
        <Text as="span" id="auth-modal-title" weight="semibold">
          {mode === 'login' ? 'Acesse sua conta' : 'Crie uma conta'}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Tabs aria-label="Selecione o tipo de acesso" onActiveTabChange={(index) => setMode(index === 0 ? 'login' : 'register')}>
          <Tabs.Item active title="Entrar">
            <AuthForm
              mode="login"
              loading={loading && mode === 'login'}
              credentials={credentials}
              onChange={setCredentials}
              onSubmit={handleSubmit}
            />
          </Tabs.Item>
          <Tabs.Item title="Criar conta">
            <AuthForm
              mode="register"
              loading={loading && mode === 'register'}
              credentials={credentials}
              onChange={setCredentials}
              onSubmit={handleSubmit}
            />
          </Tabs.Item>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

interface AuthFormProps {
  mode: AuthMode;
  loading: boolean;
  credentials: AuthCredentials;
  onChange: (credentials: AuthCredentials) => void;
  onSubmit: (event: FormEvent) => void;
}

const AuthForm = ({ mode, loading, credentials, onChange, onSubmit }: AuthFormProps) => (
  <form className="flex flex-col gap-sm pt-sm" onSubmit={onSubmit}>
    {mode === 'register' && (
      <TextInput
        label="Nome completo"
        id="auth-name"
        value={credentials.name ?? ''}
        onChange={(event) => onChange({ ...credentials, name: event.target.value })}
        placeholder="Ex: Ana Souza"
        autoComplete="name"
        required
      />
    )}
    <TextInput
      label="E-mail"
      id="auth-email"
      type="email"
      value={credentials.email}
      onChange={(event) => onChange({ ...credentials, email: event.target.value })}
      placeholder="exemplo@email.com"
      autoComplete="email"
      required
    />
    <TextInput
      label="Senha"
      id="auth-password"
      type="password"
      value={credentials.password}
      onChange={(event) => onChange({ ...credentials, password: event.target.value })}
      placeholder="Sua senha"
      autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
      required
    />
    <Stack gap="2xs">
      <Button type="submit" loading={loading} data-evt="cta_click" data-ctx={`auth_${mode}`}>
        {mode === 'login' ? 'Entrar' : 'Criar conta'}
      </Button>
      <Button type="button" variant="secondary" data-evt="cta_click" data-ctx="auth_reset_password">
        Redefinir senha
      </Button>
    </Stack>
  </form>
);
