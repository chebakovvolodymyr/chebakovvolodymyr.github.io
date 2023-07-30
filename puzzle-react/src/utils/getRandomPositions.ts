export type Position = {
    x: number,
    y: number,
}

export const getRandomPositions = (count: number) => {
    const positions: Position[] = [];
    const containerWidth = window.outerWidth;
    const containerHeight = 500;
    const buttonWidth = 480;
    const buttonHeight = 90;

    for (let i = 0; i < count; i+=1) {
      let x: number; 
      let y: number; 
      let overlap: boolean;
      let count = 0
      do {
        x = Math.floor(Math.random() * (containerWidth - buttonWidth));
        y = Math.floor(Math.random() * (containerHeight - buttonHeight));
        overlap = positions.some((position) =>
          checkOverlap(position, { x, y }, buttonWidth, buttonHeight)
        );
        count += 1;

        if (count >= 10) {
          return
        }
      } while (overlap);

      positions.push({ x, y });
    }

    return positions
  };

  const checkOverlap = (rect1: Position, rect2: Position, width: number, height: number) => {
    return (
      rect1.x < rect2.x + width &&
      rect1.x + width > rect2.x &&
      rect1.y < rect2.y + height &&
      rect1.y + height > rect2.y
    );
  };