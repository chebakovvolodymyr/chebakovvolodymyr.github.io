import { FC } from "react"
import { useDrop } from "react-dnd"
import classNames from "classnames"

import { Snowflake } from "../../../../data/games.types"
import { PictureCheckbox } from "../../../picture-checkbox/PictureCheckbox"
import { DroppedTitle } from "../../titles/Titles.types"

interface PictureProps {
    snowflake: Snowflake

    checked: boolean
    isGameOver: boolean
    title?: string

    toogleCheckbox: (cloudId: number) => void
    setDroppedTitle: (droppedTitle: DroppedTitle) => void

}

export const Picture: FC<PictureProps> = ({snowflake, checked, toogleCheckbox, setDroppedTitle, title, isGameOver}) => {
    const [{isOver}, drop] = useDrop(() => ({
        drop: (item: {id: number, title: string}) => {
            if (title) {
                return
            }

            setDroppedTitle({attachedCloudId: snowflake.id, title: item.title, id: item.id})
        },
        accept: 'title',
        collect: monitor => ({
            isOver: !!monitor.isOver(),
          }),
      }), [title])
    
    const onChange = () => {
        toogleCheckbox(snowflake.id)
    }
    return (
        <div ref={drop} className={classNames('picture', {
            'picture--highlight': isOver && !title,
        })}>
            <PictureCheckbox 
                url={snowflake.picture} 
                alt={snowflake.alt} 
                checked={isGameOver ? snowflake.isCorrect : checked} 
                onChange={onChange}
            />
            {isGameOver && (
                <span>{snowflake.title}</span>
            )}
            {!!title && !isGameOver && (
                <span>{title}</span>
            )}
        </div>
    )
}