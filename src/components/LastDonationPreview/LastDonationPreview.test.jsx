import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LastDonationPreview from './LastDonationPreview';

// Mock dos componentes dependentes
vi.mock('../DonationPreview/DonationPreview', () => ({
  default: ({ donation, onClick, onActionClick, isDonation, isPublic }) => (
    <div 
      data-testid={`donation-${donation.donationId}`}
      onClick={() => onClick?.(donation)}
    >
      <h3>{donation.title}</h3>
      <p>{donation.description}</p>
      <span>{isDonation ? 'Doação' : 'Solicitação'}</span>
      <span>{isPublic ? 'Público' : 'Privado'}</span>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onActionClick?.(donation, 'action');
        }}
      >
        Ação
      </button>
    </div>
  )
}));

vi.mock('../Button/Button', () => ({
  default: ({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  )
}));

// Mock data para testes
const mockData = {
  cityName: "Porto Alegre",
  listDonationPreviewDto: [
    {
      donationId: 1,
      title: "Roupas Infantis",
      description: "Lote de roupas infantis",
      photo: "photo1.jpg",
      isDonation: true,
      isPublic: true,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T14:53:36.039887Z",
      userMinimal: {
        userId: 1,
        name: "Maria Silva",
        photo: null
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 2,
      title: "Mesa de Estudos",
      description: "Mesa em bom estado",
      photo: "photo2.jpg",
      isDonation: false,
      isPublic: false,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T14:33:36.944033Z",
      userMinimal: {
        userId: 2,
        name: "João Santos",
        photo: "avatar.jpg"
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 3,
      title: "Livros Didáticos",
      description: "Coleção de livros",
      photo: "photo3.jpg",
      isDonation: true,
      isPublic: true,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T14:00:22.254262Z",
      userMinimal: {
        userId: 3,
        name: "Ana Costa",
        photo: null
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 4,
      title: "Notebook",
      description: "Notebook usado",
      photo: "photo4.jpg",
      isDonation: false,
      isPublic: true,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T13:57:46.579654Z",
      userMinimal: {
        userId: 4,
        name: "Pedro Lima",
        photo: "avatar2.jpg"
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 5,
      title: "Brinquedos",
      description: "Brinquedos educativos",
      photo: "photo5.jpg",
      isDonation: true,
      isPublic: false,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T13:40:40.972551Z",
      userMinimal: {
        userId: 5,
        name: "Lucia Santos",
        photo: null
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 6,
      title: "Utensílios de Cozinha",
      description: "Kit completo",
      photo: "photo6.jpg",
      isDonation: true,
      isPublic: true,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T13:39:58.473305Z",
      userMinimal: {
        userId: 6,
        name: "Roberto Silva",
        photo: "avatar3.jpg"
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 7,
      title: "Móveis de Quarto",
      description: "Cama e guarda-roupa",
      photo: "photo7.jpg",
      isDonation: true,
      isPublic: true,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T13:36:29.985942Z",
      userMinimal: {
        userId: 7,
        name: "Carlos Oliveira",
        photo: null
      },
      status: "D",
      distanceKm: 0
    }
  ]
};

describe('LastDonationPreview', () => {
  const mockOnDonationClick = vi.fn();
  const mockOnDonationActionClick = vi.fn();
  const mockOnLoadMore = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar com título e localização quando cityName está presente', () => {
    render(
      <LastDonationPreview
        data={mockData}
        onDonationClick={mockOnDonationClick}
        onDonationActionClick={mockOnDonationActionClick}
        onLoadMore={mockOnLoadMore}
      />
    );

    // Verifica o título principal
    expect(screen.getByText('🔗 Doações Recentes na Sua Região')).toBeInTheDocument();
    
    // Verifica a localização
    expect(screen.getByText(/Baseado na sua localização: Porto Alegre/)).toBeInTheDocument();
    
    // Verifica se renderiza apenas 6 itens inicialmente (padrão)
    expect(screen.getByTestId('donation-1')).toBeInTheDocument();
    expect(screen.getByTestId('donation-6')).toBeInTheDocument();
    expect(screen.queryByTestId('donation-7')).not.toBeInTheDocument();
    
    // Verifica se o botão "Ver mais" está presente
    expect(screen.getByText('+ Ver mais doações')).toBeInTheDocument();
  });

  it('deve renderizar com título simples quando cityName está vazio', () => {
    const dataWithoutCity = {
      cityName: "",
      listDonationPreviewDto: mockData.listDonationPreviewDto
    };

    render(
      <LastDonationPreview
        data={dataWithoutCity}
        onDonationClick={mockOnDonationClick}
        onDonationActionClick={mockOnDonationActionClick}
        onLoadMore={mockOnLoadMore}
      />
    );

    // Verifica o título simplificado
    expect(screen.getByText('🔗 Doações Recentes')).toBeInTheDocument();
    
    // Não deve mostrar a localização
    expect(screen.queryByText(/Baseado na sua localização/)).not.toBeInTheDocument();
    
    // Verifica se renderiza normalmente os itens
    expect(screen.getByTestId('donation-1')).toBeInTheDocument();
    expect(screen.getByTestId('donation-6')).toBeInTheDocument();
    expect(screen.queryByTestId('donation-7')).not.toBeInTheDocument();
  });

  it('deve renderizar com título simples quando cityName é apenas espaços em branco', () => {
    const dataWithEmptyCity = {
      cityName: "   ",
      listDonationPreviewDto: mockData.listDonationPreviewDto
    };

    render(
      <LastDonationPreview
        data={dataWithEmptyCity}
        onDonationClick={mockOnDonationClick}
        onDonationActionClick={mockOnDonationActionClick}
        onLoadMore={mockOnLoadMore}
      />
    );

    // Verifica o título simplificado
    expect(screen.getByText('🔗 Doações Recentes')).toBeInTheDocument();
    
    // Não deve mostrar a localização
    expect(screen.queryByText(/Baseado na sua localização/)).not.toBeInTheDocument();
  });

  it('deve renderizar com itemsPerPage customizado', () => {
    render(
      <LastDonationPreview
        data={mockData}
        itemsPerPage={3}
        onDonationClick={mockOnDonationClick}
        onDonationActionClick={mockOnDonationActionClick}
        onLoadMore={mockOnLoadMore}
      />
    );

    // Verifica se renderiza apenas 3 itens
    expect(screen.getByTestId('donation-1')).toBeInTheDocument();
    expect(screen.getByTestId('donation-3')).toBeInTheDocument();
    expect(screen.queryByTestId('donation-4')).not.toBeInTheDocument();
    
    // Verifica se o botão "Ver mais" está presente
    expect(screen.getByText('+ Ver mais doações')).toBeInTheDocument();
  });

  it('deve carregar mais itens quando o botão "Ver mais" é clicado', async () => {
    render(
      <LastDonationPreview
        data={mockData}
        itemsPerPage={3}
        onDonationClick={mockOnDonationClick}
        onDonationActionClick={mockOnDonationActionClick}
        onLoadMore={mockOnLoadMore}
      />
    );

    // Inicialmente apenas 3 itens
    expect(screen.getByTestId('donation-1')).toBeInTheDocument();
    expect(screen.queryByTestId('donation-4')).not.toBeInTheDocument();

    // Clica no botão "Ver mais"
    fireEvent.click(screen.getByText('+ Ver mais doações'));

    // Verifica se a função onLoadMore foi chamada
    expect(mockOnLoadMore).toHaveBeenCalledWith({
      page: 2,
      itemsPerPage: 3,
      totalItems: 7,
      newItemsToShow: 6
    });

    // Agora devem aparecer 6 itens
    await waitFor(() => {
      expect(screen.getByTestId('donation-4')).toBeInTheDocument();
      expect(screen.getByTestId('donation-6')).toBeInTheDocument();
      expect(screen.queryByTestId('donation-7')).not.toBeInTheDocument();
    });
  });

  it('deve sempre mostrar o botão "Ver mais" mesmo quando todos os itens estão visíveis', () => {
    render(
      <LastDonationPreview
        data={mockData}
        itemsPerPage={10} // Mais que o total de itens
        onDonationClick={mockOnDonationClick}
        onDonationActionClick={mockOnDonationActionClick}
        onLoadMore={mockOnLoadMore}
      />
    );

    // Todos os 7 itens devem estar visíveis
    expect(screen.getByTestId('donation-1')).toBeInTheDocument();
    expect(screen.getByTestId('donation-7')).toBeInTheDocument();
    
    // Deve mostrar o botão "Ver mais" para navegar para todas as doações
    expect(screen.getByText('+ Ver mais doações')).toBeInTheDocument();
  });

  it('deve chamar onDonationClick quando uma doação é clicada', () => {
    render(
      <LastDonationPreview
        data={mockData}
        onDonationClick={mockOnDonationClick}
        onDonationActionClick={mockOnDonationActionClick}
        onLoadMore={mockOnLoadMore}
      />
    );

    fireEvent.click(screen.getByTestId('donation-1'));

    expect(mockOnDonationClick).toHaveBeenCalledWith(mockData.listDonationPreviewDto[0]);
  });

  it('deve chamar onDonationActionClick quando o botão de ação é clicado', () => {
    render(
      <LastDonationPreview
        data={mockData}
        onDonationClick={mockOnDonationClick}
        onDonationActionClick={mockOnDonationActionClick}
        onLoadMore={mockOnLoadMore}
      />
    );

    const actionButton = screen.getAllByText('Ação')[0];
    fireEvent.click(actionButton);

    expect(mockOnDonationActionClick).toHaveBeenCalledWith(mockData.listDonationPreviewDto[0], 'action');
  });

  it('não deve renderizar nada quando data é null', () => {
    const { container } = render(
      <LastDonationPreview
        data={null}
        onDonationClick={mockOnDonationClick}
        onDonationActionClick={mockOnDonationActionClick}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('não deve renderizar nada quando listDonationPreviewDto está vazio', () => {
    const emptyData = {
      cityName: "São Paulo",
      listDonationPreviewDto: []
    };

    const { container } = render(
      <LastDonationPreview
        data={emptyData}
        onDonationClick={mockOnDonationClick}
        onDonationActionClick={mockOnDonationActionClick}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('deve converter corretamente os dados das doações', () => {
    render(
      <LastDonationPreview
        data={mockData}
        onDonationClick={mockOnDonationClick}
        onDonationActionClick={mockOnDonationActionClick}
        onLoadMore={mockOnLoadMore}
      />
    );

    // Verifica se os dados foram convertidos corretamente
    expect(screen.getByText('Roupas Infantis')).toBeInTheDocument();
    expect(screen.getByText('Lote de roupas infantis')).toBeInTheDocument();
  });

  it('deve aplicar className customizada', () => {
    const { container } = render(
      <LastDonationPreview
        data={mockData}
        className="custom-class"
        onDonationClick={mockOnDonationClick}
        onDonationActionClick={mockOnDonationActionClick}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
