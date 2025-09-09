import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, describe, it, beforeEach, afterEach } from 'vitest';

// Mock UserMenu to avoid invoking useAuth inside tests that don't provide AuthProvider
vi.mock('../UserMenu/UserMenu', () => ({
  default: (props) => {
    // simple stub that exposes the expected test id
    return React.createElement('div', { 'data-testid': 'user-menu-trigger' });
  },
}));

import Header from './Header';

describe('Header component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  // CT1: Renderizar o header com barra de pesquisa e verificar se o onSearch é chamado ao submeter uma busca.
  it('CT1: chama onSearch ao submeter busca quando showSearchBar=true', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<Header showSearchBar={true} onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/buscar/i);
    await user.type(input, 'teste{Enter}');

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('teste');
  });

  // CT2: Renderizar o header sem barra de pesquisa e validar que o espaço é ajustado corretamente.
  it('CT2: sem barra de pesquisa o espaço central mantém a estrutura (flex-1) e não renderiza o SearchBar', () => {
    const { container } = render(<Header showSearchBar={false} />);

    // Verifica que não existe um input de busca
    expect(screen.queryByPlaceholderText(/buscar/i)).not.toBeInTheDocument();

    // Verifica que existe o contêiner central com classe flex-1 para manter espaçamento
    const central = container.querySelector('.flex-1');
    expect(central).toBeInTheDocument();
  });

  // CT3: Simular usuário autenticado e verificar se o menu do usuário é exibido.
  it('CT3: exibe UserMenu quando isAuthenticated=true', () => {
    const mockUser = { firstName: 'Maria', lastName: 'Silva' };
    render(<Header isAuthenticated={true} user={mockUser} showSearchBar={false} />);

    expect(screen.getByTestId('user-menu-trigger')).toBeInTheDocument();
  });

  // CT4: Simular usuário não autenticado e verificar se o botão "Entrar" é exibido.
  it('CT4: exibe botão Entrar quando não autenticado e showLoginButton=true', () => {
    render(<Header isAuthenticated={false} showLoginButton={true} />);

    const entrarBtn = screen.getByRole('button', { name: /entrar/i });
    expect(entrarBtn).toBeInTheDocument();
  });

  // CT5: Renderizar o header com a prop para ocultar o botão "Entrar" e validar que ele não aparece.
  it('CT5: não exibe botão Entrar quando showLoginButton=false', () => {
    render(<Header isAuthenticated={false} showLoginButton={false} />);

    expect(screen.queryByRole('button', { name: /entrar/i })).not.toBeInTheDocument();
  });
});
