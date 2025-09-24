import HallOfFame from './HallOfFame';

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
    topUsers: mockTopUsers
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
