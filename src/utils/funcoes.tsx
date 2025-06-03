import { Check, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function logout(navigate: ReturnType<typeof useNavigate>) {
    localStorage.clear();
    navigate('/');
}


export function formalizarRole(role: number): string {
  switch (role) {
    case 0: return "Admin";
    case 1: return "Nível 2";
    case 2: return "Nível 1";
    default: return "Apenas Leitura";
  }
}

export function formalizarNome(nome: string): string {
  if (!nome) return "";
  return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
}
export function formatarTelefone(telefone: string): string {

  const numeros = telefone.replace(/\D/g, '');

  if (numeros.length === 11) {
    const ddd = numeros.slice(0, 2);
    const prefixo = numeros.slice(2, 7);
    const sufixo = numeros.slice(7);
    return `(${ddd}) ${prefixo}-${sufixo}`;
  }

  return telefone; 
}

export default function formalizarStatus(status: boolean)
    {
        if(status == true)
            return <Check color="#10B981"/>
        else
            return <XCircle color="#e3342f"/>
    }
export function formalizarGenero(genero: number)
{
  if(genero == 0)
    return "Masculino"
  if(genero == 1)
    return "Feminino"
  else
    return "Unisex"
}
