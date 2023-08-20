import { FC, useContext, useEffect, useRef } from "react";

import { EarthAnswer } from "../../../../data/games.types";
import { DroppedTitle } from "../../titles/Titles.types";
import { DragContext } from "../../../../context/DragContext";
import { Title } from "./Title";

interface TitlesProps {
  answers: EarthAnswer[];

  droppedTitles: DroppedTitle[];

  removeDroppedTitle: (id: number) => void;
}

export const Titles: FC<TitlesProps> = ({
  answers,
  droppedTitles,
  removeDroppedTitle,
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const { setDropElement, droppedElement } = useContext(DragContext);

  useEffect(() => {
    if (droppedElement.element && droppedElement.element === divRef.current) {
      removeDroppedTitle(droppedElement.params.id as number);
    }
  }, [droppedElement, removeDroppedTitle]);

  return (
    <div
      ref={(ref) => {
        divRef.current = ref;
        setDropElement(ref);
      }}
      className="titles earth-titles"
    >
      {answers.map((answer) => (
        <Title
          key={answer.id}
          answer={answer}
          isHidden={!!droppedTitles.find((title) => title.id === answer.id)}
        />
      ))}
    </div>
  );
};
