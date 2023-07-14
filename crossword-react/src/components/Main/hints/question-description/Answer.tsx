import { useContext } from "react";
import { ActiveQuestionContext } from "../../../../context/ActiveQuestion";

interface AnswerProps {
    answer: string
    isCorrected: boolean
    onAnswerClick: (answer: string) => void
}

export const Answer = ({answer, onAnswerClick, isCorrected}: AnswerProps) => {
    const {selectedAnswer} = useContext(ActiveQuestionContext);

    const onClick = () => onAnswerClick(answer)
    return (
        <button onClick={onClick} style={{
            backgroundColor: selectedAnswer ? (isCorrected ? 'green' : 'orange') : 'inherit' 
        }}>{answer}</button>
    )
}