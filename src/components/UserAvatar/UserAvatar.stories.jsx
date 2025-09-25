import React from 'react';
import UserAvatar from './UserAvatar';

export default {
  title: 'Components/UserAvatar',
  component: UserAvatar,
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
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge'],
    },
    appearance: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
    },
    frame: {
      control: { type: 'boolean' },
    },
    display: {
      control: { type: 'select' },
      options: ['photo-only', 'photo-with-name', 'name-only'],
    },
    showLevel: {
      control: { type: 'boolean' },
    },
  },
};

// Usuários de exemplo
const defaultUser = {
  userId: 1,
  name: 'Maria Silva',
  photo: null,
  level: 5,
};

const userWithAvatar = {
  userId: 2,
  name: 'Ana Costa',
  photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  level: 10,
};

const userWithSingleName = {
  userId: 3,
  name: 'Carlos',
  level: 3,
};

export const Default = {
  args: {
    user: defaultUser,
    size: 'medium',
    appearance: 'primary',
    frame: false,
    display: 'photo-only',
    showLevel: false,
  },
};

export const Sizes = () => (
  <div className="flex flex-col gap-6 items-center p-8">
    <div className="text-white text-lg font-semibold mb-4">
      Tamanhos do UserAvatar
    </div>
    
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Small</span>
        <UserAvatar user={defaultUser} size="small" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Medium</span>
        <UserAvatar user={defaultUser} size="medium" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Large</span>
        <UserAvatar user={defaultUser} size="large" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">XLarge</span>
        <UserAvatar user={defaultUser} size="xlarge" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">XXLarge</span>
        <UserAvatar user={defaultUser} size="xxlarge" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">XXXLarge</span>
        <UserAvatar user={defaultUser} size="xxxlarge" />
      </div>
    </div>
  </div>
);

export const Appearances = () => (
  <div className="flex flex-col gap-6 items-center p-8">
    <div className="text-white text-lg font-semibold mb-4">
      Aparências do UserAvatar
    </div>
    
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Primary</span>
        <UserAvatar user={defaultUser} appearance="primary" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Secondary</span>
        <UserAvatar user={defaultUser} appearance="secondary" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Ghost</span>
        <UserAvatar user={defaultUser} appearance="ghost" />
      </div>
    </div>
  </div>
);

export const WithFrame = () => (
  <div className="flex flex-col gap-6 items-center p-8">
    <div className="text-white text-lg font-semibold mb-4">
      UserAvatar com Frame
    </div>
    
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Sem Frame</span>
        <UserAvatar user={userWithAvatar} frame={false} />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Com Frame</span>
        <UserAvatar user={userWithAvatar} frame={true} />
      </div>
    </div>
  </div>
);

export const DisplayModes = () => (
  <div className="flex flex-col gap-6 items-center p-8">
    <div className="text-white text-lg font-semibold mb-4">
      Modos de Exibição
    </div>
    
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Apenas Foto</span>
        <UserAvatar user={userWithAvatar} display="photo-only" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Foto com Nome</span>
        <UserAvatar user={userWithAvatar} display="photo-with-name" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Apenas Nome</span>
        <UserAvatar user={userWithAvatar} display="name-only" />
      </div>
    </div>
  </div>
);

export const WithLevel = () => (
  <div className="flex flex-col gap-6 items-center p-8">
    <div className="text-white text-lg font-semibold mb-4">
      UserAvatar com Nível
    </div>
    
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Sem Nível</span>
        <UserAvatar user={userWithAvatar} />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Nível 10</span>
        <UserAvatar user={userWithAvatar} showLevel={true} />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm">Nível 25 com Frame</span>
        <UserAvatar user={userWithAvatar} showLevel={true} frame={true} />
      </div>
    </div>
  </div>
);

export const LargeSizesWithLevel = () => (
  <div className="flex flex-col gap-6 items-center p-8">
    <div className="text-white text-lg font-semibold mb-4">
      Tamanhos Grandes com Indicador de Nível
    </div>
    
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-3">
        <span className="text-white text-sm">XLarge - Nível 15</span>
        <UserAvatar 
          user={{...userWithAvatar, level: 15}} 
          size="xlarge" 
          showLevel={true} 
          frame={true}
        />
      </div>
      
      <div className="flex flex-col items-center gap-3">
        <span className="text-white text-sm">XXLarge - Nível 42</span>
        <UserAvatar 
          user={{...userWithAvatar, level: 42}} 
          size="xxlarge" 
          showLevel={true} 
          frame={true}
        />
      </div>
      
      <div className="flex flex-col items-center gap-3">
        <span className="text-white text-sm">XXXLarge - Nível 99</span>
        <UserAvatar 
          user={{...userWithAvatar, level: 99}} 
          size="xxxlarge" 
          showLevel={true} 
          frame={true}
        />
      </div>
    </div>
  </div>
);

export const AllCombinations = () => (
  <div className="flex flex-col gap-8 items-center p-8">
    <div className="text-white text-lg font-semibold mb-4">
      Todas as Combinações
    </div>
    
    <div className="grid grid-cols-3 gap-8">
      {/* Sem foto, com iniciais */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm text-center">Iniciais + Frame + Nível</span>
        <UserAvatar 
          user={defaultUser} 
          frame={true} 
          showLevel={true} 
          size="large"
        />
      </div>
      
      {/* Com foto */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm text-center">Foto + Frame + Nível</span>
        <UserAvatar 
          user={userWithAvatar} 
          frame={true} 
          showLevel={true} 
          size="large"
        />
      </div>
      
      {/* Com foto e nome */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-white text-sm text-center">Foto + Nome + Nível</span>
        <UserAvatar 
          user={userWithAvatar} 
          display="photo-with-name"
          showLevel={true} 
          size="large"
        />
      </div>
    </div>
  </div>
);

export const Interactive = {
  args: {
    user: userWithAvatar,
    size: 'medium',
    appearance: 'primary',
    frame: false,
    display: 'photo-only',
    showLevel: false,
  },
};