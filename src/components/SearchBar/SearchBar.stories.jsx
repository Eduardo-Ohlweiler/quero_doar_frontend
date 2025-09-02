import SearchBar from './SearchBar';

export default {
    title: 'Components/SearchBar',
    component: SearchBar,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Componente de barra de busca reutilizável com suporte a glassmorphism, diferentes aparências, tamanhos e estados de carregamento.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        appearance: {
            control: { type: 'select' },
            options: ['default', 'minimal', 'outlined'],
            description: 'Controla o estilo visual da barra de busca',
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Controla as dimensões da barra de busca',
        },
        iconPosition: {
            control: { type: 'select' },
            options: ['left', 'right'],
            description: 'Posição do ícone de busca',
        },
        loading: {
            control: { type: 'boolean' },
            description: 'Estado de carregamento',
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Desabilita o campo',
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Texto de orientação',
        },
        onSearch: {
            action: 'searched',
            description: 'Função chamada ao pressionar Enter',
        },
        onChange: {
            action: 'changed',
            description: 'Função chamada quando o valor muda',
        },
    },
    decorators: [
        (Story) => (
            <div
                className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center"
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    minHeight: '20vh',
                    minWidth: '100vh',
                    padding: '20px',
                }}
            >
                <div className="w-full max-w-md">
                    <Story />
                </div>
            </div>
        ),
    ],
};

// Story padrão
export const Default = {
    args: {
        placeholder: 'Buscar doações por categoria, local ou item...',
        onSearch: (value) => console.log('Searching for:', value),
        onChange: (e) => console.log('Value changed:', e.target.value),
    },
};

// Variações de aparência
export const Appearances = {
    render: (args) => (
        <div className="space-y-4 w-full">
            <div>
                <h3 className="text-white text-sm font-medium mb-2">Default</h3>
                <SearchBar {...args} appearance="default" />
            </div>
            <div>
                <h3 className="text-white text-sm font-medium mb-2">Minimal</h3>
                <SearchBar {...args} appearance="minimal" />
            </div>
            <div>
                <h3 className="text-white text-sm font-medium mb-2">Outlined</h3>
                <SearchBar {...args} appearance="outlined" />
            </div>
        </div>
    ),
    args: {
        placeholder: 'Buscar...',
    },
};

// Variações de tamanho
export const Sizes = {
    render: (args) => (
        <div className="space-y-4 w-full">
            <div>
                <h3 className="text-white text-sm font-medium mb-2">Small</h3>
                <SearchBar {...args} size="sm" />
            </div>
            <div>
                <h3 className="text-white text-sm font-medium mb-2">Medium</h3>
                <SearchBar {...args} size="md" />
            </div>
            <div>
                <h3 className="text-white text-sm font-medium mb-2">Large</h3>
                <SearchBar {...args} size="lg" />
            </div>
        </div>
    ),
    args: {
        placeholder: 'Buscar...',
        appearance: 'default',
    },
};

// Posições do ícone
export const IconPositions = {
    render: (args) => (
        <div className="space-y-4 w-full">
            <div>
                <h3 className="text-white text-sm font-medium mb-2">Ícone à Esquerda</h3>
                <SearchBar {...args} iconPosition="left" />
            </div>
            <div>
                <h3 className="text-white text-sm font-medium mb-2">Ícone à Direita</h3>
                <SearchBar {...args} iconPosition="right" />
            </div>
        </div>
    ),
    args: {
        placeholder: 'Buscar...',
        appearance: 'default',
    },
};

// Estado de carregamento
export const Loading = {
    render: (args) => (
        <div className="space-y-4 w-full">
            <div>
                <h3 className="text-white text-sm font-medium mb-2">Default Loading</h3>
                <SearchBar {...args} appearance="default" loading />
            </div>
            <div>
                <h3 className="text-white text-sm font-medium mb-2">Minimal Loading</h3>
                <SearchBar {...args} appearance="minimal" loading />
            </div>
            <div>
                <h3 className="text-white text-sm font-medium mb-2">Outlined Loading</h3>
                <SearchBar {...args} appearance="outlined" loading />
            </div>
        </div>
    ),
    args: {
        placeholder: 'Buscando...',
    },
};

// Estado desabilitado
export const Disabled = {
    render: (args) => (
        <div className="space-y-4 w-full">
            <div>
                <h3 className="text-white text-sm font-medium mb-2">Default Disabled</h3>
                <SearchBar {...args} appearance="default" disabled />
            </div>
            <div>
                <h3 className="text-white text-sm font-medium mb-2">Minimal Disabled</h3>
                <SearchBar {...args} appearance="minimal" disabled />
            </div>
            <div>
                <h3 className="text-white text-sm font-medium mb-2">Outlined Disabled</h3>
                <SearchBar {...args} appearance="outlined" disabled />
            </div>
        </div>
    ),
    args: {
        placeholder: 'Campo desabilitado...',
    },
};

// Exemplo interativo
export const Interactive = {
    args: {
        placeholder: 'Digite algo e pressione Enter...',
        onSearch: (value) => alert(`Você buscou por: "${value}"`),
        onChange: (e) => console.log('Digitando:', e.target.value),
    },
    parameters: {
        docs: {
            description: {
                story: 'Exemplo interativo onde você pode digitar e ver os eventos em ação. Digite algo e pressione Enter para ver o evento onSearch.',
            },
        },
    },
};

// Caso de uso real
export const RealWorldExample = {
    render: () => (
        <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-white text-2xl font-bold mb-2">Quero Doar</h2>
                <p className="text-white/80">Encontre doações na sua região</p>
            </div>
            <SearchBar
                placeholder="Buscar doações por categoria, local ou item..."
                appearance="default"
                size="lg"
                onSearch={(value) => console.log('Buscando:', value)}
                className="shadow-lg"
            />
            <div className="mt-4 text-center">
                <p className="text-white/60 text-sm">
                    Pressione Enter para buscar ou continue digitando para filtrar
                </p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Exemplo de como o componente seria usado na aplicação real do Quero Doar.',
            },
        },
    },
};
