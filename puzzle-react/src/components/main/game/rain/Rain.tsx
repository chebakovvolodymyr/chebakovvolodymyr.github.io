import { FC, useCallback, useState } from "react";

import { games } from "../../../../data/games";
import { Pictures } from "./Pictures";
import { Header } from "./Header";
import { DroppedTitle } from "../../titles/Titles.types";
import { Titles } from "../../titles/Titles";

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
      setDroppedTitles((droppedTitles) => [
        ...droppedTitles,
        { id, title, attachedId },
      ]);
    },
    [],
  );

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

    setScore(checkboxesScore + titlesScore);
  }, [clouds, droppedTitles, checkedCheckboxes]);

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
      {!isGameOver && <Titles items={clouds} droppedTitles={droppedTitles} />}
    </div>
  );
};
