import { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import Button from '../Button/Button';
import Input from '../Input/Input';
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
    
    // Sign In form state
    const [signInForm, setSignInForm] = useState({
        email: '',
        password: '',
    });
    
    // Sign Up form state
    const [signUpForm, setSignUpForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSignInInputChange = (field) => (e) => {
        setSignInForm(prev => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleSignUpInputChange = (field) => (e) => {
        setSignUpForm(prev => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleSignInSubmit = (e) => {
        e.preventDefault();
        if (onSignIn) {
            onSignIn(signInForm);
        }
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        if (onSignUp) {
            onSignUp(signUpForm);
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
                {/* Sign Up Container */}
                <div
                    className={twMerge(
                        clsx(
                            formContainerStyles({ type: 'signUp', active: isSignUpMode }),
                            isSignUpMode && 'transform translate-x-full opacity-100 z-[5]',
                            isSignUpMode && 'animate-show'
                        )
                    )}
                >
                    <form className={formStyles()} onSubmit={handleSignUpSubmit}>
                        <h1 className={titleStyles()}>Criar Conta</h1>
                        
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
                        
                        <span className={subtitleStyles()}>ou use seu email para registro</span>
                        
                        <div className="w-full space-y-3">
                            <Input
                                type="text"
                                placeholder="Nome"
                                value={signUpForm.name}
                                onChange={handleSignUpInputChange('name')}
                                required
                                className="w-full"
                            />
                            <Input
                                type="email"
                                placeholder="Email"
                                value={signUpForm.email}
                                onChange={handleSignUpInputChange('email')}
                                required
                                className="w-full"
                            />
                            <Input
                                type="password"
                                placeholder="Senha"
                                value={signUpForm.password}
                                onChange={handleSignUpInputChange('password')}
                                required
                                className="w-full"
                            />
                        </div>
                        
                        <Button
                            type="submit"
                            appearance="primary"
                            size="medium"
                            loading={signUpLoading}
                            className="mt-4 px-11 py-3 text-xs font-bold tracking-wide uppercase"
                        >
                            Cadastrar
                        </Button>
                    </form>
                </div>

                {/* Sign In Container */}
                <div
                    className={twMerge(
                        clsx(
                            formContainerStyles({ type: 'signIn', active: isSignUpMode }),
                            isSignUpMode && 'transform translate-x-full'
                        )
                    )}
                >
                    <form className={formStyles()} onSubmit={handleSignInSubmit}>
                        <h1 className={titleStyles()}>Entrar</h1>
                        
                        <div className={socialContainerStyles()}>
                            <a href="#" className={socialLinkStyles()} aria-label="Entrar com Facebook">
                                <i className="fab fa-facebook-f text-gray-600" />
                            </a>
                            <a href="#" className={socialLinkStyles()} aria-label="Entrar com Google">
                                <i className="fab fa-google text-gray-600" />
                            </a>
                            <a href="#" className={socialLinkStyles()} aria-label="Entrar com LinkedIn">
                                <i className="fab fa-linkedin-in text-gray-600" />
                            </a>
                        </div>
                        
                        <span className={subtitleStyles()}>ou use sua conta</span>
                        
                        <div className="w-full space-y-3">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={signInForm.email}
                                onChange={handleSignInInputChange('email')}
                                required
                                className="w-full"
                            />
                            <Input
                                type="password"
                                placeholder="Senha"
                                value={signInForm.password}
                                onChange={handleSignInInputChange('password')}
                                required
                                className="w-full"
                            />
                        </div>
                        
                        <a href="#" className={linkStyles()}>
                            Esqueceu sua senha?
                        </a>
                        
                        <Button
                            type="submit"
                            appearance="primary"
                            size="medium"
                            loading={signInLoading}
                            className="mt-4 px-11 py-3 text-xs font-bold tracking-wide uppercase"
                        >
                            Entrar
                        </Button>
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
                            <h1 className="font-bold text-2xl text-white mb-0">Olá, Amigo!</h1>
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
