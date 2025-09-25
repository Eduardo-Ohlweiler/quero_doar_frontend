import React, { useState, useEffect } from 'react';
import Skeleton from './Skeleton';

// Exemplo de uso do Skeleton com simulação de carregamento
export default function SkeletonExample() {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    // Simula carregamento de dados
    useEffect(() => {
        const timer = setTimeout(() => {
            setUserData({
                name: 'João Silva',
                email: 'joao@exemplo.com',
                avatar: '👤',
                bio: 'Desenvolvedor apaixonado por tecnologia e inovação. Sempre em busca de novos desafios e aprendizado contínuo.',
                stats: {
                    donations: 15,
                    points: 1250
                }
            });
            setIsLoading(false);
        }, 3000); // 3 segundos de simulação

        return () => clearTimeout(timer);
    }, []);

    const toggleLoading = () => {
        setIsLoading(!isLoading);
        if (!isLoading) {
            setUserData(null);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <div className="mb-4">
                <button
                    onClick={toggleLoading}
                    className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-80 transition-opacity"
                >
                    {isLoading ? 'Parar Carregamento' : 'Simular Carregamento'}
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                {isLoading ? (
                    // Estado de carregamento com Skeleton
                    <>
                        {/* Header com avatar e nome */}
                        <div className="flex items-center space-x-4 mb-4">
                            <Skeleton variant="circular" width="16" height="16" />
                            <div className="flex-1 space-y-2">
                                <Skeleton variant="text" width="48" height="5" />
                                <Skeleton variant="text" width="32" height="3" />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-2 mb-6">
                            <Skeleton variant="text" width="full" height="4" />
                            <Skeleton variant="text" width="80" height="4" />
                            <Skeleton variant="text" width="64" height="4" />
                        </div>

                        {/* Stats */}
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <Skeleton width="full" height="16" rounded="lg" />
                            </div>
                            <div className="flex-1">
                                <Skeleton width="full" height="16" rounded="lg" />
                            </div>
                        </div>
                    </>
                ) : (
                    // Estado com dados carregados
                    <>
                        {/* Header com avatar e nome */}
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-2xl text-white">
                                {userData.avatar}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {userData.name}
                                </h2>
                                <p className="text-gray-600">{userData.email}</p>
                            </div>
                        </div>

                        {/* Bio */}
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            {userData.bio}
                        </p>

                        {/* Stats */}
                        <div className="flex space-x-4">
                            <div className="flex-1 bg-green-50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {userData.stats.donations}
                                </div>
                                <div className="text-sm text-green-700">Doações</div>
                            </div>
                            <div className="flex-1 bg-blue-50 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {userData.stats.points}
                                </div>
                                <div className="text-sm text-blue-700">Pontos</div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Dicas de uso */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">💡 Dicas de Uso</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Use <code>variant="circular"</code> para avatares</li>
                    <li>• Use <code>variant="text"</code> para títulos e textos</li>
                    <li>• Use <code>variant="rectangular"</code> para botões e cards</li>
                    <li>• Combine com <code>aria-hidden="true"</code> para acessibilidade</li>
                </ul>
            </div>
        </div>
    );
}