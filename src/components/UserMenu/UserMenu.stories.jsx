import React from 'react';
import UserMenu from './UserMenu';

export default {
  title: 'Components/UserMenu',
  component: UserMenu,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'gradient',
      values: [
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    user: {
      control: { type: 'object' },
    },
    onProfile: { action: 'profile clicked' },
    onDonations: { action: 'donations clicked' },
    onLogout: { action: 'logout clicked' },
    onAdmin: { action: 'admin clicked' },
  },
};

// Usuário padrão
const defaultUser = {
  firstName: 'Maria',
  lastName: 'Silva',
  avatar: null,
  isAdmin: false,
};

// Usuário administrador
const adminUser = {
  firstName: 'João',
  lastName: 'Santos',
  avatar: null,
  isAdmin: true,
};

// Usuário com avatar
const userWithAvatar = {
  firstName: 'Ana',
  lastName: 'Costa',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  isAdmin: false,
};

// Usuário com nome único
const userWithSingleName = {
  name: 'Carlos',
  isAdmin: false,
};

export const Default = {
  args: {
    user: defaultUser,
  },
};

export const WithAdminAccess = {
  args: {
    user: adminUser,
  },
};

export const WithAvatar = {
  args: {
    user: userWithAvatar,
  },
};

export const WithSingleName = {
  args: {
    user: userWithSingleName,
  },
};

export const AllVariants = () => (
  <div className="flex flex-col gap-8 items-center p-8">
    <div className="text-white text-lg font-semibold mb-4">
      Variações do UserMenu
    </div>
    
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Usuário padrão</span>
        <UserMenu user={defaultUser} />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Usuário administrador</span>
        <UserMenu user={adminUser} />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Usuário com avatar</span>
        <UserMenu user={userWithAvatar} />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Usuário com nome único</span>
        <UserMenu user={userWithSingleName} />
      </div>
    </div>
  </div>
);

export const Interactive = {
  args: {
    user: defaultUser,
  },
  render: (args) => (
    <div className="p-8">
      <div className="text-white text-lg font-semibold mb-4">
        Clique para testar a interação
      </div>
      <UserMenu 
        {...args}
        onProfile={() => alert('Navegando para o perfil')}
        onDonations={() => alert('Navegando para minhas doações')}
        onLogout={() => alert('Fazendo logout')}
        onAdmin={() => alert('Acessando menu administrativo')}
      />
    </div>
  ),
};
