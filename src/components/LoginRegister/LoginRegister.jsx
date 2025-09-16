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
    FormVisibility
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

    const handleLoginFormSubmit = (e) => {
        e.preventDefault();
    };

    const handleRegisterFormSubmit = (e) => {
        e.preventDefault();
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
                        onSubmit={handleLoginFormSubmit}
                        role="login-form"
                        data-testid="login-form"
                        className={FormVisibility({ visible: !isSignUpMode })}
                    >
                        <div className={singleFormGroupStyles()} >
                            <h1 className={titleStyles()} >
                                Entrar
                            </h1>
                            <Button
                                appearance="ghost"
                                className="rounded-full m-2"
                                type="button"
                                onClick={() => alert(`${formData.email} ${formData.password}`)}
                            >
                                <FaGoogle />
                            </Button>
                            <span className={subtitleStyles()}>
                                ou informe seus dados para entrar
                            </span>
                            <div className="w-full space-y-3">
                                <Input
                                    type="email"
                                    label="E-mail"
                                    placeholder="Digite seu e-mail aqui"
                                    helperText="Informe seu e-mail utilizado no cadastro"
                                    appearance="outlined-white"
                                    value={formData.email}
                                    onChange={handleInputChange('email')}
                                    required
                                />
                                <Input
                                    type="password"
                                    label="Senha"
                                    placeholder="Digite sua senha aqui"
                                    helperText="Informe sua senha"
                                    appearance="outlined-white"
                                    value={formData.password}
                                    onChange={handleInputChange('password')}
                                    required
                                />
                            </div>
                            <a href="#" className={linkStyles()}>
                                    Esqueceu sua senha?
                            </a>
                            <Button
                                type="submit"
                                appearance="ghost"
                                size="medium"
                                loading={signInLoading}
                                className="mt-4 px-11 py-3 text-xs font-bold tracking-wide uppercase"
                            >
                                Entrar
                            </Button>
                        </div>
                    </form>

                    <form
                        onSubmit={handleRegisterFormSubmit}
                        role="register-form"
                        data-testid="register-form"
                        className={FormVisibility({ visible: isSignUpMode })}
                    >
                        <div className={singleFormGroupStyles()} >
                            <h1 className={titleStyles()}>
                                Criar Conta
                            </h1>
                            <Button
                                    appearance="ghost"
                                    className="rounded-full m-2"
                                    type="button"
                                    onClick={() => alert(`${formData.email} ${formData.password}`)}
                            >
                                    <FaGoogle />
                            </Button>
                            <span className={subtitleStyles()}>
                                ou use seu email para registro
                            </span>

                            <div className="w-full space-y-3">
                                <Input
                                    type="text"
                                    label="Nome"
                                    placeholder="Digite seu nome aqui"
                                    appearance="outlined-white"
                                    value={formData.name}
                                    onChange={handleInputChange('name')}
                                    required
                                />
                                <Input
                                    type="email"
                                    label="E-mail"
                                    placeholder="Digite seu e-mail aqui"
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
                                    appearance="outlined-white"
                                    value={formData.password}
                                    onChange={handleInputChange('password')}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                appearance="ghost"
                                size="medium"
                                loading={signUpLoading}
                                className="mt-4 px-11 py-3 text-xs font-bold tracking-wide uppercase"
                            >
                                Cadastrar
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
