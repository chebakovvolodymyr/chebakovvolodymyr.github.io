import { FC, useContext, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";

import { Snowflake } from "../../../../data/games.types";
import { PictureCheckbox } from "../../../picture-checkbox/PictureCheckbox";
import { DroppedTitle } from "../../titles/Titles.types";
import { DragContext } from "../../../../context/DragContext";
import { Title } from "../../titles/Title";

interface PictureProps {
  snowflake: Snowflake;

  checked: boolean;
  isGameOver: boolean;
  title?: DroppedTitle;

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
        attachedId: snowflake.id,
        title: droppedElement.params.title as string,
        id: droppedElement.params.id as number,
      });
    }
  }, [snowflake.id, droppedElement, setDroppedTitle]);

  const onChange = () => {
    toogleCheckbox(snowflake.id);
  };
  return (
    <div
      ref={drop}
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
        url={snowflake.picture}
        alt={snowflake.alt}
        checked={checked}
        isCorrect={snowflake.isCorrect}
        onChange={onChange}
        onLoad={() => setImageLoaded(true)}
        isGameOver={isGameOver}
      />
      {isGameOver && (
        <span className="snowflake-caption">{snowflake.title}</span>
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
