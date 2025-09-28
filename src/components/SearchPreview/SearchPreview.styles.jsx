import { cva } from 'class-variance-authority';

export const searchPreviewContainerStyles = cva([
    'w-full',
    'bg-white',
    'rounded-lg',
    'shadow-sm',
    'border',
    'border-gray-200',
    'p-6',
    'space-y-6'
]);

export const searchPreviewHeaderStyles = cva([
    'flex',
    'flex-col',
    'sm:flex-row',
    'sm:items-center',
    'justify-between',
    'gap-4',
    'pb-4',
    'border-b',
    'border-gray-200'
]);

export const searchPreviewTitleStyles = cva([
    'flex',
    'items-center',
    'gap-2',
    'text-xl',
    'font-semibold',
    'text-gray-900',
    'leading-tight'
]);

export const searchPreviewResultCountStyles = cva([
    'text-sm',
    'text-gray-600',
    'font-medium'
]);

export const searchPreviewControlsStyles = cva([
    'flex',
    'items-center',
    'gap-4'
]);

export const searchPreviewViewToggleStyles = cva([
    'flex',
    'items-center',
    'gap-1',
    'p-1',
    'bg-gray-100',
    'rounded-lg'
]);

export const searchPreviewContentStyles = cva([
    'space-y-6'
]);

export const searchPreviewGridStyles = cva([
    'grid',
    'grid-cols-1',
    'sm:grid-cols-2',
    'lg:grid-cols-3',
    'gap-6'
]);

export const searchPreviewListStyles = cva([
    'space-y-4'
]);

export const searchPreviewEmptyStateStyles = cva([
    'py-16',
    'px-4'
]);

export const searchPreviewButtonContainerStyles = cva([
    'flex',
    'justify-center',
    'pt-6',
    'border-t',
    'border-gray-200'
]);

export const searchPreviewSkeletonStyles = cva([
    'animate-pulse'
]);
