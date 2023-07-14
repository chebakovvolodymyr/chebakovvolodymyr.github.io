import { useContext } from "react";

import { ActiveQuestionContext } from "../../../context/ActiveQuestion";
import { CrosswordRow } from "./CrosswordRow";

export const Crossword = () => {
  const { questions } = useContext(ActiveQuestionContext);

  return (
    <div className="crossword">
      <table>
        <tbody>
          {questions.map((question) => (
            <CrosswordRow key={question.id} {...question} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
