import { useContext } from "react";

import { ActiveQuestionContext } from "../../../context/ActiveQuestion";
import { NoActiveQuestionTitle } from "./NoActiveQuestionTitle";
import { QuestionDescription } from "./QuestionDescription";
import { FinalWordDescription } from "./FinalWordDescription";
import classNames from "classnames";

export const Hints = () => {
  const { activeQuestion, isFinished } = useContext(ActiveQuestionContext);

  return (
    <div
      className={classNames("hints", {
        ["hints--just-title"]: !isFinished && !activeQuestion,
      })}
    >
      {isFinished && <FinalWordDescription />}
      {!isFinished && !!activeQuestion && <QuestionDescription />}
      {!isFinished && !activeQuestion && <NoActiveQuestionTitle />}
    </div>
  );
};
