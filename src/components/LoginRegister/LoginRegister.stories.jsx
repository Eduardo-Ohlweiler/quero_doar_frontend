import React from 'react';
import LoginRegister from './LoginRegister';

export default {
  title: 'Components/LoginRegister',
  component: LoginRegister,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f6f5f7' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSignIn: { action: 'signed in' },
    onSignUp: { action: 'signed up' },
    signInLoading: {
      control: { type: 'boolean' },
    },
    signUpLoading: {
      control: { type: 'boolean' },
    },
  },
};

export const Default = {
  args: {
    signInLoading: false,
    signUpLoading: false,
  },
};

export const SignInLoading = {
  args: {
    signInLoading: true,
    signUpLoading: false,
  },
};

export const SignUpLoading = {
  args: {
    signInLoading: false,
    signUpLoading: true,
  },
};

export const BothLoading = {
  args: {
    signInLoading: true,
    signUpLoading: true,
  },
};

// Story para demonstrar funcionalidade interativa
export const Interactive = {
  args: {
    signInLoading: false,
    signUpLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Versão interativa do componente. Clique nos botões "Cadastrar" e "Entrar" nos painéis laterais para alternar entre os modos.',
      },
    },
  },
};
