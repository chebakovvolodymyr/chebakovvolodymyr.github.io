import { FC, useMemo } from "react"

import { getRandomPositions } from "../../../../utils/getRandomPositions"
import { Cloud } from "../../../../data/games"
import { Title } from "./Title"
import { DroppedTitle } from "./Rain.types"

interface TitlesProps {
    clouds: Cloud[]

    droppedTitles: DroppedTitle[]
}

export const Titles: FC<TitlesProps> = ({clouds, droppedTitles}) => {
    const randomPositions = useMemo(() => getRandomPositions(clouds.length), [clouds])

    return (
        <div className="titles">
            {clouds.map((cloud, index) => (
                <Title 
                    key={cloud.id} 
                    id={cloud.id}
                    title={cloud.title} 
                    position={randomPositions[index]} 
                    isHidden={droppedTitles.some(title => title.id === cloud.id)}
                />
            ))}
        </div>
    )
}