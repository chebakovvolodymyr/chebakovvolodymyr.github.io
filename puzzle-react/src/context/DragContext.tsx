import { FC, PropsWithChildren, createContext, useCallback, useState } from "react";
import { XYCoord } from "react-dnd";

type DropElements = {
    left: number,
    right: number,
    top: number,
    bottom: number,
    element: HTMLElement
}

type DroppedElement = {
    element: HTMLElement | null, 
    params: Record<string, number | string>
}

interface DragContextProps {
    dropElements: DropElements[]
    setDropElement: (element: HTMLElement | null) => void
    mouseMoveHandler: (coords: XYCoord) => void
    mouseUpHandler: (coords: XYCoord, params: Record<string, number | string>) => void
    hoveredElement: HTMLElement | null
    droppedElement: DroppedElement
}

export const DragContext = createContext({} as DragContextProps);

const getIntersectedElement = (dropElements: DropElements[], coords: XYCoord): HTMLElement | null => 
    dropElements.find(dropElement => 
        coords.x >= dropElement.left && coords.x <= dropElement.right && coords.y <= dropElement.bottom && coords.y >= dropElement.top
    )?.element ?? null

export const DragContextProvider: FC<PropsWithChildren> = ({children}) => {
    const [dropElements, setDropElements] = useState<DropElements[]>([])
    const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null)
    const [droppedElement, setDroppedElement] = useState<DroppedElement>({element: null, params: {}})

    const setDropElement = useCallback((element: HTMLElement | null) => {
        if (!element) {
            return
        }

        const a = element.getBoundingClientRect()
        
        const {left, right, bottom, top} = a
        
        setDropElements(dropElements => {
            if (dropElements.find(dropElement => dropElement.element === element)) {
                return dropElements
            }
            return [{left, right, bottom, top, element}, ...dropElements]
        })
    }, [])

    const mouseMoveHandler = useCallback(({x, y}: XYCoord) => {
        console.log({x, y})
        const element = getIntersectedElement(dropElements, {x, y})
        
        setHoveredElement(element)
    }, [dropElements])

    const mouseUpHandler = useCallback(({x, y}: XYCoord, params: Record<string, number | string>) => {
        const element = getIntersectedElement(dropElements, {x, y})

        setHoveredElement(null)
        setDroppedElement({element, params})
    }, [dropElements])

    const contextValue = {
        dropElements,
        setDropElement,
        mouseMoveHandler,
        mouseUpHandler,
        hoveredElement,
        droppedElement,
    }
    return (
        <DragContext.Provider value={contextValue}>
            {children}
        </DragContext.Provider>
    )
}
