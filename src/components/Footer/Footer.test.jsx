import React from "react";
import { render, screen, cleanup, within } from "@testing-library/react";
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
  it("CT2: renderiza footer minimal apenas com copyright", () => {
  render(<FooterWithRouter variant="minimal" />);

  // Minimal agora exibe apenas o copyright; não requer logo
  expect(screen.getByText("© 2025 Quero Doar. Todos os direitos reservados.")).toBeInTheDocument();

  // Verifica que as seções do footer full NÃO estão presentes
  expect(screen.queryByText("Sobre")).not.toBeInTheDocument();
  expect(screen.queryByText("Doadores")).not.toBeInTheDocument();
  expect(screen.queryByText("Conecte-se")).not.toBeInTheDocument();
  });

  // CT3: Validar responsividade em dispositivos móveis e tablets
  it("CT3: renderiza container do footer para cada appearance (gradient/white/ghost)", () => {
    const appearances = ["gradient", "white", "ghost"];
    // Em vez de verificar classes exatas, validamos que o footer renderiza o container esperado
    // e que para cada appearance o texto/estrutura principal permanece acessível.
    appearances.forEach((appearance) => {
      cleanup();
      render(<FooterWithRouter appearance={appearance} />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
      // presence of copyright ensures container rendered for that appearance
      expect(screen.getByText("© 2025 Quero Doar. Todos os direitos reservados.")).toBeInTheDocument();
    });
  });

  // CT4: Testar acessibilidade com leitores de tela e navegação por teclado
  it("CT4: possui atributos de acessibilidade e labels nos links sociais", () => {
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
  it("CT5: realiza scroll para o topo ao clicar no botão voltar ao topo", async () => {
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
  it("CT6: links sociais abrem em nova aba com atributos de segurança", () => {
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
  it("CT7: renderiza o texto da empresa e texto do logo corretamente", () => {
    render(<FooterWithRouter variant="full" />);
    
  // Verifica texto do logo dentro do elemento que possui role="img"
  const logo = screen.getByRole('img', { name: /logo quero doar/i });
  expect(within(logo).getByText(/Quero Doar/i)).toBeInTheDocument();
  // Verifica a descrição da empresa
  expect(screen.getByText(/Conectando pessoas através da solidariedade/i)).toBeInTheDocument();
  });

  // CT8: Testar variação de cores do logo baseada na appearance
  it("CT8: ajusta aria-label do logo baseado na prop appearance", () => {
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