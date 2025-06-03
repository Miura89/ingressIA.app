export interface IngressosModel{
    id: string,
    nome: string,
    descricao: string,
    genero: number,
    nomeEvento: string,
    status: boolean
}

export interface IngressosModelCriar{
    nome: string,
    descricao: string,
    genero: number,
    status: boolean,
    eventoId: string
}

export interface EventosDisponiveis{
    id: string
    nome: string,
}