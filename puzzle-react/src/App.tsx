import { TouchBackend  } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";

import { Main } from "./components/main/Main";
import "./App.scss";
import { DragContextProvider } from "./context/DragContext";

const dndOptions = {
  enableMouseEvents: true,
  enableHoverOutsideTarget: true,
}

function App() {
  return (
    <DndProvider backend={TouchBackend} options={dndOptions}>
      <DragContextProvider>
        <Main />
      </DragContextProvider>
    </DndProvider>
  );
}

export default App;
