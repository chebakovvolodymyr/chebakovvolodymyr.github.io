import { useCallback, useEffect, useState } from "react"

import { Card } from "../data/cards"

export const useFlippedCards = () => {
    const [flippedCards, setFlippedCards] = useState<Card[]>([])
    const [correctFlippedCards, setCorrectFlippedCards] = useState<Card[]>([])

    const flipCard = useCallback((card: Card) => {
        setFlippedCards(flippedCards => ([...flippedCards, card]))
    }, [])

    useEffect(() => {
        if (flippedCards.length < 2) {
            return
        }

        const [firstCard, secondCard] = flippedCards
        if (firstCard.name === secondCard.name) {
            setFlippedCards([])
            setCorrectFlippedCards(flippedCards => ([...flippedCards, firstCard, secondCard]))
            return
        }

        const timeoutId = setTimeout(() => {
            setFlippedCards([])
        }, 1000)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [flippedCards])

    const inProgress = flippedCards.length > 1



    return { flippedCards, flipCard, correctFlippedCards, inProgress }
}