import LevelUpOverlay from "../../components/LevelUpOverlay/LevelUpOverlay";


import { useState } from "react";

export default function LevelUpOverlayTest() {
    const [isOverlayActive, setIsOverlayActive] = useState(false);
    const [level, setLevel] = useState(1);
    const [phrase, setPhrase] = useState("LEVEL UP");

    const handleClose = () => {
        setIsOverlayActive(false);
    }

    return (
        <>
            <LevelUpOverlay
                isActive={isOverlayActive}
                level={level}
                phrase={phrase}
                onClose={handleClose}
            ></LevelUpOverlay>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-4">
                <button
                    onClick={() => setIsOverlayActive(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Abrir LevelUpOverlay
                </button>
                <div className="flex space-x-2">
                    <label>
                        Nível:
                        <input
                            type="number"
                            value={level}
                            onChange={(e) => setLevel(parseInt(e.target.value))}
                            className="ml-2 p-1 border rounded w-20"
                            min="1"
                            max="100"
                        />
                    </label>
                    <label>
                        Frase:
                        <input
                            type="text"
                            value={phrase}
                            onChange={(e) => setPhrase(e.target.value)}
                            className="ml-2 p-1 border rounded"
                        />
                    </label>
                </div>
            </div>
        </>
    )
}