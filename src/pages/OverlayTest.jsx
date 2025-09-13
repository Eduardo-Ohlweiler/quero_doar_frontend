import Overlay from "../components/Overlay/Overlay";
import { useState } from "react";

export default function OverlayTest() {
    const [isOverlayActive, setIsOverlayActive] = useState(false);
    const [closedByBackgroundClick, setClosedByBackgroundClick] = useState(false);
    const [animated, setAnimated] = useState(true);

    const handleClose = () => {
        setIsOverlayActive(false);
    };

    return (
        <>
            <Overlay
                isActive={isOverlayActive}
                animated={animated}
                closeOnBackgroundClick={closedByBackgroundClick}
                onClose={handleClose}
            >
                <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-4">Overlay Test</h2>
                    <p className="mb-4">Este é um teste do componente Overlay.</p>
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Fechar Overlay
                    </button>
                </div>
            </Overlay>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-4">
                <button
                    onClick={() => setIsOverlayActive(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Abrir Overlay
                </button>
                <button
                    onClick={() => setAnimated(!animated)}
                    className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    {animated ? 'Desativar Animação' : 'Ativar Animação'}
                </button>
                <button
                    onClick={() => setClosedByBackgroundClick(!closedByBackgroundClick)}
                    className="ml-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                    {closedByBackgroundClick ? 'Desativar Fechamento ao Clicar Fora' : 'Ativar Fechamento ao Clicar Fora'}
                </button>
            </div>
        </>
    )
}