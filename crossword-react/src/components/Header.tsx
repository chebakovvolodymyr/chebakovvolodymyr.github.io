import { useContext } from "react";

import { ActiveQuestionContext } from "../context/ActiveQuestion";

export const Header = () => {
  const { isFinished } = useContext(ActiveQuestionContext);
  return (
    <header>
      {!isFinished && <h3>Išspręsk kryžiažodį ir atrask pasislėpusį žodį!</h3>}
    </header>
  );
};
