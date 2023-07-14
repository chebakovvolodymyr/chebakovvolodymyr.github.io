import { FC, PropsWithChildren, createContext, useState } from "react";

import { Question } from "../data/questions.types";

type ActiveQuestionContextProps = {
    activeQuestion: Question | null,
    setActiveQuestion: (question: Question | null) => void,
    selectedAnswer: string, 
    setSelectedAnswer: (answer: string) => void,
}

export const ActiveQuestionContext = createContext<ActiveQuestionContextProps>({} as ActiveQuestionContextProps);

export const ActiveQuestionContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [activeQuestion, setActiveQuestion] = useState<Question | null>(null)
    const [selectedAnswer, setSelectedAnswer] = useState('')

    return (
      <ActiveQuestionContext.Provider value={{activeQuestion, setActiveQuestion, selectedAnswer, setSelectedAnswer}}>
        {children}
      </ActiveQuestionContext.Provider>
    )
  }