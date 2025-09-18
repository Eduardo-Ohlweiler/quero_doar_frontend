import Input from './Input';

export default {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Componente Input versátil baseado no padrão visual do SearchBar, com suporte a diferentes aparências, tamanhos, ícones e estados de validação.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        appearance: {
            control: 'select',
            options: ['default', 'minimal', 'outlined', 'outlined-white'],
            description: 'Aparência visual do input',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Tamanho do input',
        },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'tel', 'url'],
            description: 'Tipo do input HTML',
        },
        placeholder: {
            control: 'text',
            description: 'Texto de placeholder',
        },
        label: {
            control: 'text',
            description: 'Label do input',
        },
        helperText: {
            control: 'text',
            description: 'Texto de ajuda',
        },
        error: {
            control: 'text',
            description: 'Mensagem de erro',
        },
        required: {
            control: 'boolean',
            description: 'Campo obrigatório',
        },
        disabled: {
            control: 'boolean',
            description: 'Input desabilitado',
        },
        loading: {
            control: 'boolean',
            description: 'Estado de carregamento',
        },
        iconPosition: {
            control: 'select',
            options: ['left', 'right'],
            description: 'Posição do ícone',
        },
    },
};

// Template base
const Template = (args) => (
    <div className="w-80">
        <Input {...args} />
    </div>
);

// Template com fundo escuro para variantes minimal e outlined
const DarkTemplate = (args) => (
    <div className="w-80 p-6 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg">
        <Input {...args} />
    </div>
);

// Stories principais
export const Default = Template.bind({});
Default.args = {
    label: 'Nome completo',
    placeholder: 'Digite seu nome',
    helperText: 'Insira seu nome completo',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    label: 'Email',
    placeholder: 'Digite seu email',
    icon: '📧',
    type: 'email',
};

export const WithRightIcon = Template.bind({});
WithRightIcon.args = {
    label: 'Senha',
    placeholder: 'Digite sua senha',
    icon: '🔒',
    iconPosition: 'right',
    type: 'password',
};

export const Required = Template.bind({});
Required.args = {
    label: 'CPF',
    placeholder: 'Digite seu CPF',
    required: true,
    helperText: 'Campo obrigatório',
};

export const WithError = Template.bind({});
WithError.args = {
    label: 'Email',
    placeholder: 'Digite seu email',
    value: 'email-invalido',
    error: 'Por favor, insira um email válido',
    icon: '📧',
};

export const Loading = Template.bind({});
Loading.args = {
    label: 'Verificando disponibilidade',
    placeholder: 'Digite o nome de usuário',
    loading: true,
    value: 'usuario123',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Campo desabilitado',
    placeholder: 'Este campo está desabilitado',
    disabled: true,
    value: 'Valor fixo',
    helperText: 'Este campo não pode ser editado',
};

// Variantes de aparência
export const Minimal = DarkTemplate.bind({});
Minimal.args = {
    appearance: 'minimal',
    label: 'Nome de usuário',
    placeholder: 'Digite seu usuário',
    icon: '👤',
};

export const Outlined = DarkTemplate.bind({});
Outlined.args = {
    appearance: 'outlined',
    label: 'Buscar',
    placeholder: 'Digite para buscar',
    icon: '🔍',
};

export const OutlinedWhite = DarkTemplate.bind({});
OutlinedWhite.args = {
    appearance: 'outlined-white',
    label: 'Buscar com texto branco',
    placeholder: 'Digite para buscar',
    icon: '🔍',
};

// Tamanhos
export const Small = Template.bind({});
Small.args = {
    size: 'sm',
    label: 'Input pequeno',
    placeholder: 'Pequeno',
    icon: '🔍',
};

export const Medium = Template.bind({});
Medium.args = {
    size: 'md',
    label: 'Input médio',
    placeholder: 'Médio',
    icon: '🔍',
};

export const Large = Template.bind({});
Large.args = {
    size: 'lg',
    label: 'Input grande',
    placeholder: 'Grande',
    icon: '🔍',
};

// Diferentes tipos de input
export const EmailInput = Template.bind({});
EmailInput.args = {
    type: 'email',
    label: 'Email',
    placeholder: 'exemplo@email.com',
    icon: '✉️',
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
    type: 'password',
    label: 'Senha',
    placeholder: 'Digite sua senha',
    icon: '🔒',
    iconPosition: 'right',
};

export const NumberInput = Template.bind({});
NumberInput.args = {
    type: 'number',
    label: 'Idade',
    placeholder: '25',
    icon: '#️⃣',
};

export const PhoneInput = Template.bind({});
PhoneInput.args = {
    type: 'tel',
    label: 'Telefone',
    placeholder: '(11) 99999-9999',
    icon: '📱',
};

// Estados especiais
export const AllStates = () => (
    <div className="space-y-6 w-80">
        <Input
            label="Normal"
            placeholder="Estado normal"
            icon="🔍"
        />
        <Input
            label="Com foco"
            placeholder="Estado com foco"
            icon="🔍"
            autoFocus
        />
        <Input
            label="Com erro"
            placeholder="Estado com erro"
            icon="❌"
            error="Algo está errado"
        />
        <Input
            label="Carregando"
            placeholder="Estado carregando"
            loading={true}
        />
        <Input
            label="Desabilitado"
            placeholder="Estado desabilitado"
            disabled={true}
            icon="🚫"
        />
    </div>
);

// Comparação de aparências
export const AllAppearances = () => (
    <div className="space-y-6">
        <div className="space-y-4 w-80">
            <h3 className="text-lg font-semibold">Default</h3>
            <Input
                appearance="default"
                label="Input padrão"
                placeholder="Aparência padrão"
                icon="🔍"
            />
        </div>
        
        <div className="p-6 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg">
            <div className="space-y-4 w-80">
                <h3 className="text-lg font-semibold text-white">Minimal</h3>
                <Input
                    appearance="minimal"
                    label="Input minimal"
                    placeholder="Aparência minimal"
                    icon="🔍"
                />
            </div>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg">
            <div className="space-y-4 w-80">
                <h3 className="text-lg font-semibold text-white">Outlined</h3>
                <Input
                    appearance="outlined"
                    label="Input outlined"
                    placeholder="Aparência outlined"
                    icon="🔍"
                />
            </div>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg">
            <div className="space-y-4 w-80">
                <h3 className="text-lg font-semibold text-white">Outlined White</h3>
                <Input
                    appearance="outlined-white"
                    label="Input outlined com texto branco"
                    placeholder="Aparência outlined-white"
                    icon="🔍"
                />
            </div>
        </div>
    </div>
);

// Demonstração das cores do helper text
export const HelperTextColors = () => (
    <div className="space-y-6">
        {/* Helper text normal em fundo claro */}
        <div className="space-y-4 w-80">
            <h3 className="text-lg font-semibold">Default - Helper Text</h3>
            <Input
                appearance="default"
                label="Campo normal"
                placeholder="Digite algo"
                helperText="Este é um texto de ajuda em cinza"
                icon="💡"
            />
        </div>
        
        {/* Helper text em fundos escuros */}
        <div className="p-6 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">
                Helper Text em Fundo Escuro
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-md font-medium text-white mb-3">Minimal</h4>
                    <Input
                        appearance="minimal"
                        label="Campo minimal"
                        placeholder="Digite algo"
                        helperText="Helper text em branco/70% de opacidade"
                        icon="💡"
                    />
                </div>
                
                <div>
                    <h4 className="text-md font-medium text-white mb-3">Outlined</h4>
                    <Input
                        appearance="outlined"
                        label="Campo outlined"
                        placeholder="Digite algo"
                        helperText="Helper text em branco/80% de opacidade"
                        icon="💡"
                    />
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-md font-medium text-white mb-3">Outlined-White</h4>
                    <Input
                        appearance="outlined-white"
                        label="Campo outlined-white"
                        placeholder="Digite algo"
                        helperText="Helper text em branco/80% de opacidade"
                        icon="💡"
                    />
                </div>
                
                <div>
                    <h4 className="text-md font-medium text-white mb-3">Com Erro</h4>
                    <Input
                        appearance="outlined-white"
                        label="Campo com erro"
                        placeholder="Digite algo"
                        error="Mensagem de erro sempre em vermelho"
                        icon="❌"
                    />
                </div>
            </div>
        </div>
        
        {/* Comparação Error vs Helper Text */}
        <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🎨 Cores do Helper Text por Appearance
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                    <h4 className="font-medium text-gray-800 mb-2">Helper Text Normal:</h4>
                    <ul className="space-y-1 text-gray-600">
                        <li>• <strong>default:</strong> <code className="bg-gray-200 px-1 rounded">text-gray-600</code></li>
                        <li>• <strong>minimal:</strong> <code className="bg-gray-200 px-1 rounded">text-white/70</code></li>
                        <li>• <strong>outlined:</strong> <code className="bg-gray-200 px-1 rounded">text-white/80</code></li>
                        <li>• <strong>outlined-white:</strong> <code className="bg-gray-200 px-1 rounded">text-white/80</code></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-medium text-gray-800 mb-2">Mensagem de Erro:</h4>
                    <ul className="space-y-1 text-gray-600">
                        <li>• <strong>default:</strong> <code className="bg-gray-200 px-1 rounded">text-red-500</code></li>
                        <li>• <strong>minimal:</strong> <code className="bg-gray-200 px-1 rounded">text-red-300</code></li>
                        <li>• <strong>outlined:</strong> <code className="bg-gray-200 px-1 rounded">text-red-400</code></li>
                        <li>• <strong>outlined-white:</strong> <code className="bg-gray-200 px-1 rounded">text-red-300</code></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);