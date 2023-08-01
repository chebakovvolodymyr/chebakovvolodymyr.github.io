import { FC, useCallback, useState } from "react"
import { Header } from "./Header"
import { games } from "../../../../data/games"
import { Pictures } from "./Pictures"
import { Result } from "./Result"

interface ThunderProps {
    isGameOver: boolean

    closeGame: () => void
    finishGame: () => void
}

export const Thunder: FC<ThunderProps> = ({isGameOver, closeGame, finishGame}) => {
    const {
        thunder: {
            places,
            detections,
        }
    } = games

    const [score, setScore] = useState(0)
    const [activeButton, setActiveButton] = useState(0)

    const [checkedCheckboxes, setCheckedCheckboxes] = useState<number[]>([])
    const toogleCheckbox = useCallback((placeId: number) => {
        if (isGameOver) {
            return
        }

        setCheckedCheckboxes(checkedCheckboxes => checkedCheckboxes.includes(placeId) ?
        checkedCheckboxes.filter(checkedCheckbox => checkedCheckbox !== placeId) :
        [...checkedCheckboxes, placeId]
        )
    }, [isGameOver])

    const calculateResult = useCallback(() => {
        const checkboxesScore = places.reduce((acc, place) => {
            if (place.isCorrect && checkedCheckboxes.includes(place.id)) {
                return acc + 1
            }

            return acc
        }, 0)

        const detectionScore = detections.reduce((acc, detection) => {
            if (detection.id === activeButton) {
                return 1
            }
            return acc
        }, 0)

        setScore(checkboxesScore + detectionScore)
    }, [places, checkedCheckboxes, activeButton, detections])

    const isContinueButtonDisabled = !checkedCheckboxes.length || !activeButton
    
    return (
        <div className="thunder">
            <Header 
                closeGame={closeGame} 
                isContinueButtonDisabled={isContinueButtonDisabled} 
                finishGame={finishGame} 
                isGameOver={isGameOver}
                calculateResult={calculateResult}
                score={score}
            />
            <Pictures 
                places={places} 
                detections={detections}
                checkedCheckboxes={checkedCheckboxes} 
                toogleCheckbox={toogleCheckbox} 
                isGameOver={isGameOver}
                activeButton={activeButton} 
                setActiveButton={setActiveButton}
            />
            {isGameOver && (
                <Result/>
            )}
        </div>
    )
}