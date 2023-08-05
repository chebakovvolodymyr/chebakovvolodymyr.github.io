import { FC } from "react";
import { useDrag } from "react-dnd";

import { EarthAnswer } from "../../../../data/games.types";
import classNames from "classnames";

interface TitleProps {
  answer: EarthAnswer;

  isHidden: boolean;
}

export const Title: FC<TitleProps> = ({ answer: { id, title }, isHidden }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "title",
    item: { id, title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      className={classNames("title", {
        "title--hidden": isHidden,
        "title--dragging": isDragging,
      })}
      ref={drag}
    >
      {title}
    </div>
  );
};
