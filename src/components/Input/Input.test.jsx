import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi, describe, it } from "vitest";
import Input from "./Input";

describe("Input component", () => {
  // CT1: Renderização de Variantes
  it("CT1: aplica classes corretas para cada appearance e size", () => {
    const appearances = ["default", "minimal", "outlined", "outlined-white"];
    const sizes = ["sm", "md", "lg"];
    
    const sizeClassMap = {
      sm: 'h-8',
      md: 'h-10',
      lg: 'h-12'
    };

    const appearanceClassMap = {
      default: 'bg-white/80',
      minimal: 'bg-transparent',
      outlined: 'bg-white/10',
      'outlined-white': 'bg-white/10'
    };

    appearances.forEach((appearance) => {
      sizes.forEach((size) => {
        cleanup();
        render(<Input appearance={appearance} size={size} data-testid="input-container" />);
        const container = screen.getByTestId("input-container").parentElement;
        expect(container.className).toContain(appearanceClassMap[appearance]);
        expect(container.className).toContain(sizeClassMap[size]);
      });
    });
  });

  // CT2: Label e Helper Text
  it("CT2: renderiza label e helper text corretamente", () => {
    const label = "Nome completo";
    const helperText = "Digite seu nome completo";
    
    render(<Input label={label} helperText={helperText} />);
    
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  // CT3: Required Field
  it("CT3: exibe asterisco para campos obrigatórios", () => {
    render(<Input label="Email" required />);
    
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("required");
  });

  // CT4: Error State
  it("CT4: exibe estado de erro corretamente", () => {
    const errorMessage = "Campo obrigatório";
    
    render(<Input label="Email" error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  // CT5: Disabled State
  it("CT5: aplica estado desabilitado corretamente", () => {
    render(<Input label="Email" disabled />);
    
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  // CT6: Loading State
  it("CT6: exibe spinner durante carregamento", () => {
    render(<Input label="Email" loading />);
    
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-busy", "true");
  });

  // CT7: Icon Rendering
  it("CT7: renderiza ícone na posição correta", () => {
    const iconText = "🔍";
    
    // Icon left
    const { rerender } = render(
      <Input icon={iconText} iconPosition="left" data-testid="input-field" />
    );
    
    expect(screen.getByText(iconText)).toBeInTheDocument();
    
    // Icon right
    rerender(<Input icon={iconText} iconPosition="right" data-testid="input-field" />);
    expect(screen.getByText(iconText)).toBeInTheDocument();
  });

  // CT8: Controlled vs Uncontrolled
  it("CT8: funciona como componente controlado", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const testValue = "test value";
    
    render(<Input value={testValue} onChange={handleChange} />);
    
    const input = screen.getByRole("textbox");
    expect(input.value).toBe(testValue);
    
    await user.type(input, "a");
    expect(handleChange).toHaveBeenCalled();
  });

  // CT9: Uncontrolled Input
  it("CT9: funciona como componente não controlado", async () => {
    const user = userEvent.setup();
    
    render(<Input placeholder="Digite algo" />);
    
    const input = screen.getByRole("textbox");
    await user.type(input, "teste");
    
    expect(input.value).toBe("teste");
  });

  // CT10: Event Handlers
  it("CT10: chama event handlers corretamente", async () => {
    const user = userEvent.setup();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    const handleChange = vi.fn();
    
    render(
      <Input 
        onFocus={handleFocus} 
        onBlur={handleBlur} 
        onChange={handleChange} 
      />
    );
    
    const input = screen.getByRole("textbox");
    
    await user.click(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    await user.type(input, "a");
    expect(handleChange).toHaveBeenCalled();
    
    await user.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  // CT11: Input Types
  it("CT11: aplica diferentes tipos de input", () => {
    const types = ["text", "email", "password", "number", "tel"];
    
    types.forEach((type) => {
      cleanup();
      render(<Input type={type} data-testid={`input-${type}`} />);
      const input = screen.getByTestId(`input-${type}`);
      expect(input).toHaveAttribute("type", type);
    });
  });

  // CT12: Accessibility
  it("CT12: tem atributos de acessibilidade corretos", () => {
    const label = "Email";
    const helperText = "Digite seu email";
    
    render(<Input label={label} helperText={helperText} />);
    
    const input = screen.getByRole("textbox");
    const labelElement = screen.getByText(label);
    
    expect(labelElement).toHaveAttribute("for", input.id);
    expect(input).toHaveAttribute("aria-describedby");
  });

  // CT13: Focus State
  it("CT13: aplica estilos de foco corretamente", async () => {
    const user = userEvent.setup();
    
    render(<Input data-testid="input-field" />);
    
    const input = screen.getByTestId("input-field");
    
    await user.click(input);
    
    // Verifica se o container pai tem a classe de foco
    const container = input.parentElement;
    expect(container.className).toContain("shadow-[inset_0_0_0_2px_white]");
  });

  // CT14: Placeholder
  it("CT14: exibe placeholder corretamente", () => {
    const placeholder = "Digite aqui...";
    
    render(<Input placeholder={placeholder} />);
    
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  // CT15: Custom Icon Component
  it("CT15: renderiza componente de ícone personalizado", () => {
    const CustomIcon = () => <svg data-testid="custom-icon" />;
    
    render(<Input icon={<CustomIcon />} />);
    
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  // CT16: Error vs Helper Text Priority
  it("CT16: prioriza mensagem de erro sobre helper text", () => {
    const helperText = "Texto de ajuda";
    const errorMessage = "Erro encontrado";
    
    render(<Input helperText={helperText} error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByText(helperText)).not.toBeInTheDocument();
  });

  // CT17: Loading with Icon
  it("CT17: substitui ícone por spinner durante carregamento", () => {
    const iconText = "🔍";
    
    render(<Input icon={iconText} loading />);
    
    expect(screen.queryByText(iconText)).not.toBeInTheDocument();
    // O spinner não tem um texto específico, mas o input deve estar com aria-busy
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-busy", "true");
  });

  // CT18: Outlined-White Appearance
  it("CT18: aplica estilos corretos para appearance outlined-white", () => {
    render(<Input appearance="outlined-white" data-testid="input-field" />);
    
    const input = screen.getByTestId("input-field");
    const container = input.parentElement;
    
    // Verifica se tem a mesma estrutura do outlined mas com texto branco
    expect(container.className).toContain('bg-white/10');
    expect(input.className).toContain('text-white');
    expect(input.className).toContain('placeholder:text-white/60');
  });

  // CT19: Helper Text Colors by Appearance
  it("CT19: aplica cores corretas do helper text para cada appearance", () => {
    const helperText = "Texto de ajuda";
    const appearances = ["default", "minimal", "outlined", "outlined-white"];
    
    const helperColorMap = {
      default: 'text-gray-600',
      minimal: 'text-white/70',
      outlined: 'text-white/80',
      'outlined-white': 'text-white/80'
    };

    appearances.forEach((appearance) => {
      cleanup();
      render(<Input appearance={appearance} helperText={helperText} />);
      
      const helperElement = screen.getByText(helperText);
      expect(helperElement.className).toContain(helperColorMap[appearance]);
    });
  });

  // CT20: Error Message Colors Override Helper Text Colors
  it("CT20: mensagens de erro sobrescrevem cores do helper text", () => {
    const helperText = "Texto de ajuda";
    const errorMessage = "Mensagem de erro";
    const appearances = ["default", "minimal", "outlined", "outlined-white"];
    
    const errorColorMap = {
      default: 'text-red-500',
      minimal: 'text-red-300',
      outlined: 'text-red-400',
      'outlined-white': 'text-red-300'
    };

    appearances.forEach((appearance) => {
      cleanup();
      render(
        <Input 
          appearance={appearance} 
          helperText={helperText} 
          error={errorMessage} 
        />
      );
      
      // Verifica que a mensagem de erro é exibida (não o helper text)
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.queryByText(helperText)).not.toBeInTheDocument();
      
      // Verifica a cor da mensagem de erro
      const errorElement = screen.getByText(errorMessage);
      expect(errorElement.className).toContain(errorColorMap[appearance]);
    });
  });

  // CT21: Helper Text Without Error Uses Appearance Colors
  it("CT21: helper text sem erro usa cores específicas da appearance", () => {
    const helperText = "Texto de ajuda normal";
    
    // Testa appearance default
    const { rerender } = render(
      <Input appearance="default" helperText={helperText} />
    );
    let helperElement = screen.getByText(helperText);
    expect(helperElement.className).toContain('text-gray-600');
    expect(helperElement.className).not.toContain('text-red');

    // Testa appearance minimal
    rerender(<Input appearance="minimal" helperText={helperText} />);
    helperElement = screen.getByText(helperText);
    expect(helperElement.className).toContain('text-white/70');
    expect(helperElement.className).not.toContain('text-red');

    // Testa appearance outlined
    rerender(<Input appearance="outlined" helperText={helperText} />);
    helperElement = screen.getByText(helperText);
    expect(helperElement.className).toContain('text-white/80');
    expect(helperElement.className).not.toContain('text-red');

    // Testa appearance outlined-white
    rerender(<Input appearance="outlined-white" helperText={helperText} />);
    helperElement = screen.getByText(helperText);
    expect(helperElement.className).toContain('text-white/80');
    expect(helperElement.className).not.toContain('text-red');
  });

  // CT22: Specific Error Color Test
  it("CT22: verifica cores específicas de erro por appearance sem conflitos", () => {
    const errorMessage = "Mensagem de erro";
    
    // Testa cada appearance individualmente
    const { rerender } = render(
      <Input appearance="default" error={errorMessage} />
    );
    let errorElement = screen.getByText(errorMessage);
    expect(errorElement.className).toContain('text-red-500');
    expect(errorElement.className).not.toContain('text-gray');
    expect(errorElement.className).not.toContain('text-white');

    // Minimal
    rerender(<Input appearance="minimal" error={errorMessage} />);
    errorElement = screen.getByText(errorMessage);
    expect(errorElement.className).toContain('text-red-300');
    expect(errorElement.className).not.toContain('text-white/70');

    // Outlined
    rerender(<Input appearance="outlined" error={errorMessage} />);
    errorElement = screen.getByText(errorMessage);
    expect(errorElement.className).toContain('text-red-400');
    expect(errorElement.className).not.toContain('text-white/80');

    // Outlined-white
    rerender(<Input appearance="outlined-white" error={errorMessage} />);
    errorElement = screen.getByText(errorMessage);
    expect(errorElement.className).toContain('text-red-300');
    expect(errorElement.className).not.toContain('text-white/80');
  });
});