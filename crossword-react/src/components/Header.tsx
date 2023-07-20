import { useContext } from "react";

import { ActiveQuestionContext } from "../context/ActiveQuestion";

export const Header = () => {
  const { isFinished } = useContext(ActiveQuestionContext);
  return (
    <header>
      <h3>
        {isFinished
          ? "Valio – kryžiažodis išspręstas!"
          : "Išspręsk kryžiažodį ir atrask pasislėpusį žodį!"}
      </h3>
    </header>
  );
};
