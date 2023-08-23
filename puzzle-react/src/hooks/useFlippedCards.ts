import { useCallback, useEffect, useState } from "react";

import { Card } from "../data/cards";

export const useFlippedCards = () => {
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [correctFlippedCards, setCorrectFlippedCards] = useState<Card[]>([]);

  const flipCard = useCallback(
    (card: Card) => {
      const flippedCard = correctFlippedCards.find(
        (correctFlippedCard) => correctFlippedCard.id === card.id,
      );

      if (flippedCard) {
        return;
      }

      setFlippedCards((flippedCards) => {
        if (flippedCards.find((flippedCard) => flippedCard.id === card.id)) {
          return flippedCards;
        }
        return [...flippedCards, card];
      });
    },
    [correctFlippedCards],
  );

  useEffect(() => {
    if (flippedCards.length < 2) {
      return;
    }

    const [firstCard, secondCard] = flippedCards;
    if (firstCard.name === secondCard.name && firstCard.id !== secondCard.id) {
      setFlippedCards([]);
      setCorrectFlippedCards((flippedCards) => [
        ...flippedCards,
        firstCard,
        secondCard,
      ]);
      return;
    }

    const timeoutId = setTimeout(() => {
      setFlippedCards([]);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [flippedCards]);

  const inProgress = flippedCards.length > 1;

  return { flippedCards, flipCard, correctFlippedCards, inProgress };
};
