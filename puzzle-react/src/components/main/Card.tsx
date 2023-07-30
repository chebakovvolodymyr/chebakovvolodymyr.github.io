import { FC } from "react"
import classNames from "classnames"

import { Card as ICard } from "../../data/cards"

interface CardProps {
    isFlipped: boolean
    card: ICard

    onCardClick: (card: ICard) => void
}

const DEFAULT_IMAGE = "./src/assets/NUGARĖLĖ. Nuotrauka iš Vecteezy, aut 1.png"

export const Card: FC<CardProps> = (({isFlipped, card, onCardClick}) => {
    const onClick = () => {
        onCardClick(card)
    }

    return (
        <div className={classNames("card", {
            open: isFlipped,
        })} onClick={onClick}>
              <div className="card-inner">
                <div className="card-front">
                    <img 
                        src={DEFAULT_IMAGE} 
                        alt="NUGARĖLĖ. Nuotrauka iš Vecteezy, aut 1"
                    />
                </div>
                <div className="card-back">
                    <img 
                        src={card.image} 
                    />
                </div>
            </div>
        </div>
    )
})