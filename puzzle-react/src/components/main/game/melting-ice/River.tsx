import classNames from "classnames"
import { FC } from "react"

interface RiverProps {
    selectedPointId: number
    onPointSelect: (pointId: number) => void
}

export const River: FC<RiverProps> = ({onPointSelect, selectedPointId}) => {
    return (
        <div className="melting-ice-river">
            <div className={classNames("melting-ice-river-point", {
                'melting-ice-river-point-selected': selectedPointId === 1
            })} onClick={() => onPointSelect(1)}></div>
            <div className={classNames("melting-ice-river-point", {
                'melting-ice-river-point-selected': selectedPointId === 2
            })} onClick={() => onPointSelect(2)}></div>
            <div className={classNames("melting-ice-river-point", {
                'melting-ice-river-point-selected': selectedPointId === 3
            })} onClick={() => onPointSelect(3)}></div>
        </div>
    )
}