import { FC } from "react"
import { useDrop } from "react-dnd"
import classNames from "classnames"

import { EarthAnswer } from "../../../../data/games.types"
import { DroppedTitle } from "../../titles/Titles.types"

interface PlaceProps {
    answer: EarthAnswer
    droppedTitle?: DroppedTitle

    setDroppedTitle: (title: DroppedTitle) => void
}

export const Place: FC<PlaceProps> = ({answer, droppedTitle, setDroppedTitle}) => {
    const [{isOver}, drop] = useDrop(() => ({
        drop: (item: {id: number, title: string}) => {
            if (droppedTitle) {
                return
            }

            setDroppedTitle({attachedId: answer.id, title: item.title, id: item.id})
        },
        accept: 'title',
        collect: monitor => ({
            isOver: !!monitor.isOver(),
          }),
      }), [droppedTitle])
    return (
        <div className={classNames('earth-place', {
            'earth-place--highlight': isOver && !droppedTitle,
            'title': !!droppedTitle,
        })} ref={drop}>{droppedTitle?.title}</div>
    )
}