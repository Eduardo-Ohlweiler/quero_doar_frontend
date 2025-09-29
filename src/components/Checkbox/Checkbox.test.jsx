import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
    const defaultProps = {
        label: 'Test checkbox',
        checked: false,
        onChange: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Rendering', () => {
        it('should render checkbox with label', () => {
            render(<Checkbox {...defaultProps} />);
            
            expect(screen.getByText('Test checkbox')).toBeInTheDocument();
            expect(screen.getByRole('checkbox')).toBeInTheDocument();
        });

        it('should render checkbox without label', () => {
            render(<Checkbox checked={false} onChange={vi.fn()} />);
            
            expect(screen.getByRole('checkbox')).toBeInTheDocument();
        });

        it('should render with count', () => {
            render(<Checkbox {...defaultProps} count={42} />);
            
            expect(screen.getByText('(42)')).toBeInTheDocument();
        });

        it('should render with description', () => {
            render(<Checkbox {...defaultProps} description="Test description" />);
            
            expect(screen.getByText('Test description')).toBeInTheDocument();
        });
    });

    describe('States', () => {
        it('should render unchecked state', () => {
            render(<Checkbox {...defaultProps} checked={false} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox).not.toBeChecked();
        });

        it('should render checked state', () => {
            render(<Checkbox {...defaultProps} checked={true} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox).toBeChecked();
        });

        it('should render disabled state', () => {
            render(<Checkbox {...defaultProps} disabled={true} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox).toBeDisabled();
        });

        it('should render indeterminate state', () => {
            render(<Checkbox {...defaultProps} indeterminate={true} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox.indeterminate).toBe(true);
        });

        it('should render indeterminate state with checked=true', () => {
            render(<Checkbox {...defaultProps} checked={true} indeterminate={true} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox.indeterminate).toBe(true);
            expect(checkbox).toBeChecked(); // HTML propriedade checked permanece true
        });

        it('should render indeterminate state with checked=false', () => {
            render(<Checkbox {...defaultProps} checked={false} indeterminate={true} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox.indeterminate).toBe(true);
            expect(checkbox).not.toBeChecked();
        });

        it('should not be indeterminate when indeterminate=false', () => {
            render(<Checkbox {...defaultProps} indeterminate={false} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox.indeterminate).toBe(false);
        });

        it('should not be indeterminate by default', () => {
            render(<Checkbox {...defaultProps} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox.indeterminate).toBe(false);
        });
    });

    describe('Interactions', () => {
        it('should call onChange when clicked', () => {
            const onChange = vi.fn();
            render(<Checkbox {...defaultProps} onChange={onChange} />);
            
            const checkbox = screen.getByRole('checkbox');
            fireEvent.click(checkbox);
            
            expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
        });

        it('should call onChange with false when unchecking', () => {
            const onChange = vi.fn();
            render(<Checkbox {...defaultProps} checked={true} onChange={onChange} />);
            
            const checkbox = screen.getByRole('checkbox');
            fireEvent.click(checkbox);
            
            expect(onChange).toHaveBeenCalledWith(false, expect.any(Object));
        });

        it('should not call onChange when disabled', () => {
            const onChange = vi.fn();
            render(<Checkbox {...defaultProps} disabled={true} onChange={onChange} />);
            
            const checkbox = screen.getByRole('checkbox');
            fireEvent.click(checkbox);
            
            expect(onChange).not.toHaveBeenCalled();
        });

        it('should call onChange when clicking label', () => {
            const onChange = vi.fn();
            render(<Checkbox {...defaultProps} onChange={onChange} />);
            
            const label = screen.getByText('Test checkbox');
            fireEvent.click(label);
            
            expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
        });

        it('should call onChange when clicking indeterminate checkbox', () => {
            const onChange = vi.fn();
            render(<Checkbox {...defaultProps} indeterminate={true} checked={false} onChange={onChange} />);
            
            const checkbox = screen.getByRole('checkbox');
            fireEvent.click(checkbox);
            
            expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
        });

        it('should call onChange with correct value when clicking checked indeterminate checkbox', () => {
            const onChange = vi.fn();
            render(<Checkbox {...defaultProps} indeterminate={true} checked={true} onChange={onChange} />);
            
            const checkbox = screen.getByRole('checkbox');
            fireEvent.click(checkbox);
            
            expect(onChange).toHaveBeenCalledWith(false, expect.any(Object));
        });

        it('should not call onChange when indeterminate and disabled', () => {
            const onChange = vi.fn();
            render(<Checkbox {...defaultProps} indeterminate={true} disabled={true} onChange={onChange} />);
            
            const checkbox = screen.getByRole('checkbox');
            fireEvent.click(checkbox);
            
            expect(onChange).not.toHaveBeenCalled();
        });
    });

    describe('Sizes', () => {
        it('should apply small size classes', () => {
            const { container } = render(<Checkbox {...defaultProps} size="small" />);
            
            expect(container.firstChild).toHaveClass('gap-2');
        });

        it('should apply medium size classes (default)', () => {
            const { container } = render(<Checkbox {...defaultProps} size="medium" />);

            expect(container.firstChild).toHaveClass('gap-2');
        });

        it('should apply large size classes', () => {
            const { container } = render(<Checkbox {...defaultProps} size="large" />);

            expect(container.firstChild).toHaveClass('gap-3');
        });
    });

    describe('Indeterminate State', () => {
        it('should apply indeterminate styles when indeterminate=true', () => {
            render(<Checkbox {...defaultProps} indeterminate={true} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox).toHaveClass('!bg-[var(--color-primary)]');
            expect(checkbox).toHaveClass('!border-[var(--color-primary)]');
        });

        it('should not apply indeterminate styles when indeterminate=false', () => {
            render(<Checkbox {...defaultProps} indeterminate={false} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox).not.toHaveClass('!bg-[var(--color-primary)]');
        });

        it('should apply indeterminate styles even when checked=true', () => {
            render(<Checkbox {...defaultProps} checked={true} indeterminate={true} />);
            
            const checkbox = screen.getByRole('checkbox');
            // Indeterminate deve ter prioridade sobre checked
            expect(checkbox).toHaveClass('!bg-[var(--color-primary)]');
            expect(checkbox).toHaveClass('!border-[var(--color-primary)]');
            expect(checkbox.indeterminate).toBe(true);
        });

        it('should maintain checked state programmatically even when indeterminate', () => {
            render(<Checkbox {...defaultProps} checked={true} indeterminate={true} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox).toBeChecked(); // HTML checked attribute
            expect(checkbox.indeterminate).toBe(true); // JavaScript indeterminate property
        });

        it('should transition from indeterminate to checked when indeterminate becomes false', () => {
            const { rerender } = render(<Checkbox {...defaultProps} checked={true} indeterminate={true} />);
            
            let checkbox = screen.getByRole('checkbox');
            expect(checkbox.indeterminate).toBe(true);
            expect(checkbox).toBeChecked();
            
            // Re-render sem indeterminate
            rerender(<Checkbox {...defaultProps} checked={true} indeterminate={false} />);
            
            checkbox = screen.getByRole('checkbox');
            expect(checkbox.indeterminate).toBe(false);
            expect(checkbox).toBeChecked();
        });

        it('should transition from indeterminate to unchecked when both become false', () => {
            const { rerender } = render(<Checkbox {...defaultProps} checked={false} indeterminate={true} />);
            
            let checkbox = screen.getByRole('checkbox');
            expect(checkbox.indeterminate).toBe(true);
            expect(checkbox).not.toBeChecked();
            
            // Re-render sem indeterminate e sem checked
            rerender(<Checkbox {...defaultProps} checked={false} indeterminate={false} />);
            
            checkbox = screen.getByRole('checkbox');
            expect(checkbox.indeterminate).toBe(false);
            expect(checkbox).not.toBeChecked();
        });

        it('should handle rapid state changes correctly', () => {
            const { rerender } = render(<Checkbox {...defaultProps} checked={false} indeterminate={false} />);
            
            let checkbox = screen.getByRole('checkbox');
            expect(checkbox.indeterminate).toBe(false);
            expect(checkbox).not.toBeChecked();
            
            // Muda para indeterminate
            rerender(<Checkbox {...defaultProps} checked={false} indeterminate={true} />);
            checkbox = screen.getByRole('checkbox');
            expect(checkbox.indeterminate).toBe(true);
            
            // Muda para checked
            rerender(<Checkbox {...defaultProps} checked={true} indeterminate={false} />);
            checkbox = screen.getByRole('checkbox');
            expect(checkbox.indeterminate).toBe(false);
            expect(checkbox).toBeChecked();
            
            // Volta para indeterminate + checked
            rerender(<Checkbox {...defaultProps} checked={true} indeterminate={true} />);
            checkbox = screen.getByRole('checkbox');
            expect(checkbox.indeterminate).toBe(true);
            expect(checkbox).toBeChecked();
        });

        it('should work with all size variants when indeterminate', () => {
            const sizes = ['small', 'medium', 'large'];
            
            sizes.forEach(size => {
                const { container, unmount } = render(<Checkbox {...defaultProps} size={size} indeterminate={true} />);
                const checkbox = screen.getByRole('checkbox');
                
                expect(checkbox.indeterminate).toBe(true);
                expect(checkbox).toHaveClass('!bg-[var(--color-primary)]');
                
                // Limpa o componente antes do próximo teste
                unmount();
            });
        });

        it('should be accessible when indeterminate', () => {
            render(<Checkbox {...defaultProps} indeterminate={true} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox).toHaveAttribute('type', 'checkbox');
            expect(checkbox).toHaveAccessibleName('Test checkbox');
            expect(checkbox.indeterminate).toBe(true);
        });

        it('should work with custom id when indeterminate', () => {
            render(<Checkbox {...defaultProps} id="indeterminate-test" indeterminate={true} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox).toHaveAttribute('id', 'indeterminate-test');
            expect(checkbox.indeterminate).toBe(true);
        });
    });

    describe('Accessibility', () => {
        it('should have proper ARIA attributes', () => {
            render(<Checkbox {...defaultProps} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox).toHaveAttribute('type', 'checkbox');
        });

        it('should associate label with checkbox', () => {
            render(<Checkbox {...defaultProps} />);
            
            const checkbox = screen.getByRole('checkbox');
            const label = screen.getByText('Test checkbox');
            
            expect(checkbox).toHaveAccessibleName('Test checkbox');
        });

        it('should support custom id', () => {
            render(<Checkbox {...defaultProps} id="custom-id" />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox).toHaveAttribute('id', 'custom-id');
        });

        it('should generate id when not provided', () => {
            render(<Checkbox {...defaultProps} />);
            
            const checkbox = screen.getByRole('checkbox');
            expect(checkbox).toHaveAttribute('id');
            expect(checkbox.id).toMatch(/^checkbox-/);
        });
    });

    describe('Real-world Scenarios', () => {
        describe('Nested Selection (Parent-Child Relationship)', () => {
            it('should simulate parent checkbox in indeterminate state when some children are selected', () => {
                const onChange = vi.fn();
                
                // Simula um checkbox pai quando alguns filhos estão selecionados
                render(<Checkbox label="Select All" checked={false} indeterminate={true} onChange={onChange} />);
                
                const parentCheckbox = screen.getByRole('checkbox');
                expect(parentCheckbox.indeterminate).toBe(true);
                expect(parentCheckbox).not.toBeChecked();
                
                // Clicar deve selecionar todos (tornar checked=true, indeterminate=false)
                fireEvent.click(parentCheckbox);
                expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
            });

            it('should simulate parent checkbox transitioning from indeterminate to checked', () => {
                const { rerender } = render(<Checkbox label="Select All" checked={false} indeterminate={true} onChange={vi.fn()} />);
                
                let parentCheckbox = screen.getByRole('checkbox');
                expect(parentCheckbox.indeterminate).toBe(true);
                
                // Simula quando todos os filhos ficam selecionados
                rerender(<Checkbox label="Select All" checked={true} indeterminate={false} onChange={vi.fn()} />);
                
                parentCheckbox = screen.getByRole('checkbox');
                expect(parentCheckbox.indeterminate).toBe(false);
                expect(parentCheckbox).toBeChecked();
            });

            it('should simulate parent checkbox transitioning from checked to indeterminate', () => {
                const { rerender } = render(<Checkbox label="Select All" checked={true} indeterminate={false} onChange={vi.fn()} />);
                
                let parentCheckbox = screen.getByRole('checkbox');
                expect(parentCheckbox).toBeChecked();
                expect(parentCheckbox.indeterminate).toBe(false);
                
                // Simula quando um filho é desmarcado
                rerender(<Checkbox label="Select All" checked={false} indeterminate={true} onChange={vi.fn()} />);
                
                parentCheckbox = screen.getByRole('checkbox');
                expect(parentCheckbox.indeterminate).toBe(true);
                expect(parentCheckbox).not.toBeChecked();
            });
        });

        describe('Category Filter Scenarios', () => {
            it('should work as category filter with partial subcategory selection', () => {
                const onChange = vi.fn();
                
                // Simula categoria "Alimentos" com algumas subcategorias selecionadas
                render(
                    <Checkbox 
                        label="Alimentos" 
                        checked={false} 
                        indeterminate={true} 
                        count={3}
                        description="2 de 4 subcategorias selecionadas"
                        onChange={onChange} 
                    />
                );
                
                const categoryCheckbox = screen.getByRole('checkbox');
                expect(categoryCheckbox.indeterminate).toBe(true);
                expect(screen.getByText('(3)')).toBeInTheDocument();
                expect(screen.getByText('2 de 4 subcategorias selecionadas')).toBeInTheDocument();
                
                // Clicar deve selecionar todas as subcategorias
                fireEvent.click(categoryCheckbox);
                expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
            });

            it('should handle disabled indeterminate category', () => {
                const onChange = vi.fn();
                
                render(
                    <Checkbox 
                        label="Categoria Desabilitada" 
                        checked={false} 
                        indeterminate={true} 
                        disabled={true}
                        onChange={onChange} 
                    />
                );
                
                const categoryCheckbox = screen.getByRole('checkbox');
                expect(categoryCheckbox.indeterminate).toBe(true);
                expect(categoryCheckbox).toBeDisabled();
                
                fireEvent.click(categoryCheckbox);
                expect(onChange).not.toHaveBeenCalled();
            });
        });

        describe('Dynamic State Management', () => {
            it('should handle complex state transitions in form scenarios', () => {
                const TestComponent = () => {
                    const [isChecked, setIsChecked] = React.useState(false);
                    const [isIndeterminate, setIsIndeterminate] = React.useState(false);
                    const [selectedCount, setSelectedCount] = React.useState(0);

                    const handleChange = (checked) => {
                        if (isIndeterminate) {
                            // De indeterminate para checked (selecionar todos)
                            setIsChecked(true);
                            setIsIndeterminate(false);
                            setSelectedCount(4);
                        } else if (checked) {
                            // De unchecked para checked
                            setIsChecked(true);
                            setSelectedCount(4);
                        } else {
                            // De checked para unchecked
                            setIsChecked(false);
                            setSelectedCount(0);
                        }
                    };

                    return (
                        <div>
                            <Checkbox
                                label="Dynamic Checkbox"
                                checked={isChecked}
                                indeterminate={isIndeterminate}
                                count={selectedCount}
                                onChange={handleChange}
                            />
                            <button onClick={() => {
                                setIsChecked(false);
                                setIsIndeterminate(true);
                                setSelectedCount(2);
                            }}>
                                Set Indeterminate
                            </button>
                        </div>
                    );
                };

                render(<TestComponent />);
                
                const checkbox = screen.getByRole('checkbox');
                const setIndeterminateButton = screen.getByText('Set Indeterminate');
                
                // Estado inicial
                expect(checkbox).not.toBeChecked();
                expect(checkbox.indeterminate).toBe(false);
                
                // Definir como indeterminate
                fireEvent.click(setIndeterminateButton);
                expect(checkbox.indeterminate).toBe(true);
                expect(checkbox).not.toBeChecked();
                expect(screen.getByText('(2)')).toBeInTheDocument();
                
                // Clicar no checkbox indeterminate deve selecionar todos
                fireEvent.click(checkbox);
                expect(checkbox).toBeChecked();
                expect(checkbox.indeterminate).toBe(false);
                expect(screen.getByText('(4)')).toBeInTheDocument();
            });
        });
    });
});