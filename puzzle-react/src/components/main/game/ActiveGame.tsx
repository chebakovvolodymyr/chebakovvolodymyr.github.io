import { FC } from "react"

import { Card, CardName } from "../../../data/cards"
import { Rain } from "./Rain"

interface AciveGameProps {
    game: Card
}

export const AciveGame: FC<AciveGameProps> = ({game}) => {
    if (!game) {
        return null
    }

    switch (game.name) {
        case CardName.RAIN: 
            return <Rain/>
    }
    return null
}