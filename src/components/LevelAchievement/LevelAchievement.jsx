import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import { 
    levelAchievementStyles, 
    circleStyles,
    circleInnerStyles,
    bannerStyles,
    shadowStyles
} from './LevelAchievement.styles';

export default function LevelAchievement({ 
    level = 1,
    phrase = "LEVEL UP",
    show = true,
    onAnimationComplete,
    className,
    ...rest
}) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (!show) return;
        // inicia a animação fadeIn
        setIsAnimating(true);

        const timer = setTimeout(() => {
            setIsAnimating(false);
            if (onAnimationComplete) onAnimationComplete();
        }, 600); // mesma duração do fadeIn

        return () => clearTimeout(timer);
    }, [show, onAnimationComplete]);

    if (!show) return null;

    return (
        <div
            className={twMerge(
                clsx(
                    levelAchievementStyles(),
                    // isAnimating ? 'opacity-100 scale-100' : 'opacity-100 scale-100',
                    className
                )
            )}
            role="alert"
            aria-live="polite"
            aria-label={`Parabéns! Você alcançou o nível ${level}. ${phrase}`}
            {...rest}
        >
            {/* Sombra embaixo */}
            <div className={shadowStyles()} />

            {/* Círculo com número */}
            <div className={circleStyles()}>
                {/* Brilho interno */}
                <div className={circleInnerStyles()} />
                <span className="z-1 text-sm">Nível</span>
                {/* Número do nível */}
                <span className="z-1">{level}</span>
            </div>

            {/* Banner com texto personalizado */}
            <div className={bannerStyles()}>
                {/* Texto do banner */}
                {phrase}
            </div>
        </div>
    );
}

LevelAchievement.propTypes = {
    level: PropTypes.number.isRequired,
    phrase: PropTypes.string,
    onAnimationComplete: PropTypes.func,
    className: PropTypes.string,
};
