import { useCallback, useContext } from "react"

import { ActiveQuestionContext } from "../../../../context/ActiveQuestion"

import { Answer } from "./Answer"

interface AnswersProps {
    answers: string[]
    correctAnswer: string
}

export const Answers = ({answers, correctAnswer}: AnswersProps) => {
    const {setSelectedAnswer} = useContext(ActiveQuestionContext);

    const onAnswerClick = useCallback((answer: string) => {
        setSelectedAnswer(answer)
    }, [])

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {answers.map(answer => <Answer key={answer} answer={answer} onAnswerClick={onAnswerClick} isCorrected={answer === correctAnswer}/>)}
        </div>
    )
}