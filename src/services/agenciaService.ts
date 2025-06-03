import axios from "axios";
import type { Agencia, UsuarioAgencia } from "../models/Agencia/Agencia";
import type { DeletarUsuario, UsuarioAgenciaCriar } from "../models/Agencia/UsuarioAgencia";

const baseUrl = 'http://localhost:5053/api';

export const buscarInfoUsuarioAgencia = async(id: string): Promise<UsuarioAgencia> => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data
}
export const buscarAgencia = async(id: string): Promise<Agencia> => {
  const response = await axios.get(`${baseUrl}/buscar-agencia/${id}`);
  return response.data;   
}

export const buscarUsuariosAgencias = async (id: string): Promise<UsuarioAgencia[]> => {
  const response = await axios.get(`${baseUrl}/buscar-todos-usuarios/${id}`);
  return response.data;
};

export const criarUsuarioAgencia = async (usuario: UsuarioAgenciaCriar, idDono: string) => {
  const response = await axios.post(`${baseUrl}/criar-usuario/${idDono}`, usuario);
  return response.data;
};

export const deletarUsuarioAgencia = async(ids: DeletarUsuario) => {
    const response = await axios.delete(`${baseUrl}/deletar-usuario`, {data:ids});
    return response.data;
}


