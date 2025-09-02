import Logo from './Logo';

export default {
    title: 'Components/Logo',
    component: Logo,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Componente de logo reutilizável que permite exibir a marca em diferentes variações: completa, apenas símbolo ou apenas texto. Mantém a identidade visual da marca com cores e proporções consistentes.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['full', 'symbol', 'text'],
            description: 'Variação do logo: completo, apenas símbolo ou apenas texto',
        },
        size: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
            description: 'Tamanho do logo',
        },
        color: {
            control: { type: 'select' },
            options: ['primary', 'white', 'dark', 'current'],
            description: 'Cor do logo',
        },
        className: {
            control: { type: 'text' },
            description: 'Classes CSS adicionais',
        },
    },
};

// Story padrão
export const Default = {
    args: {},
};

// Variações do logo
export const Variants = {
    render: (args) => (
        <div className="space-y-8">
            <div className="text-center">
                <h3 className="text-gray-700 text-sm font-medium mb-4">Logo Completo</h3>
                <Logo {...args} variant="full" />
            </div>
            <div className="text-center">
                <h3 className="text-gray-700 text-sm font-medium mb-4">Apenas Símbolo</h3>
                <Logo {...args} variant="symbol" />
            </div>
            <div className="text-center">
                <h3 className="text-gray-700 text-sm font-medium mb-4">Apenas Texto</h3>
                <Logo {...args} variant="text" />
            </div>
        </div>
    ),
    args: {
        size: 'lg',
    },
};

// Tamanhos
export const Sizes = {
    render: (args) => (
        <div className="space-y-6">
            {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((size) => (
                <div key={size} className="flex items-center gap-4">
                    <span className="text-gray-600 text-sm w-8">{size}</span>
                    <Logo {...args} size={size} />
                </div>
            ))}
        </div>
    ),
    args: {
        variant: 'full',
    },
};

// Cores
export const Colors = {
    render: (args) => (
        <div className="space-y-8">
            <div className="p-6 bg-white rounded-lg border">
                <h3 className="text-gray-700 text-sm font-medium mb-4">Primary (Padrão)</h3>
                <Logo {...args} color="primary" />
            </div>
            <div className="p-6 bg-gray-900 rounded-lg">
                <h3 className="text-white text-sm font-medium mb-4">White</h3>
                <Logo {...args} color="white" />
            </div>
            <div className="p-6 bg-gray-100 rounded-lg">
                <h3 className="text-gray-700 text-sm font-medium mb-4">Dark</h3>
                <Logo {...args} color="dark" />
            </div>
            <div className="p-6 bg-blue-600 rounded-lg text-blue-100">
                <h3 className="text-blue-100 text-sm font-medium mb-4">Current (Herda cor do contexto)</h3>
                <Logo {...args} color="current" />
            </div>
        </div>
    ),
    args: {
        variant: 'full',
        size: 'lg',
    },
};

// Responsividade
export const Responsive = {
    render: (args) => (
        <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-gray-700 text-sm font-medium mb-4">Mobile (xs)</h3>
                <Logo {...args} size="xs" variant="symbol" />
                <span className="ml-2 text-xs text-gray-500">Apenas símbolo em mobile</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-gray-700 text-sm font-medium mb-4">Tablet (md)</h3>
                <Logo {...args} size="md" variant="full" />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-gray-700 text-sm font-medium mb-4">Desktop (xl)</h3>
                <Logo {...args} size="xl" variant="full" />
            </div>
        </div>
    ),
    args: {},
};

// Casos de uso reais
export const UseCases = {
    render: () => (
        <div className="space-y-8">
            {/* Header/Navbar */}
            <div className="p-4 bg-white border-b shadow-sm">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <Logo variant="full" size="md" />
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Menu</span>
                        <span className="text-gray-600">Perfil</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-8 bg-gray-900">
                <div className="max-w-6xl mx-auto">
                    <Logo variant="full" size="lg" color="white" className="mb-4" />
                    <p className="text-gray-400 text-sm max-w-md">
                        Conectando pessoas através da solidariedade. Transforme vidas com um simples gesto de doação.
                    </p>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="p-3 bg-white border-b shadow-sm">
                <div className="flex items-center justify-between">
                    <Logo variant="symbol" size="sm" />
                    <button className="p-2">
                        <span className="text-gray-600">☰</span>
                    </button>
                </div>
            </div>

            {/* Loading/Splash Screen */}
            <div className="p-16 bg-gradient-to-br from-teal-400 to-teal-600 text-center">
                <Logo variant="full" size="2xl" color="white" className="animate-pulse" />
                <p className="text-white/80 mt-4">Carregando...</p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Exemplos de como o logo pode ser usado em diferentes contextos da aplicação: header, footer, mobile e tela de carregamento.',
            },
        },
    },
};

// Teste de acessibilidade
export const Accessibility = {
    render: (args) => (
        <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-gray-700 text-sm font-medium mb-4">Com aria-label personalizado</h3>
                <Logo {...args} aria-label="Página inicial do Quero Doar" />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-gray-700 text-sm font-medium mb-4">Como link (simulado)</h3>
                <a href="#" className="inline-block hover:opacity-80 transition-opacity">
                    <Logo {...args} />
                </a>
            </div>
        </div>
    ),
    args: {
        variant: 'full',
        size: 'lg',
    },
    parameters: {
        docs: {
            description: {
                story: 'Exemplos de uso com foco em acessibilidade, incluindo aria-labels personalizados e uso como links.',
            },
        },
    },
};
