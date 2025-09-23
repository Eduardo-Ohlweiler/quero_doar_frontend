import React from 'react';
import UserMenu from './UserMenu';
import { AuthProvider } from '../../context/AuthContext.jsx';

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
  // Wrap stories with AuthProvider so components using useAuth don't throw
  decorators: [(Story) => <AuthProvider><Story/></AuthProvider>],
  argTypes: {
    user: {
      control: { type: 'object' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    appearance: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
    },
    showUserName: {
      control: { type: 'boolean' },
    },
    onProfile: { action: 'profile clicked' },
    onDonations: { action: 'donations clicked' },
    onLogout: { action: 'logout clicked' },
    onAdmin: { action: 'admin clicked' },
  },
};

// Usuários de exemplo
const defaultUser = {
  name: 'Maria Silva',
  photo: null,
  isAdmin: false,
};

const adminUser = {
  name: 'João Santos',
  photo: null,
  isAdmin: true,
};

const userWithAvatar = {
  name: 'Ana Costa',
  photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  isAdmin: false,
};

const userWithSingleName = {
  name: 'Carlos',
  isAdmin: false,
};

export const Default = {
  args: {
    user: defaultUser,
    size: 'medium',
    appearance: 'secondary',
    showUserName: true,
  },
};

export const Sizes = () => (
  <div className="flex flex-col gap-6 items-center p-8">
    <div className="text-white text-lg font-semibold mb-4">
      Tamanhos do UserMenu
    </div>
    
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Small</span>
        <UserMenu user={defaultUser} size="small" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Medium</span>
        <UserMenu user={defaultUser} size="medium" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Large</span>
        <UserMenu user={defaultUser} size="large" />
      </div>
    </div>
  </div>
);

export const Appearances = () => (
  <div className="flex flex-col gap-6 items-center p-8">
    <div className="text-white text-lg font-semibold mb-4">
      Aparências do UserMenu
    </div>
    
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Primary</span>
        <UserMenu user={defaultUser} appearance="primary" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Secondary</span>
        <UserMenu user={defaultUser} appearance="secondary" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Ghost</span>
        <UserMenu user={defaultUser} appearance="ghost" />
      </div>
    </div>
  </div>
);

export const WithUserAvatar = () => (
  <div className="flex flex-col gap-6 items-center p-8">
    <div className="text-white text-lg font-semibold mb-4">
      UserMenu com diferentes configurações de UserAvatar
    </div>
    
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Avatar com Frame</span>
        <UserMenu 
          user={userWithAvatar} 
          avatarProps={{ frame: true }}
        />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Avatar com Nível</span>
        <UserMenu 
          user={userWithAvatar} 
          avatarProps={{ showLevel: true, level: "10" }}
        />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Avatar com Frame e Nível</span>
        <UserMenu 
          user={userWithAvatar} 
          avatarProps={{ frame: true, showLevel: true, level: "25" }}
        />
      </div>
    </div>
  </div>
);

export const WithoutUserName = () => (
  <div className="flex flex-col gap-6 items-center p-8">
    <div className="text-white text-lg font-semibold mb-4">
      UserMenu sem nome do usuário
    </div>
    
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Com nome</span>
        <UserMenu user={userWithAvatar} showUserName={true} />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Sem nome</span>
        <UserMenu user={userWithAvatar} showUserName={false} />
      </div>
    </div>
  </div>
);

export const WithAdminAccess = {
  args: {
    user: adminUser,
    appearance: 'primary',
  },
};

export const AllVariants = () => (
  <div className="flex flex-col gap-8 items-center p-8">
    <div className="text-white text-lg font-semibold mb-4">
      Todas as Variações do UserMenu
    </div>
    
    <div className="grid grid-cols-2 gap-8">
      {/* Usuário padrão */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm text-center">Usuário padrão</span>
        <UserMenu user={defaultUser} />
      </div>
      
      {/* Usuário administrador */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm text-center">Usuário administrador</span>
        <UserMenu user={adminUser} appearance="primary" />
      </div>
      
      {/* Usuário com avatar */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm text-center">Usuário com avatar</span>
        <UserMenu user={userWithAvatar} />
      </div>
      
      {/* Usuário com nome único */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm text-center">Usuário com nome único</span>
        <UserMenu user={userWithSingleName} appearance="ghost" />
      </div>
      
      {/* Usuário com todas as features */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm text-center">Todas as features</span>
        <UserMenu 
          user={userWithAvatar} 
          size="large"
          appearance="primary"
          avatarProps={{ frame: true, showLevel: true, level: "99" }}
        />
      </div>
      
      {/* Usuário compacto */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm text-center">Compacto</span>
        <UserMenu 
          user={userWithAvatar} 
          size="small"
          showUserName={false}
          avatarProps={{ showLevel: true, level: "5" }}
        />
      </div>
    </div>
  </div>
);

export const Interactive = {
  args: {
    user: userWithAvatar,
    size: 'medium',
    appearance: 'secondary',
    showUserName: true,
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
