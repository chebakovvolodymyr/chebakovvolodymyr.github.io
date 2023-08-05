import { FC, useCallback, useState } from "react"
import { Header } from "./Header"
import { games } from "../../../../data/games"
import { Result } from "./Result"
import { Questions } from "./Questions"

interface FloodProps {
    isGameOver: boolean

    closeGame: () => void
    finishGame: () => void
}

export const Flood: FC<FloodProps> = ({isGameOver, closeGame, finishGame}) => {
    const {
        flood: {
            questions,
        }
    } = games

    const [score, setScore] = useState(0)

    const [radio, setRadio] = useState<number[]>([])
    const onRadioChange = useCallback((questionId: number, answerId: number) => {
        if (isGameOver) {
            return
        }

        setRadio(radio => ({...radio, [questionId]: answerId}))
    }, [isGameOver])

    const calculateResult = useCallback(() => {
        const radioScore = questions.reduce((acc, question) => {
            if (radio[question.id] === question.correctAnswerId) {
                return acc + 1
            }

            return acc
        }, 0)

        setScore(radioScore)
    }, [questions, radio])

    const isContinueButtonDisabled = Object.keys(radio).length < 3
    
    return (
        <div className="flood">
            <Header 
                closeGame={closeGame} 
                isContinueButtonDisabled={isContinueButtonDisabled} 
                finishGame={finishGame} 
                isGameOver={isGameOver}
                calculateResult={calculateResult}
                score={score}
            />
            <Questions questions={questions} onRadioChange={onRadioChange} radio={radio} isGameOver={isGameOver}/>
            {isGameOver && (
                <Result/>
            )}
        </div>
    )
}