import React from 'react';
import CategoryCard from './CategoryCard';
import { FaTshirt, FaBook, FaTv, FaUtensils, FaGamepad, FaCouch, FaBaby, FaMusic } from 'react-icons/fa';

export default {
  title: 'Components/CategoryCard',
  component: CategoryCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Nome da categoria',
    },
    count: {
      control: { type: 'number' },
      description: 'Quantidade de itens disponíveis',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Estado desabilitado',
    },
    onClick: {
      action: 'clicked',
      description: 'Função chamada ao clicar no card',
    },
  },
};

export const Default = {
  args: {
    title: 'Roupas',
    count: 247,
    disabled: false,
    children: <FaTshirt />,
  },
};

export const SingleItem = {
  args: {
    title: 'Livros',
    count: 1,
    children: <FaBook />,
  },
};

export const HighCount = {
  args: {
    title: 'Eletrônicos',
    count: 1234,
    children: <FaTv />,
  },
};

export const Disabled = {
  args: {
    title: 'Utensílios',
    count: 56,
    disabled: true,
    children: <FaUtensils />,
  },
};

export const AllCategories = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
    <CategoryCard title="Roupas" count={247}>
      <FaTshirt />
    </CategoryCard>
    <CategoryCard title="Livros" count={89}>
      <FaBook />
    </CategoryCard>
    <CategoryCard title="Eletrônicos" count={156}>
      <FaTv />
    </CategoryCard>
    <CategoryCard title="Utensílios" count={73}>
      <FaUtensils />
    </CategoryCard>
    <CategoryCard title="Jogos" count={42}>
      <FaGamepad />
    </CategoryCard>
    <CategoryCard title="Móveis" count={28}>
      <FaCouch />
    </CategoryCard>
    <CategoryCard title="Infantil" count={134}>
      <FaBaby />
    </CategoryCard>
    <CategoryCard title="Música" count={67}>
      <FaMusic />
    </CategoryCard>
  </div>
);

export const Interactive = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const categories = [
    { title: 'Roupas', count: 247, icon: <FaTshirt /> },
    { title: 'Livros', count: 89, icon: <FaBook /> },
    { title: 'Eletrônicos', count: 156, icon: <FaTv /> },
    { title: 'Utensílios', count: 73, icon: <FaUtensils /> },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            count={category.count}
            onClick={() => setSelectedCategory(category.title)}
          >
            {category.icon}
          </CategoryCard>
        ))}
      </div>
      {selectedCategory && (
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <p className="text-green-800">
            Categoria selecionada: <strong>{selectedCategory}</strong>
          </p>
        </div>
      )}
    </div>
  );
};
