import { FC, useEffect, useState } from "react"

import { Card } from "../../../data/cards"
import classNames from "classnames"

interface GameProps {
    correctFlippedCards: Card[]
}

export const Game: FC<GameProps> = ({correctFlippedCards}) => {
    const [lastGame, setLastGame] = useState<Card | null>(null)
    
    useEffect(() => {
        if (!correctFlippedCards.length) {
            return
        }

        
        const timeoutId = setTimeout(() => {
            setLastGame(correctFlippedCards[correctFlippedCards.length - 1])
        }, 1000)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [correctFlippedCards])

    if (!lastGame) {
        return null
    }

    return (
        <div className={classNames("game", lastGame.name)}>{lastGame.name}</div>
    )

}