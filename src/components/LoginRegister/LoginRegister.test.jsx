import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, describe, it, beforeEach } from 'vitest';
import LoginRegister from './LoginRegister';

describe('LoginRegister component', () => {
  beforeEach(() => {
    cleanup();
  });

  // CT1: Renderização inicial do componente
  it('CT1: renderiza com modo de sign in como padrão', () => {
    render(<LoginRegister />);
    
    // Verifica se os elementos de sign in estão visíveis
    expect(screen.getByText('Entrar')).toBeInTheDocument();
    expect(screen.getByText('ou use sua conta')).toBeInTheDocument();
    expect(screen.getByText('Esqueceu sua senha?')).toBeInTheDocument();
  });

  // CT2: Alternância para modo sign up
  it('CT2: alterna para modo sign up ao clicar no botão Cadastrar', async () => {
    const user = userEvent.setup();
    render(<LoginRegister />);
    
    // Clica no botão "Cadastrar" no painel lateral (o último na página)
    const signUpButtons = screen.getAllByRole('button', { name: /cadastrar/i });
    const overlaySignUpButton = signUpButtons[signUpButtons.length - 1];
    await user.click(overlaySignUpButton);
    
    // Verifica se mudou para o modo sign up
    await waitFor(() => {
      expect(screen.getByText('Criar Conta')).toBeInTheDocument();
      expect(screen.getByText('ou use seu email para registro')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    });
  });

  // CT3: Alternância de volta para sign in
  it('CT3: alterna de volta para sign in ao clicar no botão Entrar', async () => {
    const user = userEvent.setup();
    render(<LoginRegister />);
    
    // Primeiro vai para sign up
    const signUpButtons = screen.getAllByRole('button', { name: /cadastrar/i });
    const overlaySignUpButton = signUpButtons[signUpButtons.length - 1];
    await user.click(overlaySignUpButton);
    
    // Depois volta para sign in
    await waitFor(async () => {
      const signInButtons = screen.getAllByRole('button', { name: /entrar/i });
      const overlaySignInButton = signInButtons[signInButtons.length - 1];
      await user.click(overlaySignInButton);
    });
    
    // Verifica se voltou para sign in
    await waitFor(() => {
      expect(screen.getByText('Entrar')).toBeInTheDocument();
      expect(screen.getByText('ou use sua conta')).toBeInTheDocument();
    });
  });

  // CT4: Submissão do formulário de sign in
  it('CT4: chama onSignIn com dados corretos ao submeter formulário', async () => {
    const user = userEvent.setup();
    const mockOnSignIn = vi.fn();
    render(<LoginRegister onSignIn={mockOnSignIn} />);
    
    // Preenche os campos (usa os campos visíveis)
    const emailInputs = screen.getAllByPlaceholderText('Email');
    const passwordInputs = screen.getAllByPlaceholderText('Senha');
    
    // Usa o segundo conjunto de inputs (sign in)
    const emailInput = emailInputs[1];
    const passwordInput = passwordInputs[1];
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    // Submete o formulário (usa o primeiro botão Entrar)
    const submitButtons = screen.getAllByRole('button', { name: /entrar/i });
    const submitButton = submitButtons[0];
    await user.click(submitButton);
    
    // Verifica se a função foi chamada com os dados corretos
    expect(mockOnSignIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  // CT5: Submissão do formulário de sign up
  it('CT5: chama onSignUp com dados corretos ao submeter formulário', async () => {
    const user = userEvent.setup();
    const mockOnSignUp = vi.fn();
    render(<LoginRegister onSignUp={mockOnSignUp} />);
    
    // Vai para modo sign up
    const signUpButtons = screen.getAllByRole('button', { name: /cadastrar/i });
    const overlaySignUpButton = signUpButtons[signUpButtons.length - 1];
    await user.click(overlaySignUpButton);
    
    await waitFor(async () => {
      // Preenche os campos
      const nameInput = screen.getByPlaceholderText('Nome');
      const emailInputs = screen.getAllByPlaceholderText('Email');
      const passwordInputs = screen.getAllByPlaceholderText('Senha');
      
      // Usa o primeiro conjunto de inputs (sign up)
      const emailInput = emailInputs[0];
      const passwordInput = passwordInputs[0];
      
      await user.type(nameInput, 'João Silva');
      await user.type(emailInput, 'joao@example.com');
      await user.type(passwordInput, 'senha123');
      
      // Submete o formulário (usa o primeiro botão Cadastrar)
      const submitButtons = screen.getAllByRole('button', { name: /cadastrar/i });
      const submitButton = submitButtons[0];
      await user.click(submitButton);
      
      // Verifica se a função foi chamada com os dados corretos
      expect(mockOnSignUp).toHaveBeenCalledWith({
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'senha123',
      });
    });
  });

  // CT6: Estado de loading no sign in
  it('CT6: mostra estado de loading no botão de sign in', () => {
    render(<LoginRegister signInLoading={true} />);
    
    const loadingButton = screen.getByRole('button', { name: /carregando/i });
    expect(loadingButton).toBeInTheDocument();
    expect(loadingButton).toBeDisabled();
  });

  // CT7: Estado de loading no sign up
  it('CT7: mostra estado de loading no botão de sign up', async () => {
    const user = userEvent.setup();
    render(<LoginRegister signUpLoading={true} />);
    
    // Vai para modo sign up
    const signUpButtons = screen.getAllByRole('button', { name: /cadastrar/i });
    const overlaySignUpButton = signUpButtons[signUpButtons.length - 1];
    await user.click(overlaySignUpButton);
    
    await waitFor(() => {
      const loadingButton = screen.getByRole('button', { name: /carregando/i });
      expect(loadingButton).toBeInTheDocument();
      expect(loadingButton).toBeDisabled();
    });
  });

  // CT8: Links de redes sociais estão presentes
  it('CT8: renderiza links de redes sociais', () => {
    render(<LoginRegister />);
    
    // Verifica se os links de redes sociais estão presentes
    const facebookLinks = screen.getAllByLabelText(/facebook/i);
    const googleLinks = screen.getAllByLabelText(/google/i);
    const linkedinLinks = screen.getAllByLabelText(/linkedin/i);
    
    expect(facebookLinks.length).toBeGreaterThan(0);
    expect(googleLinks.length).toBeGreaterThan(0);
    expect(linkedinLinks.length).toBeGreaterThan(0);
  });

  // CT9: Campos obrigatórios
  it('CT9: todos os campos são obrigatórios', async () => {
    const user = userEvent.setup();
    render(<LoginRegister />);
    
    // Verifica campos de sign in
    const emailInputs = screen.getAllByPlaceholderText('Email');
    const passwordInputs = screen.getAllByPlaceholderText('Senha');
    
    const signInEmailInput = emailInputs[1];
    const signInPasswordInput = passwordInputs[1];
    
    expect(signInEmailInput).toHaveAttribute('required');
    expect(signInPasswordInput).toHaveAttribute('required');
    
    // Vai para sign up e verifica campos
    const signUpButtons = screen.getAllByRole('button', { name: /cadastrar/i });
    const overlaySignUpButton = signUpButtons[signUpButtons.length - 1];
    await user.click(overlaySignUpButton);
    
    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText('Nome');
      const signUpEmailInputs = screen.getAllByPlaceholderText('Email');
      const signUpPasswordInputs = screen.getAllByPlaceholderText('Senha');
      
      const signUpEmailInput = signUpEmailInputs[0];
      const signUpPasswordInput = signUpPasswordInputs[0];
      
      expect(nameInput).toHaveAttribute('required');
      expect(signUpEmailInput).toHaveAttribute('required');
      expect(signUpPasswordInput).toHaveAttribute('required');
    });
  });

  // CT10: Acessibilidade - labels e roles
  it('CT10: possui elementos de acessibilidade adequados', () => {
    render(<LoginRegister />);
    
    // Verifica se os botões têm roles adequados
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    
    // Verifica se os inputs têm roles adequados
    const textboxes = screen.getAllByRole('textbox');
    expect(textboxes.length).toBeGreaterThan(0);
  });
});
