import { FC } from "react"
import { useDrop } from "react-dnd"
import classNames from "classnames"

import { Cloud } from "../../../../data/games"
import { PictureCheckbox } from "../../../picture-checkbox/PictureCheckbox"
import { DroppedTitle } from "./Rain.types"

interface PictureProps {
    cloud: Cloud

    checked: boolean
    isGameOver: boolean
    title?: string

    toogleCheckbox: (cloudId: number) => void
    setDroppedTitle: (droppedTitle: DroppedTitle) => void

}

export const Picture: FC<PictureProps> = ({cloud, checked, toogleCheckbox, setDroppedTitle, title, isGameOver}) => {
    const [{isOver}, drop] = useDrop(() => ({
        drop: (item: {id: number, title: string}) => {
            if (title) {
                return
            }

            setDroppedTitle({attachedCloudId: cloud.id, title: item.title, id: item.id})
        },
        accept: 'title',
        collect: monitor => ({
            isOver: !!monitor.isOver(),
          }),
      }), [title])
    
    const onChange = () => {
        toogleCheckbox(cloud.id)
    }
    return (
        <div ref={drop} className={classNames('picture', {
            'picture--highlight': isOver && !title,
        })}>
            <PictureCheckbox 
                url={cloud.picture} 
                alt={cloud.alt} 
                checked={isGameOver ? cloud.isCorrect : checked} 
                onChange={onChange}
            />
            {isGameOver && (
                <>
                    <span>{cloud.title}</span>
                    <div>
                        {cloud.description}
                    </div>
                </>
            )}
            {!!title && !isGameOver && (
                <span>{title}</span>
            )}
        </div>
    )
}