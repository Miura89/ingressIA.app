import type { Agencia } from "../../models/Agencia/Agencia";

interface AgenciaInfoProps{
    agencia: Agencia;
}
export default function AgenciaInfo({agencia}: AgenciaInfoProps)
{
    return(
        <>
            <h2>Informações da Agência</h2>
            <p><strong>Nome:</strong> {agencia?.nome} </p>
            <p><strong>CNPJ:</strong> {agencia?.cnpj} </p>
            <p><strong>Email:</strong> {agencia?.email}</p>
        </>
    )
}