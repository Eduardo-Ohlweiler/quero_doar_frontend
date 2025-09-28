import { useState } from 'react';
import SearchPreview from './SearchPreview';

// Mock data para as stories
const mockDonations = [
    {
        donationId: 1,
        title: 'Latas de Alumínio',
        description: 'Tenho várias latas de alumínio para doação. Ideal para reciclagem.',
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
        title: 'Latas de Conserva Vazias',
        description: 'Latas de conserva limpas e sem rótulos. Perfeitas para artesanato.',
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
    },
    {
        donationId: 3,
        title: 'Preciso de Latas para Projeto',
        description: 'Estou coletando latas de alumínio para um projeto escolar de reciclagem.',
        photo: null,
        isDonation: false,
        isPublic: true,
        location: 'Belo Horizonte, MG',
        date: '2024-01-13T09:20:00Z',
        userMinimal: {
            userId: 3,
            name: 'Pedro Costa',
            photo: null
        },
        status: 'ATIVO',
        distanceKm: 1.8
    },
    {
        donationId: 4,
        title: 'Latas Decorativas',
        description: 'Latas coloridas e decoradas. Ótimas para organização ou decoração.',
        photo: null,
        isDonation: true,
        isPublic: true,
        location: 'Porto Alegre, RS',
        date: '2024-01-12T14:10:00Z',
        userMinimal: {
            userId: 4,
            name: 'Ana Oliveira',
            photo: null
        },
        status: 'ATIVO',
        distanceKm: 8.7
    },
    {
        donationId: 5,
        title: 'Latas para Artesanato',
        description: 'Diversas latas de diferentes tamanhos. Ideais para projetos criativos.',
        photo: null,
        isDonation: true,
        isPublic: true,
        location: 'Curitiba, PR',
        date: '2024-01-11T11:30:00Z',
        userMinimal: {
            userId: 5,
            name: 'Carlos Ferreira',
            photo: null
        },
        status: 'ATIVO',
        distanceKm: 3.4
    },
    {
        donationId: 6,
        title: 'Solicitação: Latas de Tinta',
        description: 'Procuro latas de tinta vazias para um projeto de arte urbana.',
        photo: null,
        isDonation: false,
        isPublic: true,
        location: 'Salvador, BA',
        date: '2024-01-10T16:20:00Z',
        userMinimal: {
            userId: 6,
            name: 'Lucia Mendes',
            photo: null
        },
        status: 'ATIVO',
        distanceKm: 12.1
    }
];

export default {
    title: 'Components/SearchPreview',
    component: SearchPreview,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Componente para exibir resultados de pesquisa com diferentes modos de visualização, estados de carregamento e paginação.'
            }
        }
    },
    argTypes: {
        searchTerm: {
            control: { type: 'text' },
            description: 'Termo de busca usado na pesquisa'
        },
        totalResults: {
            control: { type: 'number' },
            description: 'Número total de resultados encontrados'
        },
        viewMode: {
            control: { type: 'select' },
            options: ['grid', 'list'],
            description: 'Modo de visualização dos resultados'
        },
        isLoading: {
            control: { type: 'boolean' },
            description: 'Estado de carregamento'
        },
        isWaiting: {
            control: { type: 'boolean' },
            description: 'Estado de aguardando pesquisa'
        },
        hasMoreItems: {
            control: { type: 'boolean' },
            description: 'Se há mais itens para carregar'
        },
        itemsPerPage: {
            control: { type: 'number', min: 1, max: 12 },
            description: 'Número de itens por página'
        },
        onViewModeChange: { action: 'viewModeChanged' },
        onDonationClick: { action: 'donationClicked' },
        onDonationActionClick: { action: 'donationActionClicked' },
        onLoadMore: { action: 'loadMore' }
    }
};

// Default - modo de aguardando pesquisa
export const Default = {
    args: {
        searchTerm: '',
        totalResults: 0,
        donations: [],
        viewMode: 'grid',
        isLoading: false,
        isWaiting: true,
        hasMoreItems: false,
        itemsPerPage: 6
    }
};

// Loading - estado de carregamento
export const Loading = {
    args: {
        searchTerm: 'Latas',
        totalResults: 0,
        donations: [],
        viewMode: 'grid',
        isLoading: true,
        isWaiting: false,
        hasMoreItems: false,
        itemsPerPage: 6
    }
};

// With Results Grid - resultados em modo grade
export const WithResultsGrid = {
    args: {
        searchTerm: 'Latas',
        totalResults: 25,
        donations: mockDonations,
        viewMode: 'grid',
        isLoading: false,
        isWaiting: false,
        hasMoreItems: true,
        itemsPerPage: 6
    }
};

// With Results List - resultados em modo lista
export const WithResultsList = {
    args: {
        searchTerm: 'Latas',
        totalResults: 25,
        donations: mockDonations,
        viewMode: 'list',
        isLoading: false,
        isWaiting: false,
        hasMoreItems: true,
        itemsPerPage: 6
    }
};

// No Results - sem resultados
export const NoResults = {
    args: {
        searchTerm: 'Itens raros',
        totalResults: 0,
        donations: [],
        viewMode: 'grid',
        isLoading: false,
        isWaiting: false,
        hasMoreItems: false,
        itemsPerPage: 6
    }
};

// Interactive - demonstração interativa com controle de estado
export const Interactive = {
    render: (args) => {
        const [viewMode, setViewMode] = useState('grid');
        const [currentPage, setCurrentPage] = useState(1);
        
        const handleViewModeChange = (newMode) => {
            setViewMode(newMode);
        };
        
        const handleLoadMore = (paginationInfo) => {
            setCurrentPage(paginationInfo.page);
            console.log('Load more:', paginationInfo);
        };
        
        return (
            <div className="max-w-6xl space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Demonstração Interativa</h3>
                    <p className="text-sm text-blue-700 mb-2">
                        Teste os diferentes modos de visualização e a funcionalidade de "carregar mais".
                    </p>
                    <p className="text-xs text-blue-600">
                        Página atual: {currentPage} | Modo de visualização: {viewMode}
                    </p>
                </div>
                <SearchPreview
                    {...args}
                    viewMode={viewMode}
                    onViewModeChange={handleViewModeChange}
                    onLoadMore={handleLoadMore}
                    onDonationClick={(donation) => console.log('Clicked donation:', donation)}
                    onDonationActionClick={(donation, action) => console.log('Action clicked:', donation, action)}
                />
            </div>
        );
    },
    args: {
        searchTerm: 'Latas',
        totalResults: 25,
        donations: mockDonations,
        isLoading: false,
        isWaiting: false,
        hasMoreItems: true,
        itemsPerPage: 3
    },
    parameters: {
        docs: {
            description: {
                story: 'Versão interativa que permite testar mudanças de modo de visualização e paginação. Veja o console para logs das ações.'
            }
        }
    }
};
