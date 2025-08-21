import { useAuth } from "../context/AuthContext ";
import {useNavigate} from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        login(username,password);
        navigate('/')
    }

    const createLog = (event) => {
        event.preventDefault();
        navigate("/createuser");
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User</label>
                    <input type="text" placeholder="user"
                    value={username}
                    onChange={ (e) => setUsername(e.target.value)} />
                    <label>Password</label>
                    <input type="password" placeholder="password"
                    value={password} 
                    onChange= { (e) => setPassword(e.target.value)} />

                </div>

                <button type='submit'>
                    Entrar
                </button>

       
                </form>

                <button type="submit"
                    onClick={createLog}>
                        Criar Conta
                    </button>
                
        </div>
    )
}

export default Login;