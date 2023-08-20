import { FC, useContext, useEffect, useMemo, useRef } from "react";

import { getRandomPositions } from "../../../utils/getRandomPositions";
import { DragContext } from "../../../context/DragContext";
import { Title } from "./Title";
import { DroppedTitle } from "./Titles.types";

interface Item {
  id: number;
  title: string;
}

interface TitlesProps {
  items: Item[];

  droppedTitles: DroppedTitle[];
  removeDroppedTitle: (id: number) => void
}

export const Titles: FC<TitlesProps> = ({ items, droppedTitles, removeDroppedTitle }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const { setDropElement, droppedElement } = useContext(DragContext);

  useEffect(() => {
    if (droppedElement.element && droppedElement.element === divRef.current) {
      removeDroppedTitle(droppedElement.params.id as number)
    }
  }, [droppedElement, removeDroppedTitle])

  const randomPositions = useMemo(
    () => getRandomPositions(items.length),
    [items],
  );

  return (
    <div ref={(ref) => {
      divRef.current = ref
      setDropElement(ref)
    }} className="titles">
      {items.map((item, index) => (
        <Title
          key={item.id}
          id={item.id}
          title={item.title}
          position={randomPositions[index]}
          isHidden={droppedTitles.some((title) => title.id === item.id)}
        />
      ))}
    </div>
  );
};
