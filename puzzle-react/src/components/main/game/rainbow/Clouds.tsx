import { FC } from "react";

import { RainbowStripe } from "../../../../data/games.types";
import { Cloud } from "./Cloud";
import { DroppedColor } from "./Rainbow.types";

interface CloudsProps {
  stripes: RainbowStripe[];
  droppedColors: DroppedColor[];
}

export const Clouds: FC<CloudsProps> = ({ stripes, droppedColors }) => {
  return (
    <div className="clouds-wrapper">
      {stripes.map((stripe, index) => (
        <Cloud
          key={stripe.id}
          index={index + 1}
          cloud={stripe}
          isHidden={
            !!droppedColors.find(
              (droppedColor) => droppedColor.id === stripe.id,
            )
          }
        />
      ))}
    </div>
  );
};
