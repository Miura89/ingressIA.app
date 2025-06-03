import axios from "axios";
import type { EventosDisponiveis, IngressosModel, IngressosModelCriar } from "../models/Ingressos/IngressosModelo";

const baseUrl = 'http://localhost:5053/api/tipo-ingressos';

export const buscarTodosTiposIngressos = async(id: string) : Promise<IngressosModel[]> => {
    const response = await axios.get<IngressosModel[]>(`${baseUrl}/${id}`);
    return response.data
}
export const buscarEventosDisponiveis = async(id: string): Promise<EventosDisponiveis[]> => {
    const response = await axios.get<EventosDisponiveis[]>(`${baseUrl}/eventos-disponiveis/${id}`)
    return response.data
}

export const criarTipoIngresso = async(entidade: IngressosModelCriar) => {
    const response = await axios.post(`${baseUrl}`, entidade)
    return response.data
}

export const buscarTipoIngresso = async(id: string): Promise<IngressosModel> => {
    const response = await axios.get<IngressosModel>(`${baseUrl}/puxar-tipo-ingresso/${id}`);
    return response.data;
}