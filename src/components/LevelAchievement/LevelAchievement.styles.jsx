import { cva } from 'class-variance-authority';

// Simplified styles: no variants for color/size/animation — fixed layout
export const levelAchievementStyles = cva(
    'relative inline-flex flex-col items-center justify-center transform transition-all duration-500 ease-out animate-[fadeIn_0.7s_ease-out]'
);

export const circleStyles = cva(
    // 'relative flex items-center justify-center rounded-full shadow-lg font-bold w-60 h-60 text-9xl bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 text-yellow-900'
    'flex flex-col pb-16 items-center justify-center rounded-full font-bold w-60 h-60 text-9xl bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 text-yellow-900'
);

export const circleInnerStyles = cva(
    'absolute top-1.5 left-1.5 rounded-full pointer-events-none w-50 h-50 bg-gradient-to-br from-yellow-200/60 to-transparent'
);

export const bannerStyles = cva(
    'absolute h-10 w-75 bottom-10 flex items-center justify-center font-bold text-white shadow-lg bg-gradient-to-r from-red-600 via-red-700 to-red-600 transform text-lg \
    before:content-[""] before:block before:border-red-600 before:border-solid before:border-t-[1em] before:border-b-[1em] before:border-l-[0.8em] before:border-r-[1.5em] before:w-[3em] before:absolute before:top-[-1em] before:z-[-1] before:border-l-transparent before:border-r-red-800 before:left-[-1.50em]  \
    after:content-[""] after:block after:border-red-600 after:border-solid after:border-t-[1em] after:border-b-[1em] after:border-l-[1.5em] after:border-r-[0.8em] after:w-[3em] after:absolute after:top-[-1em] after:z-[-1] after:border-r-transparent after:border-l-red-800 after:right-[-1.55em]'
);

export const shadowStyles = cva(
    'absolute rounded-full bg-black/40 blur-sm w-30 h-5 -bottom-6'
);