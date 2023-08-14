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
          <span>Iššūkis įveiktas! Taškai: {score} iš 2</span>
        </div>
      ) : (
        <div className="question_title">
          <span>
            Sniego iššūkis. Priskirk snaigėms jų tipų pavadinimus, pažymėk,
            kurių iš šių snaigių galima tikėtis lauko temperatūrai esant nuo -3
            °C iki -8 °C ir spausk „Pateikti“.
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
