import { FC, useCallback, useMemo, useState } from "react"

import { games } from "../../../../data/games"
import { shuffle } from "../../../../utils/shuffle"
import { Pictures } from "./Pictures"
import { Header } from "./Header"
import { Titles } from "./Titles"
import { DroppedTitle } from "./Rain.types"

interface RainProps {
    isGameOver: boolean

    closeGame: () => void
    finishGame: () => void
}

export const Rain: FC<RainProps> = ({isGameOver, closeGame, finishGame}) => {
    const {
        rain: {
            clouds,
        }
    } = games

    const [droppedTitles, setDroppedTitles] = useState<DroppedTitle[]>([])
    const [score, setScore] = useState(0)

    const setDroppedTitle = useCallback(({id, attachedCloudId, title}: DroppedTitle) => {
        setDroppedTitles(droppedTitles => [...droppedTitles, {id, title, attachedCloudId}])
    }, [])

    const [checkedCheckboxes, setCheckedCheckboxes] = useState<number[]>([])
    const toogleCheckbox = useCallback((cloudId: number) => {
        if (isGameOver) {
            return
        }

        setCheckedCheckboxes(checkedCheckboxes => checkedCheckboxes.includes(cloudId) ?
        checkedCheckboxes.filter(checkedCheckbox => checkedCheckbox !== cloudId) :
        [...checkedCheckboxes, cloudId]
        )
    }, [isGameOver])

    const shuffledClouds = useMemo(() => shuffle(clouds), [clouds])

    const calculateResult = useCallback(() => {
        const checkboxesScore = clouds.reduce((acc, cloud) => {
            if (cloud.isCorrect && checkedCheckboxes.includes(cloud.id)) {
                return acc + 0.5
            }

            return acc
        }, 0)

        const titlesScore = droppedTitles.reduce((acc, title) => {
            if (title.id === title.attachedCloudId) {
                return acc + 0.25
            }

            return acc
        }, 0)

        setScore(checkboxesScore + titlesScore)
    }, [clouds, droppedTitles, checkedCheckboxes])

    const isContinueButtonDisabled = droppedTitles.length !== clouds.length || !checkedCheckboxes.length
    
    return (
        <div className="rain">
            <Header 
                closeGame={closeGame} 
                isContinueButtonDisabled={isContinueButtonDisabled} 
                finishGame={finishGame} 
                isGameOver={isGameOver}
                calculateResult={calculateResult}
                score={score}
            />
            <Pictures 
                clouds={clouds} 
                setDroppedTitle={setDroppedTitle} 
                droppedTitles={droppedTitles} 
                checkedCheckboxes={checkedCheckboxes} 
                toogleCheckbox={toogleCheckbox} 
                isGameOver={isGameOver}
            />
            <Titles clouds={shuffledClouds} droppedTitles={droppedTitles}/>
        </div>
    )
}