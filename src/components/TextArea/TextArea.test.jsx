// src/components/TextArea/TextArea.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextArea from './TextArea';

describe('Components/TextArea', () => {

  it('should render the label correctly', () => {
    render(<TextArea label="Mensagem" />);
    expect(screen.getByText('Mensagem')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<TextArea placeholder="Digite aqui" />);
    expect(screen.getByPlaceholderText('Digite aqui')).toBeInTheDocument();
  });

  it('should show helper text', () => {
    render(<TextArea helperText="Texto de ajuda" />);
    expect(screen.getByText('Texto de ajuda')).toBeInTheDocument();
  });

  it('should show error text and have aria-invalid', () => {
    render(<TextArea label="Mensagem" error="Campo obrigatório" />);
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    // Acessa o textarea pelo seu 'label'
    const textarea = screen.getByLabelText(/Mensagem/i);
    expect(textarea).toBeInvalid();
  });

  it('should be disabled', () => {
    render(<TextArea label="Mensagem" disabled />);
    const textarea = screen.getByLabelText(/Mensagem/i);
    expect(textarea).toBeDisabled();
  });

  it('should handle controlled value and onChange', () => {
    // Função 'mock' para testar a chamada
    const handleChange = jest.fn();
    
    render(<TextArea label="Mensagem" value="Texto inicial" onChange={handleChange} />);
    
    const textarea = screen.getByLabelText(/Mensagem/i);
    expect(textarea.value).toBe('Texto inicial'); // Verifica valor inicial

    // Simula o usuário digitando
    fireEvent.change(textarea, { target: { value: 'Novo texto' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1); // Verifica se o onChange foi chamado
    // (O valor não muda porque estamos no modo 'controlado')
    expect(textarea.value).toBe('Texto inicial'); 
  });
});