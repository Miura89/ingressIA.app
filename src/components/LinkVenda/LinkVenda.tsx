import { Filter, Pencil, Plus, Trash, Power, Lock, Unlock  } from "lucide-react";
import type { LinkVendas } from "../../models/LinkVenda/LinkVenda";
import formalizarStatus from "../../utils/funcoes";
import { useNavigate, useParams } from "react-router-dom";
import { buscarLotePorId } from "../../services/linkVendaService";

interface LinkVendaProps{
    linkVenda: LinkVendas[]
    expandir?: (id: string) => void;
    filtro?: () => void;
}
export default function LinkVenda({linkVenda, expandir, filtro}: LinkVendaProps)
{
    const{id} = useParams();
    const navigate = useNavigate()
    function navegarCriar()
    {
      console.log("indo")
      if(id)
      {
        navigate(`/home/criar-link-venda/${id}`)
      }
    }
    return(
        <>
        <table>
                  <thead>
                    <tr>
                      <th>Nome Link Vendas</th>
                      <th>Preço</th>
                      <th>Quantidade Disponivel</th>
                      <th>Status</th>
                      <th>Ações</th>
                      <div className="container-btn-table-eventos">
                        <button className="btn-criar-evento" onClick={navegarCriar}><Plus size={15}/> Novo</button>
                        <button className="btn-criar-evento expandir"><Filter size={15}/>Filtrar </button>
                        {/* <button className="btn-criar-evento expandir"><RefreshCcw size={15}/> Atualizar</button> */}
                      </div>
                    </tr>
                  </thead>
                  <tbody>
                    {linkVenda.length <= 0 ? (
                        <tr>
                        <td colSpan={7}>
                            <div style={{ textAlign: 'center', padding: '10px' }}>
                            Nenhum link de venda encontrado
                            </div>
                        </td>
                        </tr>
                    ) : (
                        linkVenda.map((linkVendas) => (
                        <tr key={linkVendas.id}>
                            <td>{linkVendas.nomeLinkVenda ?? ''}</td>
                            <td>{linkVendas.preco ?? ''}</td>
                            <td>{linkVendas.quantidade ?? ''}</td>
                            <td>{formalizarStatus(linkVendas.status) ?? ''}</td>
                            <td>
                            <button
                              className="btn-acao editar"
                              title="Editar"
                            >
                              <Pencil size={15} />
                            </button>
                              {
                                !linkVendas.status ?
                                <button className="btn-acao editar" title="Liberar">
                                  <Unlock  size={15} />
                                </button> : 
                                  <button className="btn-acao excluir" title="Desabilitar">
                                <Lock size={15} />
                            </button>
                              }
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