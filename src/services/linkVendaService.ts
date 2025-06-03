import axios from "axios";
import type { LinkVendaNovo, LinkVendas } from "../models/LinkVenda/LinkVenda";
import type { Lote } from "../models/Lotes/Lotes";

const baseUrl = 'http://localhost:5053/api/link-venda';

export const buscarLinkVendas = async(id: string): Promise<LinkVendas[]> => {
    const response = await axios.get<LinkVendas[]>(`${baseUrl}/${id}`);
    return response.data
}

export const criarLinkVendas = async(entidade: LinkVendaNovo) => {
    const response = await axios.post(`${baseUrl}`, entidade)
    return response.data
}

export const buscarLotePorId = async(id: string): Promise<Lote> => {
    const response = await axios.get<Lote>(`${baseUrl}/lote-id/${id}`);
    return response.data
}
 
