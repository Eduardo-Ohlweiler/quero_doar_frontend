import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Combobox from './Combobox';
import DropdownList from '../DropdownList/DropdownList';

// ========================================
// MOCK DATA
// ========================================

const simpleItems = [
  { id: 1, label: 'Opção 1' },
  { id: 2, label: 'Opção 2' },
  { id: 3, label: 'Opção 3' },
];

const groupedItems = [
  {
    id: 'group1',
    label: 'Grupo 1',
    items: [
      { id: 'item1', label: 'Item 1' },
      { id: 'item2', label: 'Item 2' },
    ]
  },
];

// ========================================
// TESTES
// ========================================

describe('Combobox', () => {
  describe('CTx01 - Renderização Básica', () => {
    it('CTx01.01 - Deve renderizar com label', () => {
      render(
        <Combobox
          label="Selecione"
          items={simpleItems}
          selectedIds={[]}
        />
      );

      expect(screen.getByText('Selecione')).toBeInTheDocument();
    });

    it('CTx01.02 - Deve renderizar placeholder quando nenhum item selecionado', () => {
      render(
        <Combobox
          placeholder="Escolha uma opção"
          items={simpleItems}
          selectedIds={[]}
        />
      );

      expect(screen.getByText('Escolha uma opção')).toBeInTheDocument();
    });

    it('CTx01.03 - Deve renderizar ícone de chevron por padrão', () => {
      const { container } = render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
        />
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('CTx01.04 - Não deve renderizar ícone quando showIcon=false', () => {
      const { container } = render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
          showIcon={false}
        />
      );

      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    it('CTx01.05 - Deve mostrar texto de seleção única', () => {
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[1]}
        />
      );

      expect(screen.getByText('Opção 1')).toBeInTheDocument();
    });

    it('CTx01.06 - Deve mostrar contador de seleção múltipla', () => {
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[1, 2]}
        />
      );

      expect(screen.getByText('2 selecionados')).toBeInTheDocument();
    });
  });

  describe('CTx02 - Funcionalidade de Toggle', () => {
    it('CTx02.01 - Deve abrir dropdown ao clicar no botão', () => {
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      // Verifica se os itens aparecem
      expect(screen.getByText('Opção 1')).toBeInTheDocument();
      expect(screen.getByText('Opção 2')).toBeInTheDocument();
    });

    it('CTx02.02 - Deve fechar dropdown ao clicar novamente', () => {
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
        />
      );

      const button = screen.getByRole('button');
      
      // Abrir
      fireEvent.click(button);
      expect(screen.getByText('Opção 1')).toBeInTheDocument();

      // Fechar
      fireEvent.click(button);
      expect(screen.queryByText('Opção 1')).not.toBeInTheDocument();
    });

    it('CTx02.03 - Deve rotacionar ícone quando aberto', () => {
      const { container } = render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
        />
      );

      const button = screen.getByRole('button');
      const svg = container.querySelector('svg');

      // Fechado
      expect(svg).not.toHaveClass('rotate-180');

      // Aberto
      fireEvent.click(button);
      expect(svg).toHaveClass('rotate-180');
    });

    it('CTx02.04 - Não deve abrir quando desabilitado', () => {
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
          disabled={true}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(screen.queryByText('Opção 1')).not.toBeInTheDocument();
    });
  });

  describe('CTx03 - Dropdown Padrão', () => {
    it('CTx03.01 - Deve renderizar todos os itens no dropdown padrão', () => {
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(screen.getByText('Opção 1')).toBeInTheDocument();
      expect(screen.getByText('Opção 2')).toBeInTheDocument();
      expect(screen.getByText('Opção 3')).toBeInTheDocument();
    });

    it('CTx03.02 - Deve chamar onChange ao selecionar item', () => {
      const handleChange = vi.fn();
      
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
          onChange={handleChange}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      const checkbox = screen.getAllByRole('checkbox')[0];
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(1, true);
    });

    it('CTx03.03 - Deve marcar checkboxes de itens selecionados', () => {
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[1, 3]}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).toBeChecked();
    });

    it('CTx03.04 - Deve mostrar mensagem quando vazio', () => {
      render(
        <Combobox
          items={[]}
          selectedIds={[]}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(screen.getByText('Nenhum item disponível')).toBeInTheDocument();
    });
  });

  describe('CTx04 - Dropdown Customizado', () => {
    it('CTx04.01 - Deve renderizar dropdown customizado via renderDropdown', () => {
      const customRender = vi.fn(() => (
        <div>Custom Dropdown Content</div>
      ));

      render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
          renderDropdown={customRender}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(screen.getByText('Custom Dropdown Content')).toBeInTheDocument();
      expect(customRender).toHaveBeenCalled();
    });

    it('CTx04.02 - Deve passar props corretas para dropdown customizado', () => {
      const customRender = vi.fn(() => <div>Custom</div>);

      render(
        <Combobox
          items={simpleItems}
          selectedIds={[1]}
          onChange={vi.fn()}
          renderDropdown={customRender}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(customRender).toHaveBeenCalledWith(
        expect.objectContaining({
          items: simpleItems,
          selectedIds: [1],
          onChange: expect.any(Function),
          onClose: expect.any(Function),
        })
      );
    });

    it('CTx04.03 - Deve renderizar children quando fornecido', () => {
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
        >
          <div>Children Content</div>
        </Combobox>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(screen.getByText('Children Content')).toBeInTheDocument();
    });

    it('CTx04.04 - Deve integrar com DropdownList', () => {
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[1]}
          renderDropdown={(props) => (
            <DropdownList
              {...props}
              label="Test List"
              grouped={false}
            />
          )}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      // DropdownList deve renderizar com seu cabeçalho
      expect(screen.getByText(/Test List/)).toBeInTheDocument();
    });

    it('CTx04.05 - Deve chamar children como função e passar onClose', () => {
      render(
        <Combobox selectedIds={[]}>
          {({ onClose }) => (
            <div>
              <button data-testid="close-btn" onClick={onClose}>
                Fechar
              </button>
            </div>
          )}
        </Combobox>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      // Verifica que o dropdown está aberto
      expect(screen.getByTestId('close-btn')).toBeInTheDocument();

      // Clica no botão de fechar
      const closeBtn = screen.getByTestId('close-btn');
      fireEvent.click(closeBtn);

      // Verifica que o dropdown foi fechado
      expect(screen.queryByTestId('close-btn')).not.toBeInTheDocument();
    });

    it('CTx04.06 - Deve funcionar com children não-função (elemento estático)', () => {
      render(
        <Combobox selectedIds={[]}>
          <div data-testid="static-content">Conteúdo Estático</div>
        </Combobox>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(screen.getByTestId('static-content')).toBeInTheDocument();
    });
  });

  describe('CTx05 - Fechar ao Clicar Fora', () => {
    it('CTx05.01 - Deve fechar dropdown ao clicar fora', async () => {
      render(
        <div>
          <div data-testid="outside">Outside</div>
          <Combobox
            items={simpleItems}
            selectedIds={[]}
          />
        </div>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      // Dropdown aberto
      expect(screen.getByText('Opção 1')).toBeInTheDocument();

      // Clicar fora
      const outside = screen.getByTestId('outside');
      fireEvent.mouseDown(outside);

      // Dropdown fechado
      await waitFor(() => {
        expect(screen.queryByText('Opção 1')).not.toBeInTheDocument();
      });
    });

    it('CTx05.02 - Não deve fechar ao clicar dentro do dropdown', () => {
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      // Clicar em um item
      const option = screen.getByText('Opção 1');
      fireEvent.mouseDown(option);

      // Dropdown ainda aberto
      expect(screen.getByText('Opção 1')).toBeInTheDocument();
    });
  });

  describe('CTx06 - Acessibilidade', () => {
    it('CTx06.01 - Botão deve ter aria-haspopup', () => {
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('CTx06.02 - Botão deve ter aria-expanded correto', () => {
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
        />
      );

      const button = screen.getByRole('button');
      
      // Fechado
      expect(button).toHaveAttribute('aria-expanded', 'false');

      // Aberto
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('CTx06.03 - Botão deve ter atributo disabled quando desabilitado', () => {
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
          disabled={true}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('CTx07 - Edge Cases', () => {
    it('CTx07.01 - Deve funcionar sem onChange', () => {
      render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      const checkbox = screen.getAllByRole('checkbox')[0];
      
      expect(() => fireEvent.click(checkbox)).not.toThrow();
    });

    it('CTx07.02 - Deve funcionar sem items', () => {
      render(
        <Combobox
          selectedIds={[]}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(screen.getByText('Nenhum item disponível')).toBeInTheDocument();
    });

    it('CTx07.03 - Deve aplicar className customizado', () => {
      const { container } = render(
        <Combobox
          items={simpleItems}
          selectedIds={[]}
          className="custom-class"
        />
      );

      const combobox = container.firstChild;
      expect(combobox).toHaveClass('custom-class');
    });
  });
});
