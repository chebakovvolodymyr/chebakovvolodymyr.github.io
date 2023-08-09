import { FC, useContext, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";

import { PictureCheckbox } from "../../../picture-checkbox/PictureCheckbox";
import { DroppedTitle } from "../../titles/Titles.types";
import { Cloud } from "../../../../data/games.types";
import { DragContext } from "../../../../context/DragContext";

interface PictureProps {
  cloud: Cloud;

  checked: boolean;
  isGameOver: boolean;
  title?: string;

  toogleCheckbox: (cloudId: number) => void;
  setDroppedTitle: (droppedTitle: DroppedTitle) => void;
}

export const Picture: FC<PictureProps> = ({
  cloud,
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
          attachedId: cloud.id,
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
        attachedId: cloud.id,
        title: droppedElement.params.title as string,
        id: droppedElement.params.id as number,
      });
    }
  }, [cloud.id, droppedElement, setDroppedTitle, title])

  const onChange = () => {
    toogleCheckbox(cloud.id);
  };
  return (
    <div className={classNames("picture", {
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
        url={cloud.picture}
        alt={cloud.alt}
        checked={isGameOver ? cloud.isCorrect : checked}
        onChange={onChange}
        onLoad={() => setImageLoaded(true)}
      />
      {isGameOver && (
        <div className="cloud-description-result">
          <span className="snowflake-caption">{cloud.title}</span>
          <div className="cloud-description">
            <span>{cloud.description}</span>
          </div>
        </div>
      )}
      {!!title && !isGameOver && (
        <span className="snowflake-caption">{title}</span>
      )}
    </div>
  );
};
