import { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { FaGoogle } from 'react-icons/fa6';
import {
    containerStyles,
    formContainerStyles,
    formStyles,
    overlayContainerStyles,
    overlayStyles,
    overlayPanelStyles,
    socialContainerStyles,
    socialLinkStyles,
    titleStyles,
    subtitleStyles,
    textStyles,
    linkStyles,
    singleFormWrapperStyles,
    singleFormGroupStyles,
} from './LoginRegister.styles';

export default function LoginRegister({
    onSignIn,
    onSignUp,
    signInLoading = false,
    signUpLoading = false,
    className,
    ...rest
}) {
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    
    // Unified form state that adapts to current mode
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (isSignUpMode) {
            alert("Cadastro!");
            if (onSignUp) {
                onSignUp({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
            }
        } else {
            alert("Login\\Entrar!");
            if (onSignIn) {
                onSignIn({
                    email: formData.email,
                    password: formData.password,
                });
            }
        }
    };

    const toggleToSignUp = () => {
        setIsSignUpMode(true);
    };

    const toggleToSignIn = () => {
        setIsSignUpMode(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <style jsx>{`
                @keyframes show {
                    0%, 49.99% {
                        opacity: 0;
                        z-index: 1;
                    }
                    
                    50%, 100% {
                        opacity: 1;
                        z-index: 5;
                    }
                }
                
                .animate-show {
                    animation: show 0.6s;
                }
            `}</style>
            
            <div
                className={twMerge(
                    clsx(
                        containerStyles({ mode: isSignUpMode ? 'signUp' : 'signIn' }),
                        isSignUpMode && 'right-panel-active',
                        className
                    )
                )}
                {...rest}
            >
                {/* Single unified form container */}
                <div 
                    className={twMerge(clsx(formContainerStyles({ type: 'signIn', active: isSignUpMode })))}
                >
                    <form
                        onSubmit={handleFormSubmit}
                        role="form"
                    >
                        <div 
                            className={singleFormGroupStyles()}
                        >

                            <h1 className={titleStyles()}>
                                {isSignUpMode ? 'Criar Conta' : 'Entrar'}
                            </h1>

                            {/* Social login section - only show for sign up mode */}
                            {isSignUpMode && (
                                <div className={socialContainerStyles()}>
                                    <a href="#" className={socialLinkStyles()} aria-label="Cadastrar com Facebook">
                                        <i className="fab fa-facebook-f text-gray-600" />
                                    </a>
                                    <a href="#" className={socialLinkStyles()} aria-label="Cadastrar com Google">
                                        <i className="fab fa-google text-gray-600" />
                                    </a>
                                    <a href="#" className={socialLinkStyles()} aria-label="Cadastrar com LinkedIn">
                                        <i className="fab fa-linkedin-in text-gray-600" />
                                    </a>
                                </div>
                            )}

                            {/* Google button for sign in mode */}
                            {!isSignUpMode && (
                                <Button
                                    appearance="ghost"
                                    className="rounded-full m-2"
                                    type="button"
                                    onClick={() => alert(`${formData.email} ${formData.password}`)}
                                >
                                    <FaGoogle />
                                </Button>
                            )}

                            <span className={subtitleStyles()}>
                                {isSignUpMode ? 'ou use seu email para registro' : 'ou informe seus dados para entrar'}
                            </span>

                            <div className="w-full space-y-3">
                                {/* Name field - only visible in sign up mode */}
                                {isSignUpMode && (
                                    <Input
                                        type="text"
                                        label="Nome"
                                        placeholder="Digite seu nome aqui"
                                        helperText="Informe seu nome completo"
                                        appearance="outlined-white"
                                        value={formData.name}
                                        onChange={handleInputChange('name')}
                                        required
                                    />
                                )}
                                
                                {/* Email field - always visible */}
                                <Input
                                    type="email"
                                    label="E-mail"
                                    placeholder={isSignUpMode ? "Digite seu e-mail aqui" : "Digite seu e-mail aqui"}
                                    helperText={isSignUpMode ? "Informe um e-mail válido" : "Informe seu e-mail utilizado no cadastro"}
                                    appearance="outlined-white"
                                    value={formData.email}
                                    onChange={handleInputChange('email')}
                                    required
                                />
                                
                                {/* Password field - always visible */}
                                <Input
                                    type="password"
                                    label="Senha"
                                    placeholder="Digite sua senha aqui"
                                    helperText={isSignUpMode ? "Crie uma senha segura" : "Informe sua senha"}
                                    appearance="outlined-white"
                                    value={formData.password}
                                    onChange={handleInputChange('password')}
                                    required
                                />
                            </div>

                            {/* Forgot password link - only visible in sign in mode */}
                            {!isSignUpMode && (
                                <a href="#" className={linkStyles()}>
                                    Esqueceu sua senha?
                                </a>
                            )}

                            <Button
                                type="submit"
                                appearance={isSignUpMode ? "primary" : "ghost"}
                                size="medium"
                                loading={isSignUpMode ? signUpLoading : signInLoading}
                                className="mt-4 px-11 py-3 text-xs font-bold tracking-wide uppercase"
                            >
                                {isSignUpMode ? 'Cadastrar' : 'Entrar'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Overlay Container */}
                <div
                    className={twMerge(
                        clsx(
                            overlayContainerStyles({ active: isSignUpMode }),
                            isSignUpMode && 'transform -translate-x-full'
                        )
                    )}
                >
                    <div
                        className={twMerge(
                            clsx(
                                overlayStyles({ active: isSignUpMode }),
                                isSignUpMode && 'transform translate-x-1/2'
                            )
                        )}
                    >
                        {/* Left Overlay Panel */}
                        <div
                            className={twMerge(
                                clsx(
                                    overlayPanelStyles({ side: 'left', active: isSignUpMode }),
                                    isSignUpMode && 'transform translate-x-0'
                                )
                            )}
                        >
                            <h1 className="font-bold text-2xl text-white mb-0">Bem-vindo de volta!</h1>
                            <p className={textStyles()}>
                                Para se manter conectado conosco, faça login com suas informações pessoais
                            </p>
                            <Button
                                appearance="ghost"
                                size="medium"
                                onClick={toggleToSignIn}
                                className="px-11 py-3 text-xs font-bold tracking-wide uppercase border-white text-white hover:bg-white/10"
                            >
                                Entrar
                            </Button>
                        </div>

                        {/* Right Overlay Panel */}
                        <div
                            className={twMerge(
                                clsx(
                                    overlayPanelStyles({ side: 'right', active: isSignUpMode }),
                                    isSignUpMode && 'transform translate-x-[20%]'
                                )
                            )}
                        >
                            <h1 className="font-bold text-2xl text-white mb-0">Olá!</h1>
                            <p className={textStyles()}>
                                Insira seus dados pessoais e comece sua jornada conosco
                            </p>
                            <Button
                                appearance="ghost"
                                size="medium"
                                onClick={toggleToSignUp}
                                className="px-11 py-3 text-xs font-bold tracking-wide uppercase border-white text-white hover:bg-white/10"
                            >
                                Cadastrar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

LoginRegister.propTypes = {
    onSignIn: PropTypes.func,
    onSignUp: PropTypes.func,
    signInLoading: PropTypes.bool,
    signUpLoading: PropTypes.bool,
    className: PropTypes.string,
};
