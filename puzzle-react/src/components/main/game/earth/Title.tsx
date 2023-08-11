import { FC, useContext, useEffect, useRef } from "react";
import { XYCoord, useDrag } from "react-dnd";
import classNames from "classnames";

import { EarthAnswer } from "../../../../data/games.types";
import { DragContext } from "../../../../context/DragContext";

interface TitleProps {
  answer: EarthAnswer;

  isHidden: boolean;
}

export const Title: FC<TitleProps> = ({ answer: { id, title }, isHidden }) => {
  const titleRef = useRef<HTMLDivElement | null>(null);

  const { mouseMoveHandler, mouseUpHandler } = useContext(DragContext);

  const [{ diffOffset, isDragging }, drag, preview] = useDrag(() => ({
    type: "title",
    item: { id, title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      diffOffset: monitor.getDifferenceFromInitialOffset(),
    }),
  }));

  useEffect(() => {
    let lastCoord: XYCoord = { x: 0, y: 0 };
    const onMouseMove = (evt: MouseEvent) => {
      lastCoord = {
        x: evt.clientX,
        y: evt.clientY,
      };
      mouseMoveHandler(lastCoord);
    };

    const onTouchMove = (evt: TouchEvent) => {
      lastCoord = {
        x: evt.touches[0]?.clientX || 0,
        y: evt.touches[0]?.clientY || 0,
      };
      mouseMoveHandler(lastCoord);
    };

    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onTouchMove);
    }

    return () => {
      if (isDragging) {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("touchmove", onTouchMove);
        mouseUpHandler(lastCoord, { id, title });
      }
    };
  }, [title, id, isDragging, mouseMoveHandler, mouseUpHandler]);

  return (
    <>
      <div
        className={classNames("title", {
          "title--hidden": isHidden,
          "title--dragging": isDragging,
        })}
        ref={(ref) => {
          drag(ref);
          titleRef.current = ref;
        }}
      >
        {title}
      </div>
      {isDragging && (
        <div
          className="title"
          ref={preview}
          style={
            diffOffset && titleRef.current
              ? {
                  position: "absolute",
                  top: titleRef.current.offsetTop + diffOffset.y,
                  left: titleRef.current.offsetLeft + diffOffset.x,
                }
              : undefined
          }
        >
          {title}
        </div>
      )}
    </>
  );
};
