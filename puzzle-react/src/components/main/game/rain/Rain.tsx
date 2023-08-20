import { FC, useCallback, useContext, useState } from "react";

import { games } from "../../../../data/games";
import { Pictures } from "./Pictures";
import { Header } from "./Header";
import { DroppedTitle } from "../../titles/Titles.types";
import { Titles } from "../../titles/Titles";
import { ScoreContext } from "../../../../context/ScoreContext";

interface RainProps {
  isGameOver: boolean;

  closeGame: () => void;
  finishGame: () => void;
}

export const Rain: FC<RainProps> = ({ isGameOver, closeGame, finishGame }) => {
  const {
    rain: { clouds },
  } = games;

  const [droppedTitles, setDroppedTitles] = useState<DroppedTitle[]>([]);
  const [score, setScore] = useState(0);
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

  const removeDroppedTitle = useCallback((id: number) => {
    setDroppedTitles(droppedTitles => droppedTitles.filter(droppedTitle => droppedTitle.id !== id))
  }, [])

  const [checkedCheckboxes, setCheckedCheckboxes] = useState<number[]>([]);
  const toogleCheckbox = useCallback(
    (cloudId: number) => {
      if (isGameOver) {
        return;
      }

      setCheckedCheckboxes((checkedCheckboxes) =>
        checkedCheckboxes.includes(cloudId)
          ? checkedCheckboxes.filter(
              (checkedCheckbox) => checkedCheckbox !== cloudId,
            )
          : [...checkedCheckboxes, cloudId],
      );
    },
    [isGameOver],
  );

  const addScore = useContext(ScoreContext);

  const calculateResult = useCallback(() => {
    const checkboxesScore = clouds.reduce((acc, cloud) => {
      if (cloud.isCorrect && checkedCheckboxes.includes(cloud.id)) {
        return acc + 0.5;
      }

      return acc;
    }, 0);

    const titlesScore = droppedTitles.reduce((acc, title) => {
      if (title.id === title.attachedId) {
        return acc + 0.25;
      }

      return acc;
    }, 0);

    const score = checkboxesScore + titlesScore;

    setScore(score);
    addScore(score);
  }, [clouds, droppedTitles, addScore, checkedCheckboxes]);

  const isContinueButtonDisabled =
    droppedTitles.length !== clouds.length || !checkedCheckboxes.length;

  return (
    <div className="rain">
      <Header
        closeGame={closeGame}
        isContinueButtonDisabled={isContinueButtonDisabled}
        finishGame={finishGame}
        isGameOver={isGameOver}
        calculateResult={calculateResult}
        score={score}
      />
      <Pictures
        clouds={clouds}
        setDroppedTitle={setDroppedTitle}
        droppedTitles={droppedTitles}
        checkedCheckboxes={checkedCheckboxes}
        toogleCheckbox={toogleCheckbox}
        isGameOver={isGameOver}
      />
      {!isGameOver && <Titles items={clouds} droppedTitles={droppedTitles} removeDroppedTitle={removeDroppedTitle}/>}
    </div>
  );
};
