import { useContext, useEffect, useState } from "react";

import { ActiveQuestionContext } from "../../../context/ActiveQuestion";
import { QuestionWithLetterPositionAndShifts } from "../../../data/questions.types";
import { EmptyCells } from "./EmptyCells";
import { Word } from "./Word";
import { Status } from "./crossword.types";

export const CrosswordRow = (question: QuestionWithLetterPositionAndShifts) => {
  const { activeQuestion, setActiveQuestion, selectedAnswer } = useContext(
    ActiveQuestionContext,
  );

  const [status, setStatus] = useState(Status.PENDING);

  useEffect(() => {
    if (question.id !== activeQuestion?.id) {
      return;
    }

    if (!selectedAnswer) {
      return;
    }

    setStatus(
      selectedAnswer === question.correctAnswer
        ? Status.CORRECT_OPEN
        : Status.ICORRECT_OPEN,
    );
  }, [activeQuestion, selectedAnswer, question]);

  const { id, word, leftShift, rightShift, letterPosition } = question;

  const onRowClick = () => {
    if (status !== Status.PENDING) {
      return;
    }

    if (activeQuestion) {
      return;
    }

    setActiveQuestion(question);
    setStatus(Status.SELECTED);
  };

  return (
    <tr onClick={onRowClick}>
      <EmptyCells amount={leftShift} />
      <td>{id}.</td>
      <Word word={word} status={status} letterPosition={letterPosition} />
      <EmptyCells amount={rightShift} />
    </tr>
  );
};
