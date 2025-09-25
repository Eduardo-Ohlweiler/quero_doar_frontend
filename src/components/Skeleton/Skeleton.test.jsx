import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import Skeleton from "./Skeleton";

// CT1: Renderização de Variantes
describe("Skeleton component", () => {
  it("CT1: aplica classes corretas para cada variant", () => {
    const variants = ["rectangular", "circular", "text"];
    const variantClassMap = {
      rectangular: 'rounded-md', // padrão
      circular: 'rounded-full',
      text: 'rounded-sm'
    };

    variants.forEach((variant) => {
      cleanup();
      render(<Skeleton variant={variant} data-testid={`skeleton-${variant}`} />);
      const skeleton = screen.getByTestId(`skeleton-${variant}`);
      
      // Verifica se a classe base está presente
      expect(skeleton.className).toContain('animate-pulse');
      expect(skeleton.className).toContain('bg-gradient-to-r');
      
      // Verifica a classe específica da variante
      expect(skeleton.className).toContain(variantClassMap[variant]);
    });
  });

  // CT2: Verificar se o Skeleton respeita as props de tamanho e estilo
  it("CT2: aplica classes corretas para width, height e rounded", () => {
    const testCases = [
      { width: 'full', height: '4', rounded: 'md' },
      { width: '32', height: '8', rounded: 'lg' },
      { width: '64', height: '16', rounded: 'full' },
    ];

    testCases.forEach((testCase, index) => {
      cleanup();
      render(
        <Skeleton
          width={testCase.width}
          height={testCase.height}
          rounded={testCase.rounded}
          data-testid={`skeleton-${index}`}
        />
      );
      
      const skeleton = screen.getByTestId(`skeleton-${index}`);
      
      // Verifica width
      expect(skeleton.className).toContain(`w-${testCase.width}`);
      
      // Verifica height
      expect(skeleton.className).toContain(`h-${testCase.height}`);
      
      // Verifica rounded
      expect(skeleton.className).toContain(`rounded-${testCase.rounded}`);
    });
  });

  // CT3: Verificar acessibilidade
  it("CT3: aplica atributos de acessibilidade corretos", () => {
    render(<Skeleton data-testid="skeleton-a11y" />);
    const skeleton = screen.getByTestId("skeleton-a11y");
    
    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    expect(skeleton).toHaveAttribute('role', 'presentation');
  });

  // CT4: Renderizar children quando fornecido
  it("CT4: renderiza children quando fornecido", () => {
    render(
      <Skeleton data-testid="skeleton-with-children">
        <span>Loading content...</span>
      </Skeleton>
    );
    
    const skeleton = screen.getByTestId("skeleton-with-children");
    expect(skeleton).toContainHTML('<span>Loading content...</span>');
  });

  // CT5: Aplicar className customizada
  it("CT5: aplica className customizada", () => {
    render(<Skeleton className="custom-class" data-testid="skeleton-custom" />);
    const skeleton = screen.getByTestId("skeleton-custom");
    
    expect(skeleton.className).toContain('custom-class');
  });

  // CT6: Aplicar props adicionais
  it("CT6: aplica props adicionais corretamente", () => {
    render(<Skeleton data-custom="test-value" id="skeleton-id" data-testid="skeleton-additional" />);
    const skeleton = screen.getByTestId("skeleton-additional");
    
    expect(skeleton).toHaveAttribute('data-custom', 'test-value');
    expect(skeleton).toHaveAttribute('id', 'skeleton-id');
  });
});