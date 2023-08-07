import { FC } from "react"
import classNames from "classnames"

interface SouthProps {
    isSelected: boolean
    isGameOver: boolean

    onClick: () => void
}

export const South: FC<SouthProps> = ({onClick, isSelected, isGameOver}) => {
    return (
        <>
            <polygon onClick={onClick} className={classNames("white", {'light-green': !isGameOver && isSelected})} points="210.39 418.21 210.39 229.58 239.25 258.43 210.39 418.21"/>
            <polygon onClick={onClick} className={classNames("black", {'green': !isGameOver && isSelected})} points="210.39 418.21 210.39 229.58 181.54 258.43 210.39 418.21"/>
        </>
    )
}