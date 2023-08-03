import { useContext } from "react";
import classNames from "classnames";

import { ActiveQuestionContext } from "../../context/ActiveQuestion";

export const ContinueButton = () => {
  const {
    correctedAnswersAmount,
    questions,
    answeredQuestionsAmount,
  } = useContext(ActiveQuestionContext);

  return (
    <button
      className={classNames("btn btn-green btn-continue", {
        "btn-final": answeredQuestionsAmount === questions.length,
      })}
    >
      {answeredQuestionsAmount === questions.length
        ? `Teisingų atsakymų: ${correctedAnswersAmount} iš ${questions.length}.`
        : "Tęsti"}
    </button>
  );
};
