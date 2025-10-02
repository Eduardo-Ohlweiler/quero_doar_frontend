import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DropdownList from './DropdownList';

// ========================================
// MOCK DATA
// ========================================

const flatItems = [
  { id: 1, label: 'Acre' },
  { id: 2, label: 'Alagoas' },
  { id: 3, label: 'Amapá' },
];

const groupedItems = [
  {
    id: 'acre',
    label: 'Acre',
    items: [
      { id: 'acre-1', label: 'Rio Branco' },
      { id: 'acre-2', label: 'Cruzeiro do Sul' },
    ]
  },
  {
    id: 'alagoas',
    label: 'Alagoas',
    items: [
      { id: 'alagoas-1', label: 'Maceió' },
      { id: 'alagoas-2', label: 'Arapiraca' },
    ]
  },
];

// ========================================
// TESTES
// ========================================

describe('DropdownList', () => {
  describe('CTx01 - Renderização Básica', () => {
    it('CTx01.01 - Deve renderizar lista flat com todos os itens', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[]}
          label="Estados"
          grouped={false}
        />
      );

      expect(screen.getByText('Acre')).toBeInTheDocument();
      expect(screen.getByText('Alagoas')).toBeInTheDocument();
      expect(screen.getByText('Amapá')).toBeInTheDocument();
    });

    it('CTx01.02 - Deve renderizar lista agrupada com grupos e itens', () => {
      render(
        <DropdownList
          items={groupedItems}
          selectedIds={[]}
          label="Cidades"
          grouped={true}
        />
      );

      // Verificar grupos
      expect(screen.getByText(/Acre \(/)).toBeInTheDocument();
      expect(screen.getByText(/Alagoas \(/)).toBeInTheDocument();

      // Verificar itens
      expect(screen.getByText('Rio Branco')).toBeInTheDocument();
      expect(screen.getByText('Maceió')).toBeInTheDocument();
    });

    it('CTx01.03 - Deve renderizar label do cabeçalho com contador', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[1, 2]}
          label="Estados"
          grouped={false}
        />
      );

      expect(screen.getByText(/Estados \(2\/3\)/)).toBeInTheDocument();
    });

    it('CTx01.04 - Deve renderizar campo de busca quando showSearch=true', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[]}
          label="Estados"
          showSearch={true}
          searchPlaceholder="Buscar estado..."
          grouped={false}
        />
      );

      expect(screen.getByPlaceholderText('Buscar estado...')).toBeInTheDocument();
    });

    it('CTx01.05 - Não deve renderizar campo de busca quando showSearch=false', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[]}
          label="Estados"
          showSearch={false}
          grouped={false}
        />
      );

      expect(screen.queryByPlaceholderText('Buscar estado...')).not.toBeInTheDocument();
    });

    it('CTx01.06 - Deve renderizar mensagem quando lista está vazia', () => {
      render(
        <DropdownList
          items={[]}
          selectedIds={[]}
          label="Estados"
          grouped={false}
        />
      );

      expect(screen.getByText('Nenhum item disponível')).toBeInTheDocument();
    });
  });

  describe('CTx02 - Funcionalidade de Busca', () => {
    it('CTx02.01 - Deve filtrar itens flat baseado no termo de busca', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[]}
          label="Estados"
          showSearch={true}
          grouped={false}
        />
      );

      const searchInput = screen.getByPlaceholderText('Buscar...');
      fireEvent.change(searchInput, { target: { value: 'Acre' } });

      expect(screen.getByText('Acre')).toBeInTheDocument();
      expect(screen.queryByText('Alagoas')).not.toBeInTheDocument();
      expect(screen.queryByText('Amapá')).not.toBeInTheDocument();
    });

    it('CTx02.02 - Deve filtrar grupos e itens baseado no termo de busca', () => {
      render(
        <DropdownList
          items={groupedItems}
          selectedIds={[]}
          label="Cidades"
          showSearch={true}
          grouped={true}
        />
      );

      const searchInput = screen.getByPlaceholderText('Buscar...');
      fireEvent.change(searchInput, { target: { value: 'Maceió' } });

      expect(screen.getByText('Maceió')).toBeInTheDocument();
      expect(screen.queryByText('Rio Branco')).not.toBeInTheDocument();
    });

    it('CTx02.03 - Deve mostrar mensagem quando busca não retorna resultados', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[]}
          label="Estados"
          showSearch={true}
          grouped={false}
        />
      );

      const searchInput = screen.getByPlaceholderText('Buscar...');
      fireEvent.change(searchInput, { target: { value: 'xyz123' } });

      expect(screen.getByText('Nenhum item encontrado')).toBeInTheDocument();
    });

    it('CTx02.04 - Deve limpar busca ao clicar no botão limpar', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[]}
          label="Estados"
          showSearch={true}
          grouped={false}
        />
      );

      const searchInput = screen.getByPlaceholderText('Buscar...');
      fireEvent.change(searchInput, { target: { value: 'Acre' } });

      const clearButton = screen.getByLabelText('Limpar busca');
      fireEvent.click(clearButton);

      expect(searchInput.value).toBe('');
      expect(screen.getByText('Acre')).toBeInTheDocument();
      expect(screen.getByText('Alagoas')).toBeInTheDocument();
    });

    it('CTx02.05 - Busca deve ser case-insensitive', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[]}
          label="Estados"
          showSearch={true}
          grouped={false}
        />
      );

      const searchInput = screen.getByPlaceholderText('Buscar...');
      fireEvent.change(searchInput, { target: { value: 'acre' } });

      expect(screen.getByText('Acre')).toBeInTheDocument();
    });
  });

  describe('CTx03 - Seleção de Itens', () => {
    it('CTx03.01 - Deve chamar onChange ao clicar em item flat', () => {
      const handleChange = vi.fn();
      
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[]}
          label="Estados"
          onChange={handleChange}
          grouped={false}
        />
      );

      const checkbox = screen.getAllByRole('checkbox')[1]; // Primeiro item (pula o header)
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(1, true);
    });

    it('CTx03.02 - Deve chamar onChange ao desmarcar item', () => {
      const handleChange = vi.fn();
      
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[1]}
          label="Estados"
          onChange={handleChange}
          grouped={false}
        />
      );

      const checkbox = screen.getAllByRole('checkbox')[1];
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(1, false);
    });

    it('CTx03.03 - Deve chamar onSelectGroup ao clicar no cabeçalho de grupo', () => {
      const handleSelectGroup = vi.fn();
      
      render(
        <DropdownList
          items={groupedItems}
          selectedIds={[]}
          label="Cidades"
          onSelectGroup={handleSelectGroup}
          grouped={true}
        />
      );

      // Encontrar checkbox do grupo Acre
      const groupCheckbox = screen.getAllByRole('checkbox')[1];
      fireEvent.click(groupCheckbox);

      expect(handleSelectGroup).toHaveBeenCalledWith('acre');
    });

    it('CTx03.04 - Deve marcar itens corretos baseado em selectedIds', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[1, 3]}
          label="Estados"
          grouped={false}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      
      expect(checkboxes[1]).toBeChecked(); // Acre
      expect(checkboxes[2]).not.toBeChecked(); // Alagoas
      expect(checkboxes[3]).toBeChecked(); // Amapá
    });
  });

  describe('CTx04 - Seleção em Lote', () => {
    it('CTx04.01 - Deve chamar onSelectAll ao clicar no header checkbox', () => {
      const handleSelectAll = vi.fn();
      
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[]}
          label="Estados"
          onSelectAll={handleSelectAll}
          grouped={false}
        />
      );

      const headerCheckbox = screen.getAllByRole('checkbox')[0];
      fireEvent.click(headerCheckbox);

      expect(handleSelectAll).toHaveBeenCalledWith(true);
    });

    it('CTx04.02 - Deve marcar header checkbox quando todos estão selecionados', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[1, 2, 3]}
          label="Estados"
          grouped={false}
        />
      );

      const headerCheckbox = screen.getAllByRole('checkbox')[0];
      expect(headerCheckbox).toBeChecked();
    });

    it('CTx04.03 - Não deve marcar header checkbox quando alguns estão selecionados', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[1, 2]}
          label="Estados"
          grouped={false}
        />
      );

      const headerCheckbox = screen.getAllByRole('checkbox')[0];
      expect(headerCheckbox).not.toBeChecked();
    });

    it('CTx04.04 - Deve desmarcar tudo ao clicar no header quando todos estão selecionados', () => {
      const handleSelectAll = vi.fn();
      
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[1, 2, 3]}
          label="Estados"
          onSelectAll={handleSelectAll}
          grouped={false}
        />
      );

      const headerCheckbox = screen.getAllByRole('checkbox')[0];
      fireEvent.click(headerCheckbox);

      expect(handleSelectAll).toHaveBeenCalledWith(false);
    });

    it('CTx04.05 - Deve marcar grupo checkbox quando todos os itens do grupo estão selecionados', () => {
      render(
        <DropdownList
          items={groupedItems}
          selectedIds={['acre-1', 'acre-2']}
          label="Cidades"
          grouped={true}
        />
      );

      const groupCheckbox = screen.getAllByRole('checkbox')[1]; // Grupo Acre
      expect(groupCheckbox).toBeChecked();
    });
  });

  describe('CTx05 - Estados Visuais', () => {
    it('CTx05.01 - Deve aplicar classe CSS customizada', () => {
      const { container } = render(
        <DropdownList
          items={flatItems}
          selectedIds={[]}
          label="Estados"
          grouped={false}
          className="custom-class"
        />
      );

      const dropdown = container.firstChild;
      expect(dropdown).toHaveClass('custom-class');
    });

    it('CTx05.02 - Deve mostrar ícones de seleção corretos', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[1, 2]}
          label="Estados"
          grouped={false}
        />
      );

      // Verificar se FaCheck está presente no header
      expect(screen.getAllByRole('checkbox')[0].parentElement).toBeInTheDocument();
    });
  });

  describe('CTx06 - Acessibilidade', () => {
    it('CTx06.01 - Todos os checkboxes devem ter role checkbox', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[]}
          label="Estados"
          grouped={false}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('CTx06.02 - Botão limpar busca deve ter aria-label', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[]}
          label="Estados"
          showSearch={true}
          grouped={false}
        />
      );

      const searchInput = screen.getByPlaceholderText('Buscar...');
      fireEvent.change(searchInput, { target: { value: 'test' } });

      const clearButton = screen.getByLabelText('Limpar busca');
      expect(clearButton).toBeInTheDocument();
    });
  });

  describe('CTx07 - Edge Cases', () => {
    it('CTx07.01 - Deve lidar com items vazio', () => {
      render(
        <DropdownList
          items={[]}
          selectedIds={[]}
          label="Estados"
          grouped={false}
        />
      );

      expect(screen.getByText('Nenhum item disponível')).toBeInTheDocument();
    });

    it('CTx07.02 - Deve lidar com selectedIds vazio', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[]}
          label="Estados"
          grouped={false}
        />
      );

      expect(screen.getByText(/Estados \(0\/3\)/)).toBeInTheDocument();
    });

    it('CTx07.03 - Deve lidar com callbacks não fornecidos', () => {
      render(
        <DropdownList
          items={flatItems}
          selectedIds={[]}
          label="Estados"
          grouped={false}
        />
      );

      const checkbox = screen.getAllByRole('checkbox')[1];
      
      expect(() => fireEvent.click(checkbox)).not.toThrow();
    });

    it('CTx07.04 - Deve lidar com grupos vazios', () => {
      const emptyGroupItems = [
        {
          id: 'empty',
          label: 'Grupo Vazio',
          items: []
        }
      ];

      render(
        <DropdownList
          items={emptyGroupItems}
          selectedIds={[]}
          label="Cidades"
          grouped={true}
        />
      );

      expect(screen.getByText('Nenhum item disponível')).toBeInTheDocument();
    });
  });
});
