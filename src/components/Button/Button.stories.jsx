import React from 'react';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    loading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export const Default = {
  args: {
    appearance: 'primary',
    size: 'medium',
    loading: false,
    disabled: false,
    children: 'Default Button',
  },
};

export const Variants = () => (
  <div className="flex flex-col gap-4 items-center">
    <Button appearance="primary">Primary</Button>
    <Button appearance="secondary">Secondary</Button>
    <Button appearance="ghost">Ghost</Button>
  </div>
);

export const Sizes = () => (
  <div className="flex flex-col gap-4 items-center">
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
  </div>
);

export const Loading = () => (
  <div className="flex flex-col gap-4 items-center">
    <Button loading appearance="primary">Primary</Button>
    <Button loading appearance="secondary">Secondary</Button>
    <Button loading appearance="ghost">Ghost</Button>
  </div>
);

export const Disabled = () => (
  <div className="flex flex-col gap-4 items-center">
    <Button disabled appearance="primary">Primary</Button>
    <Button disabled appearance="secondary">Secondary</Button>
    <Button disabled appearance="ghost">Ghost</Button>
  </div>
);
