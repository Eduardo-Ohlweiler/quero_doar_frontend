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
});