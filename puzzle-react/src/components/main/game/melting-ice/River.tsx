import classNames from "classnames";
import { FC, useEffect, useRef, useState } from "react";

interface RiverProps {
  selectedPointId: number;
  onPointSelect: (pointId: number) => void;
}

const draw = (canvas: HTMLCanvasElement | null) => {
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  const img = new Image();

  img.onload = () => {
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const x = (canvas.width - newWidth) / 2;
    const y = (canvas.height - newHeight) / 2;

    ctx.drawImage(img, x, y, newWidth, newHeight);

    // Рассчитываем координаты центра и радиус для кружков
    const centerX = canvas.width / 3;
    const centerY = canvas.height / 2;
    const radius = 40;

    ctx.lineWidth = 2;

    // Рисуем кружочки с белым фоном и зеленым бордером
    ctx.beginPath();
    ctx.arc(centerX - radius - 10, centerY + 70, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "green";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX + 400, centerY + 85, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "green";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX + 730, centerY - 40, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "green";
    ctx.fill();
    ctx.stroke();

    const headlen = 10;
    const fromx = 100;
    const fromy = 100;
    const tox = 100;
    const toy = 10;
    const arrowWidth = 3;
    const color = 'green';
    const angle = Math.atan2(toy - fromy, tox - fromx);
  
    ctx.save();
    ctx.strokeStyle = color;
  
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = arrowWidth;
    ctx.stroke();
  
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
  
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
  
    ctx.stroke();
    ctx.restore();
  };

  img.src = "/src/assets/games/melting-ice/melted_ice_bg.jpg";
};

export const River: FC<RiverProps> = ({ onPointSelect, selectedPointId }) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [width, setWidth] = useState(window.outerWidth * 0.8);

  useEffect(() => {
    draw(canvasRef.current);
  }, []);

  return (
    <div className="melting-ice-river">
      <canvas ref={canvasRef} width={`${width}px`} height="600px"></canvas>
      <div
        className={classNames("melting-ice-river-point", {
          "melting-ice-river-point-selected": selectedPointId === 1,
        })}
        onClick={() => onPointSelect(1)}
      ></div>
      <div
        className={classNames("melting-ice-river-point", {
          "melting-ice-river-point-selected": selectedPointId === 2,
        })}
        onClick={() => onPointSelect(2)}
      ></div>
      <div
        className={classNames("melting-ice-river-point", {
          "melting-ice-river-point-selected": selectedPointId === 3,
        })}
        onClick={() => onPointSelect(3)}
      ></div>
    </div>
  );
};
