import { FC, useContext, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";

import { EarthAnswer } from "../../../../data/games.types";
import { DroppedTitle } from "../../titles/Titles.types";
import { DragContext } from "../../../../context/DragContext";

interface PlaceProps {
  answer: EarthAnswer;
  droppedTitle?: DroppedTitle;

  setDroppedTitle: (title: DroppedTitle) => void;
}

export const Place: FC<PlaceProps> = ({
  answer,
  droppedTitle,
  setDroppedTitle,
}) => {
  const divRef = useRef<HTMLDivElement | null>(null)
  const {setDropElement, hoveredElement, droppedElement} = useContext(DragContext)

  const [{ isOver }, drop] = useDrop(
    () => ({
      drop: (item: { id: number; title: string }) => {
        if (droppedTitle) {
          return;
        }

        setDroppedTitle({
          attachedId: answer.id,
          title: item.title,
          id: item.id,
        });
      },
      accept: "title",
      collect: (monitor) => ({
        isOver: !!monitor.isOver() || (!droppedTitle && !!hoveredElement && hoveredElement === divRef.current),
      }),
    }),
    [droppedTitle, hoveredElement],
  );

  useEffect(() => {
    if (droppedTitle) {
      return
    }
    
    if (droppedElement.element && droppedElement.element === divRef.current) {
      setDroppedTitle({
        attachedId: answer.id,
        title: droppedElement.params.title as string,
        id: droppedElement.params.id as number,
      });
    }
  }, [answer.id, droppedElement, setDroppedTitle, droppedTitle])
  
  return (
    <div
      className={classNames("earth-place", {
        "earth-place--highlight": isOver && !droppedTitle,
        "title-dropped": !!droppedTitle,
      })}
      ref={(ref) => {
        drop(ref)
        setDropElement(ref)
      }}
    >
      {droppedTitle?.title}
    </div>
  );
};
