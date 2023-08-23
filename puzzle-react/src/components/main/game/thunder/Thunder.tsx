import { FC, useCallback, useContext, useMemo, useState } from "react";
import { Header } from "./Header";
import { games } from "../../../../data/games";
import { Pictures } from "./Pictures";
import { Result } from "./Result";
import { ScoreContext } from "../../../../context/ScoreContext";

interface ThunderProps {
  isGameOver: boolean;

  closeGame: () => void;
  finishGame: () => void;
}

export const Thunder: FC<ThunderProps> = ({
  isGameOver,
  closeGame,
  finishGame,
}) => {
  const {
    thunder: { places, detections },
  } = games;

  const correctAnswersNumber = useMemo(
    () => places.filter((place) => place.isCorrect).length,
    [],
  );

  const [score, setScore] = useState(0);
  const [activeButton, setActiveButton] = useState(0);

  const [checkedCheckboxes, setCheckedCheckboxes] = useState<number[]>([]);
  const toogleCheckbox = useCallback(
    (placeId: number) => {
      if (isGameOver) {
        return;
      }

      setCheckedCheckboxes((checkedCheckboxes) => {
        if (checkedCheckboxes.includes(placeId)) {
          return checkedCheckboxes.filter(
            (checkedCheckbox) => checkedCheckbox !== placeId,
          );
        }

        if (checkedCheckboxes.length >= correctAnswersNumber) {
          checkedCheckboxes.shift();
        }
        return [...checkedCheckboxes, placeId];
      });
    },
    [isGameOver, correctAnswersNumber],
  );

  const addScore = useContext(ScoreContext);

  const calculateResult = useCallback(() => {
    const checkboxesScore = places.reduce((acc, place) => {
      if (place.isCorrect && checkedCheckboxes.includes(place.id)) {
        return acc + 1;
      }

      return acc;
    }, 0);

    const detectionScore = detections.reduce((acc, detection) => {
      if (detection.id === activeButton) {
        return 1;
      }
      return acc;
    }, 0);

    const score = checkboxesScore + detectionScore;

    setScore(score);
    addScore(score);
  }, [places, detections, addScore, checkedCheckboxes, activeButton]);

  const isContinueButtonDisabled = !checkedCheckboxes.length || !activeButton;

  return (
    <div className="thunder">
      <Header
        closeGame={closeGame}
        isContinueButtonDisabled={isContinueButtonDisabled}
        finishGame={finishGame}
        isGameOver={isGameOver}
        calculateResult={calculateResult}
        score={score}
      />
      <div className="thunder-body">
        <Pictures
          places={places}
          detections={detections}
          checkedCheckboxes={checkedCheckboxes}
          toogleCheckbox={toogleCheckbox}
          isGameOver={isGameOver}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
        {isGameOver && <Result />}
      </div>
    </div>
  );
};
