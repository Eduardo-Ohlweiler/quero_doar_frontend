import Spinner from './Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    strokeWidth: {
      control: { type: 'select' },
      options: ['thin', 'medium', 'thick'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'white', 'blue', 'green', 'red'],
    },
  },
};

export const Default = {
  args: {
    size: 'medium',
    strokeWidth: 'medium',
    color: 'primary',
  },
};

export const Sizes = () => (
  <div className="flex items-center gap-4 p-4">
    <Spinner size="small" />
    <Spinner size="medium" />
    <Spinner size="large" />
    <Spinner size="xlarge" />
  </div>
);

export const StrokeWidths = () => (
  <div className="flex items-center gap-4 p-4">
    <Spinner strokeWidth="thin" />
    <Spinner strokeWidth="medium" />
    <Spinner strokeWidth="thick" />
  </div>
);

export const Colors = () => (
  <div className="min-h-screen w-full flex flex-col gap-4 items-center justify-center m-4 bg-[url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center">
    <div className="flex items-center gap-4 p-4 bg-white/20 backdrop-blur-sm rounded-lg">
      <Spinner color="primary" />
      <Spinner color="white" />
      <Spinner color="blue" />
      <Spinner color="green" />
      <Spinner color="red" />
    </div>
  </div>
);
