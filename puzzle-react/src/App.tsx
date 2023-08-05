import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { Main } from "./components/main/Main";
import "./App.scss";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Main />
    </DndProvider>
  );
}

export default App;
