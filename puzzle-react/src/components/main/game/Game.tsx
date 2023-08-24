import { FC, useCallback, useEffect, useState } from "react";
import classNames from "classnames";

import { Card } from "../../../data/cards";
import { ActiveGame } from "./ActiveGame";

interface GameProps {
  cardNumber: number;
  correctFlippedCards: Card[];

  setGameOver: () => void;
}

export const Game: FC<GameProps> = ({
  correctFlippedCards,
  setGameOver,
  cardNumber,
}) => {
  const [lastGame, setLastGame] = useState<Card | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (!correctFlippedCards.length) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setLastGame(correctFlippedCards[correctFlippedCards.length - 1]);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [correctFlippedCards]);

  const closeGame = useCallback(() => {
    setLastGame(null);
    setIsGameOver(false);

    if (cardNumber <= correctFlippedCards.length) {
      setGameOver();
    }
  }, [cardNumber, correctFlippedCards.length, setGameOver]);

  const finishGame = useCallback(() => {
    setIsGameOver(true);
  }, []);

  if (!lastGame) {
    return null;
  }

  return (
    <div
      className={classNames("game", `game--slide-${lastGame.name}`, {
        "game--over": isGameOver,
      })}
    >
      <ActiveGame
        game={lastGame}
        closeGame={closeGame}
        finishGame={finishGame}
        isGameOver={isGameOver}
      />
    </div>
  );
};
