import Overlay from "../Overlay/Overlay";
import LevelAchievement from "../LevelAchievement/LevelAchievement";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function LevelUpOverlay({
    isActive = false,
    level = 1,
    phrase = "LEVEL UP",
    onClose,
    onDisableLeveling
}) {
    const [animed, setAnimed] = useState(true);

    useEffect(() => {
        setAnimed(isActive);
        if(isActive) {
            // Explosão inicial realística
            setTimeout(() => fireExplosion(), 100);
            
            // Apenas explosão inicial; não usar efeitos de 'snow'
            return undefined;
        }
    }, [isActive]);

    const fireExplosion = () => {
        confetti({
            particleCount: 150,
            spread: 100,
            startVelocity: 45,
            decay: 0.91,
            gravity: 0.8,
            ticks: 200,
            origin: { x: 0.5, y: 0.4 },
            colors: ["#FFD700", "#FF4500", "#00BFFF", "#FF69B4", "#32CD32", "#FF6347"],
            shapes: ["circle", "square"]
        });
    };

    const handleClose = () => {
        if (onClose) onClose();
        if (onDisableLeveling) onDisableLeveling();
    };

    // if (!isActive) return null;

    return (
        <Overlay
            isActive={isActive}
            animated={true}
            closeOnBackgroundClick={false}
            zLevel="low"
        >
            <div className="h-[80vh] w-[80vw] flex flex-col items-center justify-center space-y-4 p-4">
                <button
                    onClick={handleClose}
                    className="absolute right-0 top-0"
                >
                    Fechar
                </button>
                <LevelAchievement
                    level={level}
                    phrase={phrase}
                    show={isActive}
                />
            </div>
        </Overlay>
    );
}