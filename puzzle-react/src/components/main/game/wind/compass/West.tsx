import { FC } from "react"
import classNames from "classnames"

interface WestProps {
    isSelected: boolean
    isGameOver: boolean

    onClick: () => void
}

export const West: FC<WestProps> = ({onClick, isSelected, isGameOver}) => {
    return (
        <>
            <polygon onClick={onClick} className={classNames("white", {'light-green': isGameOver || isSelected})} points="21.88 229.7 210.52 229.7 181.66 258.55 21.88 229.7"/>
            <polygon onClick={onClick} className={classNames("black", {'green': isGameOver || isSelected})}points="21.88 229.7 210.52 229.7 181.66 200.85 21.88 229.7"/>
        </>
    )
}