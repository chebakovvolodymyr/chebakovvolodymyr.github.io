import { FC } from "react";

import { Wind } from "../../../../data/games.types";
import { Picture } from "./Picture";

interface PicturesProps {
  winds: Wind[];
  checkedCheckboxes: number[];
  toogleCheckbox: (placeId: number) => void;
  isGameOver: boolean;
}

export const Pictures: FC<PicturesProps> = ({
  winds,
  isGameOver,
  checkedCheckboxes,
  toogleCheckbox,
}) => {
  return (
    <div className="wind-pictures">
      {winds.map((wind) => (
        <Picture
          key={wind.id}
          wind={wind}
          isGameOver={isGameOver}
          checkedCheckboxes={checkedCheckboxes}
          toogleCheckbox={toogleCheckbox}
        />
      ))}
    </div>
  );
};
