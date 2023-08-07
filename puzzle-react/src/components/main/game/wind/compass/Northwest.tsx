import { FC } from "react"
import classNames from "classnames"

interface NorthwestProps {
    isSelected: boolean
    isGameOver: boolean

    onClick: () => void
}

export const Northwest: FC<NorthwestProps> = ({onClick, isSelected, isGameOver}) => {
    return (
        <>
            <polygon onClick={onClick} className={classNames("grey", {'light-green': isGameOver || isSelected})}points="151.31 170.14 181.7 200.53 164.85 200.53 151.31 170.14"/>
            <polygon onClick={onClick} className={classNames("black", {'green': isGameOver || isSelected})}points="151.31 170.14 181.7 200.53 181.7 183.68 151.31 170.14"/>
        </>
    )
}