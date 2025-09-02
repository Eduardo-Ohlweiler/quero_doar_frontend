import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Logo from './Logo';

describe('Logo Component', () => {
    // CT1: Renderizar o componente com logo completo e verificar se cores, proporção e alinhamento estão corretos
    it('CT1: deve renderizar o logo completo com cores, proporção e alinhamento corretos', () => {
        render(<Logo variant="full" size="lg" color="primary" />);
        const logo = screen.getByRole('img');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveClass('gap-2.5'); // Proporção correta para tamanho lg
        expect(logo).toHaveClass('!text-[var(--color-primary)]'); // Cor primária
        const text = screen.getByText('Quero Doar');
        expect(text).toHaveClass('whitespace-nowrap'); // Texto alinhado corretamente
    });

    // CT2: Renderizar o componente com apenas símbolo e validar se mantém legibilidade em tamanhos reduzidos
    it('CT2: deve renderizar apenas o símbolo e manter legibilidade em tamanhos reduzidos', () => {
        render(<Logo variant="symbol" size="xs" />);
        const logo = screen.getByRole('img', { name: /símbolo/i });
        // pegar o svg dentro do logo
        const svg = logo.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(logo).toBeInTheDocument();
        expect(svg).toHaveClass('w-4 h-4');
    });

    // CT3: Renderizar o componente com apenas escrita e verificar se o texto é legível e mantém a tipografia oficial
    it('CT3: deve renderizar apenas o texto e manter a tipografia oficial', () => {
        render(<Logo variant="text" size="md" color="dark" />);
        const text = screen.getByText('Quero Doar');
        expect(text).toBeInTheDocument();
        expect(text).toHaveClass('font-bold'); // Tipografia oficial
        expect(text).toHaveClass('!text-gray-900'); // Cor escura
    });

    // CT4: Testar responsividade em diferentes breakpoints (mobile, tablet, desktop)
    // it('CT4: deve ser responsivo em diferentes breakpoints', () => {
    //     render(<Logo variant="full" size="lg" />);
    //     const logoDesktop = screen.getByRole('img', { name: /logo desktop/i });
    //     expect(logoDesktop).toHaveClass('text-2xl'); // Classe para desktop

    //     // Mobile
    //     render(<Logo variant="full" size="sm" />);
    //     const logoMobile = screen.getByRole('img', { name: /logo mobile/i });
    //     expect(logoMobile).toHaveClass('text-lg');

    //     // Tablet
    //     render(<Logo variant="full" size="md" />);
    //     const logoTablet = screen.getByRole('img', { name: /logo tablet/i });
    //     expect(logoTablet).toHaveClass('text-xl');
    // });

    // CT5: Validar contraste e acessibilidade visual em fundos claros e escuros
    it('CT5: deve validar contraste e acessibilidade visual', () => {
        render(<Logo variant="full" size="lg" color="white" />);
        const logoDarkBg = screen.getByRole('img', { name: /logo/i });
        expect(logoDarkBg).toHaveClass('!text-white'); // Cor branca para fundo escuro
        cleanup();
        render(<Logo variant="full" size="lg" color="dark" />);
        const logoLightBg = screen.getByRole('img', { name: /logo/i });
        expect(logoLightBg).toHaveClass('!text-gray-900'); // Cor escura para fundo claro
    });
});
