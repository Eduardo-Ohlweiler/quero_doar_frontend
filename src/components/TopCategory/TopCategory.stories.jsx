import React from 'react';
import TopCategory from './TopCategory';
import { FaTshirt, FaCouch, FaBook, FaTv, FaBaby, FaUtensils, FaGamepad, FaMusic } from 'react-icons/fa';

export default {
  title: 'Components/TopCategory',
  component: TopCategory,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Título da seção',
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Subtítulo descritivo',
    },
    maxCategories: {
      control: { type: 'number' },
      description: 'Número máximo de categorias a exibir',
    },
    onCategoryClick: {
      action: 'category-clicked',
      description: 'Função chamada ao clicar em uma categoria',
    },
  },
};

// Dados de exemplo para as stories
const mockCategories = [
  { donationId: 1, name: 'Roupas', donationAvailable: 247 },
  { donationId: 2, name: 'Móveis', donationAvailable: 89 },
  { donationId: 3, name: 'Livros e Material Escolar', donationAvailable: 156 },
  { donationId: 4, name: 'Eletrônicos', donationAvailable: 43 },
  { donationId: 5, name: 'Itens para Bebês', donationAvailable: 198 },
  { donationId: 6, name: 'Utensílios Domésticos', donationAvailable: 73 },
  { donationId: 7, name: 'Brinquedos', donationAvailable: 42 },
  { donationId: 8, name: 'Alimentos', donationAvailable: 67 },
];

export const Default = {
  args: {
    categories: mockCategories.slice(0, 5),
    title: "Categorias Populares",
    subtitle: "Encontre doações por categoria",
    maxCategories: 5,
  },
};

export const Top3Categories = {
  args: {
    categories: mockCategories,
    title: "Top 3 Categorias",
    subtitle: "As categorias mais procuradas",
    maxCategories: 3,
  },
};

export const AllCategories = {
  args: {
    categories: mockCategories,
    title: "Todas as Categorias",
    subtitle: "Explore todas as opções disponíveis",
    maxCategories: 8,
  },
};

export const EmptyState = {
  args: {
    categories: [],
    title: "Categorias Populares",
    subtitle: "Encontre doações por categoria",
  },
};

export const SingleCategory = {
  args: {
    categories: [mockCategories[0]],
    title: "Categoria em Destaque",
    subtitle: "A categoria mais popular do momento",
  },
};

export const CustomTitle = {
  args: {
    categories: mockCategories.slice(0, 5),
    title: "🔥 Categorias em Alta",
    subtitle: "As mais buscadas pelos usuários",
  },
};

export const Interactive = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <TopCategory
        categories={mockCategories}
        onCategoryClick={handleCategoryClick}
        title="Categorias Interativas"
        subtitle="Clique em uma categoria para ver os detalhes"
      />
      
      {selectedCategory && (
        <div className="mt-8 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Categoria Selecionada</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center">
              {selectedCategory.icon}
            </div>
            <div>
              <p className="font-medium">{selectedCategory.title}</p>
              <p className="text-sm text-gray-600">
                {selectedCategory.count} {selectedCategory.count === 1 ? 'item disponível' : 'itens disponíveis'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const WithBackground = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
    <TopCategory
      categories={mockCategories}
      title="Categorias Populares"
      subtitle="Encontre doações por categoria"
    />
  </div>
);
