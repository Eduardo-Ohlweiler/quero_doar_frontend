import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi, describe, it } from "vitest";
import { MemoryRouter } from 'react-router-dom';
import Footer from "./Footer";

// Mock do scroll para testar a funcionalidade "voltar ao topo"
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true
});

const FooterWithRouter = ({ children, ...props }) => (
  <MemoryRouter>
    <Footer {...props}>{children}</Footer>
  </MemoryRouter>
);

// CT1: Verificar se o footer full é exibido corretamente na home e páginas institucionais
describe("Footer component", () => {
  it("CT1: renderiza footer full com todas as seções e links corretos", () => {
    render(<FooterWithRouter variant="full" />);
    
    // Verifica se o logo está presente
    expect(screen.getByRole("img", { name: /logo quero doar/i })).toBeInTheDocument();
    
    // Verifica seções principais
    expect(screen.getByText("Sobre")).toBeInTheDocument();
    expect(screen.getByText("Doadores")).toBeInTheDocument();
    expect(screen.getByText("Conecte-se")).toBeInTheDocument();
    
    // Verifica links institucionais
    expect(screen.getByText("Quem Somos")).toBeInTheDocument();
    expect(screen.getByText("Termos de Uso")).toBeInTheDocument();
    expect(screen.getByText("Política de Privacidade")).toBeInTheDocument();
    expect(screen.getByText("Contato")).toBeInTheDocument();
    
    // Verifica links para doadores
    expect(screen.getByText("Como Doar")).toBeInTheDocument();
    expect(screen.getByText("Dicas de Doação")).toBeInTheDocument();
    expect(screen.getByText("Sistema de Pontos")).toBeInTheDocument();
    expect(screen.getByText("Hall da Fama")).toBeInTheDocument();
    
    // Verifica copyright
    expect(screen.getByText("© 2025 Quero Doar. Todos os direitos reservados.")).toBeInTheDocument();
  });

  // CT2: Verificar se o footer minimal é exibido corretamente em páginas de login, cadastro e erro 404
  it("CT2: renderiza footer minimal apenas com logo e copyright", () => {
    render(<FooterWithRouter variant="minimal" />);
    
    // Verifica se o logo está presente
    expect(screen.getByRole("img", { name: /logo quero doar/i })).toBeInTheDocument();
    
    // Verifica copyright
    expect(screen.getByText("© 2025 Quero Doar. Todos os direitos reservados.")).toBeInTheDocument();
    
    // Verifica que as seções do footer full NÃO estão presentes
    expect(screen.queryByText("Sobre")).not.toBeInTheDocument();
    expect(screen.queryByText("Doadores")).not.toBeInTheDocument();
    expect(screen.queryByText("Conecte-se")).not.toBeInTheDocument();
  });

  // CT3: Validar responsividade em dispositivos móveis e tablets
  it("CT3: aplica classes corretas para diferentes appearances", () => {
    const appearances = ["gradient", "white", "ghost"];
    const appearanceClassMap = {
      gradient: 'bg-[var(--gradient-primary)]',
      white: 'bg-white',
      ghost: 'bg-black/20'
    };

    appearances.forEach((appearance) => {
      cleanup();
      render(<FooterWithRouter appearance={appearance} />);
      const footer = screen.getByRole("contentinfo");
      // Como o footer pode ter múltiplas classes, verificamos se a classe específica está presente
      const hasExpectedClass = footer.innerHTML.includes(appearanceClassMap[appearance]);
      expect(hasExpectedClass).toBe(true);
    });
  });

  // CT4: Testar acessibilidade com leitores de tela e navegação por teclado
  it("CT4: possui elementos de acessibilidade adequados", () => {
    render(<FooterWithRouter variant="full" />);
    
    // Verifica se o footer tem o role contentinfo
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    
    // Verifica se os links sociais têm aria-label
    const socialLinks = screen.getAllByRole("link");
    const socialLinksWithAria = socialLinks.filter(link => 
      link.getAttribute('aria-label')?.includes('Visite nosso')
    );
    expect(socialLinksWithAria.length).toBeGreaterThan(0);
    
    // Verifica se o botão "voltar ao topo" tem aria-label
    const backToTopButton = screen.getByRole("button", { name: /voltar ao topo/i });
    expect(backToTopButton).toHaveAttribute('aria-label', 'Voltar ao topo da página');
  });

  // CT5: Testar funcionalidade de voltar ao topo
  it("CT5: executa scroll para o topo quando botão é clicado", async () => {
    const user = userEvent.setup();
    render(<FooterWithRouter variant="full" />);
    
    const backToTopButton = screen.getByRole("button", { name: /voltar ao topo/i });
    await user.click(backToTopButton);
    
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  // CT6: Testar links externos abrem em nova aba
  it("CT6: links de redes sociais abrem em nova aba", () => {
    render(<FooterWithRouter variant="full" />);
    
    const socialLinks = screen.getAllByRole("link").filter(link => 
      link.getAttribute('href')?.startsWith('http')
    );
    
    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  // CT7: Testar renderização correta do conteúdo textual
  it("CT7: renderiza descrição da empresa corretamente", () => {
    render(<FooterWithRouter variant="full" />);
    
    expect(screen.getByText("🧡 Quero Doar")).toBeInTheDocument();
    expect(screen.getByText("Conectando pessoas através da solidariedade. Transforme vidas com um simples gesto de doação.")).toBeInTheDocument();
  });

  // CT8: Testar variação de cores do logo baseada na appearance
  it("CT8: ajusta cor do logo baseado na appearance", () => {
    // Teste com appearance white
    const { rerender } = render(<FooterWithRouter appearance="white" />);
    let logo = screen.getByRole("img", { name: /logo quero doar/i });
    expect(logo.getAttribute('aria-label')).toContain('primary');
    
    // Teste com appearance gradient
    rerender(<FooterWithRouter appearance="gradient" />);
    logo = screen.getByRole("img", { name: /logo quero doar/i });
    expect(logo.getAttribute('aria-label')).toContain('white');
  });
});