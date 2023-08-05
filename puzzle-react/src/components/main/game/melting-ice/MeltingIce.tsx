import { FC, useCallback, useState } from "react";
import { Header } from "./Header";
import { Result } from "./Result";
import { River } from "./River";

interface MeltingIceProps {
  isGameOver: boolean;

  closeGame: () => void;
  finishGame: () => void;
}

export const MeltingIce: FC<MeltingIceProps> = ({
  isGameOver,
  closeGame,
  finishGame,
}) => {
  const [score, setScore] = useState(0);

  const [selectedPointId, setSelectedPointId] = useState(0);
  const onPointSelect = useCallback(
    (pointId: number) => {
      if (isGameOver) {
        return;
      }

      setSelectedPointId(pointId);
    },
    [isGameOver],
  );

  const calculateResult = useCallback(() => {
    setScore(selectedPointId === 1 ? 1 : 0);
  }, [selectedPointId]);

  const isContinueButtonDisabled = !selectedPointId;

  return (
    <div className="melting-ice">
      <Header
        closeGame={closeGame}
        isContinueButtonDisabled={isContinueButtonDisabled}
        finishGame={finishGame}
        isGameOver={isGameOver}
        calculateResult={calculateResult}
        score={score}
      />
      <River onPointSelect={onPointSelect} selectedPointId={selectedPointId} />
      {isGameOver && <Result />}
    </div>
  );
};
