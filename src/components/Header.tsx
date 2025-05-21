import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { UsuarioAgencia } from "../models/Agencia/UsuarioAgencia";
import axios from "axios";
import Dashboard from "./Dashboards";
import AgenciaAreaNova from "../pages/AgenciaArea";
import Eventos from "./Eventos";

 function formalizarNome(nome: string): string {
        if (!nome) return "";
        return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
    }
 function formalizarRole(role: any): string{
        if(role == 0)
            return "Admin"
        if(role == 1)
            return "Nivel 2"
        if(role == 2)
            return "Nivel 3"
        else
            return "Apenas Leitura"
    }


export default function Header()
{

    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/'); 
    }
    
    const { id } = useParams();
    const [usuario, setUsuario] = useState<UsuarioAgencia | null>(null);
    useEffect(() => {
        const buscarUsuario = async () => {
            try{
                const response = await axios.get(`https://localhost:7227/api/${id}`);
                setUsuario(response.data);
            }
            catch(error){
                console.error("Erro ao buscar usuario:", error)
            }
        };
        buscarUsuario();
    }, [id])

    const [agencia, setAgencia] = useState(false);
    const [home, setHome] = useState(true);
    const [eventos, setEventos] = useState(false)

        function alterarAgencia()
        {
            setAgencia(true)
            setHome(false)
            setEventos(false)
        }
        function alterarHome()
        {
            setAgencia(false)
            setHome(true)
            setEventos(false)
        }
        function alterarEventos()
        {
            setAgencia(false);
            setHome(false);
            setEventos(true);
        }
    
    return(
        <>
        <div className="header-bar">
        <ul className="ul-header-bar">
            <li><a onClick={alterarAgencia}>Agências</a></li>
            <li><a onClick={alterarEventos}>Eventos</a></li>
            <li><a onClick={alterarHome}>Dashboard</a></li>
            <li><a href="#">Lotes</a></li>
            <li><a href="#">Perfil</a></li>
        </ul>

        <div className="user-area">
            {
                usuario ? (
                    <div className='content-roles'>
                        <span className="user-name">Olá, {formalizarNome(usuario.nome)}</span>
                        <span className='role-name'>{formalizarRole(usuario?.role)}</span>
                    </div>
                ) : 
                <span>Carregando...</span>
            }
            <button className="logout-button" onClick={logout}>Logout</button>
        </div>
        </div>
        {agencia && (<AgenciaAreaNova />)}
        {home && (<Dashboard/>)}  
        {eventos && (<Eventos/>)}
        </>
    )
}