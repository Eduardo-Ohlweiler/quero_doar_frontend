import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PasswordRecovery from './PasswordRecovery';

describe('PasswordRecovery', () => {
  describe('Validating Mode', () => {
    it('should render validating message and spinner', () => {
      render(<PasswordRecovery mode="validating" />);
      
      expect(screen.getByText('Validando Token')).toBeInTheDocument();
      expect(screen.getByText(/Aguarde enquanto validamos seu token/)).toBeInTheDocument();
    });

    it('should not render any buttons in validating mode', () => {
      render(<PasswordRecovery mode="validating" />);
      
      expect(screen.queryByText('Voltar ao Login')).not.toBeInTheDocument();
      expect(screen.queryByText('Redefinir Senha')).not.toBeInTheDocument();
      expect(screen.queryByText('Ir para Login')).not.toBeInTheDocument();
    });
  });

  describe('Invalid Token Mode', () => {
    it('should render invalid token message and icon', () => {
      render(<PasswordRecovery mode="invalid" />);
      
      expect(screen.getByText('Token Inválido ou Expirado')).toBeInTheDocument();
      expect(screen.getByText(/O token de recuperação de senha não é válido/)).toBeInTheDocument();
      expect(screen.getByText('Voltar ao Login')).toBeInTheDocument();
    });

    it('should call onGotoLogin when back to login button is clicked', () => {
      const mockGotoLogin = vi.fn();
      render(<PasswordRecovery mode="invalid" onGotoLogin={mockGotoLogin} />);
      
      const backButton = screen.getByText('Voltar ao Login');
      fireEvent.click(backButton);
      
      expect(mockGotoLogin).toHaveBeenCalledTimes(1);
    });
  });

  describe('Reset Password Mode', () => {
    it('should render reset password form', () => {
      render(<PasswordRecovery mode="reset" />);
      
      expect(screen.getByRole('heading', { name: 'Redefinir Senha' })).toBeInTheDocument();
      expect(screen.getByText(/Digite sua nova senha nos campos abaixo/)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Digite sua nova senha')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Confirme sua nova senha')).toBeInTheDocument();
      expect(screen.getByText('Cancelar')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Redefinir Senha' })).toBeInTheDocument();
    });

    it('should show error when passwords do not match', () => {
      render(<PasswordRecovery mode="reset" />);
      
      const passwordInput = screen.getByPlaceholderText('Digite sua nova senha');
      const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua nova senha');
      const submitButton = screen.getByRole('button', { name: 'Redefinir Senha' });
      
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'different123' } });
      fireEvent.click(submitButton);
      
      expect(screen.getByText('As senhas não coincidem')).toBeInTheDocument();
    });

    it('should show error when password is too short', () => {
      render(<PasswordRecovery mode="reset" />);
      
      const passwordInput = screen.getByPlaceholderText('Digite sua nova senha');
      const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua nova senha');
      const submitButton = screen.getByRole('button', { name: 'Redefinir Senha' });
      
      fireEvent.change(passwordInput, { target: { value: '123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: '123' } });
      fireEvent.click(submitButton);
      
      expect(screen.getByText('A senha deve ter pelo menos 6 caracteres')).toBeInTheDocument();
    });

    it('should show error when fields are empty', async () => {
      const { container } = render(<PasswordRecovery mode="reset" />);
      
      const form = container.querySelector('form');
      fireEvent.submit(form);
      
      await waitFor(() => {
        expect(screen.getByText('Todos os campos são obrigatórios')).toBeInTheDocument();
      });
    });

    it('should call onResetPassword when form is submitted with valid data', () => {
      const mockResetPassword = vi.fn();
      render(<PasswordRecovery mode="reset" onResetPassword={mockResetPassword} />);
      
      const passwordInput = screen.getByPlaceholderText('Digite sua nova senha');
      const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua nova senha');
      const submitButton = screen.getByRole('button', { name: 'Redefinir Senha' });
      
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
      
      expect(mockResetPassword).toHaveBeenCalledWith('password123');
    });

    it('should call onGotoLogin when cancel button is clicked', () => {
      const mockGotoLogin = vi.fn();
      render(<PasswordRecovery mode="reset" onGotoLogin={mockGotoLogin} />);
      
      const cancelButton = screen.getByText('Cancelar');
      fireEvent.click(cancelButton);
      
      expect(mockGotoLogin).toHaveBeenCalledTimes(1);
    });

    it('should show loading state when isResetting is true', () => {
      render(<PasswordRecovery mode="reset" isResetting={true} />);
      
      const submitButton = screen.getByRole('button', { name: /carregando/i });
      expect(submitButton).toBeDisabled();
    });

    it('should clear error when user starts typing', () => {
      render(<PasswordRecovery mode="reset" />);
      
      const passwordInput = screen.getByPlaceholderText('Digite sua nova senha');
      const confirmPasswordInput = screen.getByPlaceholderText('Confirme sua nova senha');
      const submitButton = screen.getByRole('button', { name: 'Redefinir Senha' });
      
      // Generate error first
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'different123' } });
      fireEvent.click(submitButton);
      
      expect(screen.getByText('As senhas não coincidem')).toBeInTheDocument();
      
      // Clear error by typing
      fireEvent.change(passwordInput, { target: { value: 'password12' } });
      
      expect(screen.queryByText('As senhas não coincidem')).not.toBeInTheDocument();
    });
  });

  describe('Success Mode', () => {
    it('should render success message and icon', () => {
      render(<PasswordRecovery mode="success" />);
      
      expect(screen.getByText('Senha Redefinida com Sucesso!')).toBeInTheDocument();
      expect(screen.getByText(/Sua senha foi redefinida com sucesso/)).toBeInTheDocument();
      expect(screen.getByText('Ir para Login')).toBeInTheDocument();
    });

    it('should call onGotoLogin when login button is clicked', () => {
      const mockGotoLogin = vi.fn();
      render(<PasswordRecovery mode="success" onGotoLogin={mockGotoLogin} />);
      
      const loginButton = screen.getByText('Ir para Login');
      fireEvent.click(loginButton);
      
      expect(mockGotoLogin).toHaveBeenCalledTimes(1);
    });
  });

  describe('Component Props', () => {
    it('should apply custom className', () => {
      const { container } = render(<PasswordRecovery className="custom-class" />);
      const component = container.firstChild.firstChild;
      
      expect(component).toHaveClass('custom-class');
    });

    it('should pass through additional props', () => {
      render(<PasswordRecovery data-testid="password-recovery-component" />);
      
      expect(screen.getByTestId('password-recovery-component')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('should default to validating mode', () => {
      render(<PasswordRecovery />);
      
      expect(screen.getByText('Validando Token')).toBeInTheDocument();
    });

    it('should default isResetting to false', () => {
      render(<PasswordRecovery mode="reset" />);
      
      const submitButton = screen.getByRole('button', { name: 'Redefinir Senha' });
      expect(submitButton).not.toBeDisabled();
    });
  });
});