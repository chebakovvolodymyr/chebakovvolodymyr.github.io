import { FC, useContext, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";

import { Sound } from "../../../../data/games.types";
import { DroppedTitle } from "../../titles/Titles.types";
import { DragContext } from "../../../../context/DragContext";

interface SoundItemProps {
  isGameOver: boolean;
  isActive: boolean;
  sound: Sound;
  title: string | undefined;
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
          attachedId: sound.id,
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
        attachedId: sound.id,
        title: droppedElement.params.title as string,
        id: droppedElement.params.id as number,
      });
    }
  }, [sound.id, droppedElement, setDroppedTitle, title])

  return (
    <div className="sound-item">
      <img src={sound.picture} onClick={() => toggleSound(sound.id)} onLoad={() => setImageLoaded(true)}/>
      <div
        className={classNames("sound-item__title", {
          "sound-item__title--highlight": isOver && !title,
          "sound-item__title--filled": title,
        })}
        ref={(ref) => {
          drop(ref)
          if (imageLoaded) {
            setDropElement(ref)
            divRef.current = ref
          }
        }}
      >
        {isGameOver ? sound.title : title}
      </div>
      <div className="sound-item__video">
        <iframe
          src={
            isActive
              ? `https://www.youtube.com/embed/${
                  sound.soundUrl
                }?&autoplay=1&loop=1${
                  sound.start ? `&start=${sound.start}` : ""
                }`
              : undefined
          }
          allow="autoplay *; fullscreen *"
        ></iframe>
      </div>
    </div>
  );
};
