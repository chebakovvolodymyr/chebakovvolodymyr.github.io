import { FC } from "react"

import { EarthAnswer } from "../../../../data/games.types"
import { DroppedTitle } from "../../titles/Titles.types"
import { Title } from "./Title"

interface TitlesProps{
    answers: EarthAnswer[]

    droppedTitles: DroppedTitle[]
}

export const Titles: FC<TitlesProps> = ({answers, droppedTitles}) => {
    return (
        <div className="titles earth-titles">
            {answers.map(answer => <Title key={answer.id} answer={answer} isHidden={!!droppedTitles.find(title => title.id === answer.id)}/>)}
        </div>
    )
}