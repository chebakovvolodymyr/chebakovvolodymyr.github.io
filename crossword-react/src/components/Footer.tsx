import { useContext } from "react";
import { ActiveQuestionContext } from "../context/ActiveQuestion";

export const Footer = () => {
    const {setActiveQuestion, selectedAnswer, setSelectedAnswer} = useContext(ActiveQuestionContext);

    const onContinueClick = () => {
        setActiveQuestion(null)
        setSelectedAnswer('')
    }

    return (
        <footer>
            <button className="btn-orange">Baigti</button>
            {selectedAnswer && <button onClick={onContinueClick}>Tęsti</button>}
        </footer>
    )
}