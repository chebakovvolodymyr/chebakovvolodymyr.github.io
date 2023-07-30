import { FC, useMemo } from "react"

import { games } from "../../../../data/games"
import { shuffle } from "../../../../utils/shuffle"
import { Pictures } from "./Pictures"
import { Header } from "./Header"
import { Titles } from "./Titles"

interface RainProps {
    closeGame: () => void
}

export const Rain: FC<RainProps> = ({closeGame}) => {
    const {
        rain: {
            clouds,
        }
    } = games

    const shuffledClouds = useMemo(() => shuffle(clouds), [clouds])
    
    return (
        <div className="rain">
            <Header closeGame={closeGame}/>
            <Pictures clouds={clouds}/>
            <Titles clouds={shuffledClouds}/>
        </div>
    )
}