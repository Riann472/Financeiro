import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import DespesaInfo from './pages/DespesaInfo'

function App() {
  // API Token CodeBar: 17961|b8aWFI5XhH0iI2yFhKElqCBaayLr616k
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/info/:id' element={<DespesaInfo />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
