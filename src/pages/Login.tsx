import '../css/Login.css';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import Logo from '../assets/INGRES.png'


function Login()
{
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
        const response = await axios.post('http://localhost:5053/api/login', {
            email: email,
            senha: senha
        });
        setLoading(true);
        console.log('Resposta da API:', response.data);
        
        if(response.data)
        {
            localStorage.setItem('token', response.data.token)
            navigate(`/home/${response.data.userResponse.id}`); 
            setLoading(false);
            toast.success(`Logado com sucesso`)
        }
        else{
            toast.error(`Email ou senha incorreta`)
        }
        setLoading(false)
        } catch (error) {
        console.error('Erro no login:', error);
        }
    };

    return(
        <>
        <div className="container">
            {loading && (
            <div className="loading-container">
                <span>Verificando Credenciais...</span>
                <MoonLoader color="#000" size={70}/>
            </div>
            )}
            <div className="content">
                <h1>Faça login para acessar</h1>
                <form className="container-forms" onSubmit={handleSubmit}>
                    <div className="email">
                        <span>Email: </span>
                        <input 
                            type="text" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="senha">
                        <span>Senha: </span>
                        <input 
                            type="password"  
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}/>
                    </div>
                    <button className='button-entrar' type='submit'>Entrar</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login