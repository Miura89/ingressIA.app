import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarDays, Ticket, Layers, TicketPercent } from "lucide-react";
import { MoonLoader } from "react-spinners";

import Header from "./Header";
import EventosTable from "./Eventos/EventosTable";
import EventosTableExpandido from "./Eventos/EventosExpandido";
import FiltroEvento from "./Eventos/FiltroEventos";
import Ingressos from "./Ingressos/Ingressos";
import Lotes from "./Lotes/Lotes";

import { buscarInfoUsuarioAgencia } from "../services/agenciaService";
import { buscarEventosPorEmpresa } from "../services/eventoService";
import { buscarTodosTiposIngressos } from "../services/tiposIngressosServices";
import { buscarTodosLotes } from "../services/loteService";

import type { Evento } from "../models/Eventos/Eventos";
import type { IngressosModel } from "../models/Ingressos/IngressosModelo";
import type { Lote } from "../models/Lotes/Lotes";

import "../css/Evento/Eventos.css";
import LinkVenda from "./LinkVenda/LinkVenda";
import type { LinkVendas } from "../models/LinkVenda/LinkVenda";
import { buscarLinkVendas } from "../services/linkVendaService";

export default function Eventos() {
  const { id } = useParams();

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [tipoIngressos, setTipoIngressos] = useState<IngressosModel[]>([]);
  const [lotesSetados, setLotes] = useState<Lote[]>([])
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);
  const [linkVenda, setLinkVendas] = useState<LinkVendas[]>([])
  const [modalAberto, setModalAberto] = useState(false);
  const [modalFiltroAberto, setModalFiltroAberto] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState<"evento" | "lote" | "ingresso" | "linkVendas">("evento");

  const eventoPadrao: Evento = {
    id: "",
    agenciaId: "",
    nome: "Erro",
    descricao: "",
    local: "",
    diaEvento: "",
    horarioInicio: "",
    horarioTermino: "",
    bannerImagem: "",
    capacidadeMaxima: 0,
    status: false,
    faixaEtaria: 0,
    tipoEvento: "",
    emailSuporte: "",
    telefoneSuporte: ""
  };

  async function carregarDados(idUsuario: string) {
    try {
      const agencia = await buscarInfoUsuarioAgencia(idUsuario);
      const [eventos, tiposIngressos, lotes, linkVendas] = await Promise.all([
        buscarEventosPorEmpresa(agencia.agenciaId),
        buscarTodosTiposIngressos(agencia.agenciaId),
        buscarTodosLotes(agencia.agenciaId),
        buscarLinkVendas(agencia.agenciaId)
      ]);

      setEventos(eventos);
      setTipoIngressos(tiposIngressos);
      setLotes(lotes);
      setLinkVendas(linkVendas)

      console.log("Eventos:", eventos);
      console.log("Ingressos:", tiposIngressos);
      console.log("Lotes:", lotesSetados);
      console.log("Link Vendas:", linkVenda)
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  useEffect(() => {
    if (id) {
      carregarDados(id);
    }
  }, [id]);

  function expandir(idEvento: string) {
    const evento = eventos.find(e => e.id === idEvento);
    if (evento) {
      setEventoSelecionado(evento);
      setModalAberto(true);
    }
  }

  return (
    <div className="container-eventos">
      <div className="container-infos">
        <div className="btn-opcoes">
          <BotaoAba
            selecionado={abaSelecionada === "evento"}
            onClick={() => setAbaSelecionada("evento")}
            icone={<CalendarDays />}
            texto="Eventos"
          />
          <BotaoAba
            selecionado={abaSelecionada === "lote"}
            onClick={() => setAbaSelecionada("lote")}
            icone={<Layers />}
            texto="Lotes"
          />
          <BotaoAba
            selecionado={abaSelecionada === "ingresso"}
            onClick={() => setAbaSelecionada("ingresso")}
            icone={<Ticket />}
            texto="Ingressos"
          />
          <BotaoAba
            selecionado={abaSelecionada === "linkVendas"}
            onClick={() => setAbaSelecionada("linkVendas")}
            icone={<TicketPercent />}
            texto="Link Vendas"
          />
        </div>
      </div>

      {/* Abas */}
      {abaSelecionada === "evento" && (
        <div className="container-eventos-table">
           
            <EventosTable eventos={eventos} expandir={expandir} filtro={() => setModalFiltroAberto(true)} />

          {modalAberto && (
            <EventosTableExpandido
              evento={eventoSelecionado?.id ? eventoSelecionado : eventoPadrao}
              closeModal={() => setModalAberto(false)}
            />
          )}

          {modalFiltroAberto && <FiltroEvento closeModal={() => setModalFiltroAberto(false)} />}
        </div>
      )}

      {abaSelecionada === "ingresso" && <Ingressos tiposIngressos={tipoIngressos} />}
      {abaSelecionada === "lote" && <Lotes lotes={lotesSetados} />}
      {abaSelecionada === "linkVendas" && <LinkVenda linkVenda={linkVenda}/>}
    </div>
  );
}


function BotaoAba({
  selecionado,
  onClick,
  icone,
  texto
}: {
  selecionado: boolean;
  onClick: () => void;
  icone: React.ReactNode;
  texto: string;
}) {
  return (
    <button className={`botao-claro ${selecionado ? "selected" : ""}`} onClick={onClick}>
      {icone}
      {texto}
    </button>
  );
}

// ----------------------
// COMPONENTE DE LOADING
// ----------------------
function Loading({ mensagem }: { mensagem: string }) {
  return (
    <div className="loading-container">
      <span>{mensagem}</span>
      <MoonLoader color="#000" size={70} />
    </div>
  );
}
