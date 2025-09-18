import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Spinner from '../Spinner/Spinner';
import { FaCheckCircle, FaExclamationTriangle, FaKey } from 'react-icons/fa';
import {
    containerStyles,
    contentStyles,
    titleStyles,
    messageStyles,
    iconStyles,
    buttonContainerStyles,
    formStyles
} from './PasswordRecovery.styles';

export default function PasswordRecovery({
    mode = 'validating',
    onGotoLogin,
    onResetPassword,
    isResetting = false,
    className,
    ...rest
}) {
    const [isVisible, setIsVisible] = useState(true);
    const [currentMode, setCurrentMode] = useState(mode);
    const [passwordData, setPasswordData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        if (mode !== currentMode) {
            // Fade out
            setIsVisible(false);
            
            // Change content after fade out, then fade in
            setTimeout(() => {
                setCurrentMode(mode);
                setIsVisible(true);
                // Reset form data when changing modes
                setPasswordData({ password: '', confirmPassword: '' });
                setPasswordError('');
            }, 250);
        }
    }, [mode, currentMode]);

    const handlePasswordChange = (field) => (e) => {
        const value = e.target.value;
        setPasswordData(prev => ({
            ...prev,
            [field]: value,
        }));

        // Clear error when user starts typing
        if (passwordError) {
            setPasswordError('');
        }
    };

    const handleResetPasswordSubmit = (e) => {
        e.preventDefault();
        
        if (!passwordData.password.trim() || !passwordData.confirmPassword.trim()) {
            setPasswordError('Todos os campos são obrigatórios');
            return;
        }

        if (passwordData.password !== passwordData.confirmPassword) {
            setPasswordError('As senhas não coincidem');
            return;
        }

        if (passwordData.password.length < 6) {
            setPasswordError('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        if (onResetPassword) {
            onResetPassword(passwordData.password);
        }
    };

    const renderContent = () => {
        if (currentMode === 'validating') {
            return (
                <div className={contentStyles({ mode: 'validating' })}>
                    <Spinner className={iconStyles({ type: 'loading' })} />
                    <h1 className={titleStyles({ type: 'loading' })}>
                        Validando Token
                    </h1>
                    <p className={messageStyles({ mode: 'loading' })}>
                        Aguarde enquanto validamos seu token de recuperação de senha...
                    </p>
                </div>
            );
        }

        if (currentMode === 'invalid') {
            return (
                <div className={contentStyles({ mode: 'invalid' })}>
                    <FaExclamationTriangle className={iconStyles({ type: 'error' })} />
                    <h1 className={titleStyles({ type: 'error' })}>
                        Token Inválido ou Expirado
                    </h1>
                    <p className={messageStyles()}>
                        O token de recuperação de senha não é válido ou está expirado. 
                        Solicite uma nova recuperação de senha para continuar.
                    </p>
                    <div className={buttonContainerStyles()}>
                        <Button
                            appearance="secondary"
                            size="medium"
                            onClick={onGotoLogin}
                            className="w-48"
                        >
                            Voltar ao Login
                        </Button>
                    </div>
                </div>
            );
        }

        if (currentMode === 'reset') {
            return (
                <div className={contentStyles({ mode: 'reset' })}>
                    <FaKey className={iconStyles({ type: 'info' })} />
                    <h1 className={titleStyles({ type: 'info' })}>
                        Redefinir Senha
                    </h1>
                    <p className={messageStyles()}>
                        Digite sua nova senha nos campos abaixo. Certifique-se de usar uma senha segura.
                    </p>
                    <form onSubmit={handleResetPasswordSubmit} className={formStyles()}>
                        <div className="w-full space-y-4">
                            <Input
                                type="password"
                                label="Nova Senha"
                                placeholder="Digite sua nova senha"
                                appearance="outlined-white"
                                value={passwordData.password}
                                onChange={handlePasswordChange('password')}
                                required
                            />
                            <Input
                                type="password"
                                label="Confirmar Senha"
                                placeholder="Confirme sua nova senha"
                                appearance="outlined-white"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange('confirmPassword')}
                                required
                            />
                            {passwordError && (
                                <p className="text-red-400 text-sm mt-2">{passwordError}</p>
                            )}
                        </div>
                        <div className={buttonContainerStyles()}>
                            <Button
                                appearance="ghost"
                                size="medium"
                                onClick={onGotoLogin}
                                type="button"
                                className="mr-4"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                appearance="secondary"
                                size="medium"
                                loading={isResetting}
                                className="w-48"
                            >
                                Redefinir Senha
                            </Button>
                        </div>
                    </form>
                </div>
            );
        }

        return (
            <div className={contentStyles({ mode: 'success' })}>
                <FaCheckCircle className={iconStyles({ type: 'success' })} />
                <h1 className={titleStyles({ type: 'success' })}>
                    Senha Redefinida com Sucesso!
                </h1>
                <p className={messageStyles()}>
                    Sua senha foi redefinida com sucesso. Agora você pode fazer login com sua nova senha.
                </p>
                <div className={buttonContainerStyles()}>
                    <Button
                        appearance="secondary"
                        size="medium"
                        onClick={onGotoLogin}
                        className="w-48"
                    >
                        Ir para Login
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

PasswordRecovery.propTypes = {
    mode: PropTypes.oneOf(['validating', 'invalid', 'reset', 'success']),
    onGotoLogin: PropTypes.func,
    onResetPassword: PropTypes.func,
    isResetting: PropTypes.bool,
    className: PropTypes.string,
};