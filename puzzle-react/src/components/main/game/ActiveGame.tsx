import { FC } from "react"

import { Card, CardName } from "../../../data/cards"
import { Rain } from "./rain/Rain"
import { Snowflake } from "./snowflake/Snowflake"
import { Rainbow } from "./rainbow/Rainbow"
import { Thunder } from "./thunder/Thunder"
import { Wind } from "./wind/Wind"

interface ActiveGameProps {
    game: Card
    isGameOver: boolean

    closeGame: () => void
    finishGame: () => void
}

export const ActiveGame: FC<ActiveGameProps> = ({game, closeGame, finishGame, isGameOver}) => {
    switch (game.name) {
        case CardName.RAIN: 
            return <Rain closeGame={closeGame} finishGame={finishGame} isGameOver={isGameOver}/>
        case CardName.SNOWFLAKE: 
            return <Snowflake closeGame={closeGame} finishGame={finishGame} isGameOver={isGameOver}/>
        case CardName.RAINBOW: 
            return <Rainbow closeGame={closeGame} finishGame={finishGame} isGameOver={isGameOver}/>
        case CardName.THUNDER: 
            return <Thunder closeGame={closeGame} finishGame={finishGame} isGameOver={isGameOver}/>
        case CardName.WIND: 
            return <Wind closeGame={closeGame} finishGame={finishGame} isGameOver={isGameOver}/>
    }
    return null
}