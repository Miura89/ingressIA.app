export interface Evento {
    id: string;
    agenciaId: string;
    nome: string;
    descricao: string;
    local: string;
    diaEvento: string;
    horarioInicio: string;
    horarioTermino: string;
    bannerImagem: string;
    capacidadeMaxima: number;
    status: boolean;
    faixaEtaria: number;
    tipoEvento: string;
    emailSuporte: string;
    telefoneSuporte: string;
}
