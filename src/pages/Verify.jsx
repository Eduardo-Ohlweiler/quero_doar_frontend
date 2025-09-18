import React, { useState, useEffect } from "react";
import UserVerify from "../components/UserVerify/UserVerify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Verify() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const [componentMode, setComponentMode] = useState("loading"); // 'loading', 'activated', 'expired'
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { verifyAccountToken, resendVerificationEmail } = useAuth();

    useEffect(() => {
        const timer = setTimeout(async () => {
            
            if (!token) {
                console.error("Token de verificação não fornecido na URL");
                setComponentMode("expired");
                return;
            }

            try {
                await verifyAccountToken(token);
                setComponentMode("activated");
            } catch (error) {
                console.error("Erro ao verificar conta:", error);
                setComponentMode("expired");
                return;
            }
        }, 1000); // Espera 1s
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-[var(--viewport-height-minus-header-minimal)] bg-[var(--color-primary)]">
            <UserVerify 
                mode={componentMode} 
                onNavigateToLogin={() => {
                    navigate("/login");
                }}
                onResendVerificationEmail={async () => {
                    setIsLoading(true);
                    
                    if (!email) {
                        alert("Email não fornecido. Não é possível reenviar o email de verificação.");
                        setIsLoading(false);
                        return;
                    }

                    try {
                        await resendVerificationEmail(email);
                        alert("Email de verificação reenviado com sucesso. Verifique sua caixa de entrada.");
                    } catch (error) {
                        console.error("Erro ao reenviar email de verificação:", error);
                        alert("Erro ao reenviar email de verificação. Tente novamente mais tarde.");
                    } finally {
                        setIsLoading(false);
                    }

                }}
                isResending={isLoading}
            />
        </div>
    );
}