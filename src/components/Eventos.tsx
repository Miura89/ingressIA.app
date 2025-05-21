import Header from "./Header";
import '../css/Eventos.css';
import { CalendarDays, Ticket, Layers, Plus } from 'lucide-react';
import EventosTable from "./Eventos/EventosTable";
import { useState } from "react";
import EventosTableExpandido from "./Eventos/EventosExpandido";
import FiltroEvento from "./Eventos/FiltroEventos";
export default function Eventos(){

    const [modalAberto, setModalAberto] = useState(false);
    const [modalFiltroAberto, setModalFiltroAberto] = useState(false);
    const eventos = [
  {
    id: "1",
    agenciaId: "a1",
    nome: "Festival de Verão",
    descricao: "Festival com várias atrações musicais e gastronômicas.",
    local: "Praia Central",
    dia: "2025-12-15",
    horarioInicio: "2025-12-15T16:00:00",
    horarioTermino: "2025-12-15T23:00:00",
    bannerImagem: "banner1.jpg",
    capacidadeMaxima: 5000,
    status: true,
    faixaEtaria: 18,
    tipoEvento: "Festival",
    emailSuporte: "suporte@verao.com",
    telefoneSuporte: "(11) 99999-8888"
  },
  {
    id: "2",
    agenciaId: "a1",
    nome: "Feira de Startups",
    descricao: "Evento para networking entre startups e investidores.",
    local: "Centro de Convenções",
    dia: "2025-10-05",
    horarioInicio: "2025-10-05T09:00:00",
    horarioTermino: "2025-10-05T17:00:00",
    bannerImagem: "banner2.jpg",
    capacidadeMaxima: 1000,
    status: false,
    faixaEtaria: 16,
    tipoEvento: "Feira",
    emailSuporte: "contato@startupfair.com",
    telefoneSuporte: "(21) 98888-7777"
  },
  {
    id: "3",
    agenciaId: "a1",
    nome: "Show de Rock",
    descricao: "Show com bandas nacionais e internacionais.",
    local: "Estádio Municipal",
    dia: "2025-11-20",
    horarioInicio: "2025-11-20T19:00:00",
    horarioTermino: "2025-11-21T01:00:00",
    bannerImagem: "banner3.jpg",
    capacidadeMaxima: 10000,
    status: true,
    faixaEtaria: 14,
    tipoEvento: "Show",
    emailSuporte: "rock@eventos.com",
    telefoneSuporte: "(31) 97777-6666"
  },
  
];
let eventoSelecionado =   {
    id: "3",
    agenciaId: "a1",
    nome: "Show de Rock",
    descricao: "Show com bandas nacionais e internacionais.",
    local: "Estádio Municipal",
    dia: "2025-11-20",
    horarioInicio: "2025-11-20T19:00:00",
    horarioTermino: "2025-11-21T01:00:00",
    bannerImagem: "banner3.jpg",
    capacidadeMaxima: 10000,
    status: true,
    faixaEtaria: 14,
    tipoEvento: "Show",
    emailSuporte: "rock@eventos.com",
    telefoneSuporte: "(31) 97777-6666"
  }
  function expandir(){
    setModalAberto(true);
  }
  function fecharModal()
  {
    setModalAberto(false)
  }

  function abrirFiltro()
  {
    setModalFiltroAberto(true)
  }

  function fecharFiltro()
  {
    setModalFiltroAberto(false)
  }
    return(
        <div className="container-eventos">
            <div className="container-infos">
                <div className="btn-opcoes">
                <button className="botao-claro">
                    <CalendarDays />
                    Eventos
                </button>

                <button className="botao-claro">
                    <Layers />
                    Lotes
                </button>

                <button className="botao-claro">
                    <Ticket />
                    Ingressos
                </button>
                </div>
            </div>
            <div className="container-eventos-table">
                <EventosTable 
                eventos={eventos}
                expandir={expandir}
                filtro={abrirFiltro}/>
                {
                    modalAberto && <EventosTableExpandido evento={eventoSelecionado} closeModal={fecharModal}/>
                }
                {
                    modalFiltroAberto && <FiltroEvento closeModal={fecharFiltro} />
                }

            </div>
        </div>
    )
}