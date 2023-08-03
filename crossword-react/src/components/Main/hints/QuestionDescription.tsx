import { useContext } from "react";

import { ActiveQuestionContext } from "../../../context/ActiveQuestion";
import { Description } from "./question-description/Description";
import { Answers } from "./question-description/Answers";
import { Image } from "./question-description/Image";

export const QuestionDescription = () => {
  const { activeQuestion, selectedAnswer } = useContext(ActiveQuestionContext);
  if (!activeQuestion) {
    return null;
  }

  const {
    id,
    question,
    answers,
    correctAnswer,
    description: { short, long, picture },
  } = activeQuestion;
  return (
    <div className="hints_wrapper">
      <div className="number_of_question">{id}</div>
      <div
        className="text_question"
        dangerouslySetInnerHTML={{
          __html: question,
        }}
      />
      <div className="answers_wrapper">
        <Answers answers={answers} correctAnswer={correctAnswer} />
        <Image picture={picture} />
      </div>
      {!!selectedAnswer && <Description long={long} short={short} />}
    </div>
  );
};
