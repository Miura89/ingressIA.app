import { useEffect, useState } from "react";
import type { IngressosModel, IngressosModelCriar } from "../../models/Ingressos/IngressosModelo";
import { buscarTipoIngresso } from "../../services/tiposIngressosServices";
import { useParams } from "react-router-dom";

export default function EditarIngresso()
{
    const{id} = useParams();
    const [form, setForm] = useState<IngressosModel>({
    id: "",
    nome: "",
    descricao: "",
    status: false,
    genero: 0,
    nomeEvento: ""
  });

  console.log(form)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'genero' ? Number(value) : value,
    });
  };

    useEffect(() => {
      const fetchIngressos = async () => {
        if (id) {
          try {
            const ingresso = await buscarTipoIngresso(id);
            setForm(ingresso);
          } catch (error) {
            console.error("Erro ao buscar ingressos disponíveis:", error);
          }
        }
      };
      fetchIngressos();
    }, [id]);

    function editar()
    {
        
    }

    return (
    <div className="container-criacao-evento">
    {/* {loading && (
            <div className="loading-container">
                <span>Criando Ingresso...</span>
                <MoonLoader color="#000" size={70}/>
            </div>
            )} */}
      <div className="content-criacao-evento">
        <form className="form-criacao-evento" >
          <div className="informacoes-evento">
            <h2>EDITAR INGRESSO</h2>
            <h3>Nome Evento:<h2> {form.nomeEvento}</h2></h3>

            <div className="container-row-inputs">
              <div className="container-input-eventos">
                <span>Nome</span>
                <input name="nome" type="text" value={form.nome} onChange={handleChange} />
              </div>
              <div className="container-input-eventos">
                <span>Descrição</span>
                <input name="descricao" type="text" value={form.descricao} onChange={handleChange} />
              </div>
            </div>

            <div className="container-input-eventos">
              <span>Gênero</span>
              <select name="genero" value={form.genero} onChange={handleChange}>
                <option value="0">Masculino</option>
                <option value="1">Feminino</option>
                <option value="2">Unisex</option>
              </select>
            </div>
          </div>

          <button className="btn-salvar-evento" type="submit">
            Salvar Ingresso
          </button>
        </form>
      </div>
    </div>
    )
}