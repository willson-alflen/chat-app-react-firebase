import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import GlobalStyles from './GlobalStyles'

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
