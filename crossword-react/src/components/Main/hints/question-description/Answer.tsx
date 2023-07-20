import { useContext } from "react";
import { ActiveQuestionContext } from "../../../../context/ActiveQuestion";
import classNames from "classnames";

interface AnswerProps {
  answer: string;
  correctAnswer: string
  onAnswerClick: (answer: string) => void;
}

export const Answer = ({ answer, correctAnswer, onAnswerClick }: AnswerProps) => {
  const { selectedAnswer } = useContext(ActiveQuestionContext);

  const onClick = () => onAnswerClick(answer);
  return (
    <button
      className={classNames("btn", "answer", {
        "btn-green": selectedAnswer && correctAnswer === answer,
        "btn-orange": selectedAnswer && correctAnswer !== answer,
        "gelatine": selectedAnswer && correctAnswer === answer,
      })
      }
      onClick={onClick}
    >
      {answer}
    </button>
  );
};
