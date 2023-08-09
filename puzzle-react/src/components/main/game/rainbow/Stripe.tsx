import { FC, useContext, useEffect, useRef } from "react"
import classNames from "classnames"
import { useDrop } from "react-dnd"

import { RainbowStripe } from "../../../../data/games.types"
import { DragContext } from "../../../../context/DragContext"
import { DroppedColor } from "./Rainbow.types"

interface StripeProps {
    stripe: RainbowStripe
    droppedColor?: DroppedColor
    isGameOver: boolean

    setDroppedColor: (droppedColor: DroppedColor) => void
}

export const Stripe: FC<StripeProps> = ({stripe, droppedColor, setDroppedColor, isGameOver}) => {
  const divRef = useRef<HTMLDivElement | null>(null)
  const {setDropElement, hoveredElement, droppedElement} = useContext(DragContext)

    const [{ isOver }, drop] = useDrop(
        () => ({
          drop: (item: { id: number; color: string }) => {
            if (droppedColor) {
              return;
            }
    
            setDroppedColor({
              attachedId: stripe.id,
              color: item.color,
              id: item.id,
            });
          },
          accept: "title",
          collect: (monitor) => ({
            isOver: !!monitor.isOver() || (!droppedColor && !!hoveredElement && hoveredElement === divRef.current),
          }),
        }),
        [droppedColor, hoveredElement],
      );

    useEffect(() => {
      if (droppedColor) {
        return
      }
      
      if (droppedElement && droppedElement.element === divRef.current) {
        setDroppedColor({
          attachedId: stripe.id,
          color: droppedElement.params.color as string,
          id: droppedElement.params.id as number,
        });
      }
    }, [droppedColor, droppedElement, setDroppedColor, stripe.id])

    return (
        <div ref={(ref) => {
          drop(ref)
          setDropElement(ref)
          divRef.current = ref
        }} className={classNames("stripe", stripe.type, {
            'stripe--highlight': isOver && !droppedColor,
        })} style={{
            borderColor: isGameOver ? stripe.color : droppedColor?.color,
        }}>{isGameOver && stripe.text}</div>
    )
}