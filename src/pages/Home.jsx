import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext ";
export default function Home (){

    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLog = (e) => {
        e.preventDefault();
        logout();
        navigate("/login");

    }
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Home</h1>
            <p>Bem vindo a área protegid</p>

            <button type="submit" 
                onClick={handleLog}>
                Sair
            </button>
        </div>
    )
}