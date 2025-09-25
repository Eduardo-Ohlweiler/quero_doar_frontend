import HallOfFame from './HallOfFame';
import { useState, useEffect } from 'react';

export default {
  title: 'Components/HallOfFame',
  component: HallOfFame,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente Hall of Fame que exibe os 3 usuários que mais obtiveram experiência no mês, organizados em formato de pódium.'
      }
    }
  },
  argTypes: {
    topUsers: {
      description: 'Array com os dados dos top 3 usuários do mês',
      control: { type: 'object' }
    },
    isLoading: {
      description: 'Indica se os dados estão sendo carregados',
      control: { type: 'boolean' }
    },
    onUserClick: {
      description: 'Callback executado quando um usuário é clicado',
      action: 'user clicked'
    },
    className: {
      description: 'Classes CSS adicionais',
      control: { type: 'text' }
    }
  }
};

// Dados mock para as stories
const mockTopUsers = [
  {
    userId: 1,
    name: "Maria Silva",
    photo: "https://i.pravatar.cc/150?u=1",
    level: 15,
    location: "São Paulo, SP",
    donationMonth: 47,
    expMonth: 2350
  },
  {
    userId: 2,
    name: "João Santos",
    photo: "https://i.pravatar.cc/150?u=2",
    level: 12,
    location: "Rio de Janeiro, RJ",
    donationMonth: 35,
    expMonth: 1980
  },
  {
    userId: 3,
    name: "Ana Costa",
    photo: "https://i.pravatar.cc/150?u=3",
    level: 10,
    location: "Belo Horizonte, MG",
    donationMonth: 28,
    expMonth: 1650
  }
];

export const Default = {
  args: {
    topUsers: mockTopUsers,
    isLoading: false
  }
};

export const Loading = {
  args: {
    topUsers: [],
    isLoading: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Estado de carregamento do Hall of Fame com skeletons.'
      }
    }
  }
};

export const WithCallback = {
  args: {
    topUsers: mockTopUsers,
    onUserClick: (user) => {
      console.log('User clicked:', user);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Hall of Fame com callback de clique nos usuários.'
      }
    }
  }
};

export const OnlyTwoUsers = {
  args: {
    topUsers: mockTopUsers.slice(0, 2)
  },
  parameters: {
    docs: {
      description: {
        story: 'Hall of Fame com apenas 2 usuários.'
      }
    }
  }
};

export const OnlyOneUser = {
  args: {
    topUsers: mockTopUsers.slice(0, 1)
  },
  parameters: {
    docs: {
      description: {
        story: 'Hall of Fame com apenas 1 usuário.'
      }
    }
  }
};

export const EmptyList = {
  args: {
    topUsers: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Hall of Fame com lista vazia de usuários.'
      }
    }
  }
};

export const WithLongNames = {
  args: {
    topUsers: [
      {
        userId: 1,
        name: "Maria Aparecida da Silva Santos",
        photo: "https://i.pravatar.cc/150?u=1",
        level: 15,
        location: "São Bernardo do Campo, SP",
        donationMonth: 47,
        expMonth: 2350
      },
      {
        userId: 2,
        name: "João Pedro dos Santos Oliveira",
        photo: "https://i.pravatar.cc/150?u=2",
        level: 12,
        location: "Duque de Caxias, RJ",
        donationMonth: 35,
        expMonth: 1980
      },
      {
        userId: 3,
        name: "Ana Beatriz Costa e Silva",
        photo: "https://i.pravatar.cc/150?u=3",
        level: 10,
        location: "Contagem, MG",
        donationMonth: 28,
        expMonth: 1650
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Hall of Fame com nomes e localizações longas para testar truncamento.'
      }
    }
  }
};

export const HighNumbers = {
  args: {
    topUsers: [
      {
        userId: 1,
        name: "Maria Silva",
        photo: "https://i.pravatar.cc/150?u=1",
        level: 99,
        location: "São Paulo, SP",
        donationMonth: 150,
        expMonth: 25000
      },
      {
        userId: 2,
        name: "João Santos",
        photo: "https://i.pravatar.cc/150?u=2",
        level: 87,
        location: "Rio de Janeiro, RJ",
        donationMonth: 120,
        expMonth: 18500
      },
      {
        userId: 3,
        name: "Ana Costa",
        photo: "https://i.pravatar.cc/150?u=3",
        level: 75,
        location: "Belo Horizonte, MG",
        donationMonth: 98,
        expMonth: 15200
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Hall of Fame com números altos para testar formatação.'
      }
    }
  }
};

export const Interactive = {
  args: {
    topUsers: mockTopUsers
  },
  parameters: {
    docs: {
      description: {
        story: 'Hall of Fame interativo - clique nos usuários para ver a ação.'
      }
    }
  }
};

// Story interativa com simulação de carregamento
export const LoadingSimulation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simula carregamento de 3 segundos
    const timer = setTimeout(() => {
      setUsers(mockTopUsers);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleReload = () => {
    setIsLoading(true);
    setUsers([]);
    
    setTimeout(() => {
      setUsers(mockTopUsers);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={handleReload}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-80 transition-opacity"
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Simular Carregamento'}
        </button>
      </div>
      
      <HallOfFame 
        topUsers={users}
        isLoading={isLoading}
        onUserClick={(user) => console.log('User clicked:', user)}
      />
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">💡 Como funciona</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Durante o carregamento: Exibe skeletons animados</li>
          <li>• Após carregar: Mostra os dados reais dos usuários</li>
          <li>• Transição suave entre estados</li>
          <li>• Mantém a estrutura visual consistente</li>
        </ul>
      </div>
    </div>
  );
};
