import '../css/Login.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Login()
{
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
        const response = await axios.post('https://localhost:7227/api/login', {
            email: email,
            senha: senha
        });

        console.log('Resposta da API:', response.data);
        localStorage.setItem('token', response.data.token)
        navigate(`/home/${response.data.userResponse.id}`); 

        } catch (error) {
        console.error('Erro no login:', error);
        }
    };

    return(
        <>
        <div className="container">
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