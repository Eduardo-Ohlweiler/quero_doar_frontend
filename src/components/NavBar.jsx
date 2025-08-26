import { NavLink , useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext ";

export default function NavBar () {
    const {user} = useAuth();
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLog = (e) => {
        e.preventDefault();
        logout();
        navigate("/login");
    }

    return(
        <header>
            <div>
                <NavLink to="/">
                    <h1 className="text-2xl font-bold">Quero Doar</h1>
                </NavLink>
            </div>
            
            <nav>
                <div>
                    <NavLink to="/createdonation">Criar Doação</NavLink>
                    <NavLink to="/userdonations">Suas Doações</NavLink>
                    <NavLink to="/user">{user}</NavLink>

                </div>

                <button type="submit" 
                    onClick={handleLog}>
                    Sair
            </button>
            </nav>
        </header>

    )
}