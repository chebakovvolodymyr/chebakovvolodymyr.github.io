import { useContext } from "react";

import { ActiveQuestionContext } from "../../../context/ActiveQuestion";
import { CrosswordRow } from "./CrosswordRow";
import { Header } from "../../Header";
import { Footer } from "../../Footer";

export const Crossword = () => {
  const { questions } = useContext(ActiveQuestionContext);

  return (
    <div className="crossword">
      <Header />
      <table className="crossword-table">
        <tbody>
          {questions.map((question) => (
            <CrosswordRow key={question.id} {...question} />
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};
