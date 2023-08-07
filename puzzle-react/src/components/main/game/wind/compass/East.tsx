import { FC } from "react"
import classNames from "classnames"

interface EastProps {
    isSelected: boolean
    isGameOver: boolean

    onClick: () => void
}

export const East: FC<EastProps> = ({onClick, isSelected, isGameOver}) => {
    return (
        <>
            <polygon onClick={onClick} className={classNames("white", {'light-green': !isGameOver &&isSelected})} points="398.91 229.7 210.27 229.7 239.13 200.85 398.91 229.7"/>
            <polygon onClick={onClick} className={classNames("black", {'green': !isGameOver && isSelected})} points="398.91 229.7 210.27 229.7 239.13 258.55 398.91 229.7"/>
        </>
    )
}