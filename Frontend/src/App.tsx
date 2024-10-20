import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './page/Home'
import About from './page/About';
import Error from './page/Error';
import DetailPost from './page/DetailPost';

function App() {


  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/post/:id' element={<DetailPost/>}/>
          <Route path='*' element={<Error/>}/>
      </Routes>
    </Router>
  )
}

export default App
