import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const createUser = () => {
        // enviar dados para criar um usuario
        alert("Usuário criado");
        navigate("/login");
    }

    return (
        <form onSubmit={createUser} >
            <label>Username</label>
            <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
             <label>Nome</label>
            <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} />
             <label>email</label>
            <input 
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
             <label>Senha</label>
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">
                Criar Conta
            </button>
        </form>
    )


    

}
export default CreateUser;