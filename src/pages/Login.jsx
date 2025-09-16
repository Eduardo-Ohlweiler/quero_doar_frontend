import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginRegister from "../components/LoginRegister/LoginRegister";
import userService from "../services/user/userService";
import useFromTo from "../hooks/useFromTo";

const Login = () => {
    const [signUpLoading, setSignUpLoading] = useState(false);
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const { fromTo, goBack } = useFromTo();

    const handleSignIn = async (formData) => {
        try {
            await login({ email: formData.email, password: formData.password });
            
            // navigate(from, { replace: true });
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
            await userService.CreateUser({
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password
            });

            alert("Conta criada com sucesso! Agora você pode fazer login.");
            
        } catch (error) {
            console.error("Erro ao criar conta:", error);
            
            // Tratamento de erros específicos
            if (error.message.includes('409') || error.message.includes('already exists')) {
                alert("Este email já está em uso. Tente fazer login ou use outro email.");
            } else if (error.message.includes('400')) {
                alert("Dados inválidos. Verifique os campos e tente novamente.");
            } else {
                alert(error.message || "Erro ao criar conta. Tente novamente.");
            }
        } finally {
            setSignUpLoading(false);
        }
    };

    return (
        <div className="h-[var(--viewport-height-minus-header-minimal)] bg-[var(--color-primary)]">
            <LoginRegister 
                onSignIn={handleSignIn}
                onSignUp={handleSignUp}
                signInLoading={loading}
                signUpLoading={signUpLoading}
            />
        </div>
    );
};

export default Login;
