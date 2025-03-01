import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DespesaInfo from './pages/DespesaInfo'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
  // API Token CodeBar: 17961|b8aWFI5XhH0iI2yFhKElqCBaayLr616k
  return (
    <BrowserRouter>
      <header>

      </header>
      <main>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/info/:id' element={<DespesaInfo />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
