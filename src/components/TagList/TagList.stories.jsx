/**
 * TagList Stories
 * 
 * Conjunto de casos de uso para o componente TagList.
 * Demonstra diferentes cenários de uso do sistema de tags
 * modular com funcionalidades de remoção e limpeza.
 * 
 * @author TagList Team
 * @version 1.0.0
 */

import TagList from './TagList';

// ========================================
// CONFIGURAÇÃO DO STORYBOOK
// ========================================

export default {
  title: 'Components/TagList',
  component: TagList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## TagList

Componente modular para exibir e gerenciar listas de tags.
Oferece funcionalidades de remoção individual e limpeza global
com interface consistente e otimizada.

### Características Principais:
- 🏷️ **Tags Flexíveis**: Suporte a diferentes tipos de tags
- ✨ **Tags Consolidadas**: Visualização otimizada para seleções completas
- 🗑️ **Remoção Individual**: Botão de remoção para cada tag
- 🧹 **Limpeza Global**: Botão "Limpar tudo" opcional
- 🎨 **Design Consistente**: Interface alinhada com o sistema de design
        `
      }
    }
  },
  argTypes: {
    title: {
      description: 'Título da seção de tags',
      control: { type: 'text' }
    },
    tags: {
      description: 'Array de tags para exibir',
      control: { type: 'object' }
    },
    onRemoveTag: { 
      description: 'Callback executado quando uma tag é removida',
      action: 'onRemoveTag' 
    },
    onClearAll: { 
      description: 'Callback executado quando "Limpar tudo" é clicado',
      action: 'onClearAll' 
    },
    showClearAll: {
      description: 'Se deve mostrar o botão "Limpar tudo"',
      control: { type: 'boolean' }
    }
  }
};

// ========================================
// DADOS MOCK PARA DEMONSTRAÇÃO
// ========================================

/**
 * Tags mock para demonstração
 */
const mockStateTags = [
  { id: 1, label: 'Rio de Janeiro', type: 'state' },
  { id: 2, label: 'São Paulo', type: 'state' },
  { id: 3, label: 'Minas Gerais', type: 'state' }
];

const mockCityTags = [
  { id: 1, label: 'Rio de Janeiro (RJ)', type: 'city', stateId: 1 },
  { id: 2, label: 'Niterói (RJ)', type: 'city', stateId: 1 },
  { id: 11, label: 'São Paulo (SP)', type: 'city', stateId: 2 },
  { id: 12, label: 'Campinas (SP)', type: 'city', stateId: 2 }
];

const mockConsolidatedTags = [
  { id: 'all-states', label: 'Todos estados (27)', type: 'state', consolidated: true },
  { id: 1, label: 'Rio de Janeiro (Todas cidades)', type: 'city', consolidated: true, stateId: 1 }
];

// ========================================
// TEMPLATE INTERATIVO
// ========================================

/**
 * Template base para stories interativas
 */
const Template = (args) => <TagList {...args} />;

// ========================================
// STORIES PRINCIPAIS
// ========================================

/**
 * Tags de estados simples
 */
export const EstadosSimples = Template.bind({});
EstadosSimples.args = {
  title: 'Estados selecionados:',
  tags: mockStateTags,
  showClearAll: false
};
EstadosSimples.parameters = {
  docs: {
    description: {
      story: 'Lista simples de tags de estados sem botão de limpeza global.'
    }
  }
};

/**
 * Tags de cidades
 */
export const CidadesSimples = Template.bind({});
CidadesSimples.args = {
  title: 'Cidades selecionadas:',
  tags: mockCityTags,
  showClearAll: false
};
CidadesSimples.parameters = {
  docs: {
    description: {
      story: 'Lista de tags de cidades com nomes completos incluindo estado.'
    }
  }
};

/**
 * Com botão "Limpar tudo"
 */
export const ComLimparTudo = Template.bind({});
ComLimparTudo.args = {
  title: 'Estados selecionados:',
  tags: mockStateTags,
  showClearAll: true
};
ComLimparTudo.parameters = {
  docs: {
    description: {
      story: 'Lista de tags com botão "Limpar tudo" para remoção em massa.'
    }
  }
};

/**
 * Tags consolidadas
 */
export const TagsConsolidadas = Template.bind({});
TagsConsolidadas.args = {
  title: 'Seleções:',
  tags: mockConsolidatedTags,
  showClearAll: true
};
TagsConsolidadas.parameters = {
  docs: {
    description: {
      story: 'Demonstra tags consolidadas para seleções completas com destaque visual diferenciado.'
    }
  }
};

/**
 * Lista mista (tags normais e consolidadas)
 */
export const ListaMista = Template.bind({});
ListaMista.args = {
  title: 'Localização selecionada:',
  tags: [
    { id: 'all-states', label: 'Todos estados (27)', type: 'state', consolidated: true },
    { id: 1, label: 'Rio de Janeiro (RJ)', type: 'city', stateId: 1 },
    { id: 2, label: 'Niterói (RJ)', type: 'city', stateId: 1 }
  ],
  showClearAll: true
};
ListaMista.parameters = {
  docs: {
    description: {
      story: 'Combinação de tags consolidadas e normais em uma única lista.'
    }
  }
};

/**
 * Lista longa para testar wrap
 */
export const ListaLonga = Template.bind({});
ListaLonga.args = {
  title: 'Muitas seleções:',
  tags: [
    ...mockStateTags,
    ...mockCityTags,
    { id: 21, label: 'Belo Horizonte (MG)', type: 'city', stateId: 3 },
    { id: 22, label: 'Uberlândia (MG)', type: 'city', stateId: 3 },
    { id: 31, label: 'Salvador (BA)', type: 'city', stateId: 4 },
    { id: 32, label: 'Feira de Santana (BA)', type: 'city', stateId: 4 },
    { id: 41, label: 'Fortaleza (CE)', type: 'city', stateId: 5 },
    { id: 42, label: 'Caucaia (CE)', type: 'city', stateId: 5 }
  ],
  showClearAll: true
};
ListaLonga.parameters = {
  docs: {
    description: {
      story: 'Lista longa para testar o comportamento de wrap e layout responsivo.'
    }
  }
};

/**
 * Lista vazia (não renderiza)
 */
export const ListaVazia = Template.bind({});
ListaVazia.args = {
  title: 'Nenhuma seleção:',
  tags: [],
  showClearAll: false
};
ListaVazia.parameters = {
  docs: {
    description: {
      story: 'Componente com lista vazia - não renderiza nada (comportamento esperado).'
    }
  }
};
