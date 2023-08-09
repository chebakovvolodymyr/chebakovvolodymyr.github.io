import { FC, useCallback, useState } from "react";

import { games } from "../../../../data/games";
import { Header } from "./Header";
import { Stripes } from "./Stripes";
import { Clouds } from "./Clouds";
import { DroppedColor } from "./Rainbow.types";
import { Result } from "./Result";

interface RainbowProps {
  isGameOver: boolean;

  closeGame: () => void;
  finishGame: () => void;
}

export const Rainbow: FC<RainbowProps> = ({isGameOver, closeGame, finishGame}) => {
  const {
    rainbow: { stripes },
  } = games;

  const [score, setScore] = useState(0);

  const [droppedColors, setDroppedColors] = useState<DroppedColor[]>([])

  const setDroppedColor = useCallback((droppedColor: DroppedColor) => {
    setDroppedColors(prevDroppedColors => ([...prevDroppedColors, droppedColor]))
  }, [])

  const calculateResult = useCallback(() => {
    const isAllColorsCorrect = droppedColors.every((color) => color.id === color.attachedId);

    setScore(isAllColorsCorrect ? 1 : 0);
  }, [droppedColors]);

  const isContinueButtonDisabled = droppedColors.length !== stripes.length
  
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
        <Stripes stripes={stripes} droppedColors={droppedColors} setDroppedColor={setDroppedColor} isGameOver={isGameOver}/>
        <Clouds stripes={stripes} droppedColors={droppedColors}/>
      </div>
      {isGameOver && <Result/>}
    </div>
  );
};
