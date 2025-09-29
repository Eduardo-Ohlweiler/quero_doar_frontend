import { useState } from 'react';
import RadioGroup from './RadioGroup';

export default {
    title: 'Components/RadioGroup',
    component: RadioGroup,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Componente de radio group customizado seguindo o design system do projeto. Baseado no estilo do Button component.'
            }
        }
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
            description: 'Tamanho dos radio buttons'
        },
        orientation: {
            control: { type: 'select' },
            options: ['vertical', 'horizontal'],
            description: 'Orientação do grupo'
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Estado desabilitado de todo o grupo'
        },
        onChange: { action: 'changed' }
    }
};

// Distance options mock
const distanceOptions = [
    { value: 'any', label: 'Qualquer distância' },
    { value: '2km', label: 'Até 2km' },
    { value: '5km', label: 'Até 5km' },
    { value: '10km', label: 'Até 10km' },
    { value: '50km', label: 'Até 50km' }
];

// Default
export const Default = {
    args: {
        name: 'distance',
        value: 'any',
        options: distanceOptions,
        size: 'medium',
        orientation: 'vertical',
        disabled: false
    }
};

// Horizontal
export const Horizontal = {
    args: {
        name: 'distance-horizontal',
        value: '5km',
        options: distanceOptions,
        size: 'medium',
        orientation: 'horizontal',
        disabled: false
    }
};

// Small Size
export const SmallSize = {
    args: {
        name: 'distance-small',
        value: '10km',
        options: distanceOptions,
        size: 'small',
        orientation: 'vertical',
        disabled: false
    }
};

// Large Size
export const LargeSize = {
    args: {
        name: 'distance-large',
        value: '2km',
        options: distanceOptions,
        size: 'large',
        orientation: 'vertical',
        disabled: false
    }
};

// Disabled
export const Disabled = {
    args: {
        name: 'distance-disabled',
        value: 'any',
        options: distanceOptions,
        size: 'medium',
        orientation: 'vertical',
        disabled: true
    }
};

// With Counts
export const WithCounts = {
    args: {
        name: 'categories',
        value: 'electronics',
        options: [
            { value: 'clothes', label: 'Roupas', count: 120 },
            { value: 'electronics', label: 'Eletrônicos', count: 85 },
            { value: 'books', label: 'Livros', count: 200 },
            { value: 'furniture', label: 'Móveis', count: 45 }
        ],
        size: 'medium',
        orientation: 'vertical',
        disabled: false
    }
};

// Interactive
export const Interactive = {
    render: () => {
        const [selectedDistance, setSelectedDistance] = useState('any');
        const [selectedCategory, setSelectedCategory] = useState('electronics');

        return (
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Filtro por Distância</h3>
                    <RadioGroup
                        name="distance-interactive"
                        value={selectedDistance}
                        options={distanceOptions}
                        onChange={setSelectedDistance}
                        size="medium"
                    />
                    <p className="mt-3 text-sm text-gray-600">
                        Selecionado: <strong>{selectedDistance}</strong>
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Filtro por Categoria</h3>
                    <RadioGroup
                        name="category-interactive"
                        value={selectedCategory}
                        options={[
                            { value: 'clothes', label: 'Roupas', count: 120 },
                            { value: 'electronics', label: 'Eletrônicos', count: 85 },
                            { value: 'books', label: 'Livros', count: 200 },
                            { value: 'furniture', label: 'Móveis', count: 45 }
                        ]}
                        onChange={setSelectedCategory}
                        size="medium"
                    />
                    <p className="mt-3 text-sm text-gray-600">
                        Selecionado: <strong>{selectedCategory}</strong>
                    </p>
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Exemplo interativo mostrando dois radio groups independentes com estados controlados.'
            }
        }
    }
};