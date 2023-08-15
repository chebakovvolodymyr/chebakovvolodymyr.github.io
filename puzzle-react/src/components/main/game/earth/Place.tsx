import { FC, useContext, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";

import { EarthAnswer } from "../../../../data/games.types";
import { DroppedTitle } from "../../titles/Titles.types";
import { DragContext } from "../../../../context/DragContext";
import { Title } from "../../titles/Title";

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
  const divRef = useRef<HTMLDivElement | null>(null);
  const { setDropElement, hoveredElement, droppedElement } =
    useContext(DragContext);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "title",
      collect: (monitor) => ({
        isOver:
          !!monitor.isOver() ||
          (!!hoveredElement && hoveredElement === divRef.current),
      }),
    }),
    [hoveredElement],
  );

  useEffect(() => {
    if (droppedElement.element && droppedElement.element === divRef.current) {
      setDroppedTitle({
        attachedId: answer.id,
        title: droppedElement.params.title as string,
        id: droppedElement.params.id as number,
      });
    }
  }, [answer.id, droppedElement, setDroppedTitle]);

  return (
    <div
      className={classNames("earth-place", {
        "earth-place--highlight": isOver,
      })}
      ref={(ref) => {
        drop(ref);
        setDropElement(ref);
        divRef.current = ref;
      }}
    >
      {!!droppedTitle && (
        <Title
          className="title-dropped"
          title={droppedTitle.title}
          id={droppedTitle.id}
        />
      )}
    </div>
  );
};
