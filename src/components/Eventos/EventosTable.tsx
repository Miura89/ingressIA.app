import type { Evento } from "../../models/Eventos/Eventos"
import {  Plus, Trash, Pencil, Filter, RefreshCcw} from 'lucide-react';
import formalizarStatus from "../../utils/funcoes";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
interface EventosTableProps{
    eventos: Evento[]
    expandir: (id: string) => void;
    filtro: () => void;
}
export default function EventosTable({eventos, expandir, filtro}: EventosTableProps){
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 10;

    const totalPaginas = Math.ceil(eventos.length / itensPorPagina);

    const eventosPaginados = eventos.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
    );
    const navigate = useNavigate()
    const {id} = useParams();
    console.log(eventos)
    function navegarCriar()
    {
      console.log("indo")
      navigate(`/evento/criar/${id}`)
    }
    return(<>
     <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Dia</th>
                      <th>Status</th>
                      <th>Ações</th>
                      <div className="container-btn-table-eventos">
                        <button className="btn-criar-evento" onClick={navegarCriar}><Plus size={15}/> Novo</button>
                        <button className="btn-criar-evento expandir" onClick={filtro}><Filter size={15}/>Filtrar </button>
                        {/* <button className="btn-criar-evento expandir"><RefreshCcw size={15}/> Atualizar</button> */}
                      </div>
                    </tr>
                  </thead>
                  <tbody>
                    {eventos.length <= 0 ? (
                      <tr>
                        <td colSpan={7}>
                          <div style={{ textAlign: 'center', padding: '10px' }}>
                            Nenhum evento encontrado
                          </div>
                        </td>
                      </tr>
                    ) : (
                      eventos.map((evento) => (
                        <tr key={evento.id}>
                          <td>{evento.nome ?? ''}</td>
                          <td>{evento.descricao ?? ''}</td>
                          <td>
                            {evento.diaEvento 
                              ? new Intl.DateTimeFormat('pt-BR').format(new Date(evento.diaEvento)) 
                              : ''}
                          </td>
                          <td>{formalizarStatus(evento.status) ?? ''}</td>
                          <td>
                            <button className="btn-acao editar" title="Editar">
                              <Pencil size={15} />
                            </button>
                            <button className="btn-acao excluir" title="Excluir">
                              <Trash size={15} />
                            </button>
                            <button className="btn-acao expandir" onClick={() => expandir(evento.id)}>
                              Expandir
                            </button>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
        {/* <div className="paginacao">
                <button
                    disabled={paginaAtual === 1}
                    onClick={() => setPaginaAtual(paginaAtual - 1)}
                >
                    Anterior
                </button>

                <span>Página {paginaAtual} de {totalPaginas}</span>

                <button
                    disabled={paginaAtual === totalPaginas}
                    onClick={() => setPaginaAtual(paginaAtual + 1)}
                >
                    Próxima
                </button>
                </div> */}
    </>
    )
}