import { TouchBackend  } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";

import { Main } from "./components/main/Main";
import "./App.scss";

const dndOptions = {
  enableMouseEvents: true,
  enableHoverOutsideTarget: true,
}

function App() {
  return (
    <DndProvider backend={TouchBackend} options={dndOptions}>
      <Main />
    </DndProvider>
  );
}

export default App;
