import { FC, useContext, useEffect, useRef } from "react";
import { XYCoord, useDrag } from "react-dnd";

import classNames from "classnames";
import { Position } from "../../../utils/getRandomPositions";
import { DragContext } from "../../../context/DragContext";

interface TitleProps {
  id: number;
  title: string;
  isHidden?: boolean;
  className?: string;

  position?: Position;
}

export const Title: FC<TitleProps> = ({
  title,
  position,
  isHidden,
  id,
  className,
}) => {
  const titleRef = useRef<HTMLSpanElement | null>(null);

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
      <span
        ref={(ref) => {
          drag(ref);
          titleRef.current = ref;
        }}
        className={classNames("title", className, {
          "title--hidden": isHidden,
          "title--dragging": isDragging,
        })}
        style={position ? { top: position.y, left: position.x } : undefined}
      >
        {title}
      </span>
      {isDragging && (
        <span
          ref={preview}
          className={classNames("title", className)}
          style={
            diffOffset && titleRef.current
              ? {
                  position: "absolute",
                  zIndex: 100,
                  top: titleRef.current.offsetTop + diffOffset.y,
                  left: titleRef.current.offsetLeft + diffOffset.x,
                }
              : undefined
          }
        >
          {title}
        </span>
      )}
    </>
  );
};
