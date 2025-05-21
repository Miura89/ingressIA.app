import { useEffect, useState } from 'react';
import logo from '../assets/s-o-c-i-a-l-c-u-t-6sW467-Ynh0-unsplash.jpg'
import AgenciaInfo from '../components/Agencia/AgenciaInfo'
import '../css/AgenciaArea.css'
import { buscarAgencia, buscarInfoUsuarioAgencia, buscarUsuariosAgencias, criarUsuarioAgencia, deletarUsuarioAgencia } from '../services/agenciaService'
import type { Agencia, UsuarioAgencia } from '../models/Agencia/Agencia';
import { UsuarioTable } from '../components/Agencia/UsuarioTable';
import { UsuarioModal } from '../components/Agencia/UsuarioModal';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { ClipLoader, MoonLoader } from 'react-spinners';

export default function AgenciaAreaNova()
{    
    const { id } = useParams();
    const [usuarioAtivo, setUsuarioAtivo] = useState<UsuarioAgencia| null>(null)
    const [agencia, setAgencia] = useState<Agencia | null>(null);
    const [usuario, setUsuario] = useState<UsuarioAgencia[] | null>(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [loading, setLoading] = useState(true);

    const [formValues, setFormValues] = useState({
        agenciaId: "",
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        senha: '',
        role: 0
    });

    async function carregarDados(id: string)
    {
        setLoading(true);
        const usuarioAgenciaResposta = await buscarUsuariosAgencias(id)
        const agenciaResposta = await buscarAgencia(id)
        setAgencia(agenciaResposta)
        setUsuario(usuarioAgenciaResposta)
        setLoading(false)
    }
    
    useEffect(() => {
        if(id)
        {
            async function carregarDadosUsuarioAtivo(id: string)
            {
                setLoading(true);
                const usuarioProcura = await buscarInfoUsuarioAgencia(id)
                setUsuarioAtivo(usuarioProcura)
                setLoading(false)
            }
            carregarDadosUsuarioAtivo(id)
        }
  }, [id]);

    useEffect(()=>{
        if(usuarioAtivo?.agenciaId)
        {
            carregarDados(usuarioAtivo.agenciaId)
        }
    }, [usuarioAtivo])


      function abrirModal() {
        setModalAberto(true);
        if (!usuarioAtivo) return;
        setFormValues({agenciaId: usuarioAtivo?.agenciaId, nome:'', email:'', telefone:'', cpf:'', senha:'', role:0 });
    }

    function fecharModal() {
        setModalAberto(false);
    }

    function abrirModalDeletar(id: string, nome: string){
        Swal.fire({
            title: `Usuario ${nome} será excluido`,
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
        }).then(async (result) => {
            if(result.isConfirmed){
                if(usuarioAtivo)
                {
                    let idUsuario = usuarioAtivo?.id
                    
                    const data = {
                        id: id,
                        donoId: idUsuario
                    }
                    const response = await deletarUsuarioAgencia(data);
                    setLoading(true);
                    if(response)
                    {
                        setLoading(false);
                    }
                    if(response.flag === false)
                        toast.error(`${response.message}`)
                    else
                        toast.success(`${response.message}`)
                    await carregarDados(usuarioAtivo?.agenciaId);
                }
            }
        })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if(usuarioAtivo?.agenciaId){
            setLoading(true)
            console.log(usuarioAtivo.id)
            await criarUsuarioAgencia(formValues, usuarioAtivo?.id)
            await carregarDados(usuarioAtivo?.agenciaId);
            setLoading(false)
        }

        fecharModal();
    }
    return(
        <>
        {loading && (
            <div className="loading-container">
                <span>Carregando dados...</span>
                <MoonLoader color="#000" size={70}/>
            </div>
            )}
          <div className="agencia-area">
            <h1>Área da Agência</h1>
            <img src={logo} alt="Logo da Agência" className="agencia-logo" />

                <section className="agencia-info">
                    {agencia && <AgenciaInfo agencia={agencia}/>}
                </section>

                    <section className="usuarios-agencia">
                        <div className="usuarios-header">
                            <h2>Usuários da Agência</h2>
                            <button className="btn-criar" onClick={abrirModal}>Criar Usuário</button>
                        </div>
                        {usuario && <UsuarioTable usuarios={usuario} modalDeletar={abrirModalDeletar}/>}
                    </section>
                {modalAberto && (
                <UsuarioModal 
                    onClose={fecharModal} 
                    onSubmit={handleSubmit} 
                    formValues={formValues} 
                    setFormValues={setFormValues} 
                />
            )}
          </div>
        </>
    )
}