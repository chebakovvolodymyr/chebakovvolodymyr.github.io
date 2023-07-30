import { FC, useCallback, useEffect, useState } from "react"
import classNames from "classnames"

import { Card, cards } from "../../../data/cards"
import {ActiveGame} from './ActiveGame'

interface GameProps {
    correctFlippedCards: Card[]
}

export const Game: FC<GameProps> = ({correctFlippedCards}) => {
    const [lastGame, setLastGame] = useState<Card | null>(cards[0])
    
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

    const closeGame = useCallback(() => {
        setLastGame(null)
    }, [])

    if (!lastGame) {
        return null
    }

    return (
        <div className={classNames("game", lastGame.name)}>
            <ActiveGame game={lastGame} closeGame={closeGame}/>
        </div>
    )

}