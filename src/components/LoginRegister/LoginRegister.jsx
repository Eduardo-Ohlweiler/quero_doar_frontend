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
        alert("Login\Entrar!");
        e.preventDefault();
        if (onSignIn) {
            onSignIn(signInForm);
        }
    };

    const handleSignUpSubmit = (e) => {
        alert("Cadastro!");
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
                {/* Single form that contains two groups which morph between each other */}
                <div 
                    className={twMerge(clsx(formContainerStyles({ type: 'signIn', active: isSignUpMode })))}
                >
                    <form
                        // className={twMerge(clsx(formStyles(), singleFormWrapperStyles()))}
                        onSubmit={(e) => {
                            e.preventDefault();
                            // submit according to current mode
                            if (isSignUpMode) {
                                handleSignUpSubmit(e);
                            } else {
                                handleSignInSubmit(e);
                            }
                        }}
                    >
                        {/* Sign In Group */}
                        <div
                            className={twMerge(
                                clsx(
                                    singleFormGroupStyles(),
                                    // when switching to signUp, move signIn group left and fade
                                    isSignUpMode && 'transform -translate-x-8 opacity-0 scale-95 pointer-events-none',
                                    !isSignUpMode && 'transform translate-x-0 opacity-100 scale-100'
                                )
                            )}
                        >
                            <h1 className={titleStyles()}>Entrar</h1>
                            {/* <div className={socialContainerStyles()}>
                                <a href="#" className={socialLinkStyles()} aria-label="Entrar com Facebook">
                                    <i className="fab fa-facebook-f text-gray-600" />
                                </a>
                                <a href="#" className={socialLinkStyles()} aria-label="Entrar com Google">
                                    <i className="fab fa-google text-gray-600" />
                                </a>
                                <a href="#" className={socialLinkStyles()} aria-label="Entrar com LinkedIn">
                                    <i className="fab fa-linkedin-in text-gray-600" />
                                </a>
                            </div> */}

                            <Button
                                appearance="ghost"
                                className="rounded-full m-2"
                                type="button"
                                onClick={() => alert(`${signInForm.email} ${signInForm.password}`)}
                            >
                                <FaGoogle />
                            </Button>

                            <span className={subtitleStyles()}>ou informe seus dados para entrar</span>

                            <div className="w-full space-y-3">
                                <Input
                                    type="email"
                                    label="E-mail"
                                    placeholder="Digite seu e-mail aqui"
                                    helperText="Informe seu e-mail utilizado no cadastro"
                                    appearance="outlined-white"
                                    value={signInForm.email}
                                    onChange={handleSignInInputChange('email')}
                                    required
                                />
                                <Input
                                    type="password"
                                    label="Senha"
                                    placeholder="Digite sua senha aqui"
                                    helperText="Informe sua senha"
                                    appearance="outlined-white"
                                    value={signInForm.password}
                                    onChange={handleSignInInputChange('password')}
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

                        {/* Sign Up Group */}
                        <div
                            className={twMerge(
                                clsx(
                                    singleFormGroupStyles(),
                                    // when in signUp mode bring group into view
                                    isSignUpMode && 'transform translate-x-0 opacity-100 scale-100 z-[5]',
                                    !isSignUpMode && 'transform translate-x-8 opacity-0 scale-95 pointer-events-none'
                                )
                            )}
                        >
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
