import { FC, useCallback, useState } from "react"

import { Cloud } from "../../../../data/games"
import { Picture } from "./Picture"

interface PicturesProps {
    clouds: Cloud[]
}

export const Pictures: FC<PicturesProps> = ({clouds}) => {
    const [checkedCheckboxes, setCheckedCheckboxes] = useState<number[]>([])
    const toogleCheckbox = useCallback((cloudId: number) => {
        setCheckedCheckboxes(checkedCheckboxes => checkedCheckboxes.includes(cloudId) ?
        checkedCheckboxes.filter(checkedCheckbox => checkedCheckbox !== cloudId) :
        [...checkedCheckboxes, cloudId]
        )
    }, [])
    return (
        <div className="pictures">
            {clouds.map(cloud => (
                <Picture 
                    key={cloud.id} 
                    cloud={cloud} 
                    toogleCheckbox={toogleCheckbox}  
                    checked={checkedCheckboxes.includes(cloud.id)}
                />
            ))}
        </div>
    )
}