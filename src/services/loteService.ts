import axios from "axios";
import type { Lote, LoteCriar } from "../models/Lotes/Lotes";

const baseUrl = 'http://localhost:5053/api/lotes';


export const buscarTodosLotes = async(agenciaId: string) : Promise<Lote[]> => {
    const response = await axios.get<Lote[]>(`${baseUrl}/${agenciaId}`);
    return response.data
}

export const criarLote = async(lote: LoteCriar) => {
    const response = await axios.post(`${baseUrl}/criar-lote`, lote)
    return response.data
}