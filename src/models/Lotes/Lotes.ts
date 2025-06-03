export interface Lote {
    id: string;
    nomeLote: string;
    agenciaId: string;
    linkVendas?: string | null;
    agencia?: any; // ou o tipo da agência se tiver
}

export interface LoteCriar{
    nomeLote: string,
    agenciaId: string
}