import React from 'react';
import TopExperienceUser from './TopExperienceUser';

export default {
  title: 'Components/TopExperienceUser',
  component: TopExperienceUser,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#333333' },
        { name: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    rank: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Posição do usuário no ranking (opcional - determina automaticamente a variante). Se não informado, não exibe o badge de ranking.',
    },
    onClick: {
      action: 'user-clicked',
      description: 'Função chamada ao clicar no usuário',
    },
  },
};

// Dados de usuários de exemplo
const mockUsers = {
  first: {
    userId: 14792,
    name: "Maria Silva",
    photo: "https://i.pravatar.cc/150?u=14792",
    level: 23,
    location: "São Paulo, SP",
    donationMonth: 47,
    expMonth: 2350
  },
  second: {
    userId: 14793,
    name: "João Santos",
    photo: "https://i.pravatar.cc/150?u=14793",
    level: 19,
    location: "Rio de Janeiro, RJ",
    donationMonth: 35,
    expMonth: 1980
  },
  third: {
    userId: 14794,
    name: "Ana Costa",
    photo: "https://i.pravatar.cc/150?u=14794",
    level: 16,
    location: "Belo Horizonte, MG",
    donationMonth: 28,
    expMonth: 1650
  },
  regular: {
    userId: 14795,
    name: "Carlos Oliveira",
    photo: "https://i.pravatar.cc/150?u=14795",
    level: 8,
    location: "Salvador, BA",
    donationMonth: 15,
    expMonth: 890
  }
};

// Story padrão - 1º lugar
export const FirstPlace = {
  args: {
    user: mockUsers.first,
    rank: 1,
  },
};

// 2º lugar
export const SecondPlace = {
  args: {
    user: mockUsers.second,
    rank: 2,
  },
};

// 3º lugar
export const ThirdPlace = {
  args: {
    user: mockUsers.third,
    rank: 3,
  },
};

// Colocação regular
export const RegularRank = {
  args: {
    user: mockUsers.regular,
    rank: 15,
  },
};

// Sem ranking - apenas informações do usuário
export const WithoutRank = {
  args: {
    user: mockUsers.first,
    // rank não é passado
  },
};

// Pódio completo
export const PodiumComplete = {
  render: (args) => (
    <div className="flex flex-wrap gap-6 justify-center max-w-6xl">
      <div className="w-full max-w-xs">
        <TopExperienceUser
          user={mockUsers.first}
          rank={1}
          onClick={args.onClick}
        />
      </div>
      <div className="w-full max-w-xs">
        <TopExperienceUser
          user={mockUsers.second}
          rank={2}
          onClick={args.onClick}
        />
      </div>
      <div className="w-full max-w-xs">
        <TopExperienceUser
          user={mockUsers.third}
          rank={3}
          onClick={args.onClick}
        />
      </div>
    </div>
  ),
  args: {
    onClick: (user) => console.log('Usuário clicado:', user),
  },
  parameters: {
    layout: 'centered',
  },
};

// Grid com múltiplas colocações
export const RankingGrid = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
      <TopExperienceUser
        user={mockUsers.first}
        rank={1}
        onClick={args.onClick}
      />
      <TopExperienceUser
        user={mockUsers.second}
        rank={2}
        onClick={args.onClick}
      />
      <TopExperienceUser
        user={mockUsers.third}
        rank={3}
        onClick={args.onClick}
      />
      <TopExperienceUser
        user={mockUsers.regular}
        rank={4}
        onClick={args.onClick}
      />
      <TopExperienceUser
        user={{...mockUsers.regular, userId: 14796, name: "Lucia Fernandes"}}
        rank={5}
        onClick={args.onClick}
      />
      <TopExperienceUser
        user={{...mockUsers.regular, userId: 14797, name: "Pedro Almeida"}}
        rank={6}
        onClick={args.onClick}
      />
      <TopExperienceUser
        user={{...mockUsers.regular, userId: 14798, name: "Sofia Lima"}}
        rank={7}
        onClick={args.onClick}
      />
      <TopExperienceUser
        user={{...mockUsers.regular, userId: 14799, name: "Rafael Torres"}}
        rank={8}
        onClick={args.onClick}
      />
    </div>
  ),
  args: {
    onClick: (user) => console.log('Usuário clicado:', user),
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'gradient',
    },
  },
};

// Grid sem ranking - apenas informações dos usuários
export const UsersWithoutRanking = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
      <TopExperienceUser
        user={mockUsers.first}
        onClick={args.onClick}
      />
      <TopExperienceUser
        user={mockUsers.second}
        onClick={args.onClick}
      />
      <TopExperienceUser
        user={mockUsers.third}
        onClick={args.onClick}
      />
      <TopExperienceUser
        user={mockUsers.regular}
        onClick={args.onClick}
      />
    </div>
  ),
  args: {
    onClick: (user) => console.log('Usuário clicado:', user),
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
  },
};

// Usuário sem foto
export const WithoutPhoto = {
  args: {
    user: {
      userId: 14800,
      name: "Usuário Sem Foto",
      photo: null,
      level: 6,
      location: "Cidade, Estado",
      donationMonth: 12,
      expMonth: 600
    },
    rank: 10,
  },
};

// Nome longo
export const LongName = {
  args: {
    user: {
      userId: 14801,
      name: "Maria Fernanda dos Santos Silva",
      photo: "https://i.pravatar.cc/150?u=14801",
      level: 12,
      location: "São Bernardo do Campo, SP",
      donationMonth: 23,
      expMonth: 1200
    },
    rank: 4,
  },
};

// Números altos
export const HighNumbers = {
  args: {
    user: {
      userId: 14802,
      name: "Super Doador",
      photo: "https://i.pravatar.cc/150?u=14802",
      level: 150,
      location: "Brasília, DF",
      donationMonth: 150,
      expMonth: 15000
    },
    rank: 1,
  },
};

// Interativo
export const Interactive = {
  args: {
    user: mockUsers.first,
    rank: 1,
  },
  parameters: {
    backgrounds: {
      default: 'gradient',
    },
  },
};