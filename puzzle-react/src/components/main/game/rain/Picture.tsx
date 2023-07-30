import { FC } from "react"

import { Cloud } from "../../../../data/games"
import { PictureCheckbox } from "../../../picture-checkbox/PictureCheckbox"

interface PictureProps {
    cloud: Cloud

    checked: boolean

    toogleCheckbox: (cloudId: number) => void
}

export const Picture: FC<PictureProps> = ({cloud, checked, toogleCheckbox}) => {
    const onChange = () => {
        toogleCheckbox(cloud.id)
    }
    return (
        <PictureCheckbox url={cloud.picture} alt={cloud.alt} checked={checked} onChange={onChange}/>
    )
}