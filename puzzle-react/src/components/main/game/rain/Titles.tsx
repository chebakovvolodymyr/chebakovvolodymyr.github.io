import { FC, useMemo } from "react"

import { getRandomPositions } from "../../../../utils/getRandomPositions"
import { Cloud } from "../../../../data/games"
import { Title } from "./Title"

interface TitlesProps {
    clouds: Cloud[]
}

export const Titles: FC<TitlesProps> = ({clouds}) => {
    const randomPositions = useMemo(() => getRandomPositions(clouds.length), [clouds])
    
    return (
        <div className="titles">
            {clouds.map((cloud, index) => <Title key={cloud.id} title={cloud.title} position={randomPositions[index]}/>)}
        </div>
    )
}