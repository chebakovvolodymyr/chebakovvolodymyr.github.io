import { useCallback, useMemo } from "react";

import {
  cards,
  getDoubledAndShuffledCards,
  Card as ICard,
} from "../../data/cards";
import { Card } from "./Card";
import { useFlippedCards } from "../../hooks/useFlippedCards";
import { Game } from "./game/Game";

export const Cards = () => {
  const memoisedCards = useMemo(() => getDoubledAndShuffledCards(cards), []);

  const { flippedCards, flipCard, correctFlippedCards, inProgress } =
    useFlippedCards();

  const onCardClick = useCallback(
    (card: ICard) => {
      if (inProgress) {
        return;
      }

      flipCard(card);
    },
    [flipCard, inProgress],
  );

  return (
    <div className="cards">
      {memoisedCards.map((card) => {
        return (
          <Card
            key={card.id}
            card={card}
            onCardClick={onCardClick}
            isFlipped={
              correctFlippedCards.includes(card) || flippedCards.includes(card)
            }
          />
        );
      })}
      <Game correctFlippedCards={correctFlippedCards} />
    </div>
  );
};
