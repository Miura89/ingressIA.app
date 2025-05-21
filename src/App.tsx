import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css'
import Eventos from './components/Eventos';
import { Toaster } from 'react-hot-toast';
import { ClipLoader } from "react-spinners";
import AgenciaAreaNova from './pages/AgenciaArea';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/home/:id' element={<Home />}/>
          <Route path='/agencia' element={<AgenciaAreaNova/>}/>
          <Route path='/eventos' element={<Eventos/>}/>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  )
}

export default App
