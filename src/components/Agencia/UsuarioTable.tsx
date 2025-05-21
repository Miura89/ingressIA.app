import type { UsuarioAgencia } from "../../models/Agencia/UsuarioAgencia";
import { formalizarNome, formalizarRole, formatarTelefone } from "../../utils/funcoes";

interface UsuarioTableProps{
    usuarios: UsuarioAgencia[];
    modalDeletar: (id: string, nome: string) => void;
}

export function UsuarioTable({usuarios, modalDeletar}: UsuarioTableProps)
{
    return (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Role</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{formalizarNome(usuario.nome)}</td>
                <td>{usuario.email}</td>
                <td>{formatarTelefone(usuario.telefone)}</td>
                <td>{formalizarRole(usuario.role)}</td>
                <td>
                  <button className="btn-acao editar">Editar</button>
                  <button className="btn-acao excluir" onClick={()=> modalDeletar(usuario.id,usuario.nome)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    )
}
