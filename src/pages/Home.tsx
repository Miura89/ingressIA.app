import { useEffect, useState } from 'react';
import '../css/Home.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import type {UsuarioAgencia} from '../models/Agencia/UsuarioAgencia';
import Dashboard from '../components/Dashboards';
import Header from '../components/Header';

function Home()
{
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
    
    return(
        <>
        <Header/>
        </>
    )
}

export default Home