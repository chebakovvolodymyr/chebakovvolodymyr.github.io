import { FC } from "react";

import { DroppedTitle } from "../../titles/Titles.types";
import { EarthAnswer } from "../../../../data/games.types";
import { Place } from "./Place";
import { correctAnswers } from "./correctAnswers";

interface PlacesProps {
  isGameOver: boolean;
  droppedTitles: DroppedTitle[];
  answers: EarthAnswer[];
  setDroppedTitle: (title: DroppedTitle) => void;
}

export const Places: FC<PlacesProps> = ({
  answers,
  setDroppedTitle,
  droppedTitles,
  isGameOver,
}) => {
  return (
    <div className="earths-places titles">
      {answers.map((answer) => (
        <Place
          key={answer.id}
          answer={answer}
          setDroppedTitle={setDroppedTitle}
          droppedTitle={droppedTitles.find((title) =>
            isGameOver
              ? correctAnswers[answer.id] === title.id
              : answer.id === title.attachedId,
          )}
        />
      ))}
    </div>
  );
};
