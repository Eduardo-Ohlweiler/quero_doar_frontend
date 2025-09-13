import Overlay from "../Overlay/Overlay";
import LevelAchievement from "../LevelAchievement/LevelAchievement";
import { useState, useEffect } from "react";

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
    }, [isActive]);

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