import { FC } from "react"
import classNames from "classnames"

import { ThunderDetection, ThunderPlace } from "../../../../data/games.types"
import { PictureCheckbox } from "../../../picture-checkbox/PictureCheckbox"

interface PicturesProps {
    places: ThunderPlace[]
    detections: ThunderDetection[]
    checkedCheckboxes: number[]
    toogleCheckbox: (placeId: number) => void
    isGameOver: boolean
    activeButton: number
    setActiveButton: (activeButton: number) => void
}

export const Pictures: FC<PicturesProps> = ({places, isGameOver, checkedCheckboxes, toogleCheckbox, detections, setActiveButton, activeButton}) => {
    return (
        <div className="thunder-pictures">
            {places.map(place => (
                <PictureCheckbox 
                    url={place.picture} 
                    alt={place.alt} 
                    checked={isGameOver ? place.isCorrect : checkedCheckboxes.includes(place.id)} 
                    onChange={() => toogleCheckbox(place.id)}
                />
            ))}
            <div className="thunder-detections">
                <span>Perkūniją mes pirmiau</span>
                {detections.map(detection => (
                    <button onClick={()=> setActiveButton(detection.id)} className={classNames({
                        active: isGameOver ? detection.isCorrect : activeButton === detection.id
                    })}>{detection.title}</button>
                ))}
            </div>
        </div>
    )
}