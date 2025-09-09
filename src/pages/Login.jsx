import { useAuth } from "../context/AuthContext";
import {useNavigate, useLocation} from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {login, loading } = useAuth();
    const navigate = useNavigate();
    const from = useLocation().state?.from?.pathname || '/';

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login({email: username, password: password});
            navigate(from, { replace: true });
        } catch (error) {
            alert(error.message || "Erro ao fazer login");
            console.error("Erro ao fazer login:", error);
        }
    }

    const createLog = (event) => {
        event.preventDefault();
        navigate("/createuser");
    }

    return (
        <div className="flex items-center justify-center bg-emerald-700 p-4 h-[var(--view-height-minus-header)]">
            <div className="grid grid-cols-2 md:grid-cols-2 bg-emerald-50 rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
                <div className="flex flex-col items-center justify-center p-8 text-center bg-emerald-100 text-emerald-950">
                    <h1 className="text-3xl font-bold mb-2">Quero Doar</h1>
                    <h2 className="text-xl font-medium"> Faça o seu Login</h2>
                </div>
            
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <label>User</label>
                        <input type="text" 
                            value={username}
                            onChange={ (e) => setUsername(e.target.value)} 
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"/>
                        <label>Password</label>
                        <input type="password"
                            value={password} 
                            onChange= { (e) => setPassword(e.target.value)} 
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"/>
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-a md:space-y-0 mt-4">
                            <button type='submit'
                                className="w-full md:w-auto flex-1 bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-200 transition-colors "
                                disabled={loading}>
                                Entrar
                            </button>

                            <button type="submit"
                                onClick={createLog}
                                className="w-full md:w-auto flex-1 bg-gray-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors ">
                                
                                Criar Conta
                            </button>
                        </div>
                    </form>

                </div>
           </div>    
        </div>
    )
}

export default Login;