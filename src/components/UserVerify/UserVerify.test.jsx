import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserVerify from './UserVerify';

describe('UserVerify', () => {
  describe('Loading Mode', () => {
    it('should render loading message and spinner', () => {
      render(<UserVerify mode="loading" />);
      
      expect(screen.getByText('Validando Token')).toBeInTheDocument();
      expect(screen.getByText(/Aguarde enquanto validamos seu token/)).toBeInTheDocument();
    });

    it('should not render any buttons in loading mode', () => {
      render(<UserVerify mode="loading" />);
      
      expect(screen.queryByText('Ir para Login')).not.toBeInTheDocument();
      expect(screen.queryByText('Voltar ao Login')).not.toBeInTheDocument();
      expect(screen.queryByText('Reenviar Email')).not.toBeInTheDocument();
    });
  });

  describe('Account Activated Mode', () => {
    it('should render success message and icon', () => {
      render(<UserVerify mode="activated" />);
      
      expect(screen.getByText('Conta Ativada com Sucesso!')).toBeInTheDocument();
      expect(screen.getByText(/Sua conta foi ativada com sucesso/)).toBeInTheDocument();
      expect(screen.getByText('Ir para Login')).toBeInTheDocument();
    });

    it('should call onNavigateToLogin when login button is clicked', () => {
      const mockNavigateToLogin = vi.fn();
      render(<UserVerify mode="activated" onNavigateToLogin={mockNavigateToLogin} />);
      
      const loginButton = screen.getByText('Ir para Login');
      fireEvent.click(loginButton);
      
      expect(mockNavigateToLogin).toHaveBeenCalledTimes(1);
    });
  });

  describe('Token Expired Mode', () => {
    it('should render error message and icon', () => {
      render(<UserVerify mode="expired" />);
      
      expect(screen.getByText('Token Inválido ou Expirado')).toBeInTheDocument();
      expect(screen.getByText(/O token de verificação não é válido/)).toBeInTheDocument();
      expect(screen.getByText('Voltar ao Login')).toBeInTheDocument();
      expect(screen.getByText('Reenviar Email')).toBeInTheDocument();
    });

    it('should call onNavigateToLogin when back to login button is clicked', () => {
      const mockNavigateToLogin = vi.fn();
      render(<UserVerify mode="expired" onNavigateToLogin={mockNavigateToLogin} />);
      
      const backButton = screen.getByText('Voltar ao Login');
      fireEvent.click(backButton);
      
      expect(mockNavigateToLogin).toHaveBeenCalledTimes(1);
    });

    it('should call onResendVerificationEmail when resend button is clicked', () => {
      const mockResendEmail = vi.fn();
      render(<UserVerify mode="expired" onResendVerificationEmail={mockResendEmail} />);
      
      const resendButton = screen.getByText('Reenviar Email');
      fireEvent.click(resendButton);
      
      expect(mockResendEmail).toHaveBeenCalledTimes(1);
    });

    it('should show loading state on resend button when isResending is true', () => {
      render(<UserVerify mode="expired" isResending={true} />);
      
      const resendButton = screen.getByRole('button', { name: /carregando/i });
      expect(resendButton).toBeDisabled();
    });
  });

  describe('Component Props', () => {
    it('should apply custom className', () => {
      const { container } = render(<UserVerify className="custom-class" />);
      const component = container.firstChild.firstChild;
      
      expect(component).toHaveClass('custom-class');
    });

    it('should pass through additional props', () => {
      render(<UserVerify data-testid="user-verify-component" />);
      
      expect(screen.getByTestId('user-verify-component')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('should default to activated mode', () => {
      render(<UserVerify />);
      
      expect(screen.getByText('Conta Ativada com Sucesso!')).toBeInTheDocument();
    });

    it('should default isResending to false', () => {
      render(<UserVerify mode="expired" />);
      
      const resendButton = screen.getByText('Reenviar Email');
      expect(resendButton).not.toBeDisabled();
    });
  });
});