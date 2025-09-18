//TODO: Deve aplicar as regras de senha aqui também, caso contrário o usuário pode por uma senha que vai ser invalida no momento do login

import React, { useState, useEffect } from 'react';
import PasswordRecovery from '../components/PasswordRecovery/PasswordRecovery';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PasswordRecoveryPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const { resetPassword } = useAuth();
    const [mode, setMode] = useState('reset'); // 'validating', 'invalid', 'reset', 'success'
    const [isResetting, setIsResetting] = useState(false);


    const submitResetPassword = async (newPassword) => {
        if (!token) {
            alert('Token de redefinição não fornecido. Não é possível redefinir a senha.');
            setMode('invalid');
            return;
        }

        setIsResetting(true);

        try {
            await resetPassword(token, newPassword);
            setMode('success');
        } catch (error) {
            console.error('Erro ao redefinir a senha:', error);
            setMode('invalid');
        } finally {
            setIsResetting(false);
        }
    };

    const handleGotoLogin = () => {
        navigate('/login');
    };

    return (
        <div className="h-[var(--viewport-height-minus-header-minimal)] bg-[var(--color-primary)]">
            <PasswordRecovery
                mode={mode}
                onGotoLogin={handleGotoLogin}
                onResetPassword={submitResetPassword}
                isResetting={isResetting}
            />
        </div>
    );
}
