import axios from "axios";
import type { Evento } from "../models/Eventos/Eventos";
import type { EventoCriar } from "../components/Eventos/NovoEventoModal";

const baseUrl = 'http://localhost:5053/api/eventos';

export const buscarEventosPorEmpresa = async(id: string): Promise<Evento[]> => {
    const response = await axios.get<Evento[]>(`${baseUrl}/buscar-eventos/${id}`);
    return response.data
}

export const criarEvento = async (evento: EventoCriar) => {
  const response = await axios.post(`${baseUrl}/criar`, evento);
  return response.data;
};