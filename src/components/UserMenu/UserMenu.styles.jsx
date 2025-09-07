import { cva } from 'class-variance-authority';

export const userMenuStyles = {
    // Trigger (Avatar + Nome + Chevron)
    trigger: 'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-95',
    
    // Avatar
    avatar: 'w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/80 flex items-center justify-center overflow-hidden border border-white/30',
    
    // Iniciais do avatar
    avatarInitials: 'text-white text-sm font-semibold',
    
    // Nome do usuário
    userName: 'text-sm font-medium text-white hidden sm:block',
    
    // Chevron (seta)
    chevron: (isOpen) => `w-4 h-4 text-white/80 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`,
    
    // Menu dropdown
    menu: 'absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 backdrop-blur-sm',
    
    // Item do menu
    menuItem: 'flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-150 focus:outline-none focus:bg-gray-50 border-b border-gray-100 last:border-b-0',
    
    // Ícone do item do menu
    menuIcon: 'w-4 h-4 text-gray-500'
};
