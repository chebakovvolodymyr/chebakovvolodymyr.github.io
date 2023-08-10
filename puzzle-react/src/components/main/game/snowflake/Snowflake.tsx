import { FC, useCallback, useContext, useState } from "react";

import { games } from "../../../../data/games";

import { Header } from "./Header";
import { DroppedTitle } from "../../titles/Titles.types";
import { Titles } from "../../titles/Titles";
import { Pictures } from "./Pictures";
import { ResultDescription } from "./ResultDescription";
import { ScoreContext } from "../../../../context/ScoreContext";

interface SnowflakeProps {
  isGameOver: boolean;

  closeGame: () => void;
  finishGame: () => void;
}

export const Snowflake: FC<SnowflakeProps> = ({
  isGameOver,
  closeGame,
  finishGame,
}) => {
  const {
    snowflake: { snowflakes },
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

  const addScore = useContext(ScoreContext)

  const calculateResult = useCallback(() => {
    const checkboxesScore = snowflakes.reduce((acc, cloud) => {
      if (cloud.isCorrect && checkedCheckboxes.includes(cloud.id)) {
        return acc + 1;
      }

      return acc;
    }, 0);

    const titlesScore = droppedTitles.reduce((acc, title) => {
      if (title.id === title.attachedId) {
        return acc + 0.25;
      }

      return acc;
    }, 0);

    const score = checkboxesScore + titlesScore
    setScore(score);
    addScore(score)
  }, [snowflakes, droppedTitles, addScore, checkedCheckboxes]);

  const isContinueButtonDisabled =
    droppedTitles.length !== snowflakes.length || !checkedCheckboxes.length;

  return (
    <div className="snowflake">
      <Header
        closeGame={closeGame}
        isContinueButtonDisabled={isContinueButtonDisabled}
        finishGame={finishGame}
        isGameOver={isGameOver}
        calculateResult={calculateResult}
        score={score}
      />
      <Pictures
        snowflakes={snowflakes}
        setDroppedTitle={setDroppedTitle}
        droppedTitles={droppedTitles}
        checkedCheckboxes={checkedCheckboxes}
        toogleCheckbox={toogleCheckbox}
        isGameOver={isGameOver}
      />
      {!isGameOver && (
        <Titles items={snowflakes} droppedTitles={droppedTitles} />
      )}
      {isGameOver && <ResultDescription />}
    </div>
  );
};
