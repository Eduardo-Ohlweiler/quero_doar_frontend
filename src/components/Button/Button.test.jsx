import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi, describe, it } from "vitest";
import Button from "./Button";

//CT1: Renderização de Variantes
describe("Button component", () => {
  it("CT1: aplica classes corretas para cada appearance e size", () => {
    const appearances = ["primary", "secondary", "ghost"];
    const sizes = ["small", "medium", "large"];
    const sizeClassMap = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg'
    };
    const appearanceClassMap = {
      primary: 'bg-[var(--color-primary)]',
      secondary: 'bg-white',
      ghost: 'hover:bg-white/10'
    };

    appearances.forEach((appearance) => {
      sizes.forEach((size) => {
        cleanup();
        render(<Button appearance={appearance} size={size}>Test</Button>);
        const btn = screen.getByRole("button", { name: /test/i });
        expect(btn.className).toContain(appearanceClassMap[appearance]);
        expect(btn.className).toContain(sizeClassMap[size]);
      });
    });
  });

  //CT2: Conteúdo com children
  it("CT2: renderiza texto e ícone passados como children", () => {
    const Icon = () => <svg data-testid="icon" />;
    render(<Button><Icon />Meu Botão</Button>);
    expect(screen.getByText(/meu botão/i)).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  //CT3: Evento de Clique
  it("CT3: chama onClick quando clicado", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  //CT4: Estado Desabilitado Nativo
  it("CT4: não chama onClick quando disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const btn = screen.getByRole("button", { name: /disabled/i });
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  //CT5: Estado de Carregamento
  it("CT5: exibe spinner e texto 'Carregando...' no botão, e não dispara clique quando loading", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button loading onClick={handleClick}>Conteúdo</Button>);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /carregando.../i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /carregando.../i }));
    expect(handleClick).not.toHaveBeenCalled();
  });


  //CT6: Repasse de Atributos
  it("CT6: repassa atributos para o elemento button", () => {
    render(<Button type="submit">Enviar</Button>);
    const btn = screen.getByRole("button", { name: /enviar/i });
    expect(btn).toHaveAttribute("type", "submit");
  });

  //CT7: Acessibilidade via Teclado
  it("CT7: dispara onClick com Enter e Espaço via teclado", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Acessível</Button>);
    const btn = screen.getByRole("button", { name: /acessível/i });
    btn.focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});