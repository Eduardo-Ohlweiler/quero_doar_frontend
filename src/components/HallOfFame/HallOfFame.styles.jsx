import { cva } from 'class-variance-authority';

// Container principal do Hall of Fame
export const hallOfFameStyles = cva([
  'w-full',
  'min-h-[500px]',
  'bg-gradient-to-br',
  'from-primary-400',
  'to-primary-600',
  'rounded-2xl',
  'p-6',
  'text-white',
  'relative',
  'overflow-hidden'
]);

// Header do componente
export const hallOfFameHeaderStyles = cva([
  'text-center',
  'mb-8'
]);

// Título principal
export const hallOfFameTitleStyles = cva([
  'flex',
  'items-center',
  'justify-center',
  'gap-3',
  'text-2xl',
  'md:text-3xl',
  'font-bold',
  'mb-3'
]);

// Subtítulo
export const hallOfFameSubtitleStyles = cva([
  'text-primary-100',
  'text-sm',
  'md:text-base',
  'font-medium',
  'opacity-90'
]);

// Container do pódium
export const hallOfFamePodiumStyles = cva([
  'flex',
  'items-end',
  'justify-center',
  'gap-4',
  'md:gap-6',
  'max-w-4xl',
  'mx-auto'
]);

// Primeiro lugar (centro, mais alto)
export const hallOfFameFirstPlaceStyles = cva([
  'order-2',
  'flex-1',
  'max-w-xs',
  'transform',
  'scale-110',
  'z-10'
]);

// Segundo lugar (esquerda, altura média)
export const hallOfFameSecondPlaceStyles = cva([
  'order-1',
  'flex-1',
  'max-w-xs',
  'transform',
  'scale-95',
  'mt-8'
]);

// Terceiro lugar (direita, altura menor)
export const hallOfFameThirdPlaceStyles = cva([
  'order-3',
  'flex-1',
  'max-w-xs',
  'transform',
  'scale-95',
  'mt-8'
]);
