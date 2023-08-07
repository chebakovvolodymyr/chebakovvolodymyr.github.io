import { FC } from "react"
import classNames from "classnames"

interface NorthProps {
    isSelected: boolean
    isGameOver: boolean

    onClick: () => void
}

export const North: FC<NorthProps> = ({onClick, isSelected, isGameOver}) => {
    return (
        <>
            <polygon onClick={onClick} className={classNames("white", {'light-green': !isGameOver && isSelected})} points="210.39 41.19 210.39 229.82 181.54 200.97 210.39 41.19"/>
            <polygon onClick={onClick} className={classNames("black", {'green': !isGameOver && isSelected})}points="210.39 41.19 210.39 229.82 239.25 200.97 210.39 41.19"/>
        </>
    )
} 