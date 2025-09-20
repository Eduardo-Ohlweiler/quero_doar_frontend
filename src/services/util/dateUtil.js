export default class DateUtil  {

    // Utilitário para formatação de tempo relativo
    static formatTimeAgo(date) {
        if (!date) return '';
        
        const now = new Date();
        const targetDate = new Date(date);
        const diffInMinutes = Math.floor((now - targetDate) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Agora';
        if (diffInMinutes < 60) return `Há ${diffInMinutes}min`;
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `Há ${diffInHours}h`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `Há ${diffInDays} dias`;
        
        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) return `Há ${diffInWeeks} semanas`;
        
        const diffInMonths = Math.floor(diffInDays / 30);
        return `Há ${diffInMonths} meses`;
    };
}

export const formatTimeAgo = DateUtil.formatTimeAgo;