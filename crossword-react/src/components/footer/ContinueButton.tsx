import { useContext, useEffect } from "react";

import { ActiveQuestionContext } from "../../context/ActiveQuestion";

export const ContinueButton = () => {
  const {
    setActiveQuestion,
    setSelectedAnswer,
    correctedAnswersAmount,
    questions,
    isFinished,
  } = useContext(ActiveQuestionContext);

  const onContinueClick = () => {
    if (isFinished) {
      location.reload();
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
    <button className="btn btn-green btn-continue" onClick={onContinueClick}>
      {isFinished
        ? `Teisingų atsakymų: ${correctedAnswersAmount} iš ${questions.length}.`
        : "Tęsti"}
    </button>
  );
};
