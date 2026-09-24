import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <main>
            <h1>Build a budget</h1>
          </main>
        }
      />
    </Routes>
  )
}

export default App
