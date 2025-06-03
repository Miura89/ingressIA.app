import { useEffect, useState, type FormEvent } from "react";
import "../../css/Evento/NovoEvento.css";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/Evento/NovoEvento.css";
import { buscarInfoUsuarioAgencia } from "../../services/agenciaService";
import { criarEvento } from "../../services/eventoService";
import toast from 'react-hot-toast';
import { MoonLoader } from "react-spinners";

export interface EventoCriar {
  agenciaId: string;  
  nome: string;
  descricao: string;
  local: string;
  diaEvento: string;
  horarioInicio: string;
  horarioTermino: string;
  bannerImagem: string;
  capacidadeMaxima: number;
  status: boolean;
  faixaEtaria: number;
  tipoEvento: string;
  emailSuporte: string;
  telefoneSuporte: string;
  politicaReembolso: string;
  politicaPrivacidade: string;
}

export default function NovoEvento() {
    const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<EventoCriar>({
    agenciaId: "",
    nome: "",
    descricao: "",
    local: "",
    diaEvento: "",
    horarioInicio: "",
    horarioTermino: "",
    bannerImagem: "",
    capacidadeMaxima: 0,
    status: true,
    faixaEtaria: 0,
    tipoEvento: "festa",
    emailSuporte: "",
    telefoneSuporte: "",
    politicaReembolso: "",
    politicaPrivacidade: "",
  });
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    const carregarAgencia = async () => {
      if (id) {
        const agencia = await buscarInfoUsuarioAgencia(id);
        setForm((prev) => ({ ...prev, agenciaId: agencia.agenciaId }));
      }
    };
    carregarAgencia();
  }, [id]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

 const criar = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault();

    const evento = {
      ...form,
      diaEvento: new Date(form.diaEvento).toISOString(),
      horarioTermino: new Date(form.horarioTermino).toISOString(),
      horarioInicio: new Date(form.horarioInicio).toISOString(),
      status: true,
    };
    console.log(evento)
    const resposta = await criarEvento(evento);
    setLoading(false)
    if(resposta.flag == true)
    {
        toast.success(`${resposta.message}`)
        navigate(`../home/${id}`)
    }
}

  return (
    <>
            {loading && (
            <div className="loading-container">
                <span>Criando evento...</span>
                <MoonLoader color="#000" size={70}/>
            </div>
            )}
    <div className="container-criacao-evento">
      <div className="content-criacao-evento">
        <form onSubmit={criar} className="form-criacao-evento">
          <div className="informacoes-evento">
            <h2>INFORMAÇÕES DO EVENTO</h2>

            <div className="container-row-inputs">
              <div className="container-input-eventos">
                <span>Nome</span>
                <input name="nome" type="text" value={form.nome} onChange={handleChange} />
              </div>
              <div className="container-input-eventos">
                <span>Descrição</span>
                <input name="descricao" type="text" value={form.descricao} onChange={handleChange} />
              </div>
              <div className="container-input-eventos">
                <span>Data</span>
                <input name="diaEvento" type="date" value={form.diaEvento} onChange={handleChange} />
              </div>
            </div>

            <div className="container-input-eventos">
              <span>Capacidade Máxima</span>
              <input
                name="capacidadeMaxima"
                type="number"
                value={form.capacidadeMaxima}
                onChange={handleChange}
              />
            </div>

            <div className="container-row-inputs">
              <div className="container-input-eventos">
                <span>Local</span>
                <input name="local" type="text" value={form.local} onChange={handleChange} />
              </div>
              <div className="container-input-eventos">
                <span>Horário Início</span>
                <input name="horarioInicio" type="datetime-local" value={form.horarioInicio} onChange={handleChange} />
              </div>
              <div className="container-input-eventos">
                <span>Horário Encerramento</span>
                <input name="horarioTermino" type="datetime-local" value={form.horarioTermino} onChange={handleChange} />
              </div>
              <div className="container-input-eventos">
                <span>Faixa Etária</span>
                <select name="faixaEtaria" value={form.faixaEtaria} onChange={handleChange}>
                  <option value={0}>Livre</option>
                  <option value={12}>12+</option>
                  <option value={14}>14+</option>
                  <option value={16}>16+</option>
                  <option value={18}>18+</option>
                </select>
              </div>
              <div className="container-input-eventos">
                <span>Tipo de Evento</span>
                <select name="tipoEvento" value={form.tipoEvento} onChange={handleChange}>
                  <option value="festa">Festa Universitária</option>
                  <option value="empresarial">Evento Empresarial</option>
                  <option value="evento">Evento</option>
                  <option value="show">Show</option>
                </select>
              </div>
            </div>

            <div className="container-input-eventos">
              <span>Banner do Evento (URL)</span>
              <input name="bannerImagem" type="text" value={form.bannerImagem} onChange={handleChange} />
            </div>
          </div>

          <h2>CONTATO</h2>
          <div className="informacoes-contato">
            <div className="container-input-eventos">
              <span>Telefone Suporte</span>
              <input name="telefoneSuporte" type="text" value={form.telefoneSuporte} onChange={handleChange} />
            </div>
            <div className="container-input-eventos">
              <span>Email Suporte</span>
              <input name="emailSuporte" type="email" value={form.emailSuporte} onChange={handleChange} />
            </div>
            <div className="container-input-eventos">
              <span>Política de Reembolso</span>
              <textarea name="politicaReembolso" value={form.politicaReembolso} onChange={handleChange}></textarea>
            </div>
            <div className="container-input-eventos">
              <span>Política de Privacidade</span>
              <textarea name="politicaPrivacidade" value={form.politicaPrivacidade} onChange={handleChange}></textarea>
            </div>
          </div>

          <button className="btn-salvar-evento" type="submit">
            Salvar Evento
          </button>
        </form>
      </div>
    </div>
        </>
  );
}
