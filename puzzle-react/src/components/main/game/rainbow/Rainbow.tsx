import { FC } from "react";

interface RainbowProps {
  isGameOver: boolean;

  closeGame: () => void;
  finishGame: () => void;
}

export const Rainbow: FC<RainbowProps> = () => {
  return (
    <div className="rainbow-wrapper">
      <div className="rainbow">
        <div className="stripe red"></div>
        <div className="stripe orange"></div>
        <div className="stripe yellow"></div>
        <div className="stripe green"></div>
        <div className="stripe blue"></div>
        <div className="stripe indigo"></div>
        <div className="stripe violet"></div>
      </div>
    </div>
  );
};
