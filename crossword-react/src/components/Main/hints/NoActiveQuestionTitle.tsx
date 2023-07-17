import { useContext } from "react";

import { ActiveQuestionContext } from "../../../context/ActiveQuestion";

export const NoActiveQuestionTitle = () => {
  const { answeredQuestionsAmount } = useContext(ActiveQuestionContext);

  if (answeredQuestionsAmount) {
    return <div className="hints-wrapper"><h4>Pasirinkite kitą klausimą</h4></div>;
  }

  return <div className="hints-wrapper"><h4>Norint pradėti, spausk ant bet kurio paslėpto žodžio</h4></div>;
};
