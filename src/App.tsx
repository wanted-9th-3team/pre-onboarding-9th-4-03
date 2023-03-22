import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@pages/Home'
import NotFound from '@pages/NotFound'
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/pre-onboarding-9th-4-03/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
