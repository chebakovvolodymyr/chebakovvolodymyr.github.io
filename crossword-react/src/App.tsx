import { Header, Footer, Main } from './components'

import './App.css'

import { ActiveQuestionContextProvider } from './context/ActiveQuestion'

function App() {
  return (
    <ActiveQuestionContextProvider>
      <section>
          <Header/>
          <Main/>
          <Footer/>
      </section>
    </ActiveQuestionContextProvider>
  )
}

export default App
