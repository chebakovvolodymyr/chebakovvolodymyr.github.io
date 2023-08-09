import { FC } from "react"

import { RainbowStripe } from "../../../../data/games.types"
import { Stripe } from "./Stripe"
import { DroppedColor } from "./Rainbow.types"

interface StripesProps {
    stripes: RainbowStripe[]
    isGameOver: boolean

    droppedColors: DroppedColor[]

    setDroppedColor: (droppedColor: DroppedColor) => void
}

export const Stripes: FC<StripesProps> = ({stripes, setDroppedColor, droppedColors, isGameOver}) => {
    return (
        <div className="rainbow">
            {stripes.map(stripe => (
                <Stripe key={stripe.id} stripe={stripe} setDroppedColor={setDroppedColor} droppedColor={droppedColors.find(color => color.attachedId === stripe.id)} isGameOver={isGameOver}/>
            ))}
        </div>
    )
}