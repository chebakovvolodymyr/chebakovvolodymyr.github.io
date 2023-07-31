import { FC } from "react"

import { Cloud } from "../../../../data/games"
import { Picture } from "./Picture"
import { DroppedTitle } from "./Rain.types"

interface PicturesProps {
    isGameOver: boolean
    clouds: Cloud[]
    droppedTitles: DroppedTitle[]
    checkedCheckboxes: number[]

    setDroppedTitle: (droppedTitle: DroppedTitle) => void
    toogleCheckbox: (cloudId: number) => void
}

export const Pictures: FC<PicturesProps> = ({clouds, setDroppedTitle, droppedTitles, toogleCheckbox, checkedCheckboxes, isGameOver}) => {

    return (
        <div className="pictures">
            {clouds.map(cloud => (
                <Picture 
                    key={cloud.id} 
                    cloud={cloud} 
                    toogleCheckbox={toogleCheckbox}  
                    checked={checkedCheckboxes.includes(cloud.id)}
                    setDroppedTitle={setDroppedTitle}
                    title={droppedTitles.find(title => title.attachedCloudId === cloud.id)?.title}
                    isGameOver={isGameOver}
                />
            ))}
        </div>
    )
}