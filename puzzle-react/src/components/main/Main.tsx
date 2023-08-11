import { useCallback, useState } from "react";

import { ScoreContext } from "../../context/ScoreContext";

import { Cards } from "./Cards";
import { Header } from "./Header";

export const Main = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const addScore = useCallback((score: number) => {
    setScore((prevScore) => prevScore + score);
  }, []);

  return (
    <div className="main">
      <Header gameOver={gameOver} score={score} />
      <ScoreContext.Provider value={addScore}>
        <Cards setGameOver={() => setGameOver(true)} />
      </ScoreContext.Provider>
    </div>
  );
};
