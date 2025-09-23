import { cva } from 'class-variance-authority';

export const lastDonationPreviewContainerStyles = cva([
    'w-full',
    // 'space-y-6',
    // 'p-0',
    // 'bg-white',
    'bg-transparent',
    // 'rounded-lg',
    // 'shadow-sm',
    // 'border',
    // 'border-gray-100'
]);

export const lastDonationPreviewHeaderStyles = cva([
    'space-y-2',
    'text-center',
    'mb-6'
]);

export const lastDonationPreviewTitleStyles = cva([
    'text-3xl',
    'font-bold',
    'text-gray-900',
    'mb-2'
]);

export const lastDonationPreviewLocationStyles = cva([
    'flex',
    'items-center',
    'justify-center',
    'gap-2',
    'text-lg',
    'text-gray-600',
    'font-medium'
]);

export const lastDonationPreviewGridStyles = cva([
    'grid',
    'grid-cols-1',
    'sm:grid-cols-2',
    'lg:grid-cols-3',
    'gap-6',
    'mb-8',
    'justify-items-center'
]);

export const lastDonationPreviewButtonContainerStyles = cva([
    'flex',
    'justify-center',
    'w-full'
]);
