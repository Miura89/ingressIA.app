import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css'
import Eventos from './components/Eventos';
import { Toaster } from 'react-hot-toast';
import { ClipLoader } from "react-spinners";
import AgenciaAreaNova from './pages/AgenciaArea';
import NovoEventoModal from './components/Eventos/NovoEventoModal';
import NovoIngresso from './components/Ingressos/NovoIngresso';
import EditarIngresso from './components/Ingressos/EditarIngresso';
import NovoLote from './components/Lotes/NovoLote';
import NovoLinkVenda from './components/LinkVenda/NovoLinkVenda';
function App() {
  function criar()
  {

  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/home/:id' element={<Home />}/>
          <Route path='/agencia' element={<AgenciaAreaNova/>}/>
          <Route path='/eventos' element={<Eventos/>}/>
          <Route path='/evento/criar/:id' element={<NovoEventoModal/>}/>
          <Route path='/home/criar-ingresso/:id' element={<NovoIngresso/>}/>
          <Route path='/home/tipo-ingresso/editar-ingresso/:id' element={<EditarIngresso/>}/>
          <Route path='/home/criar-lote/:id' element={<NovoLote />}/>
          <Route path='/home/criar-link-venda/:id' element={<NovoLinkVenda />}/>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  )
}

export default App
