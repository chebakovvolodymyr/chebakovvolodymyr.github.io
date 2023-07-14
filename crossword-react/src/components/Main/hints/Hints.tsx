import { useContext } from "react";

import { ActiveQuestionContext } from "../../../context/ActiveQuestion";
import { NoActiveQuestionTitle } from "./NoActiveQuestionTitle";
import { QuestionDescription } from "./question-description/QuestionDescription";

export const Hints = () => {
    const {activeQuestion} = useContext(ActiveQuestionContext);

    return (
        <div className="hints">
            {!!activeQuestion ? <QuestionDescription/> : <NoActiveQuestionTitle/>}
        </div>
    )
}