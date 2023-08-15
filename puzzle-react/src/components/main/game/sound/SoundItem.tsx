import { FC, useContext, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";

import { Sound } from "../../../../data/games.types";
import { DroppedTitle } from "../../titles/Titles.types";
import { DragContext } from "../../../../context/DragContext";
import { Title } from "../../titles/Title";

interface SoundItemProps {
  isGameOver: boolean;
  isActive: boolean;
  sound: Sound;
  title?: DroppedTitle;
  setDroppedTitle: (droppedTitle: DroppedTitle) => void;
  toggleSound: (soundId: number) => void;
}

export const SoundItem: FC<SoundItemProps> = ({
  sound,
  title,
  setDroppedTitle,
  isGameOver,
  toggleSound,
  isActive,
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
        attachedId: sound.id,
        title: droppedElement.params.title as string,
        id: droppedElement.params.id as number,
      });
    }
  }, [sound.id, droppedElement, setDroppedTitle]);

  return (
    <div className="sound-item">
      <img
        src={sound.picture}
        onClick={() => toggleSound(sound.id)}
        onLoad={() => setImageLoaded(true)}
      />
      <div
        className={classNames("sound-item__title", {
          "sound-item__title--highlight": isOver,
          "sound-item__title--filled": title,
        })}
        ref={(ref) => {
          drop(ref);
          if (imageLoaded) {
            setDropElement(ref);
            divRef.current = ref;
          }
        }}
      >
        {isGameOver
          ? sound.title
          : !!title && (
              <Title
                className="sound-item__title sound-item__title--filled"
                title={title.title}
                id={title.id}
              />
            )}
      </div>
      <div className="sound-item__video">
        <iframe
          src={
            isActive && !isGameOver
              ? `https://www.youtube.com/embed/${
                  sound.soundUrl
                }?&autoplay=1&loop=1${
                  sound.start ? `&start=${sound.start}` : ""
                }&end=${(sound.start || 0) + 5}`
              : undefined
          }
          allow="autoplay *; fullscreen *"
        ></iframe>
      </div>
    </div>
  );
};
