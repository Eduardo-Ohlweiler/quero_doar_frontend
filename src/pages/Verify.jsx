import React, { useState, useEffect } from "react";
import UserVerify from "../components/UserVerify/UserVerify";
import { useNavigate, useParams } from "react-router-dom";

export default function Verify() {
    const { token } = useParams();
    const [componentMode, setComponentMode] = useState("loading"); // 'loading', 'activated', 'expired'
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Simula a verificação do token
        const timer = setTimeout(() => {
            // Após a verificação, navega para a página de login
            setComponentMode("expired");
            // setComponentMode("activated");
        }, 1500); // Simula 5 segundos de verificação
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-[var(--viewport-height-minus-header-minimal)] bg-[var(--color-primary)]">
            <UserVerify 
                mode={componentMode} 
                onNavigateToLogin={() => {
                    navigate("/login");
                }}
                onResendVerificationEmail={() => {
                    alert("Reenviar email de verificação");
                }}
            />
        </div>
    );
}