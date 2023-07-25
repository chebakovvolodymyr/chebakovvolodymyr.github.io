import { useContext } from "react";
import { ActiveQuestionContext } from "../../context/ActiveQuestion";
import { ContinueButton } from "./ContinueButton";

export const Footer = () => {
  const { selectedAnswer, answeredQuestionsAmount, questions } = useContext(
    ActiveQuestionContext,
  );

  const onEndClick = () => {
    location.reload();
  };

  return (
    <footer
      className={
        selectedAnswer && answeredQuestionsAmount === questions.length
          ? "footer--long"
          : ""
      }
    >
      <button className="btn btn-orange" onClick={onEndClick}>
        <span className="title">Baigti</span>
      </button>
      {selectedAnswer && <ContinueButton />}
    </footer>
  );
};
