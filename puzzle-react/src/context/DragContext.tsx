import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from "react";
import { XYCoord } from "react-dnd";

type DropElements = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  element: HTMLElement;
};

type DroppedElement = {
  element: HTMLElement | null;
  params: Record<string, number | string>;
};

interface DragContextProps {
  dropElements: DropElements[];
  setDropElement: (element: HTMLElement | null) => void;
  mouseMoveHandler: (coords: XYCoord, params?: { isRainbow: boolean }) => void;
  mouseUpHandler: (
    coords: XYCoord,
    params: Record<string, number | string>,
    eventParams?: { isRainbow: boolean },
  ) => void;
  hoveredElement: HTMLElement | null;
  droppedElement: DroppedElement;
}

export const DragContext = createContext({} as DragContextProps);

const isCoordsInsideCircleElement = (
  dropElement: DropElements,
  coords: XYCoord,
) => {
  const centerX = (dropElement.left + dropElement.right) / 2;
  const centerY = (dropElement.top + dropElement.bottom) / 2;
  const radius = (dropElement.right - dropElement.left) / 2 + 25;

  return (coords.x - centerX) ** 2 + (coords.y - centerY) ** 2 <= radius ** 2;
};

const isCoordsInsideRectangleElement = (
  dropElement: DropElements,
  coords: XYCoord,
) =>
  coords.x >= dropElement.left &&
  coords.x <= dropElement.right &&
  coords.y <= dropElement.bottom &&
  coords.y >= dropElement.top;

const getIntersectedElement = (
  dropElements: DropElements[],
  coords: XYCoord,
  isRainbow = false,
): HTMLElement | null =>
  dropElements.find((dropElement) => {
    if (!isRainbow) {
      return isCoordsInsideRectangleElement(dropElement, coords);
    }

    return isCoordsInsideCircleElement(dropElement, coords);
  })?.element ?? null;

export const DragContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dropElements, setDropElements] = useState<DropElements[]>([]);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(
    null,
  );
  const [droppedElement, setDroppedElement] = useState<DroppedElement>({
    element: null,
    params: {},
  });

  const setDropElement = useCallback((element: HTMLElement | null) => {
    if (!element) {
      return;
    }

    const { left, right, bottom, top } = element.getBoundingClientRect();

    setDropElements((dropElements) => {
      if (dropElements.find((dropElement) => dropElement.element === element)) {
        return dropElements;
      }
      return [{ left, right, bottom, top, element }, ...dropElements];
    });
  }, []);

  const mouseMoveHandler = useCallback(
    ({ x, y }: XYCoord, params?: { isRainbow: boolean }) => {
      const element = getIntersectedElement(
        dropElements,
        { x, y },
        params?.isRainbow,
      );

      setHoveredElement(element);
    },
    [dropElements],
  );

  const mouseUpHandler = useCallback(
    (
      { x, y }: XYCoord,
      params: Record<string, number | string>,
      eventParams?: { isRainbow: boolean },
    ) => {
      const element = getIntersectedElement(
        dropElements,
        { x, y },
        eventParams?.isRainbow,
      );
      setHoveredElement(null);
      setDroppedElement({ element, params });
    },
    [dropElements],
  );

  const contextValue = {
    dropElements,
    setDropElement,
    mouseMoveHandler,
    mouseUpHandler,
    hoveredElement,
    droppedElement,
  };
  return (
    <DragContext.Provider value={contextValue}>{children}</DragContext.Provider>
  );
};
