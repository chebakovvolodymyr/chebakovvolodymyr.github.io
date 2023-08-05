import { FC, useCallback, useState } from "react";

import { Sound } from "../../../../data/games.types";
import { DroppedTitle } from "../../titles/Titles.types";
import { SoundItem } from "./SoundItem";

interface SoundsProps {
    isGameOver: boolean
    sounds: Sound[]
    droppedTitles: DroppedTitle[]

    setDroppedTitle: (droppedTitle: DroppedTitle) => void
}

export const Sounds: FC<SoundsProps> = ({sounds, droppedTitles, setDroppedTitle, isGameOver}) => {
    const [activeSound, setActiveSound] = useState(0)

    const toggleSound = useCallback((soundId: number) => {
        setActiveSound(prevActiveSound => prevActiveSound === soundId ? 0 : soundId)
    }, [])
    return (
        <div className="sounds">
            {sounds.map((sound) => (
                <SoundItem 
                    key={sound.id} 
                    sound={sound} 
                    setDroppedTitle={setDroppedTitle}
                    title={droppedTitles.find(title => title.attachedId === sound.id)?.title}
                    isGameOver={isGameOver}
                    toggleSound={toggleSound}
                    isActive={activeSound === sound.id}
                />
            ))}
        </div>
    )
}