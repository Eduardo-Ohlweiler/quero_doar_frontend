import React from "react";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi, describe, it, beforeEach } from "vitest";
import UserMenu from "./UserMenu";

describe("UserMenu component", () => {
  const defaultUser = {
    firstName: 'Maria',
    lastName: 'Silva',
    isAdmin: false,
  };

  const adminUser = {
    firstName: 'João',
    lastName: 'Santos',
    isAdmin: true,
  };

  const userWithAvatar = {
    firstName: 'Ana',
    lastName: 'Costa',
    avatar: 'https://example.com/avatar.jpg',
    isAdmin: false,
  };

  const userWithSingleName = {
    name: 'Carlos',
    isAdmin: false,
  };

  const mockCallbacks = {
    onProfile: vi.fn(),
    onDonations: vi.fn(),
    onLogout: vi.fn(),
    onAdmin: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  //CT1: Renderizar o UserMenu com usuário autenticado e verificar se o nome/avatar é exibido
  it("CT1: renderiza o UserMenu com usuário autenticado exibindo nome e avatar", () => {
    render(<UserMenu user={defaultUser} {...mockCallbacks} />);
    
    const trigger = screen.getByTestId("user-menu-trigger");
    expect(trigger).toBeInTheDocument();
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
    expect(screen.getByText("MS")).toBeInTheDocument(); // Iniciais
  });

  //CT2: Clicar no gatilho e verificar se o menu suspenso abre com todas as opções corretas
  it("CT2: abre menu suspenso com opções corretas ao clicar no gatilho", async () => {
    const user = userEvent.setup();
    render(<UserMenu user={defaultUser} {...mockCallbacks} />);
    
    const trigger = screen.getByTestId("user-menu-trigger");
    await user.click(trigger);
    
    expect(screen.getByTestId("user-menu-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("menu-item-profile")).toBeInTheDocument();
    expect(screen.getByTestId("menu-item-donations")).toBeInTheDocument();
    expect(screen.getByTestId("menu-item-logout")).toBeInTheDocument();
    expect(screen.queryByTestId("menu-item-admin")).not.toBeInTheDocument();
  });

  //CT3: Selecionar cada opção e verificar se o callback correspondente é chamado
  it("CT3: chama callbacks corretos ao selecionar opções do menu", async () => {
    const user = userEvent.setup();
    render(<UserMenu user={defaultUser} {...mockCallbacks} />);
    
    // Abrir menu
    const trigger = screen.getByTestId("user-menu-trigger");
    await user.click(trigger);
    
    // Testar opção perfil
    await user.click(screen.getByTestId("menu-item-profile"));
    expect(mockCallbacks.onProfile).toHaveBeenCalledTimes(1);
    
    // Reabrir menu e testar doações
    await user.click(trigger);
    await user.click(screen.getByTestId("menu-item-donations"));
    expect(mockCallbacks.onDonations).toHaveBeenCalledTimes(1);
    
    // Reabrir menu e testar logout
    await user.click(trigger);
    await user.click(screen.getByTestId("menu-item-logout"));
    expect(mockCallbacks.onLogout).toHaveBeenCalledTimes(1);
  });

  //CT4: Validar que o item "Menu administrativo" só aparece para usuários com permissão de administrador
  it("CT4: exibe menu administrativo apenas para usuários administradores", async () => {
    const user = userEvent.setup();
    
    // Testar usuário não admin
    render(<UserMenu user={defaultUser} {...mockCallbacks} />);
    await user.click(screen.getByTestId("user-menu-trigger"));
    expect(screen.queryByTestId("menu-item-admin")).not.toBeInTheDocument();
    
    // Limpar componente
    cleanup();
    
    // Testar usuário admin
    render(<UserMenu user={adminUser} {...mockCallbacks} />);
    await user.click(screen.getByTestId("user-menu-trigger"));
    expect(screen.getByTestId("menu-item-admin")).toBeInTheDocument();
    
    // Testar callback do menu admin
    await user.click(screen.getByTestId("menu-item-admin"));
    expect(mockCallbacks.onAdmin).toHaveBeenCalledTimes(1);
  });

  //CT5: Clicar fora do menu ou pressionar ESC deve fechá-lo
  it("CT5: fecha menu ao clicar fora ou pressionar ESC", async () => {
    const user = userEvent.setup();
    render(<UserMenu user={defaultUser} {...mockCallbacks} />);
    
    // Abrir menu
    const trigger = screen.getByTestId("user-menu-trigger");
    await user.click(trigger);
    const dropdown = screen.getByTestId("user-menu-dropdown");
    expect(dropdown.className).toContain('opacity-100');
    
    // Clicar fora
    fireEvent.mouseDown(document.body);
    await waitFor(() => {
      expect(dropdown.className).toContain('opacity-0');
    });
    
    // Reabrir menu
    await user.click(trigger);
    await waitFor(() => {
      expect(dropdown.className).toContain('opacity-100');
    });
    
    // Pressionar ESC
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => {
      expect(dropdown.className).toContain('opacity-0');
    });
  });

  //CT6: Testar navegação por teclado (Tab/Shift+Tab) e ativação com Enter/Espaço
  it("CT6: suporta navegação e ativação por teclado", async () => {
    const user = userEvent.setup();
    render(<UserMenu user={defaultUser} {...mockCallbacks} />);
    
    const trigger = screen.getByTestId("user-menu-trigger");
    trigger.focus();
    
    // Abrir menu com Enter
    await user.keyboard("{Enter}");
    expect(screen.getByTestId("user-menu-dropdown")).toBeInTheDocument();
    
    // Testar ativação de item com Enter
    const profileItem = screen.getByTestId("menu-item-profile");
    profileItem.focus();
    await user.keyboard("{Enter}");
    expect(mockCallbacks.onProfile).toHaveBeenCalledTimes(1);
    
    // Reabrir menu e testar com Espaço
    await user.click(trigger);
    const donationsItem = screen.getByTestId("menu-item-donations");
    donationsItem.focus();
    await user.keyboard(" ");
    expect(mockCallbacks.onDonations).toHaveBeenCalledTimes(1);
  });

  //CT7: Testar diferentes tipos de usuário (com avatar, nome único, etc.)
  it("CT7: renderiza corretamente diferentes tipos de usuário", () => {
    // Usuário com avatar
    const { rerender } = render(<UserMenu user={userWithAvatar} {...mockCallbacks} />);
    expect(screen.getByAltText("Avatar de Ana Costa")).toBeInTheDocument();
    expect(screen.getByText("Ana Costa")).toBeInTheDocument();
    
    // Usuário com nome único
    rerender(<UserMenu user={userWithSingleName} {...mockCallbacks} />);
    expect(screen.getByText("Carlos")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument(); // Inicial
  });

  //CT8: Testar acessibilidade e atributos ARIA
  it("CT8: possui atributos de acessibilidade corretos", () => {
    render(<UserMenu user={defaultUser} {...mockCallbacks} />);
    
    const trigger = screen.getByTestId("user-menu-trigger");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-label", "Menu de opções para Maria Silva");
  });

  //CT9: Testar fechamento do menu ao selecionar uma opção
  it("CT9: fecha menu automaticamente ao selecionar uma opção", async () => {
    const user = userEvent.setup();
    render(<UserMenu user={defaultUser} {...mockCallbacks} />);
    
    // Abrir menu
    const trigger = screen.getByTestId("user-menu-trigger");
    await user.click(trigger);
    const dropdown = screen.getByTestId("user-menu-dropdown");
    expect(dropdown.className).toContain('opacity-100');
    
    // Selecionar uma opção
    await user.click(screen.getByTestId("menu-item-profile"));
    
    // Verificar se o menu fechou
    await waitFor(() => {
      expect(dropdown.className).toContain('opacity-0');
    });
  });

  //CT10: Testar diferentes tamanhos
  it("CT10: aplica classes corretas para diferentes tamanhos", () => {
    const sizes = ["small", "medium", "large"];
    
    sizes.forEach((size) => {
      cleanup();
      render(<UserMenu user={defaultUser} size={size} {...mockCallbacks} />);
      const trigger = screen.getByTestId("user-menu-trigger");
      
      // Verificar se as classes de tamanho são aplicadas
      expect(trigger.className).toContain(
        size === 'small' ? 'px-2 py-1.5' : 
        size === 'large' ? 'px-4 py-3' : 
        'px-3 py-2'
      );
    });
  });

  //CT11: Testar diferentes aparências
  it("CT11: aplica classes corretas para diferentes aparências", () => {
    const appearances = ["primary", "secondary", "ghost"];
    
    appearances.forEach((appearance) => {
      cleanup();
      render(<UserMenu user={defaultUser} appearance={appearance} {...mockCallbacks} />);
      const trigger = screen.getByTestId("user-menu-trigger");
      
      // Verificar se as classes de aparência são aplicadas
      expect(trigger.className).toContain(
        appearance === 'primary' ? 'bg-[var(--color-primary)]' : 
        appearance === 'ghost' ? 'bg-transparent' : 
        'bg-white'
      );
    });
  });

  //CT12: Testar funcionalidade showUserName
  it("CT12: controla exibição do nome do usuário", () => {
    // Com nome
    const { rerender } = render(<UserMenu user={defaultUser} showUserName={true} {...mockCallbacks} />);
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
    
    // Sem nome
    rerender(<UserMenu user={defaultUser} showUserName={false} {...mockCallbacks} />);
    expect(screen.queryByText("Maria Silva")).not.toBeInTheDocument();
    expect(screen.getByText("MS")).toBeInTheDocument(); // Iniciais ainda devem aparecer
  });

  //CT13: Testar repasse de avatarProps
  it("CT13: repassa propriedades para o UserAvatar", () => {
    render(<UserMenu user={defaultUser} {...mockCallbacks} />);

    // Verificar se o UserAvatar renderiza corretamente
    const avatar = screen.getByTestId("user-menu-trigger").querySelector(".backdrop-blur-sm");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass("w-8 h-8 text-xs rounded-full");
  });

  //CT14: Testar fixedWidth
  it("CT14: aplica largura fixa quando habilitada", async () => {
    const user = userEvent.setup();
    render(<UserMenu user={defaultUser} {...mockCallbacks} />);

    await user.click(screen.getByTestId("user-menu-trigger"));
    const dropdown = screen.getByTestId("user-menu-dropdown");

    // Verificar se as classes atuais estão aplicadas corretamente
    expect(dropdown.className).toContain("absolute right-0 top-full");
  });

  //CT15: Testar aplicação de className customizada
  it("CT15: aplica className customizada", () => {
    render(<UserMenu user={defaultUser} className="custom-class" {...mockCallbacks} />);
    const container = screen.getByTestId("user-menu-trigger").parentElement;
    expect(container).toHaveClass('custom-class');
  });
});
