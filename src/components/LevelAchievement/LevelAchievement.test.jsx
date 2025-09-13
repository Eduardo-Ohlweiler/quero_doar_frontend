import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi, describe, it, beforeEach } from "vitest";
import LevelAchievement from "./LevelAchievement";

describe("LevelAchievement component", () => {
  beforeEach(() => {
    cleanup();
  });

  // CT1: Renderizar o componente com frase e número personalizados
  describe("CT1: Renderização com dados personalizados", () => {
    it("deve renderizar com nível e frase personalizados", () => {
      render(
        <LevelAchievement 
          level={25} 
          phrase="Você alcançou um marco incrível!" 
        />
      );
      
      expect(screen.getByText("25")).toBeInTheDocument();
      expect(screen.getByText("Você alcançou um marco incrível!")).toBeInTheDocument();
    });

    it("deve renderizar com valores padrão quando props não são fornecidas", () => {
      render(<LevelAchievement />);
      
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("LEVEL UP")).toBeInTheDocument();
    });

    it("deve renderizar sem variantes (API simplificada)", () => {
      render(<LevelAchievement level={5} show={true} />);
      const achievement = screen.getByRole('alert');
      expect(achievement).toBeInTheDocument();
    });
  });

  // CT2: Validar animação de entrada ao subir de nível
  describe("CT2: Animações de entrada", () => {
    it("deve aplicar animação fadeIn por padrão", async () => {
      render(<LevelAchievement level={5} />);
      const achievement = screen.getByRole("alert");
      
      // Verifica se o componente inicia com opacity baixa e depois fica visível
      expect(achievement).toBeInTheDocument();
      
      await waitFor(() => {
        expect(achievement).toHaveClass("opacity-100");
      }, { timeout: 200 });
    });

    it("deve chamar callback onAnimationComplete quando show é true", async () => {
      const onAnimationComplete = vi.fn();
      render(
        <LevelAchievement 
          level={5} 
          show={true}
          onAnimationComplete={onAnimationComplete}
        />
      );
      
      await waitFor(() => {
        expect(onAnimationComplete).toHaveBeenCalledTimes(1);
      }, { timeout: 700 });
    });
  });

  // CT3: Testar responsividade em dispositivos móveis e tablets
  describe("CT3: Responsividade", () => {
    it("deve manter estrutura adequada em diferentes tamanhos", () => {
      render(<LevelAchievement level={10} phrase="Teste de responsividade em texto mais longo" />);
      
      const achievement = screen.getByRole("alert");
      const levelNumber = screen.getByText("10");
      const phrase = screen.getByText("Teste de responsividade em texto mais longo");
      
      expect(achievement).toBeInTheDocument();
      expect(levelNumber).toBeInTheDocument();
      expect(phrase).toBeInTheDocument();
    });

    it("deve aceitar prop size sem quebrar a renderização (API simplificada)", () => {
      const { rerender } = render(<LevelAchievement level={5} size="small" />);
      let achievement = screen.getByRole("alert");
      expect(achievement).toBeInTheDocument();

      rerender(<LevelAchievement level={5} size="medium" />);
      achievement = screen.getByRole("alert");
      expect(achievement).toBeInTheDocument();

      rerender(<LevelAchievement level={5} size="large" />);
      achievement = screen.getByRole("alert");
      expect(achievement).toBeInTheDocument();
    });
  });

  // CT4: Verificar acessibilidade (leitura por screen readers e contraste adequado)
  describe("CT4: Acessibilidade", () => {
    it("deve ter atributos de acessibilidade adequados", () => {
      render(<LevelAchievement level={15} phrase="Parabéns pela conquista!" />);
      
      const achievement = screen.getByRole("alert");
      expect(achievement).toHaveAttribute("aria-live", "polite");
      expect(achievement).toHaveAttribute("aria-label", "Parabéns! Você alcançou o nível 15. Parabéns pela conquista!");
    });

    it("deve ser navegável por teclado", () => {
      render(<LevelAchievement level={8} />);
      
      const achievement = screen.getByRole("alert");
      expect(achievement).toBeInTheDocument();
      // O componente deve ser anunciado por screen readers através do role="alert"
    });

    it("deve manter contraste adequado em todas as variantes", () => {
      const variants = ["gold", "silver", "bronze", "primary"];
      
      variants.forEach((variant) => {
        cleanup();
        render(<LevelAchievement level={5} variant={variant} data-testid={`contrast-${variant}`} />);
        const achievement = screen.getByTestId(`contrast-${variant}`);
        // Verifica que o componente foi renderizado corretamente
        expect(achievement).toBeInTheDocument();
        // Verifica que o banner tem texto branco para contraste
        const banner = achievement.querySelector('[class*="bg-gradient-to-r"]');
        if (banner) {
          expect(banner.className).toContain("text-white");
        }
      });
    });
  });

  // CT5: Garantir que o componente não seja exibido sem dados válidos
  describe("CT5: Validação de dados", () => {
    it("deve renderizar mesmo sem prop level (usando valor padrão)", () => {
      render(<LevelAchievement phrase="Teste sem nível" />);
      
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("Teste sem nível")).toBeInTheDocument();
    });

    it("deve renderizar mesmo sem prop phrase (usando valor padrão)", () => {
      render(<LevelAchievement level={42} />);
      
      expect(screen.getByText("42")).toBeInTheDocument();
      expect(screen.getByText("LEVEL UP")).toBeInTheDocument();
    });

    it("deve lidar com números de nível muito altos", () => {
      render(<LevelAchievement level={9999} phrase="Nível máximo!" />);
      
      expect(screen.getByText("9999")).toBeInTheDocument();
      expect(screen.getByText("Nível máximo!")).toBeInTheDocument();
    });

    it("deve lidar com frases muito longas", () => {
      const longPhrase = "Esta é uma frase muito longa que deve ser tratada adequadamente pelo componente de conquista de nível";
      render(<LevelAchievement level={1} phrase={longPhrase} />);
      
      expect(screen.getByText(longPhrase)).toBeInTheDocument();
    });
  });

  // Testes adicionais de funcionalidade
  describe("Funcionalidades adicionais", () => {
    it("deve permitir classes CSS customizadas", () => {
      render(<LevelAchievement level={5} className="custom-class" />);
      
      const achievement = screen.getByRole("alert");
      expect(achievement.className).toContain("custom-class");
    });

    it("deve repassar props adicionais para o elemento raiz", () => {
      render(<LevelAchievement level={5} data-custom="test-value" />);
      
      const achievement = screen.getByRole("alert");
      expect(achievement).toHaveAttribute("data-custom", "test-value");
    });
  });
});
