import { South } from "./South";
import { North } from "./North";
import { Northwest } from "./Northwest";
import { Northeast } from "./Northeast";
import { FC } from "react";

import { Southeast } from "./Southeast";
import { Southwest } from "./Southwest";
import { West } from "./West";
import { East } from "./East";
import { CardinalDirections } from "../Wind.types";

interface CompassProps {
  isGameOver: boolean

  selectedPolygons: CardinalDirections[]
  toggleSelectedPolygon: (polygon: CardinalDirections) => void
}

export const Compass: FC<CompassProps> = ({isGameOver, selectedPolygons, toggleSelectedPolygon}) => {
  return (
    <svg 
      className="compass-icon"
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 428 462"
    >
      <defs>
        <radialGradient 
          id="white_gradient" 
          cx="210.39" 
          cy="229.7" 
          fx="210.39" 
          fy="229.7" 
          r="128.22" 
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#b1b1b1"/>
          <stop offset="1" stopColor="#fff"/>
        </radialGradient>
        <linearGradient xmlns="http://www.w3.org/2000/svg" id="light_green_gradient" x1="151.31" y1="274.07" x2="181.7" y2="274.07" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#86e200"/>
          <stop offset="1" stopColor="#61b900"/>
        </linearGradient>
        <linearGradient xmlns="http://www.w3.org/2000/svg" id="green_gradient" x1="151.31" y1="274.07" x2="181.7" y2="274.07" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7cd300"/>
          <stop offset=".62" stopColor="#438900"/>
        </linearGradient>
        <linearGradient xmlns="http://www.w3.org/2000/svg" id="green_gradient-2" x1="21.88" y1="215.27" x2="210.52" y2="215.27" xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#green_gradient"/>
      </defs>
      <circle className="circle" cx="210.39" cy="229.7" r="128.22"/>
      <South isGameOver={isGameOver} onClick={() => toggleSelectedPolygon(CardinalDirections.SOUTH)} isSelected={selectedPolygons.includes(CardinalDirections.SOUTH)}/>
      <North isGameOver={isGameOver} onClick={() => toggleSelectedPolygon(CardinalDirections.NORTH)} isSelected={selectedPolygons.includes(CardinalDirections.NORTH)}/>
      <Northwest isGameOver={isGameOver} onClick={() => toggleSelectedPolygon(CardinalDirections.NORTHWEST)} isSelected={selectedPolygons.includes(CardinalDirections.NORTHWEST)}/>
      <Northeast isGameOver={isGameOver} onClick={() => toggleSelectedPolygon(CardinalDirections.NORTEAST)} isSelected={selectedPolygons.includes(CardinalDirections.NORTEAST)}/>
      <Southeast isGameOver={isGameOver} onClick={() => toggleSelectedPolygon(CardinalDirections.SOUTHEAST)} isSelected={selectedPolygons.includes(CardinalDirections.SOUTHEAST)}/>
      <Southwest isGameOver={isGameOver} onClick={() => toggleSelectedPolygon(CardinalDirections.SOUTHWEST)} isSelected={selectedPolygons.includes(CardinalDirections.SOUTHWEST)}/>
      <West isGameOver={isGameOver} onClick={() => toggleSelectedPolygon(CardinalDirections.WEST)} isSelected={selectedPolygons.includes(CardinalDirections.WEST)}/>
      <East isGameOver={isGameOver} onClick={() => toggleSelectedPolygon(CardinalDirections.EAST)} isSelected={selectedPolygons.includes(CardinalDirections.EAST)}/>
      <text className="text" transform="translate(204.02 27.7)">
        <tspan x="0" y="0">Š</tspan>
      </text>
      <text className="text" transform="translate(273.87 168.9)"><tspan x="0" y="0">ŠR</tspan></text>
      <text className="text" transform="translate(118.48 168.9)"><tspan x="0" y="0">ŠV</tspan></text>
      <text className="text" transform="translate(272.79 309.67)"><tspan x="0" y="0">PR</tspan></text>
      <text className="text" transform="translate(117.4 309.67)"><tspan x="0" y="0">PV</tspan></text>
      <text className="text" transform="translate(1.21 239.23)"><tspan x="0" y="0">V</tspan></text>
      <text className="text" transform="translate(411.45 239.23)"><tspan x="0" y="0">R</tspan></text>
      <text className="text" transform="translate(202.94 453.46)"><tspan x="0" y="0">P</tspan></text>
    </svg>
  );
};
