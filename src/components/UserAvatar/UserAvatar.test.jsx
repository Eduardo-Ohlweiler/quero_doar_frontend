import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import UserAvatar from "./UserAvatar";

describe("UserAvatar component", () => {
  const defaultUser = {
    userId: 1,
    name: 'Maria Silva',
  };

  const userWithAvatar = {
    userId: 2,
    name: 'Ana Costa',
    photo: 'https://example.com/avatar.jpg',
  };

  const userWithSingleName = {
    userId: 3,
    name: 'Carlos',
  };

  //CT1: Renderização com diferentes tamanhos
  it("CT1: aplica classes corretas para cada tamanho", () => {
    const sizes = ["small", "medium", "large", "xlarge"];
    const sizeClassMap = {
      small: 'w-8 h-8 text-xs',
      medium: 'w-10 h-10 text-sm',
      large: 'w-12 h-12 text-base',
      xlarge: 'w-14 h-14 text-lg',
    };

      sizes.forEach((size) => {
      cleanup();
      render(<UserAvatar user={defaultUser} size={size} />);
      const avatar = screen.getByText("MS").parentElement;
      expect(avatar.className).toContain(sizeClassMap[size]);
    });
  });

  //CT2: Renderização com diferentes aparências
  it("CT2: aplica classes corretas para cada aparência", () => {
    const appearances = ["primary", "secondary", "ghost"];
    const appearanceClassMap = {
      primary: 'bg-[var(--color-primary)]/80',
      secondary: '',
      ghost: 'bg-white/10',
    };

    appearances.forEach((appearance) => {
      cleanup();
      render(<UserAvatar user={defaultUser} appearance={appearance} />);
      const avatar = screen.getByText("MS").parentElement;
      expect(avatar.className).toContain(appearanceClassMap[appearance]);
    });
  });

  //CT3: Renderização com frame
  it("CT3: aplica estilos de frame quando habilitado", () => {
    render(<UserAvatar user={defaultUser} frame={true} />);
    const avatar = screen.getByText("MS").parentElement;
    expect(avatar.className).toContain('border-2');
    expect(avatar.className).toContain('shadow-lg');
  });

  //CT4: Renderização de avatar com imagem
  it("CT4: renderiza imagem quando avatar está presente", () => {
    render(<UserAvatar user={userWithAvatar} />);
    const img = screen.getByAltText("Avatar de Ana Costa");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  //CT5: Renderização de iniciais quando não há avatar
  it("CT5: renderiza iniciais quando não há avatar", () => {
    render(<UserAvatar user={defaultUser} />);
    expect(screen.getByText("MS")).toBeInTheDocument();
  });

  //CT6: Diferentes modos de exibição
  it("CT6: renderiza corretamente os diferentes modos de exibição", () => {
    // Photo only
    const { rerender } = render(
      <UserAvatar user={userWithAvatar} display="photo-only" />
    );
    expect(screen.queryByText("Ana Costa")).not.toBeInTheDocument();

    // Photo with name
    rerender(<UserAvatar user={userWithAvatar} display="photo-with-name" />);
    expect(screen.getByText("Ana Costa")).toBeInTheDocument();

    // Name only
    rerender(<UserAvatar user={userWithAvatar} display="name-only" />);
    expect(screen.getByText("Ana Costa")).toBeInTheDocument();
    expect(screen.queryByAltText("Avatar de Ana Costa")).not.toBeInTheDocument();
  });

  //CT7: Indicador de nível
  it("CT7: renderiza indicador de nível quando habilitado", () => {
    render(<UserAvatar user={{ ...defaultUser, level: "10" }} showLevel={true} />);
    const levelIndicator = screen.getByText((content, element) => {
        return element?.tagName === "DIV" && content === "10";
    });
    expect(levelIndicator).toBeInTheDocument();
    expect(levelIndicator.className).toContain('bg-[var(--color-primary)]/80');
  });

  //CT8: Não renderiza nível quando desabilitado
  it("CT8: não renderiza indicador de nível quando desabilitado", () => {
    render(<UserAvatar user={defaultUser} showLevel={false} level="10" />);
    expect(screen.queryByText("10")).not.toBeInTheDocument();
  });

  //CT9: Iniciais com nome único
  it("CT9: gera iniciais corretas para nome único", () => {
    render(<UserAvatar user={userWithSingleName} />);
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  //CT10: Aplicação de className customizada
  it("CT10: aplica className customizada", () => {
    render(<UserAvatar user={defaultUser} className="custom-class" />);
    const container = screen.getByText("MS").closest('.custom-class');
    expect(container).toBeInTheDocument();
  });

  //CT12: Repasse de atributos
  it("CT12: repassa atributos para o elemento raiz", () => {
    render(<UserAvatar user={defaultUser} data-testid="custom-avatar" />);
    expect(screen.getByTestId("custom-avatar")).toBeInTheDocument();
  });
});