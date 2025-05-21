import type { Evento } from "../../models/Eventos/Eventos"
import {  Plus, Trash, Pencil, Filter} from 'lucide-react';
import formalizarStatus from "../../utils/funcoes";
import { useState } from "react";
interface EventosTableProps{
    eventos: Evento[]
    expandir: () => void;
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

    return(<>
     <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Dia</th>
                      <th>Status</th>
                      <th>Ações</th>
                      <th><button className="btn-criar-evento"><Plus size={15}/> Novo Evento</button></th>
                      <th><button className="btn-criar-evento expandir" onClick={filtro}><Filter size={15}/>Filtrar</button></th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventos.map((evento) => (
                      <tr key={evento.id}>
                        <td>{evento.nome ?? ''}</td>
                        <td>{evento.descricao ?? ''}</td>
                        <td>{evento.dia ?? ''}</td>
                        <td>{formalizarStatus(evento.status) ?? ''}</td>
                        <td>
                          <button className="btn-acao editar" title="Editar"><Pencil size={15}/></button>
                          <button className="btn-acao excluir" title="Excluir"><Trash size={15}/></button>
                          <button className="btn-acao expandir" onClick={expandir}>Expandir</button>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
        <div className="paginacao">
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
                </div>
    </>
    )
}