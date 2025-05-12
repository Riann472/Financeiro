import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import DespesaInfo from './pages/DespesaInfo'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ContasPagas from './pages/ContasPagas'

function App() {
  return (
    <BrowserRouter>
      <header>
        <ul>
          <li><Link to='/home'>Contas a pagar</Link></li>
          <li><Link to='/pagas'>Contas pagas</Link></li>
        </ul>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/pagas' element={<ContasPagas />} />
          <Route path='/info/:id' element={<DespesaInfo />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
