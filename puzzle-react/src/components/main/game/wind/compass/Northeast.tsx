import { FC } from "react";
import classNames from "classnames";

interface NortheastProps {
  isSelected: boolean;
  isGameOver: boolean;

  onClick: () => void;
}

export const Northeast: FC<NortheastProps> = ({
  onClick,
  isSelected,
  isGameOver,
}) => {
  return (
    <>
      <polygon
        onClick={onClick}
        className={classNames("grey", {
          "light-green": !isGameOver && isSelected,
        })}
        points="269.47 170.14 239.08 200.53 239.08 183.68 269.47 170.14"
      />
      <polygon
        onClick={onClick}
        className={classNames("black", { green: !isGameOver && isSelected })}
        points="269.47 170.14 239.08 200.53 255.93 200.53 269.47 170.14"
      />
    </>
  );
};
