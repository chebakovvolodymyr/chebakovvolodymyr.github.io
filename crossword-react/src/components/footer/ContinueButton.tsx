import { useContext, useEffect } from "react";
import classNames from "classnames";

import { ActiveQuestionContext } from "../../context/ActiveQuestion";

export const ContinueButton = () => {
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

  useEffect(() => {
    const continueButton = document.querySelector(".btn-continue");
    const onAnimationEnd = () => {
      continueButton?.classList.remove("gelatine");
    };

    const onDocumentClick = (evt: MouseEvent) => {
      if (continueButton?.classList.contains("btn-final")) {
        return;
      }

      const target = evt.target as HTMLElement;
      if (target.classList.contains("btn-continue")) {
        return;
      }

      if (target.classList.contains("description_expended_button")) {
        return;
      }

      if (target.classList.contains("answer")) {
        return;
      }

      continueButton?.classList.add("gelatine");
    };

    document.addEventListener("click", onDocumentClick);
    continueButton?.addEventListener("animationend", onAnimationEnd);

    return () => {
      document.removeEventListener("click", onDocumentClick);
      continueButton?.removeEventListener("animationend", onAnimationEnd);
    };
  }, []);

  return (
    <button
      className={classNames("btn btn-green btn-continue", {
        ["btn-final"]: answeredQuestionsAmount === questions.length,
      })}
      onClick={onContinueClick}
    >
      {answeredQuestionsAmount === questions.length
        ? `Teisingų atsakymų: ${correctedAnswersAmount} iš ${questions.length}.`
        : "Tęsti"}
    </button>
  );
};
