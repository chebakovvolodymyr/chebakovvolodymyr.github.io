import { useContext } from "react";

import { ActiveQuestionContext } from "../../../context/ActiveQuestion";
import { NoActiveQuestionTitle } from "./NoActiveQuestionTitle";
import { QuestionDescription } from "./QuestionDescription";
import { FinalWordDescription } from "./FinalWordDescription";

export const Hints = () => {
  const { activeQuestion, isFinished } = useContext(ActiveQuestionContext);

  return (
    <div className="hints">
      {isFinished && <FinalWordDescription />}
      {!isFinished && !!activeQuestion && <QuestionDescription />}
      {!isFinished && !activeQuestion && <NoActiveQuestionTitle />}
    </div>
  );
};
