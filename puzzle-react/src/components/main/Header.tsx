import { FC } from "react";

interface HeaderProps {
  gameOver: boolean
  score: number
}

export const Header: FC<HeaderProps> = ({gameOver, score}) => {
  const onEndClick = () => {
    location.reload();
  };

  return (
    <header>
      {gameOver ? (
        <h1>Visi devyni iššūkiai įveikti!</h1>
      ) : (
        <h1>
          Čia slepiasi devynios paveikslėlių poros. Atversk du vienodus
          paveikslėlius ir įveik susijusį iššūkį! Ar įveiksi juos visus?
        </h1>
      )}

      {gameOver && (
        <div className="result">Tavo taškai: {score} iš 20</div>
      )}
      
      <button onClick={onEndClick}>
        <span className="title">Baigti</span>
      </button>
    </header>
  );
};
