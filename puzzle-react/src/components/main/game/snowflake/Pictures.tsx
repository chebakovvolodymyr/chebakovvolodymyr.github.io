import { FC } from "react";

import { Snowflake } from "../../../../data/games.types";
import { Picture } from "./Picture";
import { DroppedTitle } from "../../titles/Titles.types";

interface PicturesProps {
  isGameOver: boolean;
  snowflakes: Snowflake[];
  droppedTitles: DroppedTitle[];
  checkedCheckboxes: number[];

  setDroppedTitle: (droppedTitle: DroppedTitle) => void;
  toogleCheckbox: (cloudId: number) => void;
}

export const Pictures: FC<PicturesProps> = ({
  snowflakes,
  setDroppedTitle,
  droppedTitles,
  toogleCheckbox,
  checkedCheckboxes,
  isGameOver,
}) => {
  return (
    <div className="pictures">
      {snowflakes.map((snowflake) => (
        <Picture
          key={snowflake.id}
          snowflake={snowflake}
          toogleCheckbox={toogleCheckbox}
          checked={checkedCheckboxes.includes(snowflake.id)}
          setDroppedTitle={setDroppedTitle}
          title={droppedTitles.find(
            (title) => title.attachedId === snowflake.id,
          )}
          isGameOver={isGameOver}
        />
      ))}
    </div>
  );
};
