import { useContext, useEffect, useState } from "react";

import { ActiveQuestionContext } from "../../../context/ActiveQuestion";
import { QuestionWithLetterPositionAndShifts } from "../../../data/questions.types";
import { EmptyCells } from "./EmptyCells";
import { Word } from "./Word";
import { Status } from "./crossword.types";

export const CrosswordRow = (question: QuestionWithLetterPositionAndShifts) => {
  const { activeQuestion, setActiveQuestion, selectedAnswer, isFinished } =
    useContext(ActiveQuestionContext);

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
    <tr className="crossword-table_row" onClick={onRowClick}>
      <EmptyCells amount={leftShift} />
      <td className="crossword-table_row--number">{id}</td>
      <Word
        word={word}
        status={status}
        letterPosition={letterPosition}
        isFinished={isFinished}
      />
      <EmptyCells amount={rightShift} />
    </tr>
  );
};
