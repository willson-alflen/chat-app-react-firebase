import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthRequired from './components/AuthRequired'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import GlobalStyles from './GlobalStyles'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <GlobalStyles />
      <ToastContainer autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRequired />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
