export interface LinkVendas{
    id: string,
    nomeLinkVenda: string,
    preco: number,
    quantidade: number,
    status: boolean
    loteId: string,
    tipoIngresso: string
}

export interface LinkVendaNovo{
    valor: number,
    quantidade: number,
    loteId: string,
    tipoIngressoId: string,
    agenciaId:string,
    taxa: number
}