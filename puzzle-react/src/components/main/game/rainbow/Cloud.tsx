import { FC } from "react";
import { useDrag } from "react-dnd";

import { RainbowStripe } from "../../../../data/games.types";
import { CloudSvg } from "./CloudSvg";

interface CloudProps {
    isHidden: boolean
    cloud: RainbowStripe
}

export const Cloud: FC<CloudProps> = ({cloud: {id, color}, isHidden}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "title",
        item: { id, color },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));

    if (isHidden) {
        return null
    }

    return (
        <div className="cloud-item" ref={drag}>
            <CloudSvg color={color} opacity={isDragging ? 0.5 : 1}/>
        </div>
    )
}