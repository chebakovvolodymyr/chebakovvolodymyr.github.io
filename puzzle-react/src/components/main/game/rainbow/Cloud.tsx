import { FC, useRef } from "react";
import { useDrag } from "react-dnd";

import { RainbowStripe } from "../../../../data/games.types";
import { CloudSvg } from "./CloudSvg";

interface CloudProps {
    isHidden: boolean
    cloud: RainbowStripe
}

export const Cloud: FC<CloudProps> = ({cloud: {id, color}, isHidden}) => {
    const cloudRef = useRef<HTMLDivElement | null>(null)

    const [{ diffOffset, isDragging }, drag, preview] = useDrag(() => ({
        type: "title",
        item: { id, color },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
          diffOffset: monitor.getDifferenceFromInitialOffset(),
        }),
      }));

    if (isHidden) {
        return null
    }

    return (
        <>
            <div className="cloud-item" ref={(ref) => {
                drag(ref)
                cloudRef.current = ref
            }}>
                <CloudSvg color={color} opacity={isDragging ? 0.5 : 1}/>
            </div>
            {isDragging && (
                <div 
                    ref={preview}
                    style={diffOffset && cloudRef.current ? { position: 'absolute', top: cloudRef.current.offsetTop + diffOffset.y, left: cloudRef.current.offsetLeft + diffOffset.x + 50 } : undefined}
                >
                    <CloudSvg color={color} opacity={1}/>
                </div> 
            )}
        </>
    )
}