import { FC, useContext, useEffect, useRef } from "react";
import { XYCoord, useDrag } from "react-dnd";

import { RainbowStripe } from "../../../../data/games.types";
import { DragContext } from "../../../../context/DragContext";
import { CloudSvg } from "./CloudSvg";

interface CloudProps {
  isHidden?: boolean;
  cloud: RainbowStripe;
  index: number;
}

export const Cloud: FC<CloudProps> = ({
  cloud: { id, color },
  isHidden,
  index,
}) => {
  const cloudRef = useRef<HTMLDivElement | null>(null);

  const { mouseMoveHandler, mouseUpHandler } = useContext(DragContext);

  const [{ diffOffset, isDragging }, drag, preview] = useDrag(
    () => ({
      type: "title",
      item: { id, color },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        diffOffset: monitor.getDifferenceFromInitialOffset(),
      }),
    }),
    [],
  );

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
      mouseMoveHandler(lastCoord, { isRainbow: true });
    };

    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onTouchMove);
    }

    return () => {
      if (isDragging) {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("touchmove", onTouchMove);
        mouseUpHandler(lastCoord, { id, color }, { isRainbow: true });
      }
    };
  }, [color, id, isDragging, mouseMoveHandler, mouseUpHandler]);

  return (
    <>
      <div
        className={`cloud-item cloud-item--${index}`}
        ref={(ref) => {
          drag(ref);
          cloudRef.current = ref;
        }}
      >
        <CloudSvg
          color={color}
          opacity={isDragging ? 0.3 : isHidden ? 0.6 : 1}
        />
      </div>
      {isDragging && (
        <div
          ref={preview}
          style={
            diffOffset && cloudRef.current
              ? {
                  position: "absolute",
                  top: cloudRef.current.offsetTop + diffOffset.y,
                  left: cloudRef.current.offsetLeft + diffOffset.x,
                }
              : undefined
          }
        >
          <CloudSvg color={color} opacity={1} />
        </div>
      )}
    </>
  );
};
