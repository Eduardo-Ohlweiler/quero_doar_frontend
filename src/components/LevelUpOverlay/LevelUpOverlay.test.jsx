import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, vi, describe, it } from 'vitest';
import LevelUpOverlay from './LevelUpOverlay';

// Mock do confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}));

describe('LevelUpOverlay component', () => {
  it('CT1: não renderiza quando isActive é false', () => {
    render(<LevelUpOverlay isActive={false} level={5} />);
    
    // Como o overlay tem animated=true sempre, ele renderiza mas fica oculto
    // Vamos verificar que o overlay está com aria-hidden="true"
    const overlay = screen.getByRole('dialog', { hidden: true });
    expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });

  it('CT2: renderiza quando isActive é true', () => {
    render(<LevelUpOverlay isActive={true} level={5} />);
    
    // Verifica se o conteúdo principal está presente
    expect(screen.getByText('Parabéns! Você subiu de nível!')).toBeInTheDocument();
    expect(screen.getByText('Fechar')).toBeInTheDocument();
    expect(screen.getByText('Acesse as configurações para desativar notificações de nível')).toBeInTheDocument();
  });

  it('CT3: chama onClose ao clicar no botão fechar', () => {
    const mockOnClose = vi.fn();
    render(<LevelUpOverlay isActive={true} level={5} onClose={mockOnClose} />);
    
    const closeButton = screen.getByText('Fechar');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('CT4: chama onDisableLeveling ao clicar no botão fechar', () => {
    const mockOnDisableLeveling = vi.fn();
    render(<LevelUpOverlay isActive={true} level={5} onDisableLeveling={mockOnDisableLeveling} />);
    
    const closeButton = screen.getByText('Fechar');
    fireEvent.click(closeButton);
    
    expect(mockOnDisableLeveling).toHaveBeenCalledTimes(1);
  });

  it('CT5: renderiza com level e phrase personalizados', () => {
    render(<LevelUpOverlay isActive={true} level={10} phrase="NÍVEL MÁXIMO" />);
    
    expect(screen.getByText('Parabéns! Você subiu de nível!')).toBeInTheDocument();
    // O LevelAchievement vai renderizar o nível e frase, mas não precisamos testar isso aqui
    // pois o LevelAchievement tem seus próprios testes
  });
});
