import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, describe, it, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import CategoryCard from './CategoryCard';
import { FaTshirt, FaBook } from 'react-icons/fa';

describe('CategoryCard component', () => {
    beforeEach(() => {
        cleanup();
    });

    // CT1: Renderização básica
    it('CT1: renders with required props correctly', () => {
        render(
            <CategoryCard title="Roupas" count={247}>
                <FaTshirt />
            </CategoryCard>
        );

        expect(screen.getByText('Roupas')).toBeInTheDocument();
        expect(screen.getByText('247 itens disponíveis')).toBeInTheDocument();
        // Verificar se o componente foi renderizado corretamente
        expect(screen.getByText('Roupas').closest('div')).toBeInTheDocument();
    });

    // CT2: Singular vs plural no texto do contador
    it('CT2: displays correct singular/plural text for count', () => {
        // Teste com 1 item (singular)
        render(
            <CategoryCard title="Livros" count={1}>
                <FaBook />
            </CategoryCard>
        );
        expect(screen.getByText('1 item disponível')).toBeInTheDocument();

        cleanup();

        // Teste com múltiplos itens (plural)
        render(
            <CategoryCard title="Roupas" count={247}>
                <FaTshirt />
            </CategoryCard>
        );
        expect(screen.getByText('247 itens disponíveis')).toBeInTheDocument();
    });

    // CT3: Renderização do ícone (children)
    it('CT3: renders icon correctly', () => {
        render(
            <CategoryCard title="Roupas" count={247}>
                <FaTshirt data-testid="tshirt-icon" />
            </CategoryCard>
        );

        expect(screen.getByTestId('tshirt-icon')).toBeInTheDocument();
    });

    // CT4: Funcionalidade de clique
    it('CT4: calls onClick when clicked', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(
            <CategoryCard title="Roupas" count={247} onClick={handleClick}>
                <FaTshirt />
            </CategoryCard>
        );

        const card = screen.getByRole('button');
        await user.click(card);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    // CT5: Navegação por teclado
    it('CT5: supports keyboard navigation', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(
            <CategoryCard title="Roupas" count={247} onClick={handleClick}>
                <FaTshirt />
            </CategoryCard>
        );

        const card = screen.getByRole('button');
        
        // Testar Enter
        await user.tab();
        expect(card).toHaveFocus();
        await user.keyboard('{Enter}');
        expect(handleClick).toHaveBeenCalledTimes(1);

        // Testar Space
        vi.clearAllMocks();
        await user.keyboard(' ');
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    // CT6: Estado desabilitado
    it('CT6: handles disabled state correctly', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        const { container } = render(
            <CategoryCard title="Roupas" count={247} onClick={handleClick} disabled={true}>
                <FaTshirt />
            </CategoryCard>
        );

        // Quando desabilitado, não tem role="button" 
        const card = container.firstChild;
        expect(card).not.toHaveAttribute('role', 'button');
        expect(card).toHaveClass('opacity-50');
        expect(card).toHaveClass('cursor-not-allowed');

        // Tentar clicar não deve chamar onClick
        await user.click(card);
        expect(handleClick).not.toHaveBeenCalled();
    });

    // CT7: Sem onClick (modo display apenas)
    it('CT7: renders without onClick as display only', () => {
        const { container } = render(
            <CategoryCard title="Roupas" count={247}>
                <FaTshirt />
            </CategoryCard>
        );

        const card = container.firstChild;
        expect(card).not.toHaveAttribute('role', 'button');
        expect(card).not.toHaveAttribute('tabIndex');
        expect(card).not.toHaveAttribute('aria-label');
    });

    // CT8: Acessibilidade
    it('CT8: has proper accessibility attributes when interactive', () => {
        const handleClick = vi.fn();

        render(
            <CategoryCard title="Roupas" count={247} onClick={handleClick}>
                <FaTshirt />
            </CategoryCard>
        );

        const card = screen.getByRole('button');
        expect(card).toHaveAttribute('aria-label', 'Categoria Roupas com 247 itens disponíveis');
        expect(card).toHaveAttribute('tabIndex', '0');
    });

    // CT9: Classes CSS customizadas
    it('CT9: applies custom className', () => {
        const { container } = render(
            <CategoryCard title="Roupas" count={247} className="custom-class">
                <FaTshirt />
            </CategoryCard>
        );

        const card = container.firstChild;
        expect(card).toHaveClass('custom-class');
    });

    // CT10: Props adicionais
    it('CT10: forwards additional props', () => {
        render(
            <CategoryCard 
                title="Roupas" 
                count={247} 
                data-testid="category-card"
                id="test-card"
            >
                <FaTshirt />
            </CategoryCard>
        );

        const card = screen.getByTestId('category-card');
        expect(card).toHaveAttribute('id', 'test-card');
    });

    // CT11: Diferentes valores de contador
    it('CT11: handles different count values', () => {
        const testCases = [
            { count: 0, expected: '0 itens disponíveis' },
            { count: 1, expected: '1 item disponível' },
            { count: 999, expected: '999 itens disponíveis' },
            { count: 1000, expected: '1000 itens disponíveis' },
        ];

        testCases.forEach(({ count, expected }, index) => {
            cleanup();
            render(
                <CategoryCard title={`Test ${index}`} count={count}>
                    <FaTshirt />
                </CategoryCard>
            );
            expect(screen.getByText(expected)).toBeInTheDocument();
        });
    });

    // CT12: Títulos longos
    it('CT12: handles long titles correctly', () => {
        const longTitle = 'Categoria com Nome Muito Longo Para Teste';
        
        render(
            <CategoryCard title={longTitle} count={10}>
                <FaTshirt />
            </CategoryCard>
        );

        expect(screen.getByText(longTitle)).toBeInTheDocument();
    });
});
