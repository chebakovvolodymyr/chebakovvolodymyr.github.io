import { FC } from "react"

import { Position } from "../../../../utils/getRandomPositions"

interface TitleProps {
    title: string

    position: Position
}

export const Title: FC<TitleProps> = ({title, position}) => {
    return (
        <button className="title" style={{top: position.y, left: position.x}}>{title}</button>
    )
}