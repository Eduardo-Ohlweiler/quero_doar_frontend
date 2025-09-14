import React from 'react';
import LevelAchievement from './LevelAchievement';

export default {
  title: 'Components/LevelAchievement',
  component: LevelAchievement,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente para celebrar a evolução de nível do usuário, exibindo o número do nível e uma frase personalizada com animações visuais.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'number', min: 1, max: 100, step: 1 },
      description: 'Número do nível alcançado pelo usuário',
    },
    phrase: {
      control: { type: 'text' },
      description: 'Frase personalizada para celebrar o nível',
    },
    show: {
      control: { type: 'boolean' },
      description: 'Exibir o componente (ativa a animação)',
    },
  },
};

export const Default = {
  args: {
    level: 5,
    phrase: "Parabéns! Você subiu de nível!",
  show: true,
  },
};

export const Variants = () => (
  <div className="flex flex-wrap gap-6 items-center justify-center p-4">
    <LevelAchievement level={1} phrase="Primeira conquista!" />
    <LevelAchievement level={5} phrase="Você está progredindo!" />
    <LevelAchievement level={10} phrase="Nível incrível alcançado!" />
    <LevelAchievement level={15} phrase="Você é uma lenda!" />
  </div>
);

export const Sizes = () => (
  <div className="flex flex-wrap gap-6 items-center justify-center p-4">
    <LevelAchievement level={2} phrase="Tamanho pequeno" />
    <LevelAchievement level={5} phrase="Tamanho médio padrão" />
    <LevelAchievement level={10} phrase="Tamanho grande chamativo" />
  </div>
);

export const Animations = () => {
  const [key, setKey] = React.useState(0);
  
  const triggerAnimations = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center p-4">
      <button 
        onClick={triggerAnimations}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Reproduzir Animações
      </button>
      <div className="flex flex-wrap gap-6 items-center justify-center">
        <LevelAchievement 
          key={`fadeIn-${key}`}
          level={1} 
          phrase="Animação Fade In" 
        />
        <LevelAchievement 
          key={`slideUp-${key}`}
          level={2} 
          phrase="Animação Slide Up" 
        />
        <LevelAchievement 
          key={`bounce-${key}`}
          level={3} 
          phrase="Animação Bounce" 
        />
        <LevelAchievement 
          key={`glow-${key}`}
          level={4} 
          phrase="Animação Glow" 
        />
      </div>
    </div>
  );
};

export const CustomPhrases = () => (
  <div className="flex flex-wrap gap-6 items-center justify-center p-4">
  <LevelAchievement level={1} phrase="Bem-vindo à jornada!" />
  <LevelAchievement level={25} phrase="Você está fazendo a diferença!" />
  <LevelAchievement level={50} phrase="Incrível! Continue assim!" />
  <LevelAchievement level={100} phrase="Lenda absoluta! Parabéns!" />
  </div>
);

export const Interactive = () => {
  const [level, setLevel] = React.useState(1);
  const [phrase, setPhrase] = React.useState('Parabéns pelo novo nível!');
  const [showAchievement, setShowAchievement] = React.useState(false);

  const levelUp = () => {
    setLevel(prev => prev + 1);
    setShowAchievement(true);
    setTimeout(() => setShowAchievement(false), 3000);
  };

  const phrases = [
    'Parabéns pelo novo nível!',
    'Você está evoluindo rapidamente!',
    'Incrível progresso conquistado!',
    'Continue assim, você é incrível!',
    'Que conquista fantástica!',
    'Você é uma verdadeira lenda!',
  ];

  React.useEffect(() => {
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  }, [level]);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="text-center">
        <p className="text-lg mb-2">Nível atual: <strong>{level}</strong></p>
        <button 
          onClick={levelUp}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
        >
          Subir de Nível! 🚀
        </button>
      </div>
      
      {showAchievement && (
        <LevelAchievement 
          level={level} 
          phrase={phrase}
          show={true}
          onAnimationComplete={() => console.log('Animação completada!')}
        />
      )}
    </div>
  );
};
