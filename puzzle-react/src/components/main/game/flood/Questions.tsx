import { FC } from "react";

import { FloodQuestion } from "../../../../data/games.types";

interface QuestionsProps {
    isGameOver: boolean
    questions: FloodQuestion[]
    radio: Record<number, number>

    onRadioChange: (questionId: number, answerId: number) => void
}

export const Questions: FC<QuestionsProps> = ({questions, onRadioChange, radio, isGameOver}) => {
    return (
        <div className="flood-questions">
            {questions.map((question) => (
                <div className="flood-question" key={question.id}>
                    <header>{question.title}</header>
                    <div>
                        {question.answers.map((answer) => (
                            <div key={answer.id}>
                                <input 
                                    type="radio" 
                                    name={`flood-answer-${question.id}`} 
                                    onChange={() => onRadioChange(question.id, answer.id)} 
                                    checked={isGameOver ? question.correctAnswerId === answer.id : radio[question.id] === answer.id }
                                />
                                {answer.title}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}