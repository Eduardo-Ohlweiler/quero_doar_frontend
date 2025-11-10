import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Para usar o .toBeInTheDocument()
import TeamMemberCard from './TeamMemberCard';

describe('Components/TeamMemberCard', () => {
  
  const mockProps = {
    imageUrl: 'https://via.placeholder.com/150',
    name: 'Jane Doe',
    role: 'Full-Stack Developer',
    altText: 'Foto de Jane Doe',
  };

  it('should render the name correctly', () => {
    render(<TeamMemberCard {...mockProps} />);
    // Verifica se o nome "Jane Doe" está no documento
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('should render the role correctly', () => {
    render(<TeamMemberCard {...mockProps} />);
    // Verifica se o cargo "Full-Stack Developer" está no documento
    expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument();
  });

  it('should render the image with correct alt text', () => {
    render(<TeamMemberCard {...mockProps} />);
    const image = screen.getByRole('img');
    
    // Verifica se a imagem tem o 'src' e 'alt' corretos
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150');
    expect(image).toHaveAttribute('alt', 'Foto de Jane Doe');
  });

  it('should use default alt text if altText prop is not provided', () => {
    // Cria props sem o altText opcional
    const propsWithoutAlt = {
      imageUrl: 'https://via.placeholder.com/150',
      name: 'John Smith',
      role: 'Tester',
    };
    
    render(<TeamMemberCard {...propsWithoutAlt} />);
    const image = screen.getByRole('img');
    
    // Verifica se ele cria o alt text padrão "Foto de John Smith"
    expect(image).toHaveAttribute('alt', 'Foto de John Smith');
  });
});