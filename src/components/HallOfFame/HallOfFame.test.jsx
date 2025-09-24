import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import HallOfFame from './HallOfFame';

// Mock do TopExperienceUser
vi.mock('../TopExperienceUser/TopExperienceUser', () => ({
  default: ({ user, rank, onClick }) => (
    <div 
      data-testid={`top-user-${rank}`}
      data-user-id={user?.userId}
      onClick={() => onClick && onClick(user)}
      role="button"
    >
      {user?.name} - Rank {rank}
    </div>
  )
}));

// Dados de teste
const mockTopUsers = [
  {
    userId: 1,
    name: "Maria Silva",
    photo: "https://i.pravatar.cc/150?u=1",
    level: 15,
    location: "São Paulo, SP",
    donationMonth: 47,
    expMonth: 2350
  },
  {
    userId: 2,
    name: "João Santos",
    photo: "https://i.pravatar.cc/150?u=2",
    level: 12,
    location: "Rio de Janeiro, RJ",
    donationMonth: 35,
    expMonth: 1980
  },
  {
    userId: 3,
    name: "Ana Costa",
    photo: "https://i.pravatar.cc/150?u=3",
    level: 10,
    location: "Belo Horizonte, MG",
    donationMonth: 28,
    expMonth: 1650
  }
];

describe('HallOfFame component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // TC1: Renderização básica
  it('TC1: renders correctly with top users', () => {
    render(
      <HallOfFame topUsers={mockTopUsers} />
    );

    // Verifica se o título e subtítulo são exibidos
    expect(screen.getByText('Hall da Fama - Doadores do Mês')).toBeInTheDocument();
    expect(screen.getByText('Conheça os heróis que mais ajudaram nossa comunidade este mês')).toBeInTheDocument();

    // Verifica se os 3 usuários são renderizados
    expect(screen.getByTestId('top-user-1')).toBeInTheDocument();
    expect(screen.getByTestId('top-user-2')).toBeInTheDocument();
    expect(screen.getByTestId('top-user-3')).toBeInTheDocument();
  });

  // TC2: Renderização com lista vazia
  it('TC2: renders correctly with empty list', () => {
    render(
      <HallOfFame topUsers={[]} />
    );

    // Verifica se o título ainda é exibido
    expect(screen.getByText('Hall da Fama - Doadores do Mês')).toBeInTheDocument();

    // Verifica se os componentes TopExperienceUser não são renderizados
    expect(screen.queryByTestId('top-user-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('top-user-2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('top-user-3')).not.toBeInTheDocument();
  });

  // TC3: Renderização com apenas um usuário
  it('TC3: renders correctly with only one user', () => {
    render(
      <HallOfFame topUsers={[mockTopUsers[0]]} />
    );

    // Verifica se apenas o primeiro lugar é renderizado
    expect(screen.getByTestId('top-user-1')).toBeInTheDocument();
    expect(screen.queryByTestId('top-user-2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('top-user-3')).not.toBeInTheDocument();
  });

  // TC4: Renderização com dois usuários
  it('TC4: renders correctly with only two users', () => {
    render(
      <HallOfFame topUsers={[mockTopUsers[0], mockTopUsers[1]]} />
    );

    // Verifica se primeiro e segundo lugar são renderizados
    expect(screen.getByTestId('top-user-1')).toBeInTheDocument();
    expect(screen.getByTestId('top-user-2')).toBeInTheDocument();
    expect(screen.queryByTestId('top-user-3')).not.toBeInTheDocument();
  });

  // TC5: Callback onUserClick
  it('TC5: calls onUserClick when user is clicked', async () => {
    const user = userEvent.setup();
    const handleUserClick = vi.fn();

    render(
      <HallOfFame 
        topUsers={mockTopUsers} 
        onUserClick={handleUserClick}
      />
    );

    const firstPlaceUser = screen.getByTestId('top-user-1');
    await user.click(firstPlaceUser);

    expect(handleUserClick).toHaveBeenCalledTimes(1);
    expect(handleUserClick).toHaveBeenCalledWith(mockTopUsers[0]);
  });

  // TC6: Sem callback onUserClick
  it('TC6: works without onUserClick callback', async () => {
    const user = userEvent.setup();

    render(
      <HallOfFame topUsers={mockTopUsers} />
    );

    const firstPlaceUser = screen.getByTestId('top-user-1');
    
    // Não deve gerar erro ao clicar sem callback
    await expect(user.click(firstPlaceUser)).resolves.not.toThrow();
  });

  // TC7: Aplicação de className customizada
  it('TC7: applies custom className', () => {
    const customClass = 'custom-hall-of-fame';
    const { container } = render(
      <HallOfFame 
        topUsers={mockTopUsers}
        className={customClass}
      />
    );

    expect(container.firstChild).toHaveClass(customClass);
  });

  // TC8: Props adicionais são repassadas
  it('TC8: forwards additional props', () => {
    const testId = 'hall-of-fame-test';
    render(
      <HallOfFame 
        topUsers={mockTopUsers}
        data-testid={testId}
      />
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  // TC9: Estrutura do pódium
  it('TC9: renders podium structure correctly', () => {
    render(
      <HallOfFame topUsers={mockTopUsers} />
    );

    // Verifica se os usuários estão com os ranks corretos
    expect(screen.getByText('Maria Silva - Rank 1')).toBeInTheDocument();
    expect(screen.getByText('João Santos - Rank 2')).toBeInTheDocument();
    expect(screen.getByText('Ana Costa - Rank 3')).toBeInTheDocument();
  });

  // TC10: Dados dos usuários são passados corretamente
  it('TC10: passes correct user data to TopExperienceUser', () => {
    render(
      <HallOfFame topUsers={mockTopUsers} />
    );

    // Verifica se os user IDs são passados corretamente
    expect(screen.getByTestId('top-user-1')).toHaveAttribute('data-user-id', '1');
    expect(screen.getByTestId('top-user-2')).toHaveAttribute('data-user-id', '2');
    expect(screen.getByTestId('top-user-3')).toHaveAttribute('data-user-id', '3');
  });

  // TC11: Ícone do troféu é renderizado
  it('TC11: renders trophy icon', () => {
    render(
      <HallOfFame topUsers={mockTopUsers} />
    );

    // Verifica se existe um elemento com classe relacionada ao ícone do troféu
    const titleElement = screen.getByText('Hall da Fama - Doadores do Mês').parentElement;
    expect(titleElement.querySelector('svg')).toBeInTheDocument();
  });

  // TC12: Renderização com mais de 3 usuários
  it('TC12: renders only first 3 users when more than 3 are provided', () => {
    const moreUsers = [
      ...mockTopUsers,
      {
        userId: 4,
        name: "Carlos Lima",
        photo: "https://i.pravatar.cc/150?u=4",
        level: 8,
        location: "Salvador, BA",
        donationMonth: 20,
        expMonth: 1200
      }
    ];

    render(
      <HallOfFame topUsers={moreUsers} />
    );

    // Verifica se apenas os 3 primeiros são renderizados
    expect(screen.getByTestId('top-user-1')).toBeInTheDocument();
    expect(screen.getByTestId('top-user-2')).toBeInTheDocument();
    expect(screen.getByTestId('top-user-3')).toBeInTheDocument();
    
    // O quarto usuário não deve ser renderizado
    expect(screen.queryByText('Carlos Lima')).not.toBeInTheDocument();
  });
});
