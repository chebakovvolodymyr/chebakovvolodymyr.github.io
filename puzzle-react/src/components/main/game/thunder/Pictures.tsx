import { FC } from "react";
import classNames from "classnames";

import { ThunderDetection, ThunderPlace } from "../../../../data/games.types";
import { PictureCheckbox } from "../../../picture-checkbox/PictureCheckbox";

interface PicturesProps {
  places: ThunderPlace[];
  detections: ThunderDetection[];
  checkedCheckboxes: number[];
  toogleCheckbox: (placeId: number) => void;
  isGameOver: boolean;
  activeButton: number;
  setActiveButton: (activeButton: number) => void;
}

export const Pictures: FC<PicturesProps> = ({
  places,
  isGameOver,
  checkedCheckboxes,
  toogleCheckbox,
  detections,
  setActiveButton,
  activeButton,
}) => {
  return (
    <div className="thunder-pictures">
      {places.map((place) => (
        <PictureCheckbox
          key={place.id}
          url={place.picture}
          alt={place.alt}
          checked={checkedCheckboxes.includes(place.id)}
          isCorrect={place.isCorrect}
          onChange={() => toogleCheckbox(place.id)}
          isGameOver={isGameOver}
        />
      ))}
      <div className="thunder-detections">
        <span className="thunder-detections_title">Perkūniją mes pirmiau</span>
        {detections.map((detection) => (
          <button
            key={detection.id}
            onClick={() => setActiveButton(detection.id)}
            className={classNames({
              active: isGameOver
                ? detection.isCorrect
                : activeButton === detection.id,
              inactive: isGameOver && !detection.isCorrect,
            })}
          >
            {detection.title}
          </button>
        ))}
      </div>
    </div>
  );
};
