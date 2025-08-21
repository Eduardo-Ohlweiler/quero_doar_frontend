import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider} from "./context/AuthContext ";
import CreateUser from "./pages/CreateUser";
function App() {
 

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<CreateUser/>}/>

          <Route path="/"
            element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            } />
        </Routes>
      </Router>
      </AuthProvider>
  )
}

export default App