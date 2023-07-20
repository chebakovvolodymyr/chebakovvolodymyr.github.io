import { useContext } from "react";
import { ActiveQuestionContext } from "../../context/ActiveQuestion";
import { ContinueButton } from "./ContinueButton";

export const Footer = () => {
  const { selectedAnswer } = useContext(ActiveQuestionContext);

  const onEndClick = () => {
    location.reload();
  };

  return (
    <footer>
      <button className="btn btn-orange" onClick={onEndClick}>
        Baigti
      </button>
      {selectedAnswer && <ContinueButton />}
    </footer>
  );
};
