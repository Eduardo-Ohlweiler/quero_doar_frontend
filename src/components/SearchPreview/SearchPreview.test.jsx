import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchPreview from './SearchPreview';

// Mock data para testes
const mockDonations = [
    {
        donationId: 1,
        title: 'Latas de Alumínio',
        description: 'Tenho várias latas de alumínio para doação.',
        photo: null,
        isDonation: true,
        isPublic: true,
        location: 'São Paulo, SP',
        date: '2024-01-15T10:30:00Z',
        userMinimal: {
            userId: 1,
            name: 'João Silva',
            photo: null
        },
        status: 'ATIVO',
        distanceKm: 2.5
    },
    {
        donationId: 2,
        title: 'Latas de Conserva',
        description: 'Latas de conserva limpas.',
        photo: null,
        isDonation: true,
        isPublic: true,
        location: 'Rio de Janeiro, RJ',
        date: '2024-01-14T15:45:00Z',
        userMinimal: {
            userId: 2,
            name: 'Maria Santos',
            photo: null
        },
        status: 'ATIVO',
        distanceKm: 5.2
    }
];

describe('SearchPreview', () => {
    const defaultProps = {
        searchTerm: 'Latas',
        totalResults: 2,
        donations: mockDonations,
        viewMode: 'grid',
        isLoading: false,
        isWaiting: false,
        hasMoreItems: false,
        itemsPerPage: 6,
        sortOptions: [],
        selectedSort: null,
        onViewModeChange: vi.fn(),
        onSortChange: vi.fn(),
        onDonationClick: vi.fn(),
        onDonationActionClick: vi.fn(),
        onLoadMore: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Estado de Espera', () => {
        it('CT01 - Deve renderizar estado de espera quando isWaiting é true', () => {
            render(
                <SearchPreview
                    {...defaultProps}
                    isWaiting={true}
                    donations={[]}
                    totalResults={0}
                />
            );

            expect(screen.getByText('Comece sua busca por doações')).toBeInTheDocument();
            expect(screen.getByText(/Use os filtros acima para encontrar/)).toBeInTheDocument();
            expect(screen.getByText('Dicas para uma busca eficaz:')).toBeInTheDocument();
        });
    });

    describe('Estado de Carregamento', () => {
        it('CT02 - Deve renderizar skeleton quando isLoading é true', () => {
            render(
                <SearchPreview
                    {...defaultProps}
                    isLoading={true}
                    isWaiting={false}
                />
            );

            // Verifica se skeleton elements estão presentes
            const skeletons = document.querySelectorAll('[aria-hidden="true"][role="presentation"]');
            expect(skeletons.length).toBeGreaterThan(0);
        });
    });

    describe('Estado com Resultados', () => {
        it('CT03 - Deve renderizar resultados de pesquisa com termo e contagem corretos', () => {
            render(<SearchPreview {...defaultProps} />);

            expect(screen.getByText('Resultados para "Latas"')).toBeInTheDocument();
            expect(screen.getByText('2 resultados encontrados')).toBeInTheDocument();
        });

        it('CT04 - Deve renderizar doações em modo grade', () => {
            render(<SearchPreview {...defaultProps} viewMode="grid" />);

            expect(screen.getByText('Latas de Alumínio')).toBeInTheDocument();
            expect(screen.getByText('Latas de Conserva')).toBeInTheDocument();
        });

        it('CT05 - Deve renderizar doações em modo lista', () => {
            render(<SearchPreview {...defaultProps} viewMode="list" />);

            expect(screen.getByText('Latas de Alumínio')).toBeInTheDocument();
            expect(screen.getByText('Latas de Conserva')).toBeInTheDocument();
        });

        it('CT06 - Deve mostrar contagem singular para um resultado', () => {
            render(
                <SearchPreview
                    {...defaultProps}
                    totalResults={1}
                    donations={[mockDonations[0]]}
                />
            );

            expect(screen.getByText('1 resultado encontrado')).toBeInTheDocument();
        });
    });

    describe('Alternância de Modo de Visualização', () => {
        it('CT07 - Deve renderizar botões de alternância de modo de visualização', () => {
            render(<SearchPreview {...defaultProps} />);

            const gridButton = screen.getByTitle('Visualização em grade');
            const listButton = screen.getByTitle('Visualização em lista');

            expect(gridButton).toBeInTheDocument();
            expect(listButton).toBeInTheDocument();
        });

        it('CT08 - Deve destacar o modo de visualização ativo', () => {
            render(<SearchPreview {...defaultProps} viewMode="grid" />);

            const gridButton = screen.getByTitle('Visualização em grade');
            const listButton = screen.getByTitle('Visualização em lista');

            expect(gridButton).toHaveClass('bg-blue-500');
            expect(listButton).toHaveClass('bg-white');
        });

        it('CT09 - Deve chamar onViewModeChange quando botão de alternância é clicado', () => {
            const onViewModeChange = vi.fn();
            render(
                <SearchPreview
                    {...defaultProps}
                    viewMode="grid"
                    onViewModeChange={onViewModeChange}
                />
            );

            const listButton = screen.getByTitle('Visualização em lista');
            fireEvent.click(listButton);

            expect(onViewModeChange).toHaveBeenCalledWith('list');
        });

        it('CT10 - Não deve chamar onViewModeChange quando mesmo modo é clicado', () => {
            const onViewModeChange = vi.fn();
            render(
                <SearchPreview
                    {...defaultProps}
                    viewMode="grid"
                    onViewModeChange={onViewModeChange}
                />
            );

            const gridButton = screen.getByTitle('Visualização em grade');
            fireEvent.click(gridButton);

            expect(onViewModeChange).not.toHaveBeenCalled();
        });
    });

    describe('Funcionalidade Carregar Mais', () => {
        it('CT11 - Deve renderizar botão carregar mais quando hasMoreItems é true', () => {
            render(<SearchPreview {...defaultProps} hasMoreItems={true} />);

            expect(screen.getByText('+ Carregar mais resultados')).toBeInTheDocument();
        });

        it('CT12 - Não deve renderizar botão carregar mais quando hasMoreItems é false', () => {
            render(<SearchPreview {...defaultProps} hasMoreItems={false} />);

            expect(screen.queryByText('+ Carregar mais resultados')).not.toBeInTheDocument();
        });

        it('CT13 - Deve chamar onLoadMore quando botão carregar mais é clicado', () => {
            const onLoadMore = vi.fn();
            render(
                <SearchPreview
                    {...defaultProps}
                    hasMoreItems={true}
                    onLoadMore={onLoadMore}
                />
            );

            const loadMoreButton = screen.getByText('+ Carregar mais resultados');
            fireEvent.click(loadMoreButton);

            expect(onLoadMore).toHaveBeenCalledWith({
                page: 2,
                itemsPerPage: 6,
                totalItems: 2,
                newItemsToShow: 12
            });
        });
    });

    describe('Estado Sem Resultados', () => {
        it('CT14 - Deve renderizar mensagem de sem resultados quando nenhuma doação é encontrada', () => {
            render(
                <SearchPreview
                    {...defaultProps}
                    donations={[]}
                    totalResults={0}
                    isWaiting={false}
                />
            );

            expect(screen.getByText('Nenhum resultado encontrado')).toBeInTheDocument();
            expect(screen.getByText(/Não encontramos resultados para "Latas"/)).toBeInTheDocument();
        });
    });

    describe('Interações com Doações', () => {
        it('CT15 - Deve chamar onDonationClick quando doação é clicada', async () => {
            const onDonationClick = vi.fn();
            render(
                <SearchPreview
                    {...defaultProps}
                    onDonationClick={onDonationClick}
                />
            );

            const donation = screen.getByText('Latas de Alumínio');
            fireEvent.click(donation);

            await waitFor(() => {
                expect(onDonationClick).toHaveBeenCalledWith(mockDonations[0]);
            });
        });
    });

    describe('Funcionalidade de Ordenação', () => {
        const sortOptions = ['Mais recentes', 'Mais antigos', 'Distância (menor)', 'Distância (maior)'];

        it('CT16 - Não deve renderizar combobox de ordenação quando sortOptions está vazio', () => {
            render(
                <SearchPreview
                    {...defaultProps}
                    sortOptions={[]}
                />
            );

            expect(screen.queryByText('Ordenar por')).not.toBeInTheDocument();
        });

        it('CT17 - Deve renderizar combobox de ordenação quando sortOptions são fornecidas', () => {
            render(
                <SearchPreview
                    {...defaultProps}
                    sortOptions={sortOptions}
                    selectedSort={null}
                />
            );

            expect(screen.getByText('Ordenar por')).toBeInTheDocument();
        });

        it('CT18 - Deve exibir opção de ordenação selecionada', () => {
            render(
                <SearchPreview
                    {...defaultProps}
                    sortOptions={sortOptions}
                    selectedSort="Mais recentes"
                />
            );

            expect(screen.getByText('Mais recentes')).toBeInTheDocument();
        });

        it('CT19 - Deve chamar onSortChange quando opção de ordenação é clicada', async () => {
            const onSortChange = vi.fn();
            render(
                <SearchPreview
                    {...defaultProps}
                    sortOptions={sortOptions}
                    selectedSort="Mais recentes"
                    onSortChange={onSortChange}
                />
            );

            // Click no combobox para abrir
            const comboboxButton = screen.getByText('Mais recentes');
            fireEvent.click(comboboxButton);

            // Aguardar o dropdown abrir e clicar em uma opção
            await waitFor(() => {
                const option = screen.getByText('Distância (menor)');
                fireEvent.click(option);
            });

            expect(onSortChange).toHaveBeenCalledWith('Distância (menor)');
        });

        it('CT20 - Deve destacar opção de ordenação selecionada no dropdown', async () => {
            render(
                <SearchPreview
                    {...defaultProps}
                    sortOptions={sortOptions}
                    selectedSort="Mais recentes"
                />
            );

            // Click no combobox para abrir
            const comboboxButton = screen.getByText('Mais recentes');
            fireEvent.click(comboboxButton);

            // Verificar se a opção selecionada tem a classe de highlight
            await waitFor(() => {
                const selectedOption = screen.getAllByText('Mais recentes')[1]; // O segundo é do dropdown
                expect(selectedOption).toHaveClass('bg-blue-50', 'text-blue-700', 'font-medium');
            });
        });
    });

    describe('Acessibilidade', () => {
        it('CT21 - Deve ter estrutura de seção adequada', () => {
            render(<SearchPreview {...defaultProps} />);

            const section = document.querySelector('section');
            expect(section).toBeInTheDocument();
        });

        it('CT22 - Deve ter títulos adequados nos botões de alternância de modo de visualização', () => {
            render(<SearchPreview {...defaultProps} />);

            expect(screen.getByTitle('Visualização em grade')).toBeInTheDocument();
            expect(screen.getByTitle('Visualização em lista')).toBeInTheDocument();
        });
    });
});
