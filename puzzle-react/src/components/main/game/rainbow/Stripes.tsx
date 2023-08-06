import { FC } from "react"

import { RainbowStripe } from "../../../../data/games.types"
import { Stripe } from "./Stripe"
import { DroppedColor } from "./Rainbow.types"

interface StripesProps {
    stripes: RainbowStripe[]

    droppedColors: DroppedColor[]

    setDroppedColor: (droppedColor: DroppedColor) => void
}

export const Stripes: FC<StripesProps> = ({stripes, setDroppedColor, droppedColors}) => {
    return (
        <div className="rainbow">
            {stripes.map(stripe => (
                <Stripe key={stripe.id} stripe={stripe} setDroppedColor={setDroppedColor} droppedColor={droppedColors.find(color => color.attachedId === stripe.id)}/>
            ))}
        </div>
    )
}