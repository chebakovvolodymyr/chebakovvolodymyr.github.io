import { FC, useRef } from "react";
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
  const titleRef = useRef<HTMLSpanElement | null>(null)
  const [{ diffOffset, isDragging }, drag, preview] = useDrag(() => ({
    type: "title",
    item: { id, title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      diffOffset: monitor.getDifferenceFromInitialOffset(),
    }),
  }));
  
  return (
    <>
      <span
        ref={(ref) => {
          drag(ref)
          titleRef.current = ref
        }}
        className={classNames("title", {
          "title--hidden": isHidden,
          "title--dragging": isDragging,
        })}
        style={{ top: position.y, left: position.x }}
      >
        {title}
      </span>
      {isDragging && (
        <span 
          ref={preview} 
          className="title"
          style={diffOffset && titleRef.current ? { top: titleRef.current.offsetTop + diffOffset.y + 20, left: titleRef.current.offsetLeft + diffOffset.x } : undefined}
        >{title}</span>)}
    </>
  );
};
