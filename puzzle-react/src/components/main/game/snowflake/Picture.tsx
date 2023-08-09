import { FC, useContext, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";

import { Snowflake } from "../../../../data/games.types";
import { PictureCheckbox } from "../../../picture-checkbox/PictureCheckbox";
import { DroppedTitle } from "../../titles/Titles.types";
import { DragContext } from "../../../../context/DragContext";

interface PictureProps {
  snowflake: Snowflake;

  checked: boolean;
  isGameOver: boolean;
  title?: string;

  toogleCheckbox: (cloudId: number) => void;
  setDroppedTitle: (droppedTitle: DroppedTitle) => void;
}

export const Picture: FC<PictureProps> = ({
  snowflake,
  checked,
  toogleCheckbox,
  setDroppedTitle,
  title,
  isGameOver,
}) => {
  const divRef = useRef<HTMLDivElement | null>(null)
  const {setDropElement, hoveredElement, droppedElement} = useContext(DragContext)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const [{ isOver }, drop] = useDrop(
    () => ({
      drop: (item: { id: number; title: string }) => {
        if (title) {
          return;
        }

        setDroppedTitle({
          attachedId: snowflake.id,
          title: item.title,
          id: item.id,
        });
      },
      accept: "title",
      collect: (monitor) => ({
        isOver: !!monitor.isOver() || (!title && !!hoveredElement && hoveredElement === divRef.current),
      }),
    }),
    [title, hoveredElement],
  );

  useEffect(() => {
    if (title) {
      return
    }
    
    if (droppedElement.element && droppedElement.element === divRef.current) {
      setDroppedTitle({
        attachedId: snowflake.id,
        title: droppedElement.params.title as string,
        id: droppedElement.params.id as number,
      });
    }
  }, [snowflake.id, droppedElement, setDroppedTitle, title])

  const onChange = () => {
    toogleCheckbox(snowflake.id);
  };
  return (
    <div
      ref={drop}
      className={classNames("picture", {
        "picture--highlight": isOver && !title,
      })}
    >
      <PictureCheckbox
        ref={(ref) => {
          drop(ref)
          if (imageLoaded) {
            setDropElement(ref)
            divRef.current = ref
          }
        }}
        url={snowflake.picture}
        alt={snowflake.alt}
        checked={isGameOver ? snowflake.isCorrect : checked}
        onChange={onChange}
        onLoad={() => setImageLoaded(true)}
      />
      {isGameOver && <span className="snowflake-caption">{snowflake.title}</span>}
      {!!title && !isGameOver && <span className="snowflake-caption">{title}</span>}
    </div>
  );
};
