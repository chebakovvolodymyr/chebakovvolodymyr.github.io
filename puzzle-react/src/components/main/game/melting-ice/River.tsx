import { FC, memo, useEffect, useRef, useState } from "react";

interface RiverProps {
  onPointSelect: (pointId: number) => void;
  selectedPointId: number;
  isGameOver: boolean;
}

const drawArrow = (
  context: CanvasRenderingContext2D,
  fromx: number,
  fromy: number,
  tox: number,
  toy: number,
) => {
  const headlen = 50; // length of head in pixels
  context.lineWidth = 10;
  context.strokeStyle = "#3AAA35";

  const dx = tox - fromx;
  const dy = toy - fromy;
  const angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 4),
    toy - headlen * Math.sin(angle - Math.PI / 4),
  );
  context.moveTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle + Math.PI / 4),
    toy - headlen * Math.sin(angle + Math.PI / 4),
  );
};

const drawCircle = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  isSelected: boolean,
  isLastSelected = false,
) => {
  const radius = 60;
  const circle = new Path2D();

  circle.arc(x, y, radius, 0, 2 * Math.PI);
  context.lineWidth = 6;
  context.fillStyle = "white";
  context.strokeStyle = isLastSelected && !isSelected ? "#FE2118" : "#3AAA35";
  context.fill(circle);
  context.stroke(circle);

  if (isSelected) {
    context.strokeStyle = "#3AAA35";
    context.lineWidth = 8;
    context.beginPath();
    context.moveTo(x - 20, y);
    context.lineTo(x, y + 20);
    context.lineTo(x + 20, y - 20);
    context.stroke();
  }

  if (isLastSelected && !isSelected) {
    context.strokeStyle = "#FE2118";
    context.lineWidth = 8;
    context.beginPath();
    context.moveTo(x - 20, y - 20);
    context.lineTo(x + 20, y + 20);
    context.moveTo(x - 20, y + 20);
    context.lineTo(x + 20, y - 20);
    context.stroke();
  }

  return circle;
};

const draw = (
  canvas: HTMLCanvasElement | null,
  selectedPointId: number,
): Promise<Path2D[]> => {
  return new Promise((res) => {
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();

    img.onload = () => {
      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height,
      );

      const newWidth = img.width * scale;
      const newHeight = img.height * scale;

      const x = (canvas.width - newWidth) / 2;
      const y = (canvas.height - newHeight) / 2;

      ctx.drawImage(img, x, y, newWidth, newHeight);

      const centerX = canvas.width / 3;
      const centerY = canvas.height / 2;

      ctx.lineWidth = 2;

      const circleCoords = [
        {
          x: centerX - 50,
          y: centerY + 100,
        },
        {
          x: centerX + 600,
          y: centerY + 110,
        },
        {
          x: centerX + 1050,
          y: centerY - 80,
        },
      ];

      const circles = circleCoords.map(({ x, y }, index) => {
        ctx.beginPath();
        const circle = drawCircle(ctx, x, y, selectedPointId === index + 1);
        ctx.stroke();
        return circle;
      });

      ctx.beginPath();
      drawArrow(ctx, centerX - 220, centerY + 50, centerX - 320, centerY - 200);
      drawArrow(
        ctx,
        centerX + 420,
        centerY + 140,
        centerX + 120,
        centerY + 130,
      );
      drawArrow(ctx, centerX + 950, centerY - 20, centerX + 750, centerY + 70);
      ctx.stroke();

      res(circles);
    };

    img.src = "./src/assets/games/melting-ice/melted_ice_bg.jpg";
  });
};

const redrawCircles = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  selectedPoint: number,
  isGameOver = false,
  selectedPointId = -1,
) => {
  const centerX = canvas.width / 3;
  const centerY = canvas.height / 2;

  ctx.lineWidth = 2;

  const circleCoords = [
    {
      x: centerX - 50,
      y: centerY + 100,
    },
    {
      x: centerX + 600,
      y: centerY + 110,
    },
    {
      x: centerX + 1050,
      y: centerY - 80,
    },
  ];

  return circleCoords.map(({ x, y }, index) => {
    ctx.beginPath();
    const circle = drawCircle(
      ctx,
      x,
      y,
      selectedPoint === index,
      isGameOver && selectedPointId - 1 === index,
    );
    ctx.stroke();
    return circle;
  });
};

export const River: FC<RiverProps> = memo(
  ({ onPointSelect, selectedPointId, isGameOver }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [circles, setCircles] = useState<Path2D[]>([]);

    const [width, setWidth] = useState(window.innerWidth * 0.9);

    useEffect(() => {
      (async () => {
        const circles = await draw(canvasRef.current, 0);
        setCircles(circles);
      })();
    }, []);

    useEffect(() => {
      if (!circles.length) {
        return;
      }

      const onCanvasClick = (evt: MouseEvent) => {
        if (!canvasRef.current) {
          return;
        }

        const canvas = canvasRef.current;

        const context = canvas.getContext("2d");
        if (!context) {
          return;
        }

        const x = evt.clientX - canvas.getBoundingClientRect().left;
        const y = evt.clientY - canvas.getBoundingClientRect().top;

        circles.forEach(async (circle, index) => {
          if (context.isPointInPath(circle, x, y)) {
            onPointSelect(index + 1);

            const newCircles = redrawCircles(canvas, context, index);
            setCircles(newCircles);
          }
        });
      };

      canvasRef.current?.addEventListener("click", onCanvasClick);

      return () => {
        canvasRef.current?.removeEventListener("click", onCanvasClick);
      };
    }, [circles, onPointSelect, selectedPointId, isGameOver]);

    useEffect(() => {
      if (!isGameOver) {
        return;
      }

      if (!canvasRef.current) {
        return;
      }

      const canvas = canvasRef.current;

      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }

      const newCircles = redrawCircles(
        canvas,
        context,
        0,
        isGameOver,
        selectedPointId,
      );
      setCircles(newCircles);
    }, [isGameOver, selectedPointId]);

    return (
      <div className="melting-ice-river">
        <canvas ref={canvasRef} width={`${width}px`} height="650px"></canvas>
      </div>
    );
  },
);
