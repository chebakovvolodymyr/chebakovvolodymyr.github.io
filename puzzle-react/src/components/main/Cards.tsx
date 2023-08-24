import { FC, useCallback, useMemo } from "react";

import {
  cards,
  getDoubledAndShuffledCards,
  Card as ICard,
} from "../../data/cards";
import { Card } from "./Card";
import { useFlippedCards } from "../../hooks/useFlippedCards";
import { Game } from "./game/Game";

interface CardsProps {
  setGameOver: () => void;
}

export const Cards: FC<CardsProps> = ({ setGameOver }) => {
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
      <Game
        correctFlippedCards={correctFlippedCards}
        setGameOver={setGameOver}
        cardNumber={memoisedCards.length}
      />
    </div>
  );
};
