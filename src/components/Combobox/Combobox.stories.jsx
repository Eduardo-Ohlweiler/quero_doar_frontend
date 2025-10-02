import Combobox from './Combobox';
import DropdownList from '../DropdownList/DropdownList';

export default {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// ========================================
// MOCK DATA
// ========================================

const simpleItems = [
  { id: 1, label: 'Opção 1' },
  { id: 2, label: 'Opção 2' },
  { id: 3, label: 'Opção 3' },
  { id: 4, label: 'Opção 4' },
  { id: 5, label: 'Opção 5' },
];

const states = [
  { id: 1, label: 'Acre' },
  { id: 2, label: 'Alagoas' },
  { id: 3, label: 'Amapá' },
  { id: 4, label: 'Amazonas' },
  { id: 5, label: 'Bahia' },
  { id: 6, label: 'Ceará' },
  { id: 7, label: 'Espírito Santo' },
];

const groupedCities = [
  {
    id: 'acre',
    label: 'Acre',
    items: [
      { id: 'acre-1', label: 'Rio Branco' },
      { id: 'acre-2', label: 'Cruzeiro do Sul' },
      { id: 'acre-3', label: 'Sena Madureira' },
    ]
  },
  {
    id: 'alagoas',
    label: 'Alagoas',
    items: [
      { id: 'alagoas-1', label: 'Maceió' },
      { id: 'alagoas-2', label: 'Arapiraca' },
      { id: 'alagoas-3', label: 'Palmeira dos Índios' },
    ]
  },
];

// ========================================
// STORIES
// ========================================

/**
 * Combobox básico com dropdown padrão
 */
export const Default = {
  args: {
    label: 'Selecione uma opção',
    placeholder: 'Escolha...',
    items: simpleItems,
    selectedIds: [],
    onChange: (itemId, isSelected) => {
      console.log('Item changed:', itemId, isSelected);
    }
  }
};

/**
 * Combobox com itens pré-selecionados
 */
export const WithSelection = {
  args: {
    label: 'Opções selecionadas',
    placeholder: 'Escolha...',
    items: simpleItems,
    selectedIds: [1, 3],
    onChange: (itemId, isSelected) => {
      console.log('Item changed:', itemId, isSelected);
    }
  }
};

/**
 * Combobox desabilitado
 */
export const Disabled = {
  args: {
    label: 'Combobox desabilitado',
    placeholder: 'Não pode selecionar',
    items: simpleItems,
    selectedIds: [2],
    disabled: true
  }
};

/**
 * Combobox sem ícone
 */
export const WithoutIcon = {
  args: {
    label: 'Sem ícone',
    placeholder: 'Escolha...',
    items: simpleItems,
    selectedIds: [],
    showIcon: false,
    onChange: (itemId, isSelected) => {
      console.log('Item changed:', itemId, isSelected);
    }
  }
};

/**
 * Combobox vazio
 */
export const Empty = {
  args: {
    label: 'Lista vazia',
    placeholder: 'Nenhum item',
    items: [],
    selectedIds: []
  }
};

/**
 * Combobox com DropdownList customizado (lista flat)
 */
export const WithDropdownList = {
  args: {
    label: 'Estados (com DropdownList)',
    placeholder: 'Selecione estados...',
    items: states,
    selectedIds: [1, 5],
    renderDropdown: (props) => (
      <DropdownList
        {...props}
        label="Estados"
        showSearch={true}
        searchPlaceholder="Buscar estado..."
        grouped={false}
        onSelectAll={(shouldSelectAll) => {
          console.log('Select all:', shouldSelectAll);
        }}
      />
    )
  }
};

/**
 * Combobox com DropdownList customizado (lista agrupada)
 */
export const WithGroupedDropdownList = {
  args: {
    label: 'Cidades (com DropdownList agrupado)',
    placeholder: 'Selecione cidades...',
    items: groupedCities,
    selectedIds: ['acre-1', 'alagoas-2'],
    renderDropdown: (props) => (
      <DropdownList
        {...props}
        label="Cidades"
        showSearch={true}
        searchPlaceholder="Buscar cidade..."
        grouped={true}
        onSelectAll={(shouldSelectAll) => {
          console.log('Select all:', shouldSelectAll);
        }}
        onSelectGroup={(groupId) => {
          console.log('Group toggled:', groupId);
        }}
      />
    )
  }
};

/**
 * Combobox com dropdown customizado via children
 */
export const WithCustomChildren = {
  args: {
    label: 'Dropdown customizado',
    placeholder: 'Clique para ver',
    children: (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Conteúdo Customizado</h3>
        <p className="text-sm text-gray-600">
          Você pode passar qualquer conteúdo como children
        </p>
      </div>
    )
  }
};
