import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RadioGroup from './RadioGroup';

describe('RadioGroup', () => {
    const mockOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
    ];

    const defaultProps = {
        name: 'test-radio',
        value: 'option1',
        options: mockOptions,
        onChange: vi.fn()
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Rendering', () => {
        it('should render all radio options', () => {
            render(<RadioGroup {...defaultProps} />);
            
            mockOptions.forEach(option => {
                expect(screen.getByText(option.label)).toBeInTheDocument();
            });
        });

        it('should render radio buttons with correct values', () => {
            render(<RadioGroup {...defaultProps} />);
            
            mockOptions.forEach(option => {
                const radio = screen.getByDisplayValue(option.value);
                expect(radio).toBeInTheDocument();
                expect(radio).toHaveAttribute('type', 'radio');
            });
        });

        it('should render with counts when provided', () => {
            const optionsWithCount = [
                { value: 'option1', label: 'Option 1', count: 10 },
                { value: 'option2', label: 'Option 2', count: 25 }
            ];
            
            render(<RadioGroup {...defaultProps} options={optionsWithCount} />);
            
            expect(screen.getByText('(10)')).toBeInTheDocument();
            expect(screen.getByText('(25)')).toBeInTheDocument();
        });

        it('should render with descriptions when provided', () => {
            const optionsWithDescription = [
                { value: 'option1', label: 'Option 1', description: 'Description 1' }
            ];
            
            render(<RadioGroup {...defaultProps} options={optionsWithDescription} />);
            
            expect(screen.getByText('Description 1')).toBeInTheDocument();
        });
    });

    describe('Selection', () => {
        it('should mark correct option as checked', () => {
            render(<RadioGroup {...defaultProps} value="option2" />);
            
            const option2Radio = screen.getByDisplayValue('option2');
            expect(option2Radio).toBeChecked();
            
            const option1Radio = screen.getByDisplayValue('option1');
            expect(option1Radio).not.toBeChecked();
        });

        it('should call onChange when option is selected', () => {
            const onChange = vi.fn();
            render(<RadioGroup {...defaultProps} onChange={onChange} />);
            
            const option2Radio = screen.getByDisplayValue('option2');
            fireEvent.click(option2Radio);
            
            expect(onChange).toHaveBeenCalledWith('option2', expect.any(Object));
        });

        it('should call onChange when clicking on label', () => {
            const onChange = vi.fn();
            render(<RadioGroup {...defaultProps} onChange={onChange} />);
            
            const option2Label = screen.getByText('Option 2');
            fireEvent.click(option2Label);
            
            expect(onChange).toHaveBeenCalledWith('option2', expect.any(Object));
        });
    });

    describe('Disabled State', () => {
        it('should disable all options when group is disabled', () => {
            render(<RadioGroup {...defaultProps} disabled={true} />);
            
            mockOptions.forEach(option => {
                const radio = screen.getByDisplayValue(option.value);
                expect(radio).toBeDisabled();
            });
        });

        it('should disable individual options', () => {
            const optionsWithDisabled = [
                { value: 'option1', label: 'Option 1', disabled: true },
                { value: 'option2', label: 'Option 2' }
            ];
            
            render(<RadioGroup {...defaultProps} options={optionsWithDisabled} />);
            
            const option1Radio = screen.getByDisplayValue('option1');
            const option2Radio = screen.getByDisplayValue('option2');
            
            expect(option1Radio).toBeDisabled();
            expect(option2Radio).not.toBeDisabled();
        });

        it('should not call onChange when disabled option is clicked', () => {
            const onChange = vi.fn();
            render(<RadioGroup {...defaultProps} disabled={true} onChange={onChange} />);
            
            const option2Radio = screen.getByDisplayValue('option2');
            fireEvent.click(option2Radio);
            
            expect(onChange).not.toHaveBeenCalled();
        });
    });

    describe('Orientation', () => {
        it('should apply vertical orientation by default', () => {
            const { container } = render(<RadioGroup {...defaultProps} />);
            
            expect(container.firstChild).toHaveClass('space-y-3');
        });

        it('should apply horizontal orientation', () => {
            const { container } = render(<RadioGroup {...defaultProps} orientation="horizontal" />);
            
            expect(container.firstChild).toHaveClass('flex');
            expect(container.firstChild).toHaveClass('flex-wrap');
        });
    });

    describe('Sizes', () => {
        it('should apply small size classes', () => {
            render(<RadioGroup {...defaultProps} size="small" />);
            
            const firstOption = screen.getByText('Option 1').closest('label');
            expect(firstOption).toHaveClass('gap-2');
        });

        it('should apply medium size classes (default)', () => {
            render(<RadioGroup {...defaultProps} size="medium" />);

            const firstOption = screen.getByText('Option 1').closest('label');
            expect(firstOption).toHaveClass('gap-2');
        });

        it('should apply large size classes', () => {
            render(<RadioGroup {...defaultProps} size="large" />);

            const firstOption = screen.getByText('Option 1').closest('label');
            expect(firstOption).toHaveClass('gap-3');
        });
    });

    describe('Accessibility', () => {
        it('should have radiogroup role', () => {
            render(<RadioGroup {...defaultProps} />);
            
            const radiogroup = screen.getByRole('radiogroup');
            expect(radiogroup).toBeInTheDocument();
        });

        it('should have same name for all radio buttons', () => {
            render(<RadioGroup {...defaultProps} name="custom-name" />);
            
            mockOptions.forEach(option => {
                const radio = screen.getByDisplayValue(option.value);
                expect(radio).toHaveAttribute('name', 'custom-name');
            });
        });

        it('should generate name when not provided', () => {
            render(<RadioGroup value="option1" options={mockOptions} onChange={vi.fn()} />);
            
            const firstRadio = screen.getByDisplayValue('option1');
            expect(firstRadio).toHaveAttribute('name');
            expect(firstRadio.name).toMatch(/^radio-group-/);
        });

        it('should associate labels with radio buttons', () => {
            render(<RadioGroup {...defaultProps} />);
            
            mockOptions.forEach(option => {
                const radio = screen.getByDisplayValue(option.value);
                expect(radio).toHaveAccessibleName(option.label);
            });
        });

        it('should use custom ids when provided', () => {
            const optionsWithId = [
                { value: 'option1', label: 'Option 1', id: 'custom-1' }
            ];
            
            render(<RadioGroup {...defaultProps} options={optionsWithId} />);
            
            const radio = screen.getByDisplayValue('option1');
            expect(radio).toHaveAttribute('id', 'custom-1');
        });
    });
});