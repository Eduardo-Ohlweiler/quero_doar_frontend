import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginRegister from "../components/LoginRegister/LoginRegister";
import useFromTo from "../hooks/useFromTo";

const Login = () => {
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
    const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
    const { login, loading, register, requestPasswordReset } = useAuth();
    const navigate = useNavigate();
    const { fromTo, goBack } = useFromTo();

    const handleSignIn = async (formData) => {
        try {
            await login({ email: formData.email, password: formData.password });
            if(fromTo)
                goBack();
            else
                navigate('/');
        } catch (error) {
            alert(error.message || "Erro ao fazer login");
            console.error("Erro ao fazer login:", error);
        }
    };

    const handleSignUp = async (formData) => {
        // Validações básicas
        if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
            alert("Por favor, preencha todos os campos");
            return;
        }

        if (formData.password.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres");
            return;
        }

        // Validação básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Por favor, insira um email válido");
            return;
        }

        try {
            setSignUpLoading(true);
            
            // Criar o usuário
            await register({
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password
            });

            setSignUpSuccess(true);
            
        } catch (error) {
            console.error("Erro ao criar conta:", error);
            
            // Tratamento de erros específicos
            if (error.message.includes('409') || error.message.includes('already exists')) {
                alert("Este email já está em uso. Tente fazer login ou use outro email.");
            } else if (error.message.includes('400')) {
                alert("Dados inválidos. Verifique os campos e tente novamente.");
            } else if (error.response && error.response.data && error.response.data.message && error.response.data.message.includes('duplicar valor da chave viola a restrição de unicidade')) {
                alert("Este email já está em uso. Tente fazer login, recuperar sua senha ou use outro email.");
            } else {
                alert(error.message || "Erro ao criar conta. Tente novamente.");
            }
        } finally {
            setSignUpLoading(false);
        }
    };

    const handlePasswordReset = async (email) => {
        try {
            setResetPasswordLoading(true);
            await requestPasswordReset(email);
            setResetPasswordSuccess(true);
        } catch (error) {
            console.error("Erro ao solicitar recuperação de senha:", error);
            alert(error.message || "Erro ao solicitar recuperação de senha. Tente novamente.");
        } finally {
            setResetPasswordLoading(false);
        }
    };

    return (
        <div className="h-[var(--viewport-height-minus-header-minimal)] bg-[var(--color-primary)]">
            <LoginRegister 
                onSignIn={handleSignIn}
                onSignUp={handleSignUp}
                signInLoading={loading}
                signUpLoading={signUpLoading}
                signUpSuccess={signUpSuccess}
                setSignUpSuccess={setSignUpSuccess}
                resetPasswordSuccess={resetPasswordSuccess}
                setResetPasswordSuccess={setResetPasswordSuccess}
                resetPasswordLoading={resetPasswordLoading}
                onResetPassword={handlePasswordReset}
            />
        </div>
    );
};

export default Login;
