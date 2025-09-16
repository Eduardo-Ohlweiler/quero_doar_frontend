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
    
    // Verifica que o campo nome existe mas não está visível (formulário de register tem opacity 0)
    const loginForm = screen.getByTestId('login-form');
    const registerForm = screen.getByTestId('register-form');
    
    // Login form deve estar visível
    expect(loginForm).toHaveClass('opacity-100');
    // Register form deve estar oculto
    expect(registerForm).toHaveClass('opacity-0');
  });

  // CT2: Alternância para modo sign up
  it('CT2: alterna para modo sign up ao clicar no botão Cadastrar', async () => {
    const user = userEvent.setup();
    render(<LoginRegister />);
    
    // Busca o botão "Cadastrar" especificamente no overlay (que tem a classe border-white)
    const allButtons = screen.getAllByRole('button', { name: /cadastrar/i });
    const overlaySignUpButton = allButtons.find(btn => 
      btn.className.includes('border-white')
    );
    
    await user.click(overlaySignUpButton);
    
    // Verifica se mudou para o modo sign up verificando apenas elementos únicos
    await waitFor(() => {
      expect(screen.getByText('Criar Conta')).toBeInTheDocument();
      expect(screen.getByText('ou use seu email para registro')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Digite seu nome aqui')).toBeInTheDocument();
    });
  });

  // CT3: Alternância de volta para sign in
  it('CT3: alterna de volta para sign in ao clicar no botão Entrar', async () => {
    const user = userEvent.setup();
    render(<LoginRegister />);
    
    // Primeiro vai para sign up
    const allCadastrarButtons = screen.getAllByRole('button', { name: /cadastrar/i });
    const overlaySignUpButton = allCadastrarButtons.find(btn => 
      btn.className.includes('border-white')
    );
    await user.click(overlaySignUpButton);
    
    // Aguarda a transição e depois volta para sign in
    await waitFor(async () => {
      const allEntrarButtons = screen.getAllByRole('button', { name: /entrar/i });
      const overlaySignInButton = allEntrarButtons.find(btn => 
        btn.className.includes('border-white')
      );
      await user.click(overlaySignInButton);
    });
    
    // Verifica se voltou para sign in
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Entrar' })).toBeInTheDocument();
      expect(screen.getByText('ou informe seus dados para entrar')).toBeInTheDocument();
      
      // Verifica a visibilidade dos formulários
      const loginForm = screen.getByTestId('login-form');
      const registerForm = screen.getByTestId('register-form');
      
      // Login form deve estar visível
      expect(loginForm).toHaveClass('opacity-100');
      // Register form deve estar oculto
      expect(registerForm).toHaveClass('opacity-0');
    });
  });

  // CT4: Submissão do formulário de sign in
  it('CT4: chama onSignIn com dados corretos ao submeter formulário', async () => {
    const user = userEvent.setup();
    const mockOnSignIn = vi.fn();
    render(<LoginRegister onSignIn={mockOnSignIn} />);
    
    // Preenche os campos - usa o formulário específico de login
    const loginForm = screen.getByTestId('login-form');
    const emailInput = within(loginForm).getByPlaceholderText('Digite seu e-mail aqui');
    const passwordInput = within(loginForm).getByPlaceholderText('Digite sua senha aqui');
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    // Submete o formulário - busca especificamente o botão submit do form de login
    const submitButton = within(loginForm).getByRole('button', { name: /entrar/i });
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
    const allCadastrarButtons = screen.getAllByRole('button', { name: /cadastrar/i });
    const overlaySignUpButton = allCadastrarButtons.find(btn => 
      btn.className.includes('border-white')
    );
    await user.click(overlaySignUpButton);
    
    await waitFor(async () => {
      // Preenche os campos usando o formulário específico de registro
      const registerForm = screen.getByTestId('register-form');
      const nameInput = within(registerForm).getByPlaceholderText('Digite seu nome aqui');
      const emailInput = within(registerForm).getByPlaceholderText('Digite seu e-mail aqui');
      const passwordInput = within(registerForm).getByPlaceholderText('Digite sua senha aqui');
      
      await user.type(nameInput, 'João Silva');
      await user.type(emailInput, 'joao@example.com');
      await user.type(passwordInput, 'senha123');
      
      // Submete o formulário - busca especificamente o botão submit do form de registro
      const submitButton = within(registerForm).getByRole('button', { name: /cadastrar/i });
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
    const allCadastrarButtons = screen.getAllByRole('button', { name: /cadastrar/i });
    const overlaySignUpButton = allCadastrarButtons.find(btn => 
      btn.className.includes('border-white')
    );
    await user.click(overlaySignUpButton);
    
    await waitFor(() => {
      const loadingButton = screen.getByRole('button', { name: /carregando/i });
      expect(loadingButton).toBeInTheDocument();
      expect(loadingButton).toBeDisabled();
    });
  });

  // CT8: Links de redes sociais estão presentes
  it('CT8: renderiza botão do Google no modo sign in e sign up', async () => {
    const user = userEvent.setup();
    render(<LoginRegister />);
    
    // Verifica se o botão do Google está presente no modo sign in
    expect(screen.getAllByRole('button').some(button => 
      button.querySelector('svg')
    )).toBe(true);
    
    // Vai para modo sign up
    const allCadastrarButtons = screen.getAllByRole('button', { name: /cadastrar/i });
    const overlaySignUpButton = allCadastrarButtons.find(btn => 
      btn.className.includes('border-white')
    );
    await user.click(overlaySignUpButton);
    
    await waitFor(() => {
      // Verifica se o botão do Google também está presente no modo sign up
      expect(screen.getAllByRole('button').some(button => 
        button.querySelector('svg')
      )).toBe(true);
    });
  });

  // CT9: Campos obrigatórios
  it('CT9: todos os campos são obrigatórios', async () => {
    const user = userEvent.setup();
    render(<LoginRegister />);
    
    // Verifica campos de sign in usando o formulário específico
    const loginForm = screen.getByTestId('login-form');
    const emailInput = within(loginForm).getByPlaceholderText('Digite seu e-mail aqui');
    const passwordInput = within(loginForm).getByPlaceholderText('Digite sua senha aqui');
    
    expect(emailInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('required');
    
    // Vai para sign up e verifica campos
    const allCadastrarButtons = screen.getAllByRole('button', { name: /cadastrar/i });
    const overlaySignUpButton = allCadastrarButtons.find(btn => 
      btn.className.includes('border-white')
    );
    await user.click(overlaySignUpButton);
    
    await waitFor(() => {
      const registerForm = screen.getByTestId('register-form');
      const nameInput = within(registerForm).getByPlaceholderText('Digite seu nome aqui');
      const signUpEmailInput = within(registerForm).getByPlaceholderText('Digite seu e-mail aqui');
      const signUpPasswordInput = within(registerForm).getByPlaceholderText('Digite sua senha aqui');
      
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
