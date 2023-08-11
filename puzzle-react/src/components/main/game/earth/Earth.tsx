import { FC, useCallback, useContext, useMemo, useState } from "react";

import { Header } from "./Header";
import { games } from "../../../../data/games";
import { Result } from "./Result";
import { DroppedTitle } from "../../titles/Titles.types";
import { shuffle } from "../../../../utils/shuffle";
import { Titles } from "./Titles";
import { Places } from "./Places";
import { correctAnswers } from "./correctAnswers";
import { ScoreContext } from "../../../../context/ScoreContext";

interface EarthProps {
  isGameOver: boolean;

  closeGame: () => void;
  finishGame: () => void;
}

export const Earth: FC<EarthProps> = ({
  isGameOver,
  closeGame,
  finishGame,
}) => {
  const {
    earth: { answers },
  } = games;

  const shuffledAnswers = useMemo(() => shuffle(answers), [answers]);

  const [score, setScore] = useState(0);
  const [droppedTitles, setDroppedTitles] = useState<DroppedTitle[]>([]);

  const setDroppedTitle = useCallback(
    ({ id, attachedId, title }: DroppedTitle) => {
      setDroppedTitles((droppedTitles) => [
        ...droppedTitles,
        { id, title, attachedId },
      ]);
    },
    [],
  );

  const addScore = useContext(ScoreContext);

  const calculateResult = useCallback(() => {
    const titlesScore = droppedTitles.reduce((acc, title) => {
      if (correctAnswers[title.attachedId] === title.id) {
        return acc + 0.25;
      }

      return acc;
    }, 0);

    setScore(titlesScore);
    addScore(titlesScore);
  }, [addScore, droppedTitles]);

  const isContinueButtonDisabled = droppedTitles.length !== answers.length;

  return (
    <div className="earth">
      <Header
        closeGame={closeGame}
        isContinueButtonDisabled={isContinueButtonDisabled}
        finishGame={finishGame}
        isGameOver={isGameOver}
        calculateResult={calculateResult}
        score={score}
      />
      <Places
        setDroppedTitle={setDroppedTitle}
        droppedTitles={droppedTitles}
        answers={answers}
        isGameOver={isGameOver}
      />
      <Titles answers={shuffledAnswers} droppedTitles={droppedTitles} />
      {isGameOver && <Result />}
    </div>
  );
};
