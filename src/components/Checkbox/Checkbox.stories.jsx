import { useState } from 'react';
import Checkbox from './Checkbox';

export default {
    title: 'Components/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Componente de checkbox customizado seguindo o design system do projeto. Baseado no estilo do Button component.'
            }
        }
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
            description: 'Tamanho do checkbox'
        },
        checked: {
            control: { type: 'boolean' },
            description: 'Estado marcado do checkbox'
        },
        indeterminate: {
            control: { type: 'boolean' },
            description: 'Estado indeterminado do checkbox'
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Estado desabilitado do checkbox'
        },
        label: {
            control: { type: 'text' },
            description: 'Texto do label'
        },
        description: {
            control: { type: 'text' },
            description: 'Texto de descrição adicional'
        },
        count: {
            control: { type: 'number' },
            description: 'Contador exibido após o label'
        },
        onChange: { action: 'changed' }
    }
};

// Default
export const Default = {
    args: {
        label: 'Aceito os termos e condições',
        checked: false,
        disabled: false,
        size: 'medium'
    }
};

// Checked
export const Checked = {
    args: {
        label: 'Opção selecionada',
        checked: true,
        disabled: false,
        size: 'medium'
    }
};

// With Count
export const WithCount = {
    args: {
        label: 'Doações disponíveis',
        count: 42,
        checked: false,
        disabled: false,
        size: 'medium'
    }
};

// With Description
export const WithDescription = {
    args: {
        label: 'Receber notificações',
        description: 'Você receberá emails sobre novas doações na sua região',
        checked: false,
        disabled: false,
        size: 'medium'
    }
};

// Indeterminate
export const Indeterminate = {
    args: {
        label: 'Selecionar todas as categorias',
        indeterminate: true,
        checked: false,
        disabled: false,
        size: 'medium'
    }
};

// Disabled
export const Disabled = {
    args: {
        label: 'Opção desabilitada',
        checked: false,
        disabled: true,
        size: 'medium'
    }
};

// Disabled Checked
export const DisabledChecked = {
    args: {
        label: 'Opção desabilitada e marcada',
        checked: true,
        disabled: true,
        size: 'medium'
    }
};

// Sizes
export const Sizes = {
    render: () => (
        <div className="space-y-4">
            <Checkbox size="small" label="Small checkbox" count={5} />
            <Checkbox size="medium" label="Medium checkbox" count={15} />
            <Checkbox size="large" label="Large checkbox" count={25} />
        </div>
    )
};

// Interactive Group
export const InteractiveGroup = {
    render: () => {
        const [selectedItems, setSelectedItems] = useState(['item1']);

        const options = [
            { id: 'item1', label: 'Roupas', count: 120 },
            { id: 'item2', label: 'Eletrônicos', count: 85 },
            { id: 'item3', label: 'Livros', count: 200 },
            { id: 'item4', label: 'Móveis', count: 45 },
            { id: 'item5', label: 'Brinquedos', count: 95 }
        ];

        const handleChange = (itemId, checked) => {
            if (checked) {
                setSelectedItems([...selectedItems, itemId]);
            } else {
                setSelectedItems(selectedItems.filter(id => id !== itemId));
            }
        };

        const selectAll = () => {
            setSelectedItems(options.map(opt => opt.id));
        };

        const clearAll = () => {
            setSelectedItems([]);
        };

        const allSelected = selectedItems.length === options.length;
        const someSelected = selectedItems.length > 0 && selectedItems.length < options.length;

        return (
            <div className="space-y-4">
                <div className="flex gap-2 mb-4">
                    <button 
                        onClick={selectAll}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                    >
                        Selecionar todos
                    </button>
                    <button 
                        onClick={clearAll}
                        className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                    >
                        Limpar
                    </button>
                </div>
                
                <Checkbox
                    label="Selecionar todas as categorias"
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={(checked) => checked ? selectAll() : clearAll()}
                />
                
                <hr className="my-4" />
                
                <div className="space-y-3">
                    {options.map((option) => (
                        <Checkbox
                            key={option.id}
                            label={option.label}
                            count={option.count}
                            checked={selectedItems.includes(option.id)}
                            onChange={(checked) => handleChange(option.id, checked)}
                        />
                    ))}
                </div>
                
                <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
                    <strong>Selecionados:</strong> {selectedItems.join(', ') || 'Nenhum'}
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Exemplo interativo mostrando um grupo de checkboxes com "selecionar todos" e estado indeterminado.'
            }
        }
    }
};