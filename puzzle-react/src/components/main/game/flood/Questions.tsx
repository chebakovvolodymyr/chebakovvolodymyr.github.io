import { FC } from "react";

import { FloodQuestion } from "../../../../data/games.types";

interface QuestionsProps {
  isGameOver: boolean;
  questions: FloodQuestion[];
  radio: Record<number, number>;

  onRadioChange: (questionId: number, answerId: number) => void;
}

export const Questions: FC<QuestionsProps> = ({
  questions,
  onRadioChange,
  radio,
  isGameOver,
}) => {
  return (
    <div className="flood-questions">
      {questions.map((question) => (
        <div className="flood-question" key={question.id}>
          <header>{question.title}</header>
          <div className="picture-checkbox">
            {question.answers.map((answer) => (
              <div className="flood-questions-option">
                <div className="picture-checkbox_customized" key={answer.id}>
                  <input
                    type="radio"
                    name={`flood-answer-${question.id}`}
                    onChange={() => onRadioChange(question.id, answer.id)}
                    checked={
                      isGameOver
                        ? question.correctAnswerId === answer.id
                        : radio[question.id] === answer.id
                    }
                  />
                  <label className="picture-checkbox_label"></label>
                </div>
                <span>{answer.title}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
