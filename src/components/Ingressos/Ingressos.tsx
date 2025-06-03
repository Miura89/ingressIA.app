import { Filter, Pencil, Plus, Trash } from "lucide-react";
import type { IngressosModel } from "../../models/Ingressos/IngressosModelo";
import formalizarStatus, { formalizarGenero } from "../../utils/funcoes";
import { useNavigate, useParams } from "react-router-dom";

interface TipoIngressoTableProps{
    tiposIngressos: IngressosModel[]
    expandir?: (id: string) => void;
    filtro?: () => void;
}
export default function Ingressos({tiposIngressos, expandir, filtro}: TipoIngressoTableProps)
{
    const{id} = useParams()
    const navigate = useNavigate()
    function navegarCriar()
    {
      console.log("indo")
      if(id)
      {
        navigate(`/home/criar-ingresso/${id}`)
      }
    }
    
    function navegarEditar(id: string)
    {
        if(id)
        {
            navigate(`/home/tipo-ingresso/editar-ingresso/${id}`)
        }
    }
    return(
        <>
        <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Descricao</th>
                      <th>Genero</th>
                      <th>Evento Pertencente</th>
                      <th>Status</th>
                      <th>Ações</th>
                      <div className="container-btn-table-eventos">
                        <button className="btn-criar-evento"  onClick={navegarCriar}><Plus size={15}/> Novo</button>
                        <button className="btn-criar-evento expandir"><Filter size={15}/>Filtrar </button>
                        {/* <button className="btn-criar-evento expandir"><RefreshCcw size={15}/> Atualizar</button> */}
                      </div>
                    </tr>
                  </thead>
                  <tbody>
                    {tiposIngressos.length <= 0 ? (
                      <tr>
                        <td colSpan={9}>
                          <div style={{ textAlign: 'center', padding: '10px' }}>
                            Nenhum ingresso encontrado
                          </div>
                        </td>
                      </tr>
                    ) : (
                      tiposIngressos.map((ingressos) => (
                        <tr key={ingressos.id}>
                          <td>{ingressos.nome ?? ''}</td>
                          <td>{ingressos.descricao ?? ''}</td>
                          <td>{formalizarGenero(ingressos.genero) ?? ''}</td>
                          <td>{ingressos.nomeEvento ?? ''}</td>
                          <td>{formalizarStatus(ingressos.status) ?? ''}</td>
                          <td>
                            <button
                              className="btn-acao editar"
                              title="Editar"
                              onClick={() => navegarEditar(ingressos.id)}
                            >
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