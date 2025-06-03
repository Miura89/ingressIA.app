import { useEffect, useState, type FormEvent } from "react";
import { MoonLoader } from "react-spinners";
import type { LinkVendaNovo } from "../../models/LinkVenda/LinkVenda";
import type { Lote } from "../../models/Lotes/Lotes";
import type { IngressosModel } from "../../models/Ingressos/IngressosModelo";
import { buscarTodosLotes } from "../../services/loteService";
import { useParams } from "react-router-dom";
import { buscarTodosTiposIngressos } from "../../services/tiposIngressosServices";
import { buscarInfoUsuarioAgencia } from "../../services/agenciaService";
import { formalizarGenero } from "../../utils/funcoes";
import { criarLinkVendas } from "../../services/linkVendaService";
import toast from "react-hot-toast";

export default function NovoLinkVenda()
{
  const{id} = useParams()
  const [loading, setLoading] = useState(false);
  const [lotesDisponiveis, setLotesDisponiveis] = useState<Lote[]>([]);
  const [ingressoDisponiveis, setIngressosDisponiveis] = useState<IngressosModel[]>([]);

      const [form, setForm] = useState<LinkVendaNovo>({
        valor: 0,
        quantidade: 0,
        loteId: "",
        tipoIngressoId: "",
        agenciaId: "",
        taxa: 0
      });
    
      
  useEffect(() => {
    const carregarAgencia = async () => {
      try {
        setLoading(true);
        const agenciaBuscar = await buscarInfoUsuarioAgencia(id!);
        setForm((prev) => ({
          ...prev,
          agenciaId: agenciaBuscar.agenciaId,
        }));
      } catch (error) {
        toast.error("Erro ao buscar agência.");
      } finally {
        setLoading(false);
      }
    };

    carregarAgencia();
  }, [id]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'genero' ? Number(value) : value,
    });
  };
    const criar = async (e: FormEvent) => {
    e.preventDefault();
    console.log(form);
    setLoading(true)
    const response = await criarLinkVendas(form);
    if(response.statusCode === 201)
    {
        // navigate(`/home/${id}`); 
        setLoading(false);
        toast.success(`Link venda criado com sucesso`)
    }
  };

  useEffect(() => {
    const fetchEventos = async () => {
      if (id) {
        try {
          const agenciaBuscar = await buscarInfoUsuarioAgencia(id);
          const lotes = await buscarTodosLotes(agenciaBuscar.agenciaId);
          const ingressos = await buscarTodosTiposIngressos(agenciaBuscar.agenciaId)
          setLotesDisponiveis(lotes);
          setIngressosDisponiveis(ingressos)
        } catch (error) {
          console.error("Erro ao buscar lotes disponíveis:", error);
        }
      }
    };
    fetchEventos();
  }, [id]);
     return (
    <div className="container-criacao-evento">
    {loading && (
            <div className="loading-container">
                <span>Criando Ingresso...</span>
                <MoonLoader color="#000" size={70}/>
            </div>
            )}
      <div className="content-criacao-evento">
        <form className="form-criacao-evento" onSubmit={criar}>
          <div className="informacoes-evento">
            <h2>CRIAÇÃO LINK VENDA</h2>

            <div className="container-row-inputs">
              <div className="container-input-eventos">
                <span>Valor</span>
                <input name="valor" type="text" value={form.valor} onChange={handleChange} />
              </div>
              <div className="container-input-eventos">
                <span>Quantidade</span>
                <input name="quantidade" type="text" value={form.quantidade} onChange={handleChange} />
              </div>
              <div className="container-input-eventos">
                <span>Taxa(%)</span>
                <input name="taxa" type="number" value={form.taxa} onChange={handleChange} />
              </div>
            </div>

            <div className="container-input-eventos">
              <span>Lotes Disponiveis</span>
              <select
                name="loteId"
                value={form.loteId}
                onChange={handleChange}
              >
                <option value="" disabled>Selecione um lote</option>
                {lotesDisponiveis.map(lotes => (
                  <option key={lotes.id} value={lotes.id}>
                    {lotes.nomeLote}
                  </option>
                ))}
              </select>
            </div>
            <div className="container-input-eventos">
              <span>Ingressos Disponiveis</span>
              <select
                name="tipoIngressoId"
                value={form.tipoIngressoId}
                onChange={handleChange}
              >
                <option value="" disabled>Selecione um lote</option>
                {ingressoDisponiveis.map(ingressos => (
                  <option key={ingressos.id} value={ingressos.id}>
                    {ingressos.nome} - {formalizarGenero(ingressos.genero)}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <button className="btn-salvar-evento" type="submit">
            Salvar Ingresso
          </button>
        </form>
      </div>
    </div>
  );
}