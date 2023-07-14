import { useContext } from "react";

import { ActiveQuestionContext } from "../../../../context/ActiveQuestion";
import { Description } from "./Description";
import { Answers } from "./Answers";
import {Image} from './Image'

export const QuestionDescription = () => {
    const {activeQuestion, selectedAnswer} = useContext(ActiveQuestionContext);
    if (!activeQuestion) {
        return null
    }

    const {
        id, 
        question,
        answers,
        correctAnswer,
        description: {
            short,
            long,
            picture,
        },
    } = activeQuestion
    return (
        <div>
            <div>{id}</div>
            <div>{question}</div>
            <div style={{display: 'flex'}}>
                <Answers answers={answers} correctAnswer={correctAnswer}/>
                <Image picture={picture}/>
            </div>
           {!!selectedAnswer && <Description long={long} short={short}/>}
        </div>
    )
}