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

    describe('Waiting State', () => {
        it('should render waiting state when isWaiting is true', () => {
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

    describe('Loading State', () => {
        it('should render skeleton when isLoading is true', () => {
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

    describe('Results State', () => {
        it('should render search results with correct term and count', () => {
            render(<SearchPreview {...defaultProps} />);

            expect(screen.getByText('Resultados para "Latas"')).toBeInTheDocument();
            expect(screen.getByText('2 resultados encontrados')).toBeInTheDocument();
        });

        it('should render donations in grid mode', () => {
            render(<SearchPreview {...defaultProps} viewMode="grid" />);

            expect(screen.getByText('Latas de Alumínio')).toBeInTheDocument();
            expect(screen.getByText('Latas de Conserva')).toBeInTheDocument();
        });

        it('should render donations in list mode', () => {
            render(<SearchPreview {...defaultProps} viewMode="list" />);

            expect(screen.getByText('Latas de Alumínio')).toBeInTheDocument();
            expect(screen.getByText('Latas de Conserva')).toBeInTheDocument();
        });

        it('should show singular result count for one result', () => {
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

    describe('View Mode Toggle', () => {
        it('should render view mode toggle buttons', () => {
            render(<SearchPreview {...defaultProps} />);

            const gridButton = screen.getByTitle('Visualização em grade');
            const listButton = screen.getByTitle('Visualização em lista');

            expect(gridButton).toBeInTheDocument();
            expect(listButton).toBeInTheDocument();
        });

        it('should highlight active view mode', () => {
            render(<SearchPreview {...defaultProps} viewMode="grid" />);

            const gridButton = screen.getByTitle('Visualização em grade');
            const listButton = screen.getByTitle('Visualização em lista');

            expect(gridButton).toHaveClass('bg-blue-500');
            expect(listButton).toHaveClass('bg-white');
        });

        it('should call onViewModeChange when toggle button is clicked', () => {
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

        it('should not call onViewModeChange when same mode is clicked', () => {
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

    describe('Load More Functionality', () => {
        it('should render load more button when hasMoreItems is true', () => {
            render(<SearchPreview {...defaultProps} hasMoreItems={true} />);

            expect(screen.getByText('+ Carregar mais resultados')).toBeInTheDocument();
        });

        it('should not render load more button when hasMoreItems is false', () => {
            render(<SearchPreview {...defaultProps} hasMoreItems={false} />);

            expect(screen.queryByText('+ Carregar mais resultados')).not.toBeInTheDocument();
        });

        it('should call onLoadMore when load more button is clicked', () => {
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

    describe('No Results State', () => {
        it('should render no results message when no donations found', () => {
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

    describe('Donation Interactions', () => {
        it('should call onDonationClick when donation is clicked', async () => {
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

    describe('Sort Functionality', () => {
        const sortOptions = ['Mais recentes', 'Mais antigos', 'Distância (menor)', 'Distância (maior)'];

        it('should not render sort combobox when sortOptions is empty', () => {
            render(
                <SearchPreview
                    {...defaultProps}
                    sortOptions={[]}
                />
            );

            expect(screen.queryByText('Ordenar por')).not.toBeInTheDocument();
        });

        it('should render sort combobox when sortOptions are provided', () => {
            render(
                <SearchPreview
                    {...defaultProps}
                    sortOptions={sortOptions}
                    selectedSort={null}
                />
            );

            expect(screen.getByText('Ordenar por')).toBeInTheDocument();
        });

        it('should display selected sort option', () => {
            render(
                <SearchPreview
                    {...defaultProps}
                    sortOptions={sortOptions}
                    selectedSort="Mais recentes"
                />
            );

            expect(screen.getByText('Mais recentes')).toBeInTheDocument();
        });

        it('should call onSortChange when sort option is clicked', async () => {
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

        it('should highlight selected sort option in dropdown', async () => {
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

    describe('Accessibility', () => {
        it('should have proper section structure', () => {
            render(<SearchPreview {...defaultProps} />);

            const section = document.querySelector('section');
            expect(section).toBeInTheDocument();
        });

        it('should have proper button titles for view mode toggles', () => {
            render(<SearchPreview {...defaultProps} />);

            expect(screen.getByTitle('Visualização em grade')).toBeInTheDocument();
            expect(screen.getByTitle('Visualização em lista')).toBeInTheDocument();
        });
    });
});
