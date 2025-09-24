import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, vi, describe, it, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import TopExperienceUser from './TopExperienceUser';

// Mock do UserAvatar
vi.mock('../UserAvatar/UserAvatar', () => ({
  default: ({ user, size, showLevel }) => (
    <div 
      data-testid="user-avatar" 
      data-size={size}
      data-show-level={showLevel}
      data-user-id={user?.userId}
    >
      Avatar: {user?.name}
    </div>
  )
}));

// Dados de teste
const mockUser = {
  userId: 14792,
  name: "Maria Silva",
  photo: "https://i.pravatar.cc/150?u=14792",
  level: 23,
  location: "São Paulo, SP",
  donationMonth: 47,
  expMonth: 2350
};

describe('TopExperienceUser component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // TC1: Renderização básica
  it('TC1: renders correctly with required props', () => {
    render(
      <TopExperienceUser
        user={mockUser}
        rank={1}
      />
    );

    expect(screen.getByText('Maria Silva')).toBeInTheDocument();
    expect(screen.getByText('São Paulo, SP')).toBeInTheDocument();
    expect(screen.getByText('47')).toBeInTheDocument();
    expect(screen.getByText('2.4k')).toBeInTheDocument(); // 2350 formatado
    expect(screen.getByText('DOAÇÕES')).toBeInTheDocument();
    expect(screen.getByText('PONTOS')).toBeInTheDocument();
    expect(screen.getByText('1º')).toBeInTheDocument();
  });

  // TC2: Variante podium - 1º lugar
  it('TC2: renders first place podium variant correctly', () => {
    render(
      <TopExperienceUser
        user={mockUser}
        rank={1}
        variant="podium"
      />
    );

    const container = screen.getByRole('button');
    expect(container).toHaveClass('max-w-xs');
    
    // Verifica se o avatar é renderizado com size large
    expect(screen.getByTestId('user-avatar')).toHaveAttribute('data-size', 'large');
    expect(screen.getByTestId('user-avatar')).toHaveAttribute('data-show-level', 'true');
  });

  // TC3: Variante podium - 2º lugar
  it('TC3: renders second place podium variant correctly', () => {
    render(
      <TopExperienceUser
        user={mockUser}
        rank={2}
        variant="podium"
      />
    );

    expect(screen.getByText('2º')).toBeInTheDocument();
  });

  // TC4: Variante podium - 3º lugar
  it('TC4: renders third place podium variant correctly', () => {
    render(
      <TopExperienceUser
        user={mockUser}
        rank={3}
        variant="podium"
      />
    );

    expect(screen.getByText('3º')).toBeInTheDocument();
  });

  // TC5: Variante default
  it('TC5: renders default variant correctly', () => {
    render(
      <TopExperienceUser
        user={mockUser}
        rank={15}
        variant="default"
      />
    );

    expect(screen.getByText('15º')).toBeInTheDocument();
    // Verifica se o avatar é renderizado com size medium
    expect(screen.getByTestId('user-avatar')).toHaveAttribute('data-size', 'medium');
  });

  // TC6: Callback onClick
  it('TC6: calls onClick with user data when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <TopExperienceUser
        user={mockUser}
        rank={1}
        onClick={handleClick}
      />
    );

    const card = screen.getByRole('button');
    await user.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockUser);
  });

  // TC7: Navegação por teclado
  it('TC7: handles keyboard navigation correctly', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <TopExperienceUser
        user={mockUser}
        rank={1}
        onClick={handleClick}
      />
    );

    const card = screen.getByRole('button');
    
    // Teste com Enter
    card.focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledWith(mockUser);

    // Teste com Espaço
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  // TC8: Formatação de números
  it('TC8: formats numbers correctly', () => {
    const userWithHighNumbers = {
      ...mockUser,
      level: 150,
      expMonth: 15000,
      donationMonth: 150
    };

    render(
      <TopExperienceUser
        user={userWithHighNumbers}
        rank={1}
      />
    );

    expect(screen.getByText('150')).toBeInTheDocument(); // donationMonth
    expect(screen.getByText('15k')).toBeInTheDocument(); // expMonth formatado
  });

  // TC9: Formatação de números - casos limites
  it('TC9: formats edge case numbers correctly', () => {
    const testCases = [
      { expMonth: 999, expected: '999' },
      { expMonth: 1000, expected: '1k' },
      { expMonth: 1500, expected: '1.5k' },
      { expMonth: 2000, expected: '2k' },
    ];

    testCases.forEach(({ expMonth, expected }) => {
      const { unmount } = render(
        <TopExperienceUser
          user={{ ...mockUser, expMonth }}
          rank={1}
        />
      );

      expect(screen.getByText(expected)).toBeInTheDocument();
      unmount();
    });
  });

  // TC10: Sem callback onClick
  it('TC10: works without onClick callback', () => {
    expect(() => {
      render(
        <TopExperienceUser
          user={mockUser}
          rank={1}
        />
      );
    }).not.toThrow();

    const card = screen.getByRole('button');
    expect(() => {
      fireEvent.click(card);
    }).not.toThrow();
  });

  // TC11: Aplicação de className customizada
  it('TC11: applies custom className', () => {
    render(
      <TopExperienceUser
        user={mockUser}
        rank={1}
        className="custom-class"
      />
    );

    const container = screen.getByRole('button');
    expect(container).toHaveClass('custom-class');
  });

  // TC12: Props adicionais são repassadas
  it('TC12: forwards additional props', () => {
    render(
      <TopExperienceUser
        user={mockUser}
        rank={1}
        data-testid="custom-top-experience-user"
        id="test-id"
      />
    );

    const container = screen.getByTestId('custom-top-experience-user');
    expect(container).toHaveAttribute('id', 'test-id');
  });

  // TC13: Acessibilidade
  it('TC13: has proper accessibility attributes', () => {
    render(
      <TopExperienceUser
        user={mockUser}
        rank={1}
      />
    );

    const container = screen.getByRole('button');
    expect(container).toHaveAttribute('tabIndex', '0');
    expect(container).toHaveAttribute('aria-label', '1º lugar - Maria Silva de São Paulo, SP');
  });

  // TC14: Nome longo é truncado
  it('TC14: handles long names correctly', () => {
    const userWithLongName = {
      ...mockUser,
      name: "Maria Fernanda dos Santos Silva de Oliveira"
    };

    render(
      <TopExperienceUser
        user={userWithLongName}
        rank={1}
      />
    );

    expect(screen.getByText('Maria Fernanda dos Santos Silva de Oliveira')).toBeInTheDocument();
  });

  // TC15: Localização longa é truncada
  it('TC15: handles long locations correctly', () => {
    const userWithLongLocation = {
      ...mockUser,
      location: "São Bernardo do Campo, São Paulo"
    };

    render(
      <TopExperienceUser
        user={userWithLongLocation}
        rank={1}
      />
    );

    expect(screen.getByText('São Bernardo do Campo, São Paulo')).toBeInTheDocument();
  });

  // TC16: Dados mínimos
  it('TC16: handles minimal data correctly', () => {
    const minimalUser = {
      userId: 1,
      name: "User",
      level: 1,
      location: "City",
      donationMonth: 0,
      expMonth: 0
    };

    render(
      <TopExperienceUser
        user={minimalUser}
        rank={100}
      />
    );

    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getAllByText('0')).toHaveLength(2); // Both donations and experience show 0
    expect(screen.getByText('100º')).toBeInTheDocument();
  });

  // TC17: UserAvatar recebe dados corretos
  it('TC17: passes correct data to UserAvatar', () => {
    render(
      <TopExperienceUser
        user={mockUser}
        rank={1}
      />
    );

    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toHaveAttribute('data-user-id', '14792');
    expect(avatar).toHaveAttribute('data-size', 'large');
    expect(avatar).toHaveAttribute('data-show-level', 'true');
  });

  // TC18: Não exibe badge quando rank não é passado
  it('TC18: does not display rank badge when rank is not provided', () => {
    render(
      <TopExperienceUser
        user={mockUser}
      />
    );

    expect(screen.queryByText('1º')).not.toBeInTheDocument();
    expect(screen.queryByText('2º')).not.toBeInTheDocument();
    expect(screen.queryByText('3º')).not.toBeInTheDocument();
    // Verifica que o nome ainda é exibido
    expect(screen.getByText('Maria Silva')).toBeInTheDocument();
  });

  // TC19: Usa variant default quando rank não é passado
  it('TC19: uses default variant when rank is not provided', () => {
    render(
      <TopExperienceUser
        user={mockUser}
      />
    );

    // Verifica que o UserAvatar recebe size medium (variant default)
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toHaveAttribute('data-size', 'medium');
  });

  // TC20: Usa padding correto quando não há badge
  it('TC20: applies correct padding when no badge is present', () => {
    const { container } = render(
      <TopExperienceUser
        user={mockUser}
      />
    );

    // Verifica se a classe pt-6 está presente (padding menor sem badge)
    const cardElement = container.querySelector('[class*="pt-6"]');
    expect(cardElement).toBeInTheDocument();
  });

  // TC21: Aria-label correto sem rank
  it('TC21: has correct aria-label without rank', () => {
    const { container } = render(
      <TopExperienceUser
        user={mockUser}
      />
    );

    const button = container.querySelector('[role="button"]');
    expect(button).toHaveAttribute('aria-label', 'Maria Silva de São Paulo, SP');
  });

  // TC22: Funciona com rank null
  it('TC22: works correctly with null rank', () => {
    render(
      <TopExperienceUser
        user={mockUser}
        rank={null}
      />
    );

    expect(screen.queryByText('º')).not.toBeInTheDocument();
    expect(screen.getByText('Maria Silva')).toBeInTheDocument();
  });

  // TC23: Funciona com rank undefined
  it('TC23: works correctly with undefined rank', () => {
    render(
      <TopExperienceUser
        user={mockUser}
        rank={undefined}
      />
    );

    expect(screen.queryByText('º')).not.toBeInTheDocument();
    expect(screen.getByText('Maria Silva')).toBeInTheDocument();
  });

  // TC24: Exibe ícone de coroa para primeiro lugar
  it('TC24: displays crown icon for first place', () => {
    const { container } = render(
      <TopExperienceUser
        user={mockUser}
        rank={1}
      />
    );

    const crownIcon = container.querySelector('svg');
    expect(crownIcon).toBeInTheDocument();
    expect(screen.getByText('1º')).toBeInTheDocument();
  });

  // TC25: Exibe ícone de medalha para segundo lugar
  it('TC25: displays medal icon for second place', () => {
    const { container } = render(
      <TopExperienceUser
        user={mockUser}
        rank={2}
      />
    );

    const medalIcon = container.querySelector('svg');
    expect(medalIcon).toBeInTheDocument();
    expect(screen.getByText('2º')).toBeInTheDocument();
  });

  // TC26: Exibe ícone de troféu para terceiro lugar
  it('TC26: displays award icon for third place', () => {
    const { container } = render(
      <TopExperienceUser
        user={mockUser}
        rank={3}
      />
    );

    const awardIcon = container.querySelector('svg');
    expect(awardIcon).toBeInTheDocument();
    expect(screen.getByText('3º')).toBeInTheDocument();
  });

  // TC27: Não exibe ícone para colocações acima de 3º
  it('TC27: does not display icon for ranks above 3rd place', () => {
    const { container } = render(
      <TopExperienceUser
        user={mockUser}
        rank={4}
      />
    );

    // Deve ter apenas o texto do rank, sem ícone
    const icons = container.querySelectorAll('svg');
    // Apenas o ícone de localização deve estar presente
    expect(icons.length).toBe(1); // Só o ícone de localização (FaMapMarkerAlt)
    expect(screen.getByText('4º')).toBeInTheDocument();
  });
});
