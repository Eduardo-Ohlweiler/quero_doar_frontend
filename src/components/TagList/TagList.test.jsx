/**
 * TagList Test Suite
 * 
 * Testes abrangentes para o componente TagList.
 * Utilizando padrão CTx (Contexto) em português para
 * testes semânticos e organizados.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TagList from './TagList';

// ========================================
// CONFIGURAÇÃO DE MOCKS E DADOS
// ========================================

const mockStateTags = [
  { id: 1, label: 'Rio de Janeiro', type: 'state' },
  { id: 2, label: 'São Paulo', type: 'state' },
  { id: 3, label: 'Minas Gerais', type: 'state' }
];

const mockCityTags = [
  { id: 1, label: 'Rio de Janeiro (RJ)', type: 'city', stateId: 1 },
  { id: 2, label: 'Niterói (RJ)', type: 'city', stateId: 1 }
];

const mockConsolidatedTags = [
  { id: 'all-states', label: 'Todos estados (27)', type: 'state', consolidated: true }
];

const defaultProps = {
  title: 'Tags selecionadas:',
  tags: mockStateTags,
  onRemoveTag: vi.fn(),
  onClearAll: vi.fn(),
  showClearAll: false
};

beforeEach(() => {
  vi.clearAllMocks();
});

// ========================================
// TESTES DE RENDERIZAÇÃO
// ========================================

describe('TagList - Renderização', () => {

  it('CTxRenderizacaoBasica: deve renderizar título e tags corretamente', () => {
    render(<TagList {...defaultProps} />);
    
    // Verifica título
    expect(screen.getByText('Tags selecionadas:')).toBeInTheDocument();
    
    // Verifica tags
    expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
    expect(screen.getByText('São Paulo')).toBeInTheDocument();
    expect(screen.getByText('Minas Gerais')).toBeInTheDocument();
  });

  it('CTxRenderizacaoVazia: não deve renderizar nada quando lista vazia', () => {
    const { container } = render(<TagList {...defaultProps} tags={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('CTxRenderizacaoSemTags: não deve renderizar nada quando tags undefined', () => {
    const { container } = render(<TagList {...defaultProps} tags={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('CTxBotaoLimparTudo: deve mostrar botão limpar tudo quando habilitado', () => {
    render(<TagList {...defaultProps} showClearAll={true} />);
    
    expect(screen.getByText('Limpar tudo')).toBeInTheDocument();
  });

  it('CTxBotaoLimparTudoOculto: não deve mostrar botão quando desabilitado', () => {
    render(<TagList {...defaultProps} showClearAll={false} />);
    
    expect(screen.queryByText('Limpar tudo')).not.toBeInTheDocument();
  });

});

// ========================================
// TESTES DE INTERAÇÃO
// ========================================

describe('TagList - Interações', () => {

  it('CTxRemocaoTag: deve chamar onRemoveTag quando botão X é clicado', () => {
    render(<TagList {...defaultProps} />);
    
    const removeButtons = screen.getAllByLabelText(/Remover/);
    fireEvent.click(removeButtons[0]);
    
    expect(defaultProps.onRemoveTag).toHaveBeenCalledWith(1, 'state');
  });

  it('CTxLimparTudo: deve chamar onClearAll quando botão limpar tudo é clicado', () => {
    render(<TagList {...defaultProps} showClearAll={true} />);
    
    const clearAllButton = screen.getByText('Limpar tudo');
    fireEvent.click(clearAllButton);
    
    expect(defaultProps.onClearAll).toHaveBeenCalled();
  });

  it('CTxMultiplasRemocoes: deve permitir remover múltiplas tags', () => {
    render(<TagList {...defaultProps} />);
    
    const removeButtons = screen.getAllByLabelText(/Remover/);
    
    fireEvent.click(removeButtons[0]); // Remove primeira tag
    fireEvent.click(removeButtons[1]); // Remove segunda tag
    
    expect(defaultProps.onRemoveTag).toHaveBeenCalledTimes(2);
    expect(defaultProps.onRemoveTag).toHaveBeenNthCalledWith(1, 1, 'state');
    expect(defaultProps.onRemoveTag).toHaveBeenNthCalledWith(2, 2, 'state');
  });

});

// ========================================
// TESTES DE TIPOS DE TAGS
// ========================================

describe('TagList - Tipos de Tags', () => {

  it('CTxTagsNormais: deve renderizar tags normais com estilo padrão', () => {
    render(<TagList {...defaultProps} tags={mockStateTags} />);
    
    const tagElements = screen.getAllByText(/Rio de Janeiro|São Paulo|Minas Gerais/);
    tagElements.forEach(tag => {
      expect(tag.closest('span')).toHaveClass('text-gray-700', 'bg-white');
    });
  });

  it('CTxTagsConsolidadas: deve renderizar tags consolidadas com estilo diferenciado', () => {
    render(<TagList {...defaultProps} tags={mockConsolidatedTags} />);
    
    const consolidatedTag = screen.getByText('Todos estados (27)');
    expect(consolidatedTag.closest('span')).toHaveClass('text-green-700', 'bg-green-100');
  });

  it('CTxTagsCidades: deve renderizar tags de cidades corretamente', () => {
    render(<TagList {...defaultProps} tags={mockCityTags} />);
    
    expect(screen.getByText('Rio de Janeiro (RJ)')).toBeInTheDocument();
    expect(screen.getByText('Niterói (RJ)')).toBeInTheDocument();
  });

  it('CTxTagsMistas: deve renderizar mistura de tags normais e consolidadas', () => {
    const mixedTags = [...mockStateTags.slice(0, 1), ...mockConsolidatedTags];
    render(<TagList {...defaultProps} tags={mixedTags} />);
    
    // Tag normal
    const normalTag = screen.getByText('Rio de Janeiro');
    expect(normalTag.closest('span')).toHaveClass('text-gray-700');
    
    // Tag consolidada
    const consolidatedTag = screen.getByText('Todos estados (27)');
    expect(consolidatedTag.closest('span')).toHaveClass('text-green-700');
  });

});

// ========================================
// TESTES DE ACESSIBILIDADE
// ========================================

describe('TagList - Acessibilidade', () => {

  it('CTxLabelsAria: deve ter labels ARIA apropriados para botões de remoção', () => {
    render(<TagList {...defaultProps} />);
    
    expect(screen.getByLabelText('Remover Rio de Janeiro')).toBeInTheDocument();
    expect(screen.getByLabelText('Remover São Paulo')).toBeInTheDocument();
    expect(screen.getByLabelText('Remover Minas Gerais')).toBeInTheDocument();
  });

  it('CTxBotaoAcessivel: botão limpar tudo deve ser acessível', () => {
    render(<TagList {...defaultProps} showClearAll={true} />);
    
    const clearButton = screen.getByText('Limpar tudo');
    expect(clearButton).toBeInTheDocument();
    expect(clearButton.tagName).toBe('BUTTON');
  });

});

// ========================================
// TESTES DE CASOS LIMITE
// ========================================

describe('TagList - Casos Limite', () => {

  it('CTxCallbacksAusentes: deve funcionar sem callbacks definidos', () => {
    render(<TagList title="Test" tags={mockStateTags} />);
    
    const removeButton = screen.getAllByLabelText(/Remover/)[0];
    expect(() => fireEvent.click(removeButton)).not.toThrow();
  });

  it('CTxTagSemId: deve lidar com tags sem ID (usando índice)', () => {
    const tagsWithoutId = [{ label: 'Tag sem ID', type: 'test' }];
    render(<TagList {...defaultProps} tags={tagsWithoutId} />);
    
    expect(screen.getByText('Tag sem ID')).toBeInTheDocument();
  });

  it('CTxPropsCustomizadas: deve aceitar props adicionais', () => {
    render(<TagList {...defaultProps} data-testid="custom-taglist" />);
    
    expect(screen.getByTestId('custom-taglist')).toBeInTheDocument();
  });

  it('CTxClasseCustomizada: deve aplicar classes CSS customizadas', () => {
    render(<TagList {...defaultProps} className="custom-class" />);
    
    const container = screen.getByText('Tags selecionadas:').closest('div').parentElement;
    expect(container).toHaveClass('custom-class');
  });

});

// ========================================
// TESTES DE LAYOUT E RESPONSIVIDADE
// ========================================

describe('TagList - Layout', () => {

  it('CTxLayoutHeader: deve posicionar título e botão corretamente', () => {
    render(<TagList {...defaultProps} showClearAll={true} />);
    
    const header = screen.getByText('Tags selecionadas:').closest('div');
    expect(header).toHaveClass('flex', 'items-center', 'justify-between');
  });

  it('CTxLayoutTags: tags devem usar flexbox com wrap', () => {
    render(<TagList {...defaultProps} />);
    
    const tagElement = screen.getByText('Rio de Janeiro');
    const tagsContainer = tagElement.closest('span').parentElement;
    expect(tagsContainer).toHaveClass('flex', 'flex-wrap', 'gap-1');
  });

});
