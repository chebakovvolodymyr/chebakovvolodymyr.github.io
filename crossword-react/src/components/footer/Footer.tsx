import { useContext } from "react";
import classNames from "classnames";

import { ActiveQuestionContext } from "../../context/ActiveQuestion";
import { ContinueButton } from "./ContinueButton";

export const Footer = () => {
  const { selectedAnswer, answeredQuestionsAmount, questions, isFinished } =
    useContext(ActiveQuestionContext);

  const onEndClick = () => {
    location.assign("/");
  };

  return (
    <footer
      className={classNames({
        "footer--long":
          selectedAnswer && answeredQuestionsAmount === questions.length,
      })}
    >
      <button className="btn btn-orange" onClick={onEndClick}>
        <span className="title">Baigti</span>
      </button>
      {isFinished && <ContinueButton />}
    </footer>
  );
};
