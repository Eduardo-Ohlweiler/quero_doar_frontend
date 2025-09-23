import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, describe, it, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import TopCategory from './TopCategory';
import { FaTshirt, FaBook, FaTv, FaCouch, FaBaby } from 'react-icons/fa';

// Dados de teste
const mockCategories = [
    { id: 1, title: 'Roupas', count: 247, icon: <FaTshirt /> },
    { id: 2, title: 'Livros', count: 89, icon: <FaBook /> },
    { id: 3, title: 'Eletrônicos', count: 156, icon: <FaTv /> },
    { id: 4, title: 'Móveis', count: 73, icon: <FaCouch /> },
    { id: 5, title: 'Infantil', count: 134, icon: <FaBaby /> },
    { id: 6, title: 'Extra', count: 50, icon: <FaTshirt /> }, // Para testar limite
];

describe('TopCategory component', () => {
    beforeEach(() => {
        cleanup();
    });

    // TC1: Renderização básica
    it('TC1: renders with default props correctly', () => {
        render(<TopCategory categories={mockCategories} />);

        expect(screen.getByText('Categorias Populares')).toBeInTheDocument();
        expect(screen.getByText('Encontre doações por categoria')).toBeInTheDocument();
    });

    // TC2: Renderização de categorias
    it('TC2: renders all provided categories', () => {
        render(<TopCategory categories={mockCategories.slice(0, 3)} />);

        expect(screen.getByText('Roupas')).toBeInTheDocument();
        expect(screen.getByText('Livros')).toBeInTheDocument();
        expect(screen.getByText('Eletrônicos')).toBeInTheDocument();
        expect(screen.getByText('247 itens disponíveis')).toBeInTheDocument();
        expect(screen.getByText('89 itens disponíveis')).toBeInTheDocument();
    });

    // TC3: Limite máximo de categorias (top 5)
    it('TC3: limits categories to maxCategories prop', () => {
        render(
            <TopCategory 
                categories={mockCategories} 
                maxCategories={3}
            />
        );

        // Deve mostrar apenas as primeiras 3
        expect(screen.getByText('Roupas')).toBeInTheDocument();
        expect(screen.getByText('Livros')).toBeInTheDocument();
        expect(screen.getByText('Eletrônicos')).toBeInTheDocument();
        
        // Não deve mostrar a 4ª categoria
        expect(screen.queryByText('Móveis')).not.toBeInTheDocument();
    });

    // TC4: Limite padrão de 5 categorias
    it('TC4: shows maximum 5 categories by default', () => {
        render(<TopCategory categories={mockCategories} />);

        // Deve mostrar as primeiras 5
        expect(screen.getByText('Roupas')).toBeInTheDocument();
        expect(screen.getByText('Livros')).toBeInTheDocument();
        expect(screen.getByText('Eletrônicos')).toBeInTheDocument();
        expect(screen.getByText('Móveis')).toBeInTheDocument();
        expect(screen.getByText('Infantil')).toBeInTheDocument();
        
        // Não deve mostrar a 6ª categoria
        expect(screen.queryByText('Extra')).not.toBeInTheDocument();
    });

    // TC5: Callback onCategoryClick
    it('TC5: calls onCategoryClick when category is clicked', async () => {
        const user = userEvent.setup();
        const handleCategoryClick = vi.fn();

        render(
            <TopCategory 
                categories={mockCategories.slice(0, 2)} 
                onCategoryClick={handleCategoryClick}
            />
        );

        const roupasCard = screen.getByRole('button', { name: /categoria roupas/i });
        await user.click(roupasCard);

        expect(handleCategoryClick).toHaveBeenCalledTimes(1);
        expect(handleCategoryClick).toHaveBeenCalledWith(mockCategories[0]);
    });

    // TC6: Múltiplos cliques em categorias diferentes
    it('TC6: handles multiple category clicks correctly', async () => {
        const user = userEvent.setup();
        const handleCategoryClick = vi.fn();

        render(
            <TopCategory 
                categories={mockCategories.slice(0, 3)} 
                onCategoryClick={handleCategoryClick}
            />
        );

        const roupasCard = screen.getByRole('button', { name: /categoria roupas/i });
        const livrosCard = screen.getByRole('button', { name: /categoria livros/i });

        await user.click(roupasCard);
        await user.click(livrosCard);

        expect(handleCategoryClick).toHaveBeenCalledTimes(2);
        expect(handleCategoryClick).toHaveBeenNthCalledWith(1, mockCategories[0]);
        expect(handleCategoryClick).toHaveBeenNthCalledWith(2, mockCategories[1]);
    });

    // TC7: Título e subtítulo customizados
    it('TC7: renders custom title and subtitle', () => {
        const customTitle = 'Minhas Categorias';
        const customSubtitle = 'Personalizado para você';

        render(
            <TopCategory 
                categories={mockCategories.slice(0, 2)}
                title={customTitle}
                subtitle={customSubtitle}
            />
        );

        expect(screen.getByText(customTitle)).toBeInTheDocument();
        expect(screen.getByText(customSubtitle)).toBeInTheDocument();
    });

    // TC8: Estado vazio (sem categorias)
    it('TC8: shows empty state when no categories provided', () => {
        render(<TopCategory categories={[]} />);

        expect(screen.getByText('Nenhuma categoria disponível no momento')).toBeInTheDocument();
        expect(screen.getByText('Categorias Populares')).toBeInTheDocument(); // Título ainda aparece
    });

    // TC9: Classes CSS customizadas
    it('TC9: applies custom className', () => {
        const { container } = render(
            <TopCategory 
                categories={mockCategories.slice(0, 2)}
                className="custom-class"
            />
        );

        expect(container.firstChild).toHaveClass('custom-class');
    });

    // TC10: Props adicionais
    it('TC10: forwards additional props', () => {
        render(
            <TopCategory 
                categories={mockCategories.slice(0, 2)}
                data-testid="top-category"
                id="test-id"
            />
        );

        const component = screen.getByTestId('top-category');
        expect(component).toHaveAttribute('id', 'test-id');
    });

    // TC11: Sem callback onCategoryClick
    it('TC11: works without onCategoryClick callback', async () => {
        const user = userEvent.setup();

        render(<TopCategory categories={mockCategories.slice(0, 2)} />);

        const roupasCard = screen.getByRole('button', { name: /categoria roupas/i });
        
        // Não deve lançar erro ao clicar
        await expect(user.click(roupasCard)).resolves.not.toThrow();
    });

    // TC12: Categorias com IDs diferentes
    it('TC12: handles categories with different id types', () => {
        const categoriesWithStringIds = [
            { id: 'cat-1', title: 'Categoria 1', count: 10, icon: <FaTshirt /> },
            { id: 'cat-2', title: 'Categoria 2', count: 20, icon: <FaBook /> },
        ];

        render(<TopCategory categories={categoriesWithStringIds} />);

        expect(screen.getByText('Categoria 1')).toBeInTheDocument();
        expect(screen.getByText('Categoria 2')).toBeInTheDocument();
    });

    // TC13: Categorias sem ID (usando title como key)
    it('TC13: handles categories without id', () => {
        const categoriesWithoutIds = [
            { title: 'Sem ID 1', count: 10, icon: <FaTshirt /> },
            { title: 'Sem ID 2', count: 20, icon: <FaBook /> },
        ];

        render(<TopCategory categories={categoriesWithoutIds} />);

        expect(screen.getByText('Sem ID 1')).toBeInTheDocument();
        expect(screen.getByText('Sem ID 2')).toBeInTheDocument();
    });

    // TC14: Estrutura semântica correta
    it('TC14: has proper semantic structure', () => {
        render(<TopCategory categories={mockCategories.slice(0, 3)} />);

        // Deve ser uma section
        const section = screen.getByRole('region');
        expect(section.tagName).toBe('SECTION');

        // Deve ter título h2
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Categorias Populares');
    });
});
