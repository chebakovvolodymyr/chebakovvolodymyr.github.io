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
    <div>
      <div>{id}</div>
      <div>{question}</div>
      <div style={{ display: "flex" }}>
        <Answers answers={answers} correctAnswer={correctAnswer} />
        <Image picture={picture} />
      </div>
      {!!selectedAnswer && <Description long={long} short={short} />}
    </div>
  );
};
