import { FC, useContext, useEffect } from "react";
import classNames from "classnames";

import { ActiveQuestionContext } from "../../context/ActiveQuestion";

interface ContinueButtonProps {
  isHidden: boolean;
}

export const ContinueButton: FC<ContinueButtonProps> = ({isHidden}) => {
  const {
    setActiveQuestion,
    setSelectedAnswer,
    correctedAnswersAmount,
    questions,
    answeredQuestionsAmount,
  } = useContext(ActiveQuestionContext);

  const onContinueClick = () => {
    if (answeredQuestionsAmount === questions.length) {
      return;
    }

    setActiveQuestion(null);
    setSelectedAnswer("");
  };

  return (
    <button
      className={classNames("btn btn-green btn-continue", {
        "btn-final": answeredQuestionsAmount === questions.length,
        "btn-hidden": isHidden,
      })}
      onClick={onContinueClick}
    >
      {answeredQuestionsAmount === questions.length
        ? `Teisingų atsakymų: ${correctedAnswersAmount} iš ${questions.length}.`
        : "Tęsti"}
    </button>
  );
};
