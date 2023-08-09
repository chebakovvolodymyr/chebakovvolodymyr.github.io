import classNames from "classnames";
import { FC, useEffect, useRef, useState } from "react";

interface RiverProps {
  selectedPointId: number;
  onPointSelect: (pointId: number) => void;
}

const drawArrow = (context: CanvasRenderingContext2D , fromx: number, fromy: number, tox: number, toy: number) => {
  const headlen = 30; // length of head in pixels
  context.lineWidth = 5;
  context.strokeStyle = "#3AAA35";


  const dx = tox - fromx;
  const dy = toy - fromy;
  const angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 4), toy - headlen * Math.sin(angle - Math.PI / 4));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 4), toy - headlen * Math.sin(angle + Math.PI / 4));
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

    const centerX = canvas.width / 3;
    const centerY = canvas.height / 2;
    const radius = 40;

    ctx.lineWidth = 2;

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

    ctx.beginPath();
    drawArrow(ctx, 220, 260, 180, 150);
    drawArrow(ctx, 650, 400, 520, 400);
    drawArrow(ctx, 1050, 310, 950, 350);
    ctx.stroke();
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
      //TODO: add points
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
