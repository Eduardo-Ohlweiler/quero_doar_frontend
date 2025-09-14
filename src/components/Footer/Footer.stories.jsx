import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

export default {
  title: 'Components/Footer',
  component: Footer,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Footer component with full and minimal variations, different appearances and responsive design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['full', 'minimal'],
      description: 'Variação do footer - completo ou minimalista',
    },
    appearance: {
      control: { type: 'select' },
      options: ['gradient', 'white', 'ghost'],
      description: 'Aparência do footer - gradiente, branco ou transparente',
    },
    className: {
      control: { type: 'text' },
      description: 'Classes CSS adicionais',
    },
  },
};

// Template with context wrapper
const Template = (args) => (
  <div className="min-h-screen flex flex-col">
    <div className="flex-1 bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Conteúdo da Página</h1>
      <p className="mb-4">Este é um exemplo de conteúdo da página para demonstrar o footer.</p>
      <p className="mb-4">Scroll para baixo para ver o footer em ação.</p>
      <div className="h-96 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-600">Área de conteúdo principal</span>
      </div>
    </div>
    <Footer {...args} />
  </div>
);

export const Default = {
  args: {
    variant: 'full',
    appearance: 'gradient',
  },
  render: Template,
};

export const FullFooter = {
  args: {
    variant: 'full',
    appearance: 'gradient',
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'Footer completo com todas as seções: logo, links institucionais, links para doadores, redes sociais e botão voltar ao topo.',
      },
    },
  },
};

export const MinimalFooter = {
  args: {
    variant: 'minimal',
    appearance: 'gradient',
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'Footer minimalista com apenas logo e copyright, ideal para páginas de login, cadastro e erro.',
      },
    },
  },
};

export const Appearances = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-4">Gradient Appearance</h3>
      <Footer variant="full" appearance="gradient" />
    </div>
    
    <div>
      <h3 className="text-lg font-semibold mb-4">White Appearance</h3>
      <Footer variant="full" appearance="white" />
    </div>
    
    <div className="bg-gray-800 p-4 rounded">
      <h3 className="text-lg font-semibold mb-4 text-white">Ghost Appearance (on dark background)</h3>
      <Footer variant="full" appearance="ghost" />
    </div>
  </div>
);

Appearances.parameters = {
  docs: {
    description: {
      story: 'Diferentes aparências do footer: gradient (padrão com gradiente), white (fundo branco) e ghost (transparente desfocado).',
    },
  },
};

export const Variants = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-4">Full Footer</h3>
      <Footer variant="full" appearance="gradient" />
    </div>
    
    <div>
      <h3 className="text-lg font-semibold mb-4">Minimal Footer</h3>
      <Footer variant="minimal" appearance="gradient" />
    </div>
  </div>
);

Variants.parameters = {
  docs: {
    description: {
      story: 'Comparação entre as duas variações do footer: full (completo) e minimal (minimalista).',
    },
  },
};

export const ResponsiveDemo = {
  args: {
    variant: 'full',
    appearance: 'gradient',
  },
  render: Template,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Demonstração da responsividade do footer em diferentes tamanhos de tela. Teste redimensionando a viewport.',
      },
    },
  },
};

export const AccessibilityDemo = {
  args: {
    variant: 'full',
    appearance: 'gradient',
  },
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'Footer com foco em acessibilidade: role contentinfo, aria-labels adequados, navegação por teclado e links semânticos.',
      },
    },
  },
};