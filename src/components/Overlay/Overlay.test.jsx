import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Overlay from './Overlay';

describe('Overlay Component', () => {
  it('should render children when active', () => {
    render(
      <Overlay isActive={true}>
        <div data-testid="overlay-content">Test Content</div>
      </Overlay>
    );
    
    expect(screen.getByTestId('overlay-content')).toBeInTheDocument();
  });

  it('should not render when inactive', () => {
    render(
      <Overlay isActive={false}>
        <div data-testid="overlay-content">Test Content</div>
      </Overlay>
    );
    
    expect(screen.queryByTestId('overlay-content')).not.toBeInTheDocument();
  });

  it('should call onBackgroundClick when clicking on background', () => {
    const handleBackgroundClick = vi.fn();
    
    render(
      <Overlay isActive={true} onBackgroundClick={handleBackgroundClick}>
        <div data-testid="overlay-content">Test Content</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    
    expect(handleBackgroundClick).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when clicking on background and closeOnBackgroundClick is true', () => {
    const handleClose = vi.fn();
    
    render(
      <Overlay 
        isActive={true} 
        closeOnBackgroundClick={true}
        onClose={handleClose}
      >
        <div data-testid="overlay-content">Test Content</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when clicking on background and closeOnBackgroundClick is false', () => {
    const handleClose = vi.fn();
    
    render(
      <Overlay 
        isActive={true} 
        closeOnBackgroundClick={false}
        onClose={handleClose}
      >
        <div data-testid="overlay-content">Test Content</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('should call both onBackgroundClick and onClose when both are provided', () => {
    const handleBackgroundClick = vi.fn();
    const handleClose = vi.fn();
    
    render(
      <Overlay 
        isActive={true} 
        closeOnBackgroundClick={true}
        onBackgroundClick={handleBackgroundClick}
        onClose={handleClose}
      >
        <div data-testid="overlay-content">Test Content</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    
    expect(handleBackgroundClick).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onBackgroundClick when clicking on content', () => {
    const handleBackgroundClick = vi.fn();
    
    render(
      <Overlay isActive={true} onBackgroundClick={handleBackgroundClick}>
        <div data-testid="overlay-content">Test Content</div>
      </Overlay>
    );
    
    const content = screen.getByTestId('overlay-content');
    fireEvent.click(content);
    
    expect(handleBackgroundClick).not.toHaveBeenCalled();
  });

  it('should not call onClose when clicking on content', () => {
    const handleClose = vi.fn();
    
    render(
      <Overlay 
        isActive={true} 
        closeOnBackgroundClick={true}
        onClose={handleClose}
      >
        <div data-testid="overlay-content">Test Content</div>
      </Overlay>
    );
    
    const content = screen.getByTestId('overlay-content');
    fireEvent.click(content);
    
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    render(
      <Overlay isActive={true} className="custom-overlay">
        <div>Test Content</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    expect(overlay).toHaveClass('custom-overlay');
  });

  it('should apply custom contentClassName', () => {
    render(
      <Overlay isActive={true} contentClassName="custom-content">
        <div data-testid="overlay-content">Test Content</div>
      </Overlay>
    );
    
    const content = screen.getByTestId('overlay-content').parentElement;
    expect(content).toHaveClass('custom-content');
  });

  it('should apply custom styles', () => {
    const customStyle = { backgroundColor: 'rgba(255, 0, 0, 0.8)' };
    
    render(
      <Overlay isActive={true} style={customStyle}>
        <div>Test Content</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    expect(overlay).toHaveStyle('background-color: rgba(255, 0, 0, 0.8)');
  });

  it('should have correct accessibility attributes when active', () => {
    render(
      <Overlay isActive={true}>
        <div>Test Content</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    expect(overlay).toHaveAttribute('aria-modal', 'true');
    expect(overlay).toHaveAttribute('aria-hidden', 'false');
  });

  it('should have correct accessibility attributes when inactive', () => {
    render(
      <Overlay isActive={false} animated={true}>
        <div>Test Content</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog', { hidden: true });
    expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });

  it('should render with animation prop', () => {
    render(
      <Overlay isActive={true} animated={true}>
        <div data-testid="overlay-content">Test Content</div>
      </Overlay>
    );
    
    expect(screen.getByTestId('overlay-content')).toBeInTheDocument();
  });

  it('should render with default props', () => {
    render(
      <Overlay>
        <div data-testid="overlay-content">Test Content</div>
      </Overlay>
    );
    
    // Com isActive false por padrão, não deve renderizar
    expect(screen.queryByTestId('overlay-content')).not.toBeInTheDocument();
  });

  it('should apply different z-levels', () => {
    const { rerender } = render(
      <Overlay isActive={true} zLevel="low">
        <div>Test Content</div>
      </Overlay>
    );
    
    let overlay = screen.getByRole('dialog');
    expect(overlay).toHaveClass('z-40');
    
    rerender(
      <Overlay isActive={true} zLevel="medium">
        <div>Test Content</div>
      </Overlay>
    );
    
    overlay = screen.getByRole('dialog');
    expect(overlay).toHaveClass('z-50');
    
    rerender(
      <Overlay isActive={true} zLevel="high">
        <div>Test Content</div>
      </Overlay>
    );
    
    overlay = screen.getByRole('dialog');
    expect(overlay).toHaveClass('z-[9999]');
  });

  it('should apply base overlay styles when active', () => {
    render(
      <Overlay isActive={true}>
        <div>Test Content</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    expect(overlay).toHaveClass('fixed', 'inset-0', 'flex', 'items-center', 'justify-center');
  });

  it('should have pointer-events-none when inactive', () => {
    render(
      <Overlay isActive={false} animated={true}>
        <div>Test Content</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog', { hidden: true });
    expect(overlay).toHaveClass('pointer-events-none');
  });

  it('should have pointer-events-auto when active', () => {
    render(
      <Overlay isActive={true}>
        <div>Test Content</div>
      </Overlay>
    );
    
    const overlay = screen.getByRole('dialog');
    expect(overlay).toHaveClass('pointer-events-auto');
  });
});
