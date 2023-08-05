import { FC, useMemo } from "react";

import { getRandomPositions } from "../../../utils/getRandomPositions";
import { Title } from "./Title";
import { DroppedTitle } from "./Titles.types";

interface Item {
  id: number;
  title: string;
}

interface TitlesProps {
  items: Item[];

  droppedTitles: DroppedTitle[];
}

export const Titles: FC<TitlesProps> = ({ items, droppedTitles }) => {
  const randomPositions = useMemo(
    () => getRandomPositions(items.length),
    [items],
  );

  return (
    <div className="titles">
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
