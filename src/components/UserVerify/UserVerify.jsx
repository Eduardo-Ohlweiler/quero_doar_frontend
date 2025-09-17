import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import {
    containerStyles,
    contentStyles,
    titleStyles,
    messageStyles,
    iconStyles,
    buttonContainerStyles
} from './UserVerify.styles';

export default function UserVerify({
    mode = 'activated',
    onNavigateToLogin,
    onResendVerificationEmail,
    isResending = false,
    className,
    ...rest
}) {
    const [isVisible, setIsVisible] = useState(true);
    const [currentMode, setCurrentMode] = useState(mode);

    useEffect(() => {
        if (mode !== currentMode) {
            // Fade out
            setIsVisible(false);
            
            // Change content after fade out, then fade in
            setTimeout(() => {
                setCurrentMode(mode);
                setIsVisible(true);
            }, 250);
        }
    }, [mode, currentMode]);

    const renderContent = () => {
        if (currentMode === 'loading') {
            return (
                <div className={contentStyles({ mode: 'loading' })}>
                    <Spinner className={iconStyles({ type: 'loading' })} />
                    <h1 className={titleStyles({ type: 'loading' })}>
                        Validando Token
                    </h1>
                    <p className={messageStyles({ mode: 'loading' })}>
                        Aguarde enquanto validamos seu token de verificação...
                    </p>
                </div>
            );
        }

        if (currentMode === 'activated') {
            return (
                <div className={contentStyles({ mode: 'activated' })}>
                    <FaCheckCircle className={iconStyles({ type: 'success' })} />
                    <h1 className={titleStyles({ type: 'success' })}>
                        Conta Ativada com Sucesso!
                    </h1>
                    <p className={messageStyles()}>
                        Sua conta foi ativada com sucesso. Faça login e comece a transformar vidas com suas doações.
                    </p>
                    <div className={buttonContainerStyles()}>
                        <Button
                            appearance="secondary"
                            size="medium"
                            onClick={onNavigateToLogin}
                            className="w-48"
                        >
                            Ir para Login
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div className={contentStyles({ mode: 'expired' })}>
                <FaExclamationTriangle className={iconStyles({ type: 'error' })} />
                <h1 className={titleStyles({ type: 'error' })}>
                    Token Inválido ou Expirado
                </h1>
                <p className={messageStyles()}>
                    O token de verificação não é válido ou está expirado. <br />
                    Reenvie o e-mail de verificação.
                </p>
                
                <div className={buttonContainerStyles()}>
                    <Button
                        appearance="ghost"
                        size="medium"
                        onClick={onNavigateToLogin}
                        className="mr-4"
                    >
                        Voltar ao Login
                    </Button>
                    <Button
                        appearance="secondary"
                        size="medium"
                        onClick={onResendVerificationEmail}
                        loading={isResending}
                        className="w-52"
                    >
                        Reenviar Email
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div
                className={twMerge(
                    clsx(
                        containerStyles(),
                        isVisible ? 'animate-[fadeIn_0.5s_ease-in-out]' : 'animate-[fadeOut_0.25s_ease-in-out]',
                        className
                    )
                )}
                {...rest}
            >
                <div className={clsx(
                    'transition-opacity duration-500 ease-in-out',
                    isVisible ? 'opacity-100' : 'opacity-0'
                )}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

UserVerify.propTypes = {
    mode: PropTypes.oneOf(['activated', 'expired', 'loading']),
    onNavigateToLogin: PropTypes.func,
    onResendVerificationEmail: PropTypes.func,
    isResending: PropTypes.bool,
    className: PropTypes.string,
};