import { FC } from "react";
import { useDrag } from "react-dnd";

import classNames from "classnames";
import { Position } from "../../../utils/getRandomPositions";

interface TitleProps {
  id: number;
  title: string;
  isHidden: boolean;

  position: Position;
}

export const Title: FC<TitleProps> = ({ title, position, isHidden, id }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "title",
    item: { id, title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <span
      ref={drag}
      className={classNames("title", {
        "title--hidden": isHidden,
        "title--dragging": isDragging,
      })}
      style={{ top: position.y, left: position.x }}
    >
      {title}
    </span>
  );
};
