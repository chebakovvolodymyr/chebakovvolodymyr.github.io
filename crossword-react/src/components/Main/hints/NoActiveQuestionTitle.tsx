import { useContext } from "react";

import { ActiveQuestionContext } from "../../../context/ActiveQuestion";

export const NoActiveQuestionTitle = () => {
  const { answeredQuestionsAmount } = useContext(ActiveQuestionContext);

  if (answeredQuestionsAmount) {
    return <h4>Pasirinkite kitą klausimą</h4>;
  }

  return <h4>Norint pradėti, spausk ant bet kurio paslėpto žodžio</h4>;
};
