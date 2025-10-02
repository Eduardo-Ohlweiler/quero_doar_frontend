import DropdownList from './DropdownList';

export default {
  title: 'Components/DropdownList',
  component: DropdownList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// ========================================
// MOCK DATA
// ========================================

const flatItems = [
  { id: 1, label: 'Acre' },
  { id: 2, label: 'Alagoas' },
  { id: 3, label: 'Amapá' },
  { id: 4, label: 'Amazonas' },
  { id: 5, label: 'Bahia' },
  { id: 6, label: 'Ceará' },
  { id: 7, label: 'Espírito Santo' },
  { id: 8, label: 'Goiás' },
  { id: 9, label: 'Maranhão' },
  { id: 10, label: 'Mato Grosso' },
];

const groupedItems = [
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
      { id: 'alagoas-4', label: 'Rio Largo' },
      { id: 'alagoas-5', label: 'União dos Palmares' },
    ]
  },
  {
    id: 'amazonas',
    label: 'Amazonas',
    items: [
      { id: 'amazonas-1', label: 'Manaus' },
      { id: 'amazonas-2', label: 'Parintins' },
      { id: 'amazonas-3', label: 'Itacoatiara' },
      { id: 'amazonas-4', label: 'Manacapuru' },
    ]
  },
];

// ========================================
// STORIES
// ========================================

/**
 * Dropdown básico com lista flat de estados
 */
export const FlatList = {
  args: {
    items: flatItems,
    selectedIds: [1, 5],
    label: 'Estados',
    showSearch: true,
    searchPlaceholder: 'Buscar estado...',
    grouped: false,
    onChange: (itemId, isSelected) => {
      console.log('Item changed:', itemId, isSelected);
    },
    onSelectAll: (shouldSelectAll) => {
      console.log('Select all:', shouldSelectAll);
    }
  }
};

/**
 * Dropdown com grupos hierárquicos (cidades por estado)
 */
export const GroupedList = {
  args: {
    items: groupedItems,
    selectedIds: ['acre-1', 'alagoas-2'],
    label: 'Cidades',
    showSearch: true,
    searchPlaceholder: 'Buscar cidade...',
    grouped: true,
    onChange: (itemId, isSelected) => {
      console.log('Item changed:', itemId, isSelected);
    },
    onSelectAll: (shouldSelectAll) => {
      console.log('Select all:', shouldSelectAll);
    },
    onSelectGroup: (groupId) => {
      console.log('Group toggled:', groupId);
    }
  }
};

/**
 * Dropdown sem campo de busca
 */
export const WithoutSearch = {
  args: {
    items: flatItems,
    selectedIds: [2, 4, 6],
    label: 'Estados',
    showSearch: false,
    grouped: false,
    onChange: (itemId, isSelected) => {
      console.log('Item changed:', itemId, isSelected);
    }
  }
};

/**
 * Dropdown vazio
 */
export const EmptyList = {
  args: {
    items: [],
    selectedIds: [],
    label: 'Estados',
    showSearch: true,
    searchPlaceholder: 'Buscar estado...',
    grouped: false
  }
};

/**
 * Dropdown com todos os itens selecionados
 */
export const AllSelected = {
  args: {
    items: flatItems,
    selectedIds: flatItems.map(item => item.id),
    label: 'Estados',
    showSearch: true,
    searchPlaceholder: 'Buscar estado...',
    grouped: false,
    onChange: (itemId, isSelected) => {
      console.log('Item changed:', itemId, isSelected);
    },
    onSelectAll: (shouldSelectAll) => {
      console.log('Select all:', shouldSelectAll);
    }
  }
};

/**
 * Dropdown com grupo totalmente selecionado
 */
export const GroupFullySelected = {
  args: {
    items: groupedItems,
    selectedIds: ['acre-1', 'acre-2', 'acre-3', 'alagoas-1'],
    label: 'Cidades',
    showSearch: true,
    grouped: true,
    onChange: (itemId, isSelected) => {
      console.log('Item changed:', itemId, isSelected);
    },
    onSelectGroup: (groupId) => {
      console.log('Group toggled:', groupId);
    }
  }
};

/**
 * Dropdown com lista longa e scroll
 */
export const LongList = {
  args: {
    items: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      label: `Item ${i + 1}`
    })),
    selectedIds: [5, 10, 15, 20],
    label: 'Itens',
    showSearch: true,
    searchPlaceholder: 'Buscar item...',
    grouped: false
  }
};
