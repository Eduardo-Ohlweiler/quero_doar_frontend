 // src/components/Spinner/Spinner.test.jsx

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

// Não é mais necessário importar spinnerStyles, pois testamos classes diretas.

describe('Spinner Component', () => {

  // Teste 1: Garante que o componente seja renderizado no DOM
  it('should render the spinner with the correct test ID', () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId('loading-spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  // Teste 2: Acessibilidade - Garante que o atributo ARIA-LABEL esteja presente
  it('should render with the correct accessibility label (aria-label)', () => {
    render(<Spinner />);
    const spinnerElement = screen.getByLabelText('Carregando...');
    expect(spinnerElement).toBeInTheDocument();
  });

  // Teste 3: Acessibilidade - Garante que o texto 'sr-only' esteja presente
  it('should include the screen-reader-only text "Carregando..."', () => {
    render(<Spinner />);
    const srOnlyText = screen.getByText('Carregando...');
    expect(srOnlyText).toBeInTheDocument();
    expect(srOnlyText).toHaveClass('sr-only'); 
  });

  // Teste 4 (CORRIGIDO e OTIMIZADO): Renderização da Variante Padrão, checando classes críticas.
  it('should render with default props (medium size, medium stroke, primary color)', () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId('loading-spinner');
    
    // Checagem de Estilos Base e Animação
    expect(spinnerElement).toHaveClass('animate-spin'); 
    expect(spinnerElement).toHaveClass('rounded-full');
    
    // Checagem da Variante: size='medium'
    expect(spinnerElement).toHaveClass('w-8');
    expect(spinnerElement).toHaveClass('h-8');
    
    // Checagem da Variante: strokeWidth='medium'
    expect(spinnerElement).toHaveClass('border-4');

    // Checagem da Variante: color='primary'
    expect(spinnerElement).toHaveClass('border-t-[var(--color-primary)]');
  });
  
  // Teste 5 (OTIMIZADO): Renderização de Variantes customizadas (size)
  it('should apply the correct classes for "large" size', () => {
    render(<Spinner size="large" />);
    const spinnerElement = screen.getByTestId('loading-spinner');
    
    // Verifica as classes de 'large' (w-12 h-12 no seu styles.jsx)
    expect(spinnerElement).toHaveClass('w-12'); 
    expect(spinnerElement).toHaveClass('h-12'); 
    
    // Garante que as classes do tamanho padrão foram sobrescritas
    expect(spinnerElement).not.toHaveClass('w-8'); 
  });

  // Teste 6 (OTIMIZADO): Renderização de Variantes customizadas (color e strokeWidth)
  it('should apply the correct classes for "white" color and "thin" strokeWidth', () => {
    render(<Spinner color="white" strokeWidth="thin" />);
    const spinnerElement = screen.getByTestId('loading-spinner');
    
    // Checagem da cor 'white'
    expect(spinnerElement).toHaveClass('border-t-white'); 
    
    // Checagem da espessura 'thin'
    expect(spinnerElement).toHaveClass('border-2');
  });
  
  // Teste 7: Garante que classes customizadas passadas via 'className' sejam aplicadas
  it('should merge custom classes passed via className prop', () => {
    const customClass = 'bg-red-500 opacity-75';
    render(<Spinner className={customClass} />);
    const spinnerElement = screen.getByTestId('loading-spinner');

    expect(spinnerElement).toHaveClass('bg-red-500');
    expect(spinnerElement).toHaveClass('opacity-75');
    expect(spinnerElement).toHaveClass('animate-spin');
  });
});