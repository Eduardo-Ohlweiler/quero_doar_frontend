import React from 'react';
import TeamMemberCard from './TeamMemberCard';

export default {
  title: 'Components/TeamMemberCard', // Define o nome no menu do Storybook
  component: TeamMemberCard,
  argTypes: {
    imageUrl: { control: 'text' },
    name: { control: 'text' },
    role: { control: 'text' },
    altText: { control: 'text' },
  },
};

// Template base
const Template = (args) => <TeamMemberCard {...args} />;

// História 1: O card padrão
export const Default = Template.bind({});
Default.args = {
  imageUrl: 'https://via.placeholder.com/150/007BFF/FFFFFF?Text=User',
  name: 'Jane Doe',
  role: 'Full-Stack Developer',
  altText: 'Foto de perfil de Jane Doe',
};

// História 2: Testando nomes e cargos longos
export const LongText = Template.bind({});
LongText.args = {
  imageUrl: 'https://via.placeholder.com/150/28A745/FFFFFF?Text=User',
  name: 'Christopher Montgomery III',
  role: 'Senior Product Owner & Lead UX/UI Designer',
};