import { FC } from "react"
import classNames from "classnames"

interface SouthwestProps {
    isSelected: boolean
    isGameOver: boolean

    onClick: () => void
}

export const Southwest: FC<SouthwestProps> = ({onClick, isSelected, isGameOver}) => {
    return (
        <>
            <polygon onClick={onClick} className={classNames("grey", {'light-green': isGameOver || isSelected})} points="151.31 289.27 181.7 258.88 181.7 275.73 151.31 289.27"/>
            <polygon onClick={onClick} className={classNames("black", {'green': isGameOver || isSelected})} points="151.31 289.27 181.7 258.88 164.85 258.88 151.31 289.27"/>
        </>
    )
}