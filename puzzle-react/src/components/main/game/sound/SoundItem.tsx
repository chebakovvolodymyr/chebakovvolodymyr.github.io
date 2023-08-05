import { FC } from "react";
import { useDrop } from "react-dnd";

import { Sound } from "../../../../data/games.types";
import { DroppedTitle } from "../../titles/Titles.types";
import classNames from "classnames";

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
        isOver: !!monitor.isOver(),
      }),
    }),
    [title],
  );

  return (
    <div className="sound-item">
      <img src={sound.picture} onClick={() => toggleSound(sound.id)} />
      <div
        className={classNames("sound-item__title", {
          "sound-item__title--highlight": isOver && !title,
        })}
        ref={drop}
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
