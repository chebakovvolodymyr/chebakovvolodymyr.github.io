import { FC, useContext, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import classNames from "classnames";
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';

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
  const [player, setPlayer] = useState<YouTubePlayer>(false);

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

  const onReady = (evt: YouTubeEvent) => {
    setPlayer(evt.target)
  }

  useEffect(() => {
    if (!player) {
      return
    }

    let timeoutId: number | undefined
    let volumeId: number | undefined

    const stopVideo = () => {
      if (player.getPlayerState() === 1) {
        player.pauseVideo()
      }
    }

    const reduceVolume = (count = 10) => {
      player.setVolume(10 * count)
      if (!count) {
        stopVideo()
        toggleSound(sound.id)
        return
      }
      volumeId = setTimeout(() => {
        count -= 1;
        reduceVolume(count)
      }, 200)
    }

    const increaseVolume = (count = 1) => {
      player.setVolume(10 * count)

      if (count > 10) {
        return
      }
      volumeId = setTimeout(() => {
        count += 1;
        increaseVolume(count)
      }, 200)
    }

    if (isActive) {
      player.seekTo(sound.start || 0)
      player.playVideo()
      increaseVolume()

      timeoutId = setTimeout(() => {
        clearTimeout(timeoutId)
        clearTimeout(volumeId)
        reduceVolume()
      }, 5000)
    } else {
      stopVideo()
    }

      return () => {
        clearTimeout(timeoutId)
        clearTimeout(volumeId)
      }
  }, [isActive, player, sound.id, sound.start, toggleSound])

  return (
    <div className="sound-item">
      <img
        src={sound.picture}
        onClick={() => player && player.getPlayerState?.() && toggleSound(sound.id)}
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
          <YouTube
          onReady={onReady}
          videoId={!isGameOver
            ? sound.soundUrl
            : undefined}
            opts={{
              autoplay: 1,
              loop: 1,
              start: sound.start || 0,
              end: sound.start ? sound.start + 5 : 5,
            }}
        />
      </div>
    </div>
  );
};
