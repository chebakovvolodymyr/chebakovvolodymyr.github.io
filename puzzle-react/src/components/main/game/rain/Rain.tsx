import { FC, useCallback, useMemo, useState } from "react"

import { games } from "../../../../data/games"
import { shuffle } from "../../../../utils/shuffle"
import { Pictures } from "./Pictures"
import { Header } from "./Header"
import { Titles } from "./Titles"
import { DroppedTitle } from "./Rain.types"

interface RainProps {
    closeGame: () => void
}

export const Rain: FC<RainProps> = ({closeGame}) => {
    const {
        rain: {
            clouds,
        }
    } = games

    const [droppedTitles, setDroppedTitles] = useState<DroppedTitle[]>([])

    const setDroppedTitle = useCallback(({id, attachedCloudId, title}: DroppedTitle) => {
        setDroppedTitles(droppedTitles => [...droppedTitles, {id, title, attachedCloudId}])
    }, [])

    const [checkedCheckboxes, setCheckedCheckboxes] = useState<number[]>([])
    const toogleCheckbox = useCallback((cloudId: number) => {
        setCheckedCheckboxes(checkedCheckboxes => checkedCheckboxes.includes(cloudId) ?
        checkedCheckboxes.filter(checkedCheckbox => checkedCheckbox !== cloudId) :
        [...checkedCheckboxes, cloudId]
        )
    }, [])

    const shuffledClouds = useMemo(() => shuffle(clouds), [clouds])

    const isContinueButtonDisabled = droppedTitles.length === clouds.length && !!checkedCheckboxes.length
    
    return (
        <div className="rain">
            <Header closeGame={closeGame} isContinueButtonDisabled={isContinueButtonDisabled}/>
            <Pictures clouds={clouds} setDroppedTitle={setDroppedTitle} droppedTitles={droppedTitles} checkedCheckboxes={checkedCheckboxes} toogleCheckbox={toogleCheckbox}/>
            <Titles clouds={shuffledClouds} droppedTitles={droppedTitles}/>
        </div>
    )
}