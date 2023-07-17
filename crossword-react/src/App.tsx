import { Main } from "./components";

import "./App.scss";

import { ActiveQuestionContextProvider } from "./context/ActiveQuestion";

function App() {
  return (
    <ActiveQuestionContextProvider>
      <section>
        <Main />
      </section>
    </ActiveQuestionContextProvider>
  );
}

export default App;
