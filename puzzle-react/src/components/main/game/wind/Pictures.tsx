import { FC } from "react"

import { Wind } from "../../../../data/games.types"
import { PictureCheckbox } from "../../../picture-checkbox/PictureCheckbox"

interface PicturesProps {
    winds: Wind[]
    checkedCheckboxes: number[]
    toogleCheckbox: (placeId: number) => void
    isGameOver: boolean
}

export const Pictures: FC<PicturesProps> = ({winds, isGameOver, checkedCheckboxes, toogleCheckbox}) => {
    return (
        <div className="wind-pictures">
            {winds.map(wind => (
                <PictureCheckbox 
                    url={wind.picture} 
                    alt={wind.alt} 
                    checked={isGameOver ? wind.isCorrect : checkedCheckboxes.includes(wind.id)} 
                    onChange={() => toogleCheckbox(wind.id)}
                />
            ))}
        </div>
    )
}