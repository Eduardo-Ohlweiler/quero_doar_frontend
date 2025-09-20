import DonationPreview from './DonationPreview';

// Mock data para as stories
const mockUser = {
    firstName: 'Maria',
    lastName: 'Silva',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    level: 3
};

const mockDonation = {
    id: '1',
    title: 'Roupas Infantis (2-4 anos)',
    description: 'Lote com 15 peças de roupas infantis em ótimo estado. Inclui camisetas, calças e vestidos.',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    city: 'Vila Madalena',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
    user: mockUser
};

const mockRequest = {
    id: '2',
    title: 'Mesa de Estudos com Cadeira',
    description: 'Mesa de estudos em madeira com cadeira. Ideal para estudantes. Retirada até sexta-feira.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    city: 'Pinheiros',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
    user: {
        firstName: 'Carlos',
        lastName: 'Oliveira',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
        level: 5
    }
};

const mockLongTextDonation = {
    ...mockDonation,
    title: 'Coleção Completa de Livros Didáticos do Ensino Médio - Matemática, Português, História e Ciências',
    description: 'Esta é uma descrição muito longa para testar o comportamento de truncamento do texto no componente. Ela contém muito mais informações do que o limite estabelecido para garantir que o layout não seja quebrado. Inclui 50 livros didáticos do ensino médio. Matemática, português, história e ciências. Todos em bom estado de conservação e com anotações mínimas.',
};

export default {
    title: 'Components/DonationPreview',
    component: DonationPreview,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Componente para exibir preview de doações e solicitações de doação com dois layouts (vertical e horizontal).'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        layout: {
            control: { type: 'select' },
            options: ['vertical', 'horizontal'],
            description: 'Layout do componente'
        },
        isPublic: {
            control: { type: 'boolean' },
            description: 'Se a doação é pública ou privada'
        },
        isDonation: {
            control: { type: 'boolean' },
            description: 'Se é doação (true) ou solicitação (false)'
        },
        onClick: {
            action: 'card-clicked',
            description: 'Callback quando o card é clicado'
        },
        onActionClick: {
            action: 'action-clicked',
            description: 'Callback quando o botão de ação é clicado'
        }
    }
};

// Template base
const Template = (args) => (
    <div style={{ maxWidth: args.layout === 'vertical' ? '320px' : '600px' }}>
        <DonationPreview {...args} />
    </div>
);

// Stories principais

export const DonationVertical = Template.bind({});
DonationVertical.args = {
    donation: mockDonation,
    layout: 'vertical',
    isPublic: true,
    isDonation: true
};
DonationVertical.storyName = 'Doação - Layout Vertical';

export const DonationHorizontal = Template.bind({});
DonationHorizontal.args = {
    donation: mockDonation,
    layout: 'horizontal',
    isPublic: true,
    isDonation: true
};
DonationHorizontal.storyName = 'Doação - Layout Horizontal';

export const RequestVertical = Template.bind({});
RequestVertical.args = {
    donation: mockRequest,
    layout: 'vertical',
    isPublic: true,
    isDonation: false
};
RequestVertical.storyName = 'Solicitação - Layout Vertical';

export const RequestHorizontal = Template.bind({});
RequestHorizontal.args = {
    donation: mockRequest,
    layout: 'horizontal',
    isPublic: true,
    isDonation: false
};
RequestHorizontal.storyName = 'Solicitação - Layout Horizontal';

export const PrivateDonation = Template.bind({});
PrivateDonation.args = {
    donation: mockDonation,
    layout: 'vertical',
    isPublic: false,
    isDonation: true
};
PrivateDonation.storyName = 'Doação Privada';

export const PrivateRequest = Template.bind({});
PrivateRequest.args = {
    donation: mockRequest,
    layout: 'vertical',
    isPublic: false,
    isDonation: false
};
PrivateRequest.storyName = 'Solicitação Privada';

export const LongTextTruncation = Template.bind({});
LongTextTruncation.args = {
    donation: mockLongTextDonation,
    layout: 'vertical',
    isPublic: true,
    isDonation: true
};
LongTextTruncation.storyName = 'Truncamento de Texto Longo';

export const NoImage = Template.bind({});
NoImage.args = {
    donation: {
        ...mockDonation,
        image: null
    },
    layout: 'vertical',
    isPublic: true,
    isDonation: true
};
NoImage.storyName = 'Sem Imagem (Fallback)';

export const MinimalData = Template.bind({});
MinimalData.args = {
    donation: {
        id: '3',
        title: 'Item',
        description: 'Descrição',
        city: 'São Paulo',
        user: {
            firstName: 'Usuário',
            lastName: ''
        }
    },
    layout: 'vertical',
    isPublic: true,
    isDonation: true
};
MinimalData.storyName = 'Dados Mínimos';

// Grid de comparação
export const ComparisonGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <div>
            <h3 className="mb-4 text-lg font-semibold">Layout Vertical</h3>
            <div className="space-y-4">
                <DonationPreview
                    donation={mockDonation}
                    layout="vertical"
                    isPublic={true}
                    isDonation={true}
                />
                <DonationPreview
                    donation={mockRequest}
                    layout="vertical"
                    isPublic={true}
                    isDonation={false}
                />
                <DonationPreview
                    donation={mockDonation}
                    layout="vertical"
                    isPublic={false}
                    isDonation={true}
                />
            </div>
        </div>
        <div>
            <h3 className="mb-4 text-lg font-semibold">Layout Horizontal</h3>
            <div className="space-y-4">
                <DonationPreview
                    donation={mockDonation}
                    layout="horizontal"
                    isPublic={true}
                    isDonation={true}
                />
                <DonationPreview
                    donation={mockRequest}
                    layout="horizontal"
                    isPublic={true}
                    isDonation={false}
                />
                <DonationPreview
                    donation={mockDonation}
                    layout="horizontal"
                    isPublic={false}
                    isDonation={true}
                />
            </div>
        </div>
    </div>
);
ComparisonGrid.storyName = 'Comparação de Layouts';

// Grid de todos os estados
export const AllStates = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        <DonationPreview
            donation={mockDonation}
            layout="vertical"
            isPublic={true}
            isDonation={true}
        />
        <DonationPreview
            donation={mockRequest}
            layout="vertical"
            isPublic={true}
            isDonation={false}
        />
        <DonationPreview
            donation={mockDonation}
            layout="vertical"
            isPublic={false}
            isDonation={true}
        />
        <DonationPreview
            donation={mockRequest}
            layout="vertical"
            isPublic={false}
            isDonation={false}
        />
    </div>
);
AllStates.storyName = 'Todos os Estados';
