import { FC } from "react";

import { DroppedTitle } from "../../titles/Titles.types";
import { EarthAnswer } from "../../../../data/games.types";
import { Place } from "./Place";

interface PlacesProps {
  droppedTitles: DroppedTitle[];
  answers: EarthAnswer[];
  setDroppedTitle: (title: DroppedTitle) => void;
}

export const Places: FC<PlacesProps> = ({
  answers,
  setDroppedTitle,
  droppedTitles,
}) => {
  return (
    <div className="earths-places titles">
      {answers.map((answer) => (
        <Place
          answer={answer}
          setDroppedTitle={setDroppedTitle}
          droppedTitle={droppedTitles.find(
            (title) => title.attachedId === answer.id,
          )}
        />
      ))}
    </div>
  );
};
