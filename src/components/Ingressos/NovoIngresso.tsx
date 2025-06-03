import { useEffect, useState, type FormEvent } from "react";
import { type EventosDisponiveis, type IngressosModelCriar } from "../../models/Ingressos/IngressosModelo";
import { buscarEventosDisponiveis, criarTipoIngresso } from "../../services/tiposIngressosServices";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";

export default function NovoIngresso() {
  const { id } = useParams();
  const [eventosDisponiveis, setEventosDisponiveis] = useState<EventosDisponiveis[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<IngressosModelCriar>({
    nome: "",
    descricao: "",
    status: false,
    genero: 0,
    eventoId: ""
  });

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
    const response = await criarTipoIngresso(form);
    if(response.statusCode === 201)
    {
        navigate(`/home/${id}`); 
        setLoading(false);
        toast.success(`Ingresso criado com sucesso`)
    }
  };

  useEffect(() => {
    const fetchEventos = async () => {
      if (id) {
        try {
          const eventos = await buscarEventosDisponiveis(id);
          setEventosDisponiveis(eventos);
        } catch (error) {
          console.error("Erro ao buscar eventos disponíveis:", error);
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
            <h2>CRIAÇÃO INGRESSO</h2>

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
              <span>Eventos Disponíveis</span>
              <select
                name="eventoId"
                value={form.eventoId}
                onChange={handleChange}
              >
                <option value="" disabled>Selecione um evento</option>
                {eventosDisponiveis.map(evento => (
                  <option key={evento.id} value={evento.id}>
                    {evento.nome}
                  </option>
                ))}
              </select>
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
  );
}
