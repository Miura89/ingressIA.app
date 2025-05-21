export interface UsuarioAgencia {
    id: string;
    agenciaId: string;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    role: number
}

export interface Agencia {
  id: string;
  nome: string;
  cnpj: string;
  email: string;
  usuarios: UsuarioAgencia[];
}