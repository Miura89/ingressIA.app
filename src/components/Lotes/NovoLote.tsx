import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { criarLote } from "../../services/loteService";
import toast from "react-hot-toast";
import { buscarInfoUsuarioAgencia } from "../../services/agenciaService";
import type { LoteCriar } from "../../models/Lotes/Lotes";

export default function NovoLote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<LoteCriar>({
    nomeLote: "",
    agenciaId: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const criar = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.nomeLote.trim()) {
      toast.error("O nome do lote é obrigatório.");
      return;
    }

    setLoading(true);
    try {
      const response = await criarLote(form);

      if (response.httpStatusCode === 201) {
        toast.success("Lote criado com sucesso.");
        navigate(`/home/${id}`);
      } else {
        toast.error("Erro ao criar lote.");
      }
    } catch (error) {
      toast.error("Erro ao criar lote.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-criacao-evento">
      {loading && (
        <div className="loading-container">
          <span>Processando...</span>
          <MoonLoader color="#000" size={70} />
        </div>
      )}
      <div className="content-criacao-evento">
        <form className="form-criacao-evento" onSubmit={criar}>
          <div className="informacoes-evento">
            <h2>CRIAÇÃO DE LOTE</h2>

            <div className="container-row-inputs">
              <div className="container-input-eventos">
                <span>Nome do Lote</span>
                <input
                  name="nomeLote"
                  type="text"
                  value={form.nomeLote}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button className="btn-salvar-evento" type="submit">
            Salvar Lote
          </button>
        </form>
      </div>
    </div>
  );
}
