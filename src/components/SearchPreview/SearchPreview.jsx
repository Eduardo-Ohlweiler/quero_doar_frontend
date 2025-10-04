import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaSearch, FaTh, FaList, FaInfoCircle } from 'react-icons/fa';
import DonationPreview from '../DonationPreview/DonationPreview';
import Button from '../Button/Button';
import Skeleton from '../Skeleton/Skeleton';
import Combobox from '../Combobox/Combobox';
import {
    searchPreviewContainerStyles,
    searchPreviewHeaderStyles,
    searchPreviewTitleStyles,
    searchPreviewResultCountStyles,
    searchPreviewControlsStyles,
    searchPreviewViewToggleStyles,
    searchPreviewContentStyles,
    searchPreviewGridStyles,
    searchPreviewListStyles,
    searchPreviewEmptyStateStyles,
    searchPreviewButtonContainerStyles,
    searchPreviewSkeletonStyles
} from './SearchPreview.styles';

/**
 * Componente de visualização de resultados de pesquisa de doações.
 * Suporta diferentes modos de visualização (grid/list), paginação, ordenação e estados de carregamento.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.searchTerm - Termo de busca utilizado
 * @param {number} props.totalResults - Total de resultados encontrados
 * @param {Array} props.donations - Array de doações a serem exibidas
 * @param {'grid'|'list'} props.viewMode - Modo de visualização dos resultados
 * @param {boolean} props.isLoading - Estado de carregamento
 * @param {boolean} props.isWaiting - Estado aguardando pesquisa
 * @param {boolean} props.hasMoreItems - Indica se há mais itens para carregar
 * @param {number} props.itemsPerPage - Quantidade de itens por página
 * @param {Array<string>} props.sortOptions - Opções de ordenação disponíveis
 * @param {string|null} props.selectedSort - Opção de ordenação selecionada
 * @param {Function} props.onViewModeChange - Callback para mudança de modo de visualização
 * @param {Function} props.onSortChange - Callback para mudança de ordenação
 * @param {Function} props.onDonationClick - Callback para clique em doação
 * @param {Function} props.onDonationActionClick - Callback para ação em doação
 * @param {Function} props.onLoadMore - Callback para carregar mais resultados
 * @param {string} props.className - Classes CSS adicionais
 * @returns {JSX.Element} Componente de visualização de resultados
 */
export default function SearchPreview({
    searchTerm = '',
    totalResults = 0,
    donations = [],
    viewMode = 'grid',
    isLoading = false,
    isWaiting = true,
    hasMoreItems = false,
    itemsPerPage = 6,
    sortOptions = [],
    selectedSort = null,
    onViewModeChange,
    onSortChange,
    onDonationClick,
    onDonationActionClick,
    onLoadMore,
    className,
    ...rest
}) {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate items to show based on current page
    const itemsToShow = useMemo(() => {
        return currentPage * itemsPerPage;
    }, [currentPage, itemsPerPage]);

    // Get visible donations
    const visibleDonations = useMemo(() => {
        return donations.slice(0, itemsToShow);
    }, [donations, itemsToShow]);

    // Handle view mode toggle
    const handleViewModeToggle = (newMode) => {
        if (newMode !== viewMode) {
            onViewModeChange?.(newMode);
        }
    };

    // Handle load more
    const handleLoadMore = () => {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        
        onLoadMore?.({
            page: newPage,
            itemsPerPage,
            totalItems: donations.length,
            newItemsToShow: newPage * itemsPerPage
        });
    };

    // Handle donation click
    const handleDonationClick = (donation) => {
        const originalDonation = donations.find(d => d.donationId === donation.donationId);
        onDonationClick?.(originalDonation);
    };

    // Handle donation action click
    const handleDonationActionClick = (donation, action) => {
        const originalDonation = donations.find(d => d.donationId === donation.donationId);
        onDonationActionClick?.(originalDonation, action);
    };

    // Render skeleton loading state
    const renderSkeletonState = () => (
        <div className={searchPreviewSkeletonStyles()}>
            {/* Header skeleton */}
            <div className="space-y-4 mb-6">
                <Skeleton width="48" height="8" />
                <div className="flex items-center justify-between">
                    <Skeleton width="32" height="6" />
                    <div className="flex space-x-2">
                        <Skeleton width="16" height="10" rounded="lg" />
                        <Skeleton width="16" height="10" rounded="lg" />
                    </div>
                </div>
            </div>
            
            {/* Grid skeleton */}
            <div className={viewMode === 'grid' ? searchPreviewGridStyles() : searchPreviewListStyles()}>
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                    <div key={index} className="space-y-4">
                        {viewMode === 'grid' ? (
                            <>
                                <Skeleton height="48" rounded="lg" />
                                <Skeleton width="80" height="6" />
                                <Skeleton width="64" height="4" />
                                <div className="flex items-center space-x-2">
                                    <Skeleton variant="circular" width="8" height="8" />
                                    <Skeleton width="32" height="4" />
                                </div>
                            </>
                        ) : (
                            <div className="flex space-x-4">
                                <Skeleton width="32" height="24" rounded="lg" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton width="80" height="6" />
                                    <Skeleton width="full" height="4" />
                                    <Skeleton width="48" height="4" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    // Render waiting state
    const renderWaitingState = () => (
        <div className={searchPreviewEmptyStateStyles()}>
            <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <FaSearch className="w-10 h-10 text-blue-500" />
                </div>
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Comece sua busca por doações
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                        Use os filtros acima para encontrar exatamente o que você precisa.
                        Você pode filtrar por categoria, localização e tipo de doação.
                    </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
                    <div className="flex items-start space-x-3">
                        <FaInfoCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="text-left">
                            <h4 className="text-sm font-medium text-blue-900 mb-1">
                                Dicas para uma busca eficaz:
                            </h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Use palavras-chave específicas</li>
                                <li>• Selecione sua localização</li>
                                <li>• Escolha as categorias desejadas</li>
                                <li>• Filtre por doações ou solicitações</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Render results content
    const renderResultsContent = () => {
        if (!visibleDonations.length) {
            return (
                <div className={searchPreviewEmptyStateStyles()}>
                    <div className="text-center space-y-4">
                        <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                            <FaSearch className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Nenhum resultado encontrado
                            </h3>
                            <p className="text-gray-600">
                                Não encontramos resultados para "{searchTerm}".
                                Tente ajustar os filtros ou usar outras palavras-chave.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <>
                {/* Donations Grid/List */}
                <div className={viewMode === 'grid' ? searchPreviewGridStyles() : searchPreviewListStyles()}>
                    {visibleDonations.map((donation) => (
                        <DonationPreview
                            key={donation.donationId}
                            donation={donation}
                            layout={viewMode === 'grid' ? 'vertical' : 'horizontal'}
                            isPublic={donation.isPublic}
                            isDonation={donation.isDonation}
                            onClick={handleDonationClick}
                            onActionClick={handleDonationActionClick}
                        />
                    ))}
                </div>

                {/* Load More Button */}
                {hasMoreItems && (
                    <div className={searchPreviewButtonContainerStyles()}>
                        <Button
                            appearance="primary"
                            size="medium"
                            onClick={handleLoadMore}
                            className="px-8"
                        >
                            + Carregar mais resultados
                        </Button>
                    </div>
                )}
            </>
        );
    };

    // Main render logic
    if (isLoading) {
        return (
            <section
                className={twMerge(clsx(
                    searchPreviewContainerStyles(),
                    className
                ))}
                {...rest}
            >
                {renderSkeletonState()}
            </section>
        );
    }

    if (isWaiting) {
        return (
            <section
                className={twMerge(clsx(
                    searchPreviewContainerStyles(),
                    className
                ))}
                {...rest}
            >
                {renderWaitingState()}
            </section>
        );
    }

    return (
        <section
            className={twMerge(clsx(
                searchPreviewContainerStyles(),
                className
            ))}
            {...rest}
        >
            {/* Header */}
            <div className={searchPreviewHeaderStyles()}>
                <div className="space-y-2">
                    <h2 className={searchPreviewTitleStyles()}>
                        <FaSearch className="w-5 h-5 text-blue-500" />
                        Resultados para "{searchTerm}"
                    </h2>
                    <p className={searchPreviewResultCountStyles()}>
                        {totalResults === 1 ? '1 resultado encontrado' : `${totalResults} resultados encontrados`}
                    </p>
                </div>

                {/* Controls */}
                <div className={searchPreviewControlsStyles()}>
                    {/* Sort Combobox */}
                    {sortOptions.length > 0 && (
                        <Combobox
                            placeholder="Ordenar por"
                            buttonText={selectedSort || 'Ordenar por'}
                            disabled={false}
                            showIcon={true}
                            className="min-w-[180px]"
                        >
                            {({ onClose }) => (
                                <div className="py-1">
                                    {sortOptions.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                onSortChange?.(option);
                                                onClose?.();
                                            }}
                                            className={clsx(
                                                'w-full text-left px-4 py-2 text-sm transition-colors',
                                                selectedSort === option
                                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            )}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </Combobox>
                    )}

                    {/* View Mode Toggle */}
                    <div className={searchPreviewViewToggleStyles()}>
                        <button
                            onClick={() => handleViewModeToggle('grid')}
                            className={clsx(
                                'p-2 rounded-lg border transition-colors',
                                viewMode === 'grid'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                            )}
                            title="Visualização em grade"
                        >
                            <FaTh className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleViewModeToggle('list')}
                            className={clsx(
                                'p-2 rounded-lg border transition-colors',
                                viewMode === 'list'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                            )}
                            title="Visualização em lista"
                        >
                            <FaList className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className={searchPreviewContentStyles()}>
                {renderResultsContent()}
            </div>
        </section>
    );
}

SearchPreview.propTypes = {
    searchTerm: PropTypes.string,
    totalResults: PropTypes.number,
    donations: PropTypes.arrayOf(
        PropTypes.shape({
            donationId: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            photo: PropTypes.string,
            isDonation: PropTypes.bool.isRequired,
            isPublic: PropTypes.bool.isRequired,
            location: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            userMinimal: PropTypes.shape({
                userId: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                photo: PropTypes.string
            }).isRequired,
            status: PropTypes.string.isRequired,
            distanceKm: PropTypes.number.isRequired
        })
    ),
    viewMode: PropTypes.oneOf(['grid', 'list']),
    isLoading: PropTypes.bool,
    isWaiting: PropTypes.bool,
    hasMoreItems: PropTypes.bool,
    itemsPerPage: PropTypes.number,
    sortOptions: PropTypes.arrayOf(PropTypes.string),
    selectedSort: PropTypes.string,
    onViewModeChange: PropTypes.func,
    onSortChange: PropTypes.func,
    onDonationClick: PropTypes.func,
    onDonationActionClick: PropTypes.func,
    onLoadMore: PropTypes.func,
    className: PropTypes.string
};
