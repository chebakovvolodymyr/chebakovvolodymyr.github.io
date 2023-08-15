import { FC, useCallback, useContext, useMemo, useState } from "react";

import { games } from "../../../../data/games";
import { Header } from "./Header";
import { Stripes } from "./Stripes";
import { Clouds } from "./Clouds";
import { DroppedColor } from "./Rainbow.types";
import { Result } from "./Result";
import { ScoreContext } from "../../../../context/ScoreContext";
import { shuffle } from "../../../../utils/shuffle";

interface RainbowProps {
  isGameOver: boolean;

  closeGame: () => void;
  finishGame: () => void;
}

export const Rainbow: FC<RainbowProps> = ({
  isGameOver,
  closeGame,
  finishGame,
}) => {
  const {
    rainbow: { stripes },
  } = games;
  const shuffledStripes = useMemo(() => shuffle(stripes), [stripes]);

  const [score, setScore] = useState(0);

  const [droppedColors, setDroppedColors] = useState<DroppedColor[]>([]);

  const setDroppedColor = useCallback(
    ({ id, attachedId, color }: DroppedColor) => {
      setDroppedColors((droppedColors) => {
        const previousDroppedFile = droppedColors.find(
          (droppedColor) => droppedColor.id === id,
        );

        const attachedTitle = droppedColors.find(
          (droppedColor) => droppedColor.attachedId === attachedId,
        );

        if (previousDroppedFile && attachedTitle) {
          return droppedColors.map((droppedColor) => {
            if (droppedColor.id === id) {
              return { ...droppedColor, attachedId: attachedTitle.attachedId };
            }

            if (droppedColor.attachedId === attachedId) {
              return {
                ...droppedColor,
                attachedId: previousDroppedFile.attachedId,
              };
            }

            return droppedColor;
          });
        }

        const titles = droppedColors.filter(
          (droppedColor) =>
            droppedColor.attachedId !== attachedId && droppedColor.id !== id,
        );
        return [...titles, { id, color, attachedId }];
      });
    },
    [],
  );

  const addScore = useContext(ScoreContext);

  const calculateResult = useCallback(() => {
    const isAllColorsCorrect = droppedColors.every(
      (color) => color.id === color.attachedId,
    );

    const score = isAllColorsCorrect ? 1 : 0;
    setScore(score);
    addScore(score);
  }, [addScore, droppedColors]);

  const isContinueButtonDisabled = droppedColors.length !== stripes.length;

  return (
    <div>
      <Header
        isContinueButtonDisabled={isContinueButtonDisabled}
        isGameOver={isGameOver}
        score={score}
        closeGame={closeGame}
        finishGame={finishGame}
        calculateResult={calculateResult}
      />
      <div className="rainbow-wrapper">
        <Stripes
          stripes={stripes}
          droppedColors={droppedColors}
          setDroppedColor={setDroppedColor}
          isGameOver={isGameOver}
        />
        <Clouds stripes={shuffledStripes} droppedColors={droppedColors} />
      </div>
      {isGameOver && <Result />}
    </div>
  );
};
