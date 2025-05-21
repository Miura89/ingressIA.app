export interface UsuarioAgencia{
    id: string;
    agenciaId: string;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    role: number
}
export interface UsuarioAgenciaCriar{
    agenciaId: string;
    nome: string;
    email: string;
    senha: string
    telefone: string;
    cpf: string;
    role: number
}

export interface DeletarUsuario{
    id: string;
    donoId: string;
}