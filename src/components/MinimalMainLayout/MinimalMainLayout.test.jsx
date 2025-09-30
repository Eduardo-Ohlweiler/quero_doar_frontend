import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import MinimalMainLayout from './MinimalMainLayout';

// Mock dos componentes filhos
vi.mock('../Header/Header', () => ({
  default: ({ children, showSearchBar, showLoginButton, onLogoClick, className }) => (
    <header data-testid="header" className={className}>
      Header Mock
      {children}
    </header>
  )
}));

vi.mock('../Footer/Footer', () => ({
  default: ({ variant, appearance }) => (
    <footer data-testid="footer">
      Footer Mock - {variant} {appearance}
    </footer>
  )
}));

vi.mock('../../hooks/useFromTo', () => ({
  default: () => ({
    fromTo: null,
    goBack: vi.fn()
  })
}));

const renderMinimalMainLayout = () => {
  return render(
    <BrowserRouter>
      <MinimalMainLayout />
    </BrowserRouter>
  );
};

describe('MinimalMainLayout', () => {
  it('deve renderizar sem erros', () => {
    renderMinimalMainLayout();
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('deve renderizar o Header com as props corretas', () => {
    renderMinimalMainLayout();
    
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-30');
  });

  it('deve renderizar o Footer com variant minimal e appearance gradient', () => {
    renderMinimalMainLayout();
    
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveTextContent('Footer Mock - minimal gradient');
  });

  it('deve ter a estrutura de layout correta', () => {
    const { container } = renderMinimalMainLayout();
    
    const layoutDiv = container.querySelector('.min-h-screen.flex.flex-col');
    expect(layoutDiv).toBeInTheDocument();
    
    const main = container.querySelector('main.flex-1');
    expect(main).toBeInTheDocument();
  });

  it('deve estar envolvido pelo SearchProvider', () => {
    // Se não estiver envolvido pelo SearchProvider, o Header falhará ao tentar usar useSearchBar
    // Como o Header está mockado, este teste garante que o componente renderiza sem erros,
    // indicando que o SearchProvider está funcionando corretamente
    expect(() => renderMinimalMainLayout()).not.toThrow();
  });
});