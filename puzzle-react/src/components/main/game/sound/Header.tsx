import { FC } from "react";

interface HeaderProps {
  isContinueButtonDisabled: boolean;
  isGameOver: boolean;
  score: number;

  closeGame: () => void;
  finishGame: () => void;
  calculateResult: () => void;
}

export const Header: FC<HeaderProps> = ({
  closeGame,
  isGameOver,
  isContinueButtonDisabled,
  finishGame,
  calculateResult,
  score,
}) => {
  const onContinueClick = () => {
    if (isGameOver) {
      closeGame();
      return;
    }
    calculateResult();
    finishGame();
  };

  return (
    <header>
      {isGameOver ? (
        <div className="question_result">
          Iššūkis įveiktas! Taškai: {score} iš 4
        </div>
      ) : (
        <div className="question_title">
          <span>
            Garsinis iššūkis. Priskirk garsams gamtos reiškinius ir spausk
            „Pateikti“.
          </span>
        </div>
      )}
      <button
        className="question_check"
        disabled={isContinueButtonDisabled}
        onClick={onContinueClick}
      >
        <span className="title">{isGameOver ? "Toliau" : "Pateikti"}</span>
      </button>
      <button className="question_close" onClick={closeGame}></button>
    </header>
  );
};
