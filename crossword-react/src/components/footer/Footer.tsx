import { useContext } from "react";
import { ActiveQuestionContext } from "../../context/ActiveQuestion";
import { ContinueButton } from "./ContinueButton";

export const Footer = () => {
  const { selectedAnswer, answeredQuestionsAmount, questions } = useContext(
    ActiveQuestionContext,
  );

  return (
    <footer
      className={
        selectedAnswer && answeredQuestionsAmount === questions.length
          ? "footer--long"
          : ""
      }
    >
      <ContinueButton isHidden={!selectedAnswer}/>
    </footer>
  );
};
