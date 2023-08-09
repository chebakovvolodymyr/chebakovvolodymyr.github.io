import { FC, memo, useEffect, useRef, useState } from "react";

interface RiverProps {
  onPointSelect: (pointId: number) => void;
  selectedPointId: number
}

const drawArrow = (context: CanvasRenderingContext2D, fromx: number, fromy: number, tox: number, toy: number) => {
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

const drawCircle = (context: CanvasRenderingContext2D, x: number, y: number, isSelected: boolean) => {
  const radius = 40;
  const circle = new Path2D();

  circle.arc(x, y, radius, 0, 2 * Math.PI);
  context.lineWidth = 2;
  context.fillStyle = "white";
  context.strokeStyle = "green";
  context.fill(circle);
  context.stroke(circle);

  if (isSelected) {
    context.strokeStyle = "green";
    context.lineWidth = 8;
    context.beginPath();
    context.moveTo(x - 20, y);
    context.lineTo(x, y + 20);
    context.lineTo(x + 20, y - 20);
    context.stroke();
  }
  return circle
}

const draw = (canvas: HTMLCanvasElement | null, selectedPointId: number): Promise<Path2D[]> => {
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
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  
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
          y: centerY + 70,
        },
        {
          x: centerX + 400,
          y: centerY + 85,
        },
        {
          x: centerX + 730,
          y: centerY - 40,
        },
      ]
  
      const circles = circleCoords.map(({x, y}, index) => {
        ctx.beginPath();
        const circle = drawCircle(ctx, x, y, selectedPointId === index + 1);
        ctx.stroke();
        return circle
      })
  
      ctx.beginPath();
      drawArrow(ctx, 220, 260, 180, 150);
      drawArrow(ctx, 650, 400, 520, 400);
      drawArrow(ctx, 1050, 310, 950, 350);
      ctx.stroke();

      res(circles)
    };

    img.src = "/src/assets/games/melting-ice/melted_ice_bg.jpg";
    })
};


const redrawCircles = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, selectedPoint: number) => {
  const centerX = canvas.width / 3;
  const centerY = canvas.height / 2;

  ctx.lineWidth = 2;

  const circleCoords = [
    {
      x: centerX - 50,
      y: centerY + 70,
    },
    {
      x: centerX + 400,
      y: centerY + 85,
    },
    {
      x: centerX + 730,
      y: centerY - 40,
    },
  ]

  return circleCoords.map(({x, y}, index) => {
    ctx.beginPath();
    const circle = drawCircle(ctx, x, y, selectedPoint === index);
    ctx.stroke();
    return circle
  })
}

export const River: FC<RiverProps> = memo(({ onPointSelect, selectedPointId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState<Path2D[]>([])
  
  const [width, setWidth] = useState(window.outerWidth * 0.8);

  useEffect(() => {
    (async () => {
      const circles = await draw(canvasRef.current, 0)
      setCircles(circles)
    })();
  }, []);

  useEffect(() => {
    if (!circles.length) {
      return
    }

    const onCanvasClick = (evt: MouseEvent) => {
      if (!canvasRef.current) {
        return
      }

      const canvas = canvasRef.current

      const context = canvas.getContext('2d')
      if (!context) {
        return
      }
      
      const x = evt.clientX - canvas.getBoundingClientRect().left;
      const y = evt.clientY - canvas.getBoundingClientRect().top;
  
      circles.forEach(async (circle, index) => {  
        if (context.isPointInPath(circle, x, y)) {
          onPointSelect(index + 1)

          const newCircles = redrawCircles(canvas, context, index)
          setCircles(newCircles)
        }
      })
    }

    canvasRef.current?.addEventListener('click', onCanvasClick)

    return () => {
      canvasRef.current?.removeEventListener('click', onCanvasClick)
    }
  }, [circles, onPointSelect, selectedPointId])

  return (
    <div className="melting-ice-river">
      <canvas ref={canvasRef} width={`${width}px`} height="600px"></canvas>
    </div>
  );
});
