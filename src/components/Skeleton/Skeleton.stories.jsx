import React from 'react';
import Skeleton from './Skeleton';
import SkeletonExample from './SkeletonExample';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente de Skeleton Loading para melhorar a experiência do usuário durante carregamento de dados.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['rectangular', 'circular', 'text'],
      description: 'Variante do formato do skeleton',
    },
    width: {
      control: { type: 'select' },
      options: ['full', 'auto', '16', '24', '32', '48', '64', '80', '96'],
      description: 'Largura do skeleton',
    },
    height: {
      control: { type: 'select' },
      options: ['2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32'],
      description: 'Altura do skeleton',
    },
    rounded: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Arredondamento das bordas',
    },
    className: {
      control: { type: 'text' },
      description: 'Classes CSS customizadas',
    },
  },
};

export const Default = {
  args: {
    variant: 'rectangular',
    width: 'full',
    height: '4',
    rounded: 'md',
  },
};

export const Variants = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Rectangular</h3>
      <Skeleton variant="rectangular" width="full" height="4" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Circular</h3>
      <Skeleton variant="circular" width="16" height="16" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Text</h3>
      <div className="space-y-2">
        <Skeleton variant="text" width="full" height="4" />
        <Skeleton variant="text" width="80" height="4" />
        <Skeleton variant="text" width="64" height="4" />
      </div>
    </div>
  </div>
);

export const Sizes = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Diferentes larguras</h3>
      <div className="space-y-2">
        <Skeleton width="16" height="4" />
        <Skeleton width="32" height="4" />
        <Skeleton width="48" height="4" />
        <Skeleton width="full" height="4" />
      </div>
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Diferentes alturas</h3>
      <div className="flex items-end space-x-2">
        <Skeleton width="16" height="2" />
        <Skeleton width="16" height="4" />
        <Skeleton width="16" height="8" />
        <Skeleton width="16" height="16" />
      </div>
    </div>
  </div>
);

export const CardExample = () => (
  <div className="max-w-sm bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton variant="circular" width="16" height="16" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="32" height="4" />
        <Skeleton variant="text" width="24" height="3" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" width="full" height="4" />
      <Skeleton variant="text" width="80" height="4" />
      <Skeleton variant="text" width="64" height="4" />
    </div>
    <div className="mt-4">
      <Skeleton width="32" height="10" rounded="lg" />
    </div>
  </div>
);

export const ListExample = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((item) => (
      <div key={item} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
        <Skeleton variant="circular" width="12" height="12" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="48" height="4" />
          <Skeleton variant="text" width="32" height="3" />
        </div>
        <Skeleton width="20" height="8" rounded="md" />
      </div>
    ))}
  </div>
);

export const ProfileExample = () => (
  <div className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-sm">
    <Skeleton variant="circular" width="20" height="20" />
    <div className="flex-1">
      <div className="space-y-2">
        <Skeleton variant="text" width="48" height="5" />
        <Skeleton variant="text" width="32" height="4" />
      </div>
      <div className="mt-4 space-y-1">
        <Skeleton variant="text" width="full" height="3" />
        <Skeleton variant="text" width="80" height="3" />
      </div>
    </div>
  </div>
);

export const InteractiveExample = () => <SkeletonExample />;