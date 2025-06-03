import { Filter, Pencil, Plus, Trash } from "lucide-react";
import type { Lote } from "../../models/Lotes/Lotes";
import { useNavigate, useParams } from "react-router-dom";
interface LotesProps{
    lotes: Lote[]
}

export default function Lotes({lotes}: LotesProps)
{
    const{id} = useParams();
    const navigate = useNavigate()
    function navegarCriar()
    {
      console.log("indo")
      if(id)
      {
        navigate(`/home/criar-lote/${id}`)
      }
    }
    return(
        <>
            <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Ações</th>
                      <div className="container-btn-table-eventos">
                        <button className="btn-criar-evento" onClick={navegarCriar}><Plus size={15}/> Novo</button>
                        <button className="btn-criar-evento expandir"><Filter size={15}/>Filtrar </button>
                        {/* <button className="btn-criar-evento expandir"><RefreshCcw size={15}/> Atualizar</button> */}
                      </div>
                    </tr>
                  </thead>
                  <tbody>
                    {lotes.length <= 0 ? (
                      <tr>
                        <td colSpan={4}>
                          <div style={{ textAlign: 'center', padding: '10px' }}>
                            Nenhum lote encontrado
                          </div>
                        </td>
                      </tr>
                    ) : (
                      lotes.map((lote) => (
                        <tr key={lote.id}>
                          <td>{lote.nomeLote ?? ''}</td>
                          <td>
                            <button className="btn-acao editar" title="Editar">
                              <Pencil size={15} />
                            </button>
                            <button className="btn-acao excluir" title="Excluir">
                              <Trash size={15} />
                            </button>
                            <button className="btn-acao expandir">Expandir</button>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
        </>
    )
}