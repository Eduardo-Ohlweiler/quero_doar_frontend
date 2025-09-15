import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup, within } from '@testing-library/react';
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
    expect(screen.getByRole('heading', { name: 'Entrar' })).toBeInTheDocument();
    expect(screen.getByText('ou informe seus dados para entrar')).toBeInTheDocument();
    expect(screen.getByText('Esqueceu sua senha?')).toBeInTheDocument();
    // Verifica que o campo nome não está visível no modo sign in
    expect(screen.queryByPlaceholderText('Digite seu nome aqui')).not.toBeInTheDocument();
  });

  // CT2: Alternância para modo sign up
  it('CT2: alterna para modo sign up ao clicar no botão Cadastrar', async () => {
    const user = userEvent.setup();
    render(<LoginRegister />);
    
    // Clica no botão "Cadastrar" no painel lateral
    const overlaySignUpButton = screen.getByRole('button', { name: /cadastrar/i });
    await user.click(overlaySignUpButton);
    
    // Verifica se mudou para o modo sign up
    await waitFor(() => {
      expect(screen.getByText('Criar Conta')).toBeInTheDocument();
      expect(screen.getByText('ou use seu email para registro')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Digite seu nome aqui')).toBeInTheDocument();
      // Verifica que o link "Esqueceu sua senha?" não está mais visível
      expect(screen.queryByText('Esqueceu sua senha?')).not.toBeInTheDocument();
    });
  });

  // CT3: Alternância de volta para sign in
  it('CT3: alterna de volta para sign in ao clicar no botão Entrar', async () => {
    const user = userEvent.setup();
    render(<LoginRegister />);
    
    // Primeiro vai para sign up
    const overlaySignUpButton = screen.getByRole('button', { name: /cadastrar/i });
    await user.click(overlaySignUpButton);
    
    // Depois volta para sign in
    await waitFor(async () => {
      const overlaySignInButton = screen.getByRole('button', { name: /entrar/i });
      await user.click(overlaySignInButton);
    });
    
    // Verifica se voltou para sign in
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Entrar' })).toBeInTheDocument();
      expect(screen.getByText('ou informe seus dados para entrar')).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Digite seu nome aqui')).not.toBeInTheDocument();
    });
  });

  // CT4: Submissão do formulário de sign in
  it('CT4: chama onSignIn com dados corretos ao submeter formulário', async () => {
    const user = userEvent.setup();
    const mockOnSignIn = vi.fn();
    render(<LoginRegister onSignIn={mockOnSignIn} />);
    
    // Preenche os campos
    const emailInput = screen.getByPlaceholderText('Digite seu e-mail aqui');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha aqui');
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    // Submete o formulário - busca especificamente o botão submit do form
    const form = screen.getByRole('form');
    const submitButton = within(form).getByRole('button', { name: /entrar/i });
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
    const overlaySignUpButton = screen.getByRole('button', { name: /cadastrar/i });
    await user.click(overlaySignUpButton);
    
    await waitFor(async () => {
      // Preenche os campos
      const nameInput = screen.getByPlaceholderText('Digite seu nome aqui');
      const emailInput = screen.getByPlaceholderText('Digite seu e-mail aqui');
      const passwordInput = screen.getByPlaceholderText('Digite sua senha aqui');
      
      await user.type(nameInput, 'João Silva');
      await user.type(emailInput, 'joao@example.com');
      await user.type(passwordInput, 'senha123');
      
      // Submete o formulário - busca especificamente o botão submit do form
      const form = screen.getByRole('form');
      const submitButton = within(form).getByRole('button', { name: /cadastrar/i });
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
    const overlaySignUpButton = screen.getByRole('button', { name: /cadastrar/i });
    await user.click(overlaySignUpButton);
    
    await waitFor(() => {
      const loadingButton = screen.getByRole('button', { name: /carregando/i });
      expect(loadingButton).toBeInTheDocument();
      expect(loadingButton).toBeDisabled();
    });
  });

  // CT8: Links de redes sociais estão presentes
  it('CT8: renderiza links de redes sociais no modo sign up', async () => {
    const user = userEvent.setup();
    render(<LoginRegister />);
    
    // Vai para modo sign up para ver as redes sociais
    const overlaySignUpButton = screen.getByRole('button', { name: /cadastrar/i });
    await user.click(overlaySignUpButton);
    
    await waitFor(() => {
      // Verifica se os links de redes sociais estão presentes
      const facebookLink = screen.getByLabelText(/facebook/i);
      const googleLink = screen.getByLabelText(/google/i);
      const linkedinLink = screen.getByLabelText(/linkedin/i);
      
      expect(facebookLink).toBeInTheDocument();
      expect(googleLink).toBeInTheDocument();
      expect(linkedinLink).toBeInTheDocument();
    });
  });

  // CT9: Campos obrigatórios
  it('CT9: todos os campos são obrigatórios', async () => {
    const user = userEvent.setup();
    render(<LoginRegister />);
    
    // Verifica campos de sign in
    const emailInput = screen.getByPlaceholderText('Digite seu e-mail aqui');
    const passwordInput = screen.getByPlaceholderText('Digite sua senha aqui');
    
    expect(emailInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('required');
    
    // Vai para sign up e verifica campos
    const overlaySignUpButton = screen.getByRole('button', { name: /cadastrar/i });
    await user.click(overlaySignUpButton);
    
    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText('Digite seu nome aqui');
      const signUpEmailInput = screen.getByPlaceholderText('Digite seu e-mail aqui');
      const signUpPasswordInput = screen.getByPlaceholderText('Digite sua senha aqui');
      
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
