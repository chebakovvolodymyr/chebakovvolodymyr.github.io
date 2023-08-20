import { FC, useContext, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";

import { PictureCheckbox } from "../../../picture-checkbox/PictureCheckbox";
import { DroppedTitle } from "../../titles/Titles.types";
import { Cloud } from "../../../../data/games.types";
import { DragContext } from "../../../../context/DragContext";
import { Title } from "../../titles/Title";

interface PictureProps {
  cloud: Cloud;

  checked: boolean;
  isGameOver: boolean;
  title?: DroppedTitle;

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
  const divRef = useRef<HTMLDivElement | null>(null);
  const { setDropElement, hoveredElement, droppedElement } =
    useContext(DragContext);
  const [imageLoaded, setImageLoaded] = useState(false);

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
        attachedId: cloud.id,
        title: droppedElement.params.title as string,
        id: droppedElement.params.id as number,
      });
    }
  }, [cloud.id, droppedElement, setDroppedTitle]);

  const onChange = () => {
    toogleCheckbox(cloud.id);
  };
  return (
    <div
      className={classNames("picture", {
        "picture--highlight": isOver,
      })}
    >
      <PictureCheckbox
        ref={(ref) => {
          drop(ref);
          if (imageLoaded) {
            setDropElement(ref);
            divRef.current = ref;
          }
        }}
        url={cloud.picture}
        alt={cloud.alt}
        checked={checked}
        isCorrect={cloud.isCorrect}
        onChange={onChange}
        onLoad={() => setImageLoaded(true)}
        isGameOver={isGameOver}
      />
      {isGameOver && (
        <div className="cloud-description-result">
          <span className="snowflake-caption">{cloud.title}</span>
          <div className="cloud-description">
            <span dangerouslySetInnerHTML={{ __html: cloud.description }} />
          </div>
        </div>
      )}
      {!!title && !isGameOver && (
        <Title
          className="snowflake-caption"
          title={title.title}
          id={title.id}
        />
      )}
    </div>
  );
};
