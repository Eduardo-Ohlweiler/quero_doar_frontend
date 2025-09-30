import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Overlay from './Overlay';

describe('Overlay Component', () => {
  // Backup das propriedades originais do body para restaurar após os testes
  let originalBodyStyle;

  beforeEach(() => {
    originalBodyStyle = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight
    };
  });

  afterEach(() => {
    // Restaura as propriedades originais do body
    document.body.style.overflow = originalBodyStyle.overflow;
    document.body.style.paddingRight = originalBodyStyle.paddingRight;
  });

  it('CT01 - deve renderizar children quando ativo', () => {
    render(
      <Overlay isActive={true}>
        <div data-testid="overlay-content">Conteúdo de Teste</div>
      </Overlay>
    );
    
    expect(screen.getByTestId('overlay-content')).toBeInTheDocument();
  });

  it('CT02 - não deve renderizar quando inativo', () => {
    render(
      <Overlay isActive={false}>
        <div data-testid="overlay-content">Conteúdo de Teste</div>
      </Overlay>
    );
    
    expect(screen.queryByTestId('overlay-content')).not.toBeInTheDocument();
  });

  it('CT03 - deve chamar onBackgroundClick ao clicar no fundo', () => {
    const handleBackgroundClick = vi.fn();
    
    render(
      <Overlay isActive={true} onBackgroundClick={handleBackgroundClick}>
        <div data-testid="overlay-content">Conteúdo de Teste</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    
    expect(handleBackgroundClick).toHaveBeenCalledTimes(1);
  });

  it('CT04 - deve chamar onClose ao clicar no fundo quando closeOnBackgroundClick é true', () => {
    const handleClose = vi.fn();
    
    render(
      <Overlay 
        isActive={true} 
        closeOnBackgroundClick={true}
        onClose={handleClose}
      >
        <div data-testid="overlay-content">Conteúdo de Teste</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('CT05 - não deve chamar onClose ao clicar no fundo quando closeOnBackgroundClick é false', () => {
    const handleClose = vi.fn();
    
    render(
      <Overlay 
        isActive={true} 
        closeOnBackgroundClick={false}
        onClose={handleClose}
      >
        <div data-testid="overlay-content">Conteúdo de Teste</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('CT06 - deve chamar ambos onBackgroundClick e onClose quando ambos são fornecidos', () => {
    const handleBackgroundClick = vi.fn();
    const handleClose = vi.fn();
    
    render(
      <Overlay 
        isActive={true} 
        closeOnBackgroundClick={true}
        onBackgroundClick={handleBackgroundClick}
        onClose={handleClose}
      >
        <div data-testid="overlay-content">Conteúdo de Teste</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    
    expect(handleBackgroundClick).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('CT07 - não deve chamar onBackgroundClick ao clicar no conteúdo', () => {
    const handleBackgroundClick = vi.fn();
    
    render(
      <Overlay isActive={true} onBackgroundClick={handleBackgroundClick}>
        <div data-testid="overlay-content">Conteúdo de Teste</div>
      </Overlay>
    );
    
    const content = screen.getByTestId('overlay-content');
    fireEvent.click(content);
    
    expect(handleBackgroundClick).not.toHaveBeenCalled();
  });

  it('CT08 - não deve chamar onClose ao clicar no conteúdo', () => {
    const handleClose = vi.fn();
    
    render(
      <Overlay 
        isActive={true} 
        closeOnBackgroundClick={true}
        onClose={handleClose}
      >
        <div data-testid="overlay-content">Conteúdo de Teste</div>
      </Overlay>
    );
    
    const content = screen.getByTestId('overlay-content');
    fireEvent.click(content);
    
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('CT09 - deve aplicar className personalizada', () => {
    render(
      <Overlay isActive={true} className="overlay-customizada">
        <div>Conteúdo de Teste</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    expect(overlay).toHaveClass('overlay-customizada');
  });

  it('CT10 - deve aplicar contentClassName personalizada', () => {
    render(
      <Overlay isActive={true} contentClassName="conteudo-customizado">
        <div data-testid="overlay-content">Conteúdo de Teste</div>
      </Overlay>
    );
    
    const content = screen.getByTestId('overlay-content').parentElement;
    expect(content).toHaveClass('conteudo-customizado');
  });

  it('CT11 - deve aplicar estilos personalizados', () => {
    const estiloPersonalizado = { backgroundColor: 'rgba(255, 0, 0, 0.8)' };
    
    render(
      <Overlay isActive={true} style={estiloPersonalizado}>
        <div>Conteúdo de Teste</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    expect(overlay).toHaveStyle('background-color: rgba(255, 0, 0, 0.8)');
  });

  it('CT12 - deve ter atributos de acessibilidade corretos quando ativo', () => {
    render(
      <Overlay isActive={true}>
        <div>Conteúdo de Teste</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    expect(overlay).toHaveAttribute('aria-modal', 'true');
    expect(overlay).toHaveAttribute('aria-hidden', 'false');
  });

  it('CT13 - deve ter atributos de acessibilidade corretos quando inativo', () => {
    render(
      <Overlay isActive={false} animated={true}>
        <div>Conteúdo de Teste</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog', { hidden: true });
    expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });

  it('CT14 - deve renderizar com propriedade de animação', () => {
    render(
      <Overlay isActive={true} animated={true}>
        <div data-testid="overlay-content">Conteúdo de Teste</div>
      </Overlay>
    );
    
    expect(screen.getByTestId('overlay-content')).toBeInTheDocument();
  });

  it('CT15 - deve renderizar com propriedades padrão', () => {
    render(
      <Overlay>
        <div data-testid="overlay-content">Conteúdo de Teste</div>
      </Overlay>
    );
    
    // Com isActive false por padrão, não deve renderizar
    expect(screen.queryByTestId('overlay-content')).not.toBeInTheDocument();
  });

  it('CT16 - deve aplicar diferentes níveis de z-index', () => {
    const { rerender } = render(
      <Overlay isActive={true} zLevel="low">
        <div>Conteúdo de Teste</div>
      </Overlay>
    );
    
    let overlay = screen.getByRole('dialog');
    expect(overlay).toHaveClass('z-40');
    
    rerender(
      <Overlay isActive={true} zLevel="medium">
        <div>Conteúdo de Teste</div>
      </Overlay>
    );
    
    overlay = screen.getByRole('dialog');
    expect(overlay).toHaveClass('z-50');
    
    rerender(
      <Overlay isActive={true} zLevel="high">
        <div>Conteúdo de Teste</div>
      </Overlay>
    );
    
    overlay = screen.getByRole('dialog');
    expect(overlay).toHaveClass('z-[9999]');
  });

  it('CT17 - deve aplicar estilos base do overlay quando ativo', () => {
    render(
      <Overlay isActive={true}>
        <div>Conteúdo de Teste</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    expect(overlay).toHaveClass('fixed', 'inset-0', 'flex', 'items-center', 'justify-center');
  });

  it('CT18 - deve ter pointer-events-none quando inativo', () => {
    render(
      <Overlay isActive={false} animated={true}>
        <div>Conteúdo de Teste</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog', { hidden: true });
    expect(overlay).toHaveClass('pointer-events-none');
  });

  it('CT19 - deve ter pointer-events-auto quando ativo', () => {
    render(
      <Overlay isActive={true}>
        <div>Conteúdo de Teste</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    expect(overlay).toHaveClass('pointer-events-auto');
  });

  it('CT20 - deve bloquear scroll do body quando ativo e preventBodyScroll é true', () => {
    render(
      <Overlay isActive={true} preventBodyScroll={true}>
        <div>Conteúdo de Teste</div>
      </Overlay>
    );
    
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('CT21 - não deve bloquear scroll do body quando preventBodyScroll é false', () => {
    const originalOverflow = document.body.style.overflow;
    
    render(
      <Overlay isActive={true} preventBodyScroll={false}>
        <div>Conteúdo de Teste</div>
      </Overlay>
    );
    
    expect(document.body.style.overflow).toBe(originalOverflow);
  });

  it('CT22 - deve restaurar scroll do body quando desmontado', () => {
    const originalOverflow = document.body.style.overflow;
    
    const { unmount } = render(
      <Overlay isActive={true} preventBodyScroll={true}>
        <div>Conteúdo de Teste</div>
      </Overlay>
    );
    
    expect(document.body.style.overflow).toBe('hidden');
    
    unmount();
    
    expect(document.body.style.overflow).toBe(originalOverflow);
  });

  it('CT23 - deve renderizar com animated=true mas inativo para permitir transição de saída', () => {
    render(
      <Overlay isActive={false} animated={true}>
        <div data-testid="overlay-content">Conteúdo de Teste</div>
      </Overlay>
    );
    
    // Deve renderizar o overlay (mesmo inativo) para permitir animação de saída
    const overlay = screen.getByRole('dialog', { hidden: true });
    expect(overlay).toBeInTheDocument();
  });
});
