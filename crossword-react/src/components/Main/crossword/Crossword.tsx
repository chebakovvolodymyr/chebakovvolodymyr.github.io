import { useMemo } from "react"

import { placeQuestions } from "../../../utils/placeQuestions"
import { CrosswordRow } from "./CrosswordRow"

export const Crossword = () => {
    const questions = useMemo(placeQuestions, [])
    return (
        <div className="crossword">
            <table>
                <tbody>
                    {questions.map(question => <CrosswordRow key={question.id} {...question}/>)}
                </tbody>
            </table>
        </div>
    )
}