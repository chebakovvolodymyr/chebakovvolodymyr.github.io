import { useContext } from "react";
import { ActiveQuestionContext } from "../context/ActiveQuestion";

export const Footer = () => {
  const {
    setActiveQuestion,
    selectedAnswer,
    setSelectedAnswer,
    correctedAnswersAmount,
    questions,
    isFinished,
  } = useContext(ActiveQuestionContext);

  const onContinueClick = () => {
    if (isFinished) {
      location.reload();
      return;
    }
    setActiveQuestion(null);
    setSelectedAnswer("");
  };

  const onEndClick = () => {
    location.reload();
  };

  return (
    <footer>
      {isFinished && <h3>Valio – kryžiažodis išspręstas!</h3>}
      <button className="btn btn-orange" onClick={onEndClick}>
      </button>
      {selectedAnswer && (
        <button className="btn btn-green" onClick={onContinueClick}>
          {isFinished
            ? `Teisingų atsakymų: ${correctedAnswersAmount} iš ${questions.length}.`
            : "Tęsti"}
        </button>
      )}
    </footer>
  );
};
