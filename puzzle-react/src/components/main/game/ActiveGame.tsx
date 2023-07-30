import { FC } from "react"

import { Card, CardName } from "../../../data/cards"
import { Rain } from "./rain/Rain"

interface ActiveGameProps {
    game: Card

    closeGame: () => void
}

export const ActiveGame: FC<ActiveGameProps> = ({game, closeGame}) => {
    switch (game.name) {
        case CardName.RAIN: 
            return <Rain closeGame={closeGame}/>
    }
    return null
}