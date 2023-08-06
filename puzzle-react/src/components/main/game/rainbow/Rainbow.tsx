import { FC, useCallback, useState } from "react";

import { games } from "../../../../data/games";
import { Header } from "./Header";
import { Stripes } from "./Stripes";
import { Clouds } from "./Clouds";
import { DroppedColor } from "./Rainbow.types";

interface RainbowProps {
  isGameOver: boolean;

  closeGame: () => void;
  finishGame: () => void;
}

export const Rainbow: FC<RainbowProps> = ({isGameOver, closeGame, finishGame}) => {
  const {
    rainbow: { stripes },
  } = games;

  const [droppedColors, setDroppedColors] = useState<DroppedColor[]>([])

  const setDroppedColor = useCallback((droppedColor: DroppedColor) => {
    setDroppedColors(prevDroppedColors => ([...prevDroppedColors, droppedColor]))
  }, [])
  
  return (
    <div> 
      <Header 
        isContinueButtonDisabled={true} 
        isGameOver={isGameOver} 
        score={0} 
        closeGame={closeGame} 
        finishGame={finishGame} 
        calculateResult={() => {}}
      />
      <div className="rainbow-wrapper">
        <Stripes stripes={stripes} droppedColors={droppedColors} setDroppedColor={setDroppedColor}/>
        <Clouds stripes={stripes} droppedColors={droppedColors}/>
      </div>
    </div>
  );
};
