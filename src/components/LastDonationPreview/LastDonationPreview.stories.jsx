import LastDonationPreview from './LastDonationPreview';

// Mock data baseado no exemplo fornecido
const mockData = {
  cityName: "Porto Alegre",
  listDonationPreviewDto: [
    {
      donationId: 58,
      title: "Roupas Infantis (2-4 anos)",
      description: "Lote com 15 peças de roupas infantis em ótimo estado. Inclui camisetas, calças e vestidos.",
      photo: "https://picsum.photos/400/300?random=1",
      isDonation: true,
      isPublic: true,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T14:53:36.039887Z",
      userMinimal: {
        userId: 8,
        name: "Maria Silva",
        photo: null
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 45,
      title: "Mesa de Estudos com Cadeira",
      description: "Mesa de estudos em madeira com cadeira. Ideal para estudantes. Retirada até sexta-feira.",
      photo: "https://picsum.photos/400/300?random=2",
      isDonation: false,
      isPublic: false,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T14:33:36.944033Z",
      userMinimal: {
        userId: 2,
        name: "Carlos Oliveira",
        photo: "https://picsum.photos/50/50?random=10"
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 49,
      title: "Coleção de Livros Didáticos",
      description: "50 livros doados do ensino médio. Matemática, português, história e ciências. Bom estado.",
      photo: "https://picsum.photos/400/300?random=3",
      isDonation: true,
      isPublic: true,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T14:00:22.254262Z",
      userMinimal: {
        userId: 2,
        name: "Ana Costa",
        photo: "https://picsum.photos/50/50?random=11"
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 32,
      title: "Notebook para Estudos",
      description: "Notebook Dell usado mas funcionando perfeitamente. Ideal para estudos e trabalho básico.",
      photo: "https://picsum.photos/400/300?random=4",
      isDonation: false,
      isPublic: false,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T13:57:46.579654Z",
      userMinimal: {
        userId: 1,
        name: "Pedro Lima",
        photo: "https://picsum.photos/50/50?random=12"
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 54,
      title: "Brinquedos Educativos",
      description: "Lote com jogos educativos, quebra-cabeças e brinquedos pedagógicos para crianças de 3 a 8 anos.",
      photo: "https://picsum.photos/400/300?random=5",
      isDonation: false,
      isPublic: false,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T13:40:40.972551Z",
      userMinimal: {
        userId: 8,
        name: "Lucia Santos",
        photo: null
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 47,
      title: "Kit Utensílios de Cozinha",
      description: "Panelas, pratos, copos e utensílios diversos. Perfeito para quem está montando a casa.",
      photo: "https://picsum.photos/400/300?random=6",
      isDonation: true,
      isPublic: false,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T13:39:58.473305Z",
      userMinimal: {
        userId: 2,
        name: "Roberto Silva",
        photo: "https://picsum.photos/50/50?random=13"
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 31,
      title: "Móveis de Quarto",
      description: "Cama de casal, guarda-roupa e cômoda em bom estado. Retirada por conta do interessado.",
      photo: "https://picsum.photos/400/300?random=7",
      isDonation: true,
      isPublic: true,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T13:36:29.985942Z",
      userMinimal: {
        userId: 2,
        name: "Eduardo Rodrigo",
        photo: "https://picsum.photos/50/50?random=14"
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 56,
      title: "Equipamentos de Informática",
      description: "Monitor, teclado, mouse e impressora. Funcionando bem, apenas precisam de manutenção básica.",
      photo: "https://picsum.photos/400/300?random=8",
      isDonation: true,
      isPublic: false,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T13:16:16.35213Z",
      userMinimal: {
        userId: 2,
        name: "Eduardo Rodrigo",
        photo: "https://picsum.photos/50/50?random=15"
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 35,
      title: "Eletrodomésticos Pequenos",
      description: "Liquidificador, torradeira e cafeteira em perfeito funcionamento. Entrega no local.",
      photo: "https://picsum.photos/400/300?random=9",
      isDonation: true,
      isPublic: false,
      location: "Porto Alegre (RS)",
      date: "2025-09-21T13:04:57.964877Z",
      userMinimal: {
        userId: 2,
        name: "Eduardo Rodrigo",
        photo: "https://picsum.photos/50/50?random=16"
      },
      status: "D",
      distanceKm: 0
    },
    {
      donationId: 33,
      title: "Material Escolar Completo",
      description: "Mochilas, cadernos, lápis e materiais escolares para estudantes do ensino fundamental.",
      photo: "https://picsum.photos/400/300?random=10",
      isDonation: true,
      isPublic: false,
      location: "Alvorada (RS)",
      date: "2025-09-21T15:03:52.13541Z",
      userMinimal: {
        userId: 8,
        name: "Kauê dos Santos Gomes",
        photo: null
      },
      status: "D",
      distanceKm: 12.915708823476232
    },
    {
      donationId: 50,
      title: "Bicicleta Infantil",
      description: "Bicicleta aro 16 em bom estado, ideal para crianças de 5 a 8 anos. Inclui capacete.",
      photo: "https://picsum.photos/400/300?random=11",
      isDonation: true,
      isPublic: true,
      location: "Alvorada (RS)",
      date: "2025-09-21T14:55:05.788956Z",
      userMinimal: {
        userId: 2,
        name: "Eduardo Rodrigo",
        photo: "https://picsum.photos/50/50?random=17"
      },
      status: "D",
      distanceKm: 12.915708823476232
    },
    {
      donationId: 34,
      title: "Instrumentos Musicais",
      description: "Violão usado e flauta doce. Perfeitos para quem está começando a aprender música.",
      photo: "https://picsum.photos/400/300?random=12",
      isDonation: true,
      isPublic: true,
      location: "Alvorada (RS)",
      date: "2025-09-21T14:48:29.767707Z",
      userMinimal: {
        userId: 8,
        name: "Kauê dos Santos Gomes",
        photo: null
      },
      status: "D",
      distanceKm: 12.915708823476232
    }
  ]
};

const emptyData = {
  cityName: "São Paulo",
  listDonationPreviewDto: []
};

const smallData = {
  cityName: "Rio de Janeiro",
  listDonationPreviewDto: mockData.listDonationPreviewDto.slice(0, 3)
};

const noLocationData = {
  cityName: "",
  listDonationPreviewDto: mockData.listDonationPreviewDto.slice(0, 4)
};

export default {
  title: 'Components/LastDonationPreview',
  component: LastDonationPreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Componente que exibe doações recentes na região do usuário com funcionalidade de paginação.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Dados das doações contendo cityName e listDonationPreviewDto',
      control: { type: 'object' }
    },
    itemsPerPage: {
      description: 'Número de itens por página (padrão: 6)',
      control: { type: 'number' }
    },
    onDonationClick: {
      description: 'Função chamada quando uma doação é clicada',
      action: 'donation-clicked'
    },
    onDonationActionClick: {
      description: 'Função chamada quando o botão de ação de uma doação é clicado',
      action: 'donation-action-clicked'
    },
    onLoadMore: {
      description: 'Função chamada quando o botão "Ver mais" é clicado',
      action: 'load-more-clicked'
    }
  }
};

// Story principal com dados completos
export const Default = {
  args: {
    data: mockData,
    itemsPerPage: 6,
    onDonationClick: (donation) => console.log('Doação clicada:', donation),
    onDonationActionClick: (donation, action) => console.log('Ação na doação:', { donation, action }),
    onLoadMore: (paginationInfo) => console.log('Carregar mais:', paginationInfo)
  }
};

// Story com poucos itens (sem botão "Ver mais")
export const SmallDataset = {
  args: {
    data: smallData,
    itemsPerPage: 6,
    onDonationClick: (donation) => console.log('Doação clicada:', donation),
    onDonationActionClick: (donation, action) => console.log('Ação na doação:', { donation, action }),
    onLoadMore: (paginationInfo) => console.log('Carregar mais:', paginationInfo)
  }
};

// Story com itens por página personalizados
export const CustomItemsPerPage = {
  args: {
    data: mockData,
    itemsPerPage: 3,
    onDonationClick: (donation) => console.log('Doação clicada:', donation),
    onDonationActionClick: (donation, action) => console.log('Ação na doação:', { donation, action }),
    onLoadMore: (paginationInfo) => console.log('Carregar mais:', paginationInfo)
  }
};

// Story sem localização detectada
export const NoLocation = {
  args: {
    data: noLocationData,
    itemsPerPage: 6,
    onDonationClick: (donation) => console.log('Doação clicada:', donation),
    onDonationActionClick: (donation, action) => console.log('Ação na doação:', { donation, action }),
    onLoadMore: (paginationInfo) => console.log('Carregar mais:', paginationInfo)
  }
};

// Story vazia
export const Empty = {
  args: {
    data: emptyData,
    itemsPerPage: 6,
    onDonationClick: (donation) => console.log('Doação clicada:', donation),
    onDonationActionClick: (donation, action) => console.log('Ação na doação:', { donation, action }),
    onLoadMore: (paginationInfo) => console.log('Carregar mais:', paginationInfo)
  }
};

// Story sem dados
export const NoData = {
  args: {
    data: null,
    itemsPerPage: 6,
    onDonationClick: (donation) => console.log('Doação clicada:', donation),
    onDonationActionClick: (donation, action) => console.log('Ação na doação:', { donation, action }),
    onLoadMore: (paginationInfo) => console.log('Carregar mais:', paginationInfo)
  }
};
