import { FC } from "react"
import classNames from "classnames"
import { useDrop } from "react-dnd"

import { RainbowStripe } from "../../../../data/games.types"
import { DroppedColor } from "./Rainbow.types"

interface StripeProps {
    stripe: RainbowStripe
    droppedColor?: DroppedColor

    setDroppedColor: (droppedColor: DroppedColor) => void
}

export const Stripe: FC<StripeProps> = ({stripe, droppedColor, setDroppedColor}) => {
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
            isOver: !!monitor.isOver(),
          }),
        }),
        [droppedColor],
      );
    return (
        <div ref={drop} className={classNames("stripe", stripe.type, {
            'stripe--highlight': isOver && !droppedColor,
        })} style={{
            borderColor: droppedColor?.color,
        }}></div>
    )
}