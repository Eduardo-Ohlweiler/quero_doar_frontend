// src/components/TextArea/TextArea.stories.jsx
import React from 'react';
import TextArea from './TextArea';

export default {
  title: 'Components/TextArea',
  component: TextArea,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    rows: { control: 'number' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

const Template = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Digite sua mensagem aqui...',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Mensagem',
  placeholder: 'Digite sua mensagem aqui...',
  required: true,
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Mensagem',
  placeholder: 'Digite sua mensagem aqui...',
  required: true,
  error: 'Este campo é obrigatório.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Mensagem',
  placeholder: 'Você não pode digitar aqui',
  disabled: true,
};

export const CustomRows = Template.bind({});
CustomRows.args = {
  label: 'Mensagem (10 linhas)',
  rows: 10,
};