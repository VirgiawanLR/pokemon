import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './page/Pokedex'
import Pokedex from './page/Pokedex'
import PokemonDetail from './page/PokemonDetail'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokedex/>} />
        <Route path="/pokemon/:id" element={<PokemonDetail/>} />
      </Routes>
    </Router>
    
  )
}

export default App