import '../../css/EventosFiltros.css'
interface FiltroEventoProps{
    closeModal: () => void; 
}
export default function FiltroEvento({closeModal}: FiltroEventoProps)
{
     return (
<div className="modal-overlay-filtro">
  <div className="modal-content-filtro">
    <div className="modal-header-filtro">
      <h2>Filtro de Eventos</h2>
    </div>

    <div className="modal-body-filtro">
      <div className="filtro-opcao">
        <span>Status</span>
        <select>
          <option value="">Todos</option>
          <option value="ativo">Ativos</option>
          <option value="inativo">Inativos</option>
        </select>
      </div>

      <div className="filtro-opcao">
        <span>Faixa etária mínima</span>
        <select>
          <option value="">Todas</option>
          <option value="12">12+</option>
          <option value="16">16+</option>
          <option value="18">18+</option>
        </select>
      </div>

      <div className="filtro-opcao">
        <span>Tipo de evento</span>
        <select>
          <option value="">Todos</option>
          <option value="show">Show</option>
          <option value="festa">Festa</option>
          <option value="workshop">Workshop</option>
          <option value="palestra">Palestra</option>
        </select>
      </div>

      <div className="filtro-opcao">
        <span>Data específica</span>
        <input type="date" />
      </div>
    </div>

    <div className="modal-footer-filtro">
      <button className="btn-secondary-filtro" onClick={closeModal}>Fechar</button>
      <button className="btn-primary-filtro">Aplicar Filtros</button>
    </div>
  </div>
</div>

      );
}