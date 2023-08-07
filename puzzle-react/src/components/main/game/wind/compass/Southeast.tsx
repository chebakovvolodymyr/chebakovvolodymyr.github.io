import { FC } from "react"
import classNames from "classnames"

interface SoutheastProps {
    isSelected: boolean
    isGameOver: boolean

    onClick: () => void
}

export const Southeast: FC<SoutheastProps> = ({onClick, isSelected, isGameOver}) => {
    return (
        <>
            <polygon onClick={onClick} className={classNames("grey", {'light-green': !isGameOver && isSelected})}points="269.47 289.27 239.08 258.88 255.93 258.88 269.47 289.27"/>
            <polygon onClick={onClick} className={classNames("black", {'green': !isGameOver && isSelected})} points="269.47 289.27 239.08 258.88 239.08 275.73 269.47 289.27"/>
        </>
    )
}