import type React from "react";

interface UsuarioModalProps{
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    formValues: {nome:string, email: string; telefone: string; cpf: string; senha: string; role: number};
    setFormValues: React.Dispatch<React.SetStateAction<any>>;
}

export function UsuarioModal({onClose, onSubmit, formValues, setFormValues}: UsuarioModalProps){
    return (
         <div className="modal-overlay">
      <div className="modal">
        <h2>Criar Novo Usuário</h2>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Nome" value={formValues.nome} onChange={(e) => setFormValues((prev: any) => ({ ...prev, nome: e.target.value }))} required />
          <input type="email" placeholder="Email" value={formValues.email} onChange={(e) => setFormValues((prev: any) => ({ ...prev, email: e.target.value }))} required />
          <input type="text" placeholder="Telefone" value={formValues.telefone} onChange={(e) => setFormValues((prev: any) => ({ ...prev, telefone: e.target.value }))} required />
          <input type="text" placeholder="CPF" value={formValues.cpf} onChange={(e) => setFormValues((prev: any) => ({ ...prev, cpf: e.target.value }))} required />
          <input type="password" placeholder="Senha" value={formValues.senha} onChange={(e) => setFormValues((prev: any) => ({ ...prev, senha: e.target.value }))} required />
          <select value={formValues.role} onChange={(e) => setFormValues((prev: any) => ({ ...prev, role: e.target.value }))} required>
            <option value="">Selecione o papel</option>
            <option value="0">Admin</option>
            <option value="1">Nível 2</option>
            <option value="2">Nível 1</option>
            <option value="3">Apenas Leitura</option>
          </select>
          <div className="modal-actions">
            <button type="submit" className="btn-criar" onClick={onSubmit}>Salvar</button>
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
    )
}