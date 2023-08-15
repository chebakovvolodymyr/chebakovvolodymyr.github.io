import { FC, useCallback, useContext, useState } from "react";

import { Header } from "./Header";
import { games } from "../../../../data/games";
import { Result } from "./Result";
import { Sounds } from "./Sounds";
import { Titles } from "../../titles/Titles";
import { DroppedTitle } from "../../titles/Titles.types";
import { ScoreContext } from "../../../../context/ScoreContext";

interface SoundProps {
  isGameOver: boolean;

  closeGame: () => void;
  finishGame: () => void;
}

export const Sound: FC<SoundProps> = ({
  isGameOver,
  closeGame,
  finishGame,
}) => {
  const {
    sound: { sounds },
  } = games;

  const [score, setScore] = useState(0);
  const [droppedTitles, setDroppedTitles] = useState<DroppedTitle[]>([]);

  const setDroppedTitle = useCallback(
    ({ id, attachedId, title }: DroppedTitle) => {
      setDroppedTitles((droppedTitles) => {
        const previousDroppedFile = droppedTitles.find(
          (droppedTitle) => droppedTitle.id === id,
        );

        const attachedTitle = droppedTitles.find(
          (droppedTitle) => droppedTitle.attachedId === attachedId,
        );

        if (previousDroppedFile && attachedTitle) {
          return droppedTitles.map((droppedTitle) => {
            if (droppedTitle.id === id) {
              return { ...droppedTitle, attachedId: attachedTitle.attachedId };
            }

            if (droppedTitle.attachedId === attachedId) {
              return {
                ...droppedTitle,
                attachedId: previousDroppedFile.attachedId,
              };
            }

            return droppedTitle;
          });
        }

        const titles = droppedTitles.filter(
          (droppedTitle) =>
            droppedTitle.attachedId !== attachedId && droppedTitle.id !== id,
        );
        return [...titles, { id, title, attachedId }];
      });
    },
    [],
  );

  const addScore = useContext(ScoreContext);

  const calculateResult = useCallback(() => {
    const titlesScore = droppedTitles.reduce((acc, title) => {
      if (title.id === title.attachedId) {
        return acc + 1;
      }

      return acc;
    }, 0);

    setScore(titlesScore);
    addScore(titlesScore);
  }, [addScore, droppedTitles]);

  const isContinueButtonDisabled = droppedTitles.length !== sounds.length;

  return (
    <div className="sound">
      <Header
        closeGame={closeGame}
        isContinueButtonDisabled={isContinueButtonDisabled}
        finishGame={finishGame}
        isGameOver={isGameOver}
        calculateResult={calculateResult}
        score={score}
      />
      <Sounds
        sounds={sounds}
        setDroppedTitle={setDroppedTitle}
        droppedTitles={droppedTitles}
        isGameOver={isGameOver}
      />
      {isContinueButtonDisabled && (
        <Titles items={sounds} droppedTitles={droppedTitles} />
      )}

      {isGameOver && <Result />}
    </div>
  );
};
