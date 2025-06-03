import type { Evento } from "../../models/Eventos/Eventos";
import '../../css/Evento/ModalEventoExpandido.css'
import formalizarStatus from "../../utils/funcoes";
interface EventosExpandidoTableProps {
  evento: Evento;
  closeModal: () => void;
}

export default function EventosTableExpandido({ evento, closeModal }: EventosExpandidoTableProps) {
  return (
<div className="modal-overlay">
  <div className="modal-content">
    <div className="modal-header">
      <h2>{evento.nome}</h2>
    </div>

    <div className="modal-body">
      <p><strong>Descrição</strong>{evento.descricao}</p>
      <p><strong>Local</strong>{evento.local}</p>
      <p><strong>Data</strong>{new Date(evento.diaEvento).toLocaleDateString()}</p>
      <p><strong>Horário</strong>{new Date(evento.horarioInicio).toLocaleTimeString()} - {new Date(evento.horarioTermino).toLocaleTimeString()}</p>
      <p><strong>Capacidade</strong>{evento.capacidadeMaxima}</p>
      <p><strong>Status</strong>{formalizarStatus(evento.status)}</p>
      <p><strong>Faixa Etária</strong>{evento.faixaEtaria}+</p>
      <p><strong>Tipo</strong>{evento.tipoEvento}</p>
      <p><strong>Email de Suporte</strong>{evento.emailSuporte}</p>
      <p><strong>Telefone</strong>{evento.telefoneSuporte}</p>
      {evento.bannerImagem && <img src={evento.bannerImagem} alt="Banner" className="banner-img" />}
    </div>

    <div className="modal-footer">
      <button className="btn-secondary" onClick={closeModal}>Fechar</button>
    </div>
  </div>
</div>
  );
}
