import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './page/Home'
import About from './page/About';

function App() {


  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
      </Routes>
    </Router>
  )
}

export default App
