import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // CT1: Renderização de Variantes
    describe('Renderização de Variantes', () => {
        it('deve renderizar com appearance default e aplicar classes corretas', () => {
            render(<SearchBar appearance="default" data-testid="search-bar" />);
            const container = screen.getByTestId('search-bar').parentElement;
            expect(container).toHaveClass('bg-white/80');
        });

        it('deve renderizar com appearance minimal e aplicar classes corretas', () => {
            render(<SearchBar appearance="minimal" data-testid="search-bar" />);
            const container = screen.getByTestId('search-bar').parentElement;
            expect(container).toHaveClass('bg-transparent');
        });

        it('deve renderizar com appearance outlined e aplicar classes corretas', () => {
            render(<SearchBar appearance="outlined" data-testid="search-bar" />);
            const container = screen.getByTestId('search-bar').parentElement;
            expect(container).toHaveClass('bg-white/10');
        });

        it('deve renderizar com diferentes tamanhos', () => {
            const { rerender } = render(<SearchBar size="sm" data-testid="search-bar" />);
            let container = screen.getByTestId('search-bar').parentElement;
            expect(container).toHaveClass('h-8');

            rerender(<SearchBar size="md" data-testid="search-bar" />);
            container = screen.getByTestId('search-bar').parentElement;
            expect(container).toHaveClass('h-10');

            rerender(<SearchBar size="lg" data-testid="search-bar" />);
            container = screen.getByTestId('search-bar').parentElement;
            expect(container).toHaveClass('h-12');
        });
    });

    // CT2: Placeholder e Ícone
    describe('Placeholder e Ícone', () => {
        it('deve exibir o placeholder personalizado', () => {
            const placeholder = 'Buscar doações...';
            render(<SearchBar placeholder={placeholder} />);
            expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
        });

        it('deve exibir ícone de busca à esquerda por padrão', () => {
            render(<SearchBar />);
            const icon = screen.getByRole('searchbox').parentElement.querySelector('svg');
            expect(icon).toBeInTheDocument();
        });

        it('deve posicionar ícone à direita quando iconPosition="right"', () => {
            render(<SearchBar iconPosition="right" />);
            const container = screen.getByRole('searchbox').parentElement;
            const rightIcon = container.querySelector('[class*="right-"]');
            expect(rightIcon).toBeInTheDocument();
        });
    });

    // CT3: Evento de Busca
    describe('Evento de Busca', () => {
        it('deve chamar onSearch ao pressionar Enter', async () => {
            const user = userEvent.setup();
            const onSearch = vi.fn();
            const searchTerm = 'roupa infantil';

            render(<SearchBar onSearch={onSearch} />);
            const input = screen.getByRole('searchbox');

            await user.type(input, searchTerm);
            await user.keyboard('{Enter}');

            expect(onSearch).toHaveBeenCalledWith(searchTerm);
        });

        it('deve chamar onSearch com valor correto em componente controlado', async () => {
            const user = userEvent.setup();
            const onSearch = vi.fn();
            const value = 'brinquedos';

            render(<SearchBar onSearch={onSearch} value={value} />);
            const input = screen.getByRole('searchbox');

            await user.click(input); // Garantir que o input tem foco
            await user.keyboard('{Enter}');

            expect(onSearch).toHaveBeenCalledWith(value);
        });

        it('não deve chamar onSearch se não foi fornecido', async () => {
            const user = userEvent.setup();
            
            render(<SearchBar />);
            const input = screen.getByRole('searchbox');

            await user.type(input, 'test');
            await user.keyboard('{Enter}');

            // Não deve gerar erro
            expect(input).toBeInTheDocument();
        });
    });

    // CT4: Estado Desabilitado
    describe('Estado Desabilitado', () => {
        it('deve desabilitar o campo quando disabled=true', () => {
            render(<SearchBar disabled />);
            const input = screen.getByRole('searchbox');
            expect(input).toBeDisabled();
        });

        it('não deve aceitar entrada quando desabilitado', async () => {
            const user = userEvent.setup();
            render(<SearchBar disabled />);
            const input = screen.getByRole('searchbox');

            await user.type(input, 'teste');
            expect(input).toHaveValue('');
        });
    });

    // CT5: Estado de Carregamento
    describe('Estado de Carregamento', () => {
        it('deve exibir spinner quando loading=true', () => {
            render(<SearchBar loading />);
            // O spinner tem um data-testid específico
            const spinner = screen.getByTestId('loading-spinner');
            expect(spinner).toBeInTheDocument();
        });

        it('deve desabilitar o campo quando loading=true', () => {
            render(<SearchBar loading />);
            const input = screen.getByRole('searchbox');
            expect(input).toBeDisabled();
        });

        it('deve definir aria-busy quando loading=true', () => {
            render(<SearchBar loading />);
            const input = screen.getByRole('searchbox');
            expect(input).toHaveAttribute('aria-busy', 'true');
        });

        it('não deve definir aria-busy quando loading=false', () => {
            render(<SearchBar loading={false} />);
            const input = screen.getByRole('searchbox');
            expect(input).not.toHaveAttribute('aria-busy');
        });
    });

    // CT6: Repasse de Atributos
    describe('Repasse de Atributos', () => {
        it('deve aplicar atributos nativos do input', () => {
            const { container } = render(
                <SearchBar
                    type="search"
                    name="query"
                    autoFocus
                    data-testid="custom-search"
                />
            );
            const input = screen.getByTestId('custom-search');
            
            expect(input).toHaveAttribute('type', 'search');
            expect(input).toHaveAttribute('name', 'query');
            // Verificar se o foco está no elemento (autoFocus funcionou)
            expect(document.activeElement).toBe(input);
        });

        it('deve aplicar className personalizado', () => {
            const customClass = 'custom-search-class';
            render(<SearchBar className={customClass} data-testid="search-bar" />);
            const container = screen.getByTestId('search-bar').parentElement;
            expect(container).toHaveClass(customClass);
        });
    });

    // CT7: Acessibilidade via Teclado
    describe('Acessibilidade via Teclado', () => {
        it('deve ser focalizável via Tab', async () => {
            const user = userEvent.setup();
            render(
                <div>
                    <button>Botão anterior</button>
                    <SearchBar />
                    <button>Botão posterior</button>
                </div>
            );

            await user.tab();
            expect(screen.getByRole('button', { name: 'Botão anterior' })).toHaveFocus();

            await user.tab();
            expect(screen.getByRole('searchbox')).toHaveFocus();

            await user.tab();
            expect(screen.getByRole('button', { name: 'Botão posterior' })).toHaveFocus();
        });

        it('deve ter aria-label apropriado', () => {
            render(<SearchBar placeholder="Buscar produtos" />);
            const input = screen.getByRole('searchbox');
            expect(input).toHaveAttribute('aria-label', 'Buscar buscar produtos');
        });

        it('deve usar aria-label personalizado quando fornecido', () => {
            const customLabel = 'Campo de busca personalizado';
            render(<SearchBar aria-label={customLabel} />);
            const input = screen.getByRole('searchbox');
            expect(input).toHaveAttribute('aria-label', customLabel);
        });
    });

    // Testes adicionais para comportamento controlado/não controlado
    describe('Comportamento Controlado/Não Controlado', () => {
        it('deve funcionar como componente não controlado', async () => {
            const user = userEvent.setup();
            const onChange = vi.fn();
            
            render(<SearchBar onChange={onChange} />);
            const input = screen.getByRole('searchbox');

            await user.type(input, 'abc');
            
            expect(input).toHaveValue('abc');
            expect(onChange).toHaveBeenCalledTimes(3);
        });

        it('deve funcionar como componente controlado', async () => {
            const user = userEvent.setup();
            const onChange = vi.fn();
            
            const ControlledSearchBar = () => {
                const [value, setValue] = React.useState('');
                return (
                    <SearchBar
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            onChange(e);
                        }}
                    />
                );
            };

            render(<ControlledSearchBar />);
            const input = screen.getByRole('searchbox');

            await user.type(input, 'test');
            
            expect(input).toHaveValue('test');
            expect(onChange).toHaveBeenCalledTimes(4);
        });
    });

    // Testes de integração com eventos
    describe('Integração de Eventos', () => {
        it('deve chamar onKeyDown customizado quando fornecido', async () => {
            const user = userEvent.setup();
            const customKeyDown = vi.fn();

            render(<SearchBar onKeyDown={customKeyDown} />);
            const input = screen.getByRole('searchbox');

            await user.click(input);
            await user.type(input, 'a');

            expect(customKeyDown).toHaveBeenCalled();
        });

        it('deve chamar onSearch quando a lupa for clicada', async () => {
            const user = userEvent.setup();
            const onSearch = vi.fn();

            render(<SearchBar onSearch={onSearch} value="test search" />);
            const searchIcon = screen.getByLabelText('Executar busca');

            await user.click(searchIcon);

            expect(onSearch).toHaveBeenCalledWith('test search');
        });

        it('não deve chamar onSearch ao clicar na lupa quando desabilitado', async () => {
            const user = userEvent.setup();
            const onSearch = vi.fn();

            render(<SearchBar onSearch={onSearch} disabled value="test" />);
            const searchIcon = screen.getByLabelText('Executar busca');

            await user.click(searchIcon);

            expect(onSearch).not.toHaveBeenCalled();
        });
    });
});
