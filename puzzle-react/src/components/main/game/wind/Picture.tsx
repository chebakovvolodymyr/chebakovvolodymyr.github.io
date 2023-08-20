import { FC } from "react";

import { Wind } from "../../../../data/games.types";
import { PictureCheckbox } from "../../../picture-checkbox/PictureCheckbox";

interface PictureProps {
  wind: Wind;
  checkedCheckboxes: number[];
  toogleCheckbox: (placeId: number) => void;
  isGameOver: boolean;
}

export const Picture: FC<PictureProps> = ({
  wind,
  isGameOver,
  checkedCheckboxes,
  toogleCheckbox,
}) => {
  return (
    <div className="wind-picture">
      <PictureCheckbox
        url={wind.picture}
        alt={wind.alt}
        checked={checkedCheckboxes.includes(wind.id)}
        isCorrect={wind.isCorrect}
        onChange={() => toogleCheckbox(wind.id)}
        isGameOver={isGameOver}
      />
      {isGameOver && <div className="wind-picture-speed">{wind.speed}</div>}
    </div>
  );
};
