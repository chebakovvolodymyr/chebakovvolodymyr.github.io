import { FC, useCallback, useContext, useState } from "react";

import { games } from "../../../../data/games";
import { Header } from "./Header";
import { Pictures } from "./Pictures";
import { Result } from "./Result";
import { Compass } from "./compass/Compass";
import { CardinalDirections } from "./Wind.types";
import { ScoreContext } from "../../../../context/ScoreContext";

interface ThunderProps {
  isGameOver: boolean;

  closeGame: () => void;
  finishGame: () => void;
}

export const Wind: FC<ThunderProps> = ({
  isGameOver,
  closeGame,
  finishGame,
}) => {
  const {
    wind: { winds },
  } = games;

  const [score, setScore] = useState(0);

  const [checkedCheckboxes, setCheckedCheckboxes] = useState<number[]>([]);
  const toogleCheckbox = useCallback(
    (placeId: number) => {
      if (isGameOver) {
        return;
      }

      setCheckedCheckboxes((checkedCheckboxes) =>
        checkedCheckboxes.includes(placeId)
          ? checkedCheckboxes.filter(
              (checkedCheckbox) => checkedCheckbox !== placeId,
            )
          : [...checkedCheckboxes, placeId],
      );
    },
    [isGameOver],
  );

  const [selectedPolygons, setSelectedPolygons] = useState<
    CardinalDirections[]
  >([]);

  const toggleSelectedPolygon = useCallback((direction: CardinalDirections) => {
    setSelectedPolygons((selectedPolygons) => {
      if (selectedPolygons.includes(direction)) {
        return selectedPolygons.filter(
          (selectedPolygon) => selectedPolygon !== direction,
        );
      }

      return [...selectedPolygons, direction];
    });
  }, []);

  const addScore = useContext(ScoreContext);

  const calculateResult = useCallback(() => {
    const checkboxesScore = winds.reduce((acc, wind) => {
      if (wind.isCorrect && checkedCheckboxes.includes(wind.id)) {
        return acc + 1;
      }

      return acc;
    }, 0);

    const directionScore =
      (selectedPolygons.includes(CardinalDirections.WEST) ? 1 : 0) +
      (selectedPolygons.includes(CardinalDirections.SOUTHWEST) ? 1 : 0);

    const score = checkboxesScore + directionScore;
    setScore(score);
    addScore(score);
  }, [winds, selectedPolygons, addScore, checkedCheckboxes]);

  const isContinueButtonDisabled =
    !checkedCheckboxes.length || !selectedPolygons.length;

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
      <div className="wind-wrapper">
        <div className="wind-question-wrapper">
          <div className="wind-title">
            Nepastoviai debesuota. Lietaus tikimybė maža. Vėjas pietvakarių,
            vakarų, 8–13 m/s. Temperatūra naktį 2–7, dieną 18–23 laipsniai
            šilumos.
          </div>
          <Pictures
            winds={winds}
            checkedCheckboxes={checkedCheckboxes}
            toogleCheckbox={toogleCheckbox}
            isGameOver={isGameOver}
          />
          {isGameOver && <Result />}
        </div>
        <Compass
          isGameOver={isGameOver}
          selectedPolygons={selectedPolygons}
          toggleSelectedPolygon={toggleSelectedPolygon}
        />
      </div>
    </div>
  );
};
