import { useState } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa6';
import {
    containerStyles,
    formContainerStyles,
    overlayContainerStyles,
    overlayStyles,
    overlayPanelStyles,
    titleStyles,
    subtitleStyles,
    textStyles,
    linkStyles,
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
    const [isPasswordRecoveryMode, setIsPasswordRecoveryMode] = useState(false);
    
    const [signUpFormData, setSignUpFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [signInFormData, setSignInFormData] = useState({
        email: '',
        password: '',
    });

    const handleSignUpInputChange = (field) => (e) => {
        setSignUpFormData(prev => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleSignInInputChange = (field) => (e) => {
        setSignInFormData(prev => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleSignUpFormSubmit = (e) => {
        e.preventDefault();
        if (onSignIn) {
            onSignIn({
                name: signUpFormData.name,
                email: signUpFormData.email,
                password: signUpFormData.password,
            });
        }
    };

    const handlePasswordRecoverySubmit = (e) => {
        e.preventDefault();
        // Implement password recovery logic here
    };

    const handleSignInFormSubmit = (e) => {
        e.preventDefault();
        if (onSignIn) {
            onSignIn({
                email: signInFormData.email,
                password: signInFormData.password,
            });
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
                <div 
                    className={twMerge(clsx(formContainerStyles({ type: 'signIn', active: isSignUpMode })))}
                >

                    {/* Sign In Form */}
                    <form
                        onSubmit={handleSignInFormSubmit}
                        role="login-form"
                        data-testid="login-form"
                        className={FormVisibility({ visible: (!isSignUpMode && !isPasswordRecoveryMode) })}
                    >
                        <div className={singleFormGroupStyles()} >
                            <h1 className={titleStyles()} >
                                Entrar
                            </h1>
                            <div>
                                <Button
                                    appearance="ghost"
                                    className="rounded-full m-2"
                                    type="button"
                                    title="Não implementado"
                                >
                                    <FaApple />
                                </Button>
                                <Button
                                    appearance="ghost"
                                    className="rounded-full m-2"
                                    type="button"
                                    title="Não implementado"
                                >
                                    <FaGoogle />
                                </Button>
                                <Button
                                    appearance="ghost"
                                    className="rounded-full m-2"
                                    type="button"
                                    title="Não implementado"
                                >
                                    <FaFacebook />
                                </Button>
                            </div>
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
                                    value={signInFormData.email}
                                    onChange={handleSignInInputChange('email')}
                                    required
                                />
                                <Input
                                    type="password"
                                    label="Senha"
                                    placeholder="Digite sua senha aqui"
                                    helperText="Informe sua senha"
                                    appearance="outlined-white"
                                    value={signInFormData.password}
                                    onChange={handleSignInInputChange('password')}
                                    required
                                />
                            </div>
                            <a 
                                className={linkStyles()}
                                onClick={() => setIsPasswordRecoveryMode(true)}
                            >
                                    Esqueceu sua senha?
                            </a>
                            <Button
                                type="submit"
                                appearance="ghost"
                                size="medium"
                                loading={signInLoading}
                                className="mt-4 w-40"
                            >
                                Entrar
                            </Button>
                        </div>
                    </form>

                    {/* Sign Up Form */}
                    <form
                        onSubmit={handleSignUpFormSubmit}
                        role="register-form"
                        data-testid="register-form"
                        className={FormVisibility({ visible: isSignUpMode })}
                    >
                        <div className={singleFormGroupStyles()} >
                            <h1 className={titleStyles()}>
                                Criar Conta
                            </h1>
                            <div>
                                <Button
                                    appearance="ghost"
                                    className="rounded-full m-2"
                                    type="button"
                                    title="Não implementado"
                                >
                                    <FaApple />
                                </Button>
                                <Button
                                    appearance="ghost"
                                    className="rounded-full m-2"
                                    type="button"
                                    title="Não implementado"
                                >
                                    <FaGoogle />
                                </Button>
                                <Button
                                    appearance="ghost"
                                    className="rounded-full m-2"
                                    type="button"
                                    title="Não implementado"
                                >
                                    <FaFacebook />
                                </Button>
                            </div>
                            <span className={subtitleStyles()}>
                                ou use seu email para registro
                            </span>
                            <div className="w-full space-y-3">
                                <Input
                                    type="text"
                                    label="Nome"
                                    placeholder="Digite seu nome aqui"
                                    appearance="outlined-white"
                                    value={signUpFormData.name}
                                    onChange={handleSignUpInputChange('name')}
                                    required
                                />
                                <Input
                                    type="email"
                                    label="E-mail"
                                    placeholder="Digite seu e-mail aqui"
                                    appearance="outlined-white"
                                    value={signUpFormData.email}
                                    onChange={handleSignUpInputChange('email')}
                                    required
                                />
                                <Input
                                    type="password"
                                    label="Senha"
                                    placeholder="Digite sua senha aqui"
                                    appearance="outlined-white"
                                    value={signUpFormData.password}
                                    onChange={handleSignUpInputChange('password')}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                appearance="ghost"
                                size="medium"
                                loading={signUpLoading}
                                className="mt-6 w-40"
                            >
                                Cadastrar
                            </Button>
                        </div>
                    </form>

                    {/* Password Recovery Form */}
                    <form
                        onSubmit={handlePasswordRecoverySubmit}
                        role="password-recovery-form"
                        data-testid="password-recovery-form"
                        className={FormVisibility({ visible: (isPasswordRecoveryMode && !isSignUpMode) })}
                    >
                        <div className={singleFormGroupStyles()} >
                            <h1 className={clsx(titleStyles(), 'mb-8')} >
                                Recuperar Senha
                            </h1>
                            <span className={subtitleStyles()}>
                                Insira seu e-mail para receber instruções de recuperação
                            </span>
                            <div className="w-full space-y-3">
                                <Input
                                    type="email"
                                    label="E-mail"
                                    placeholder="Digite seu e-mail aqui"
                                    appearance="outlined-white"
                                    required
                                />
                            </div>
                            <div className="flex gap-4 mt-6">
                                <Button
                                    type="button"
                                    appearance="ghost"
                                    size="medium"
                                    onClick={() => setIsPasswordRecoveryMode(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    appearance="secondary"
                                    size="medium"
                                >
                                    Recuperar
                                </Button>
                            </div>
                            
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
                                className="w-30"
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
                                className="w-30"
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
