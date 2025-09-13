import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import CreateUser from "./pages/CreateUser";
import CreateDonation from "./pages/CreateDonation";
import UserDonation from "./pages/UserDonation";
import User from "./pages/User";
import MinimalMainLayout from "./components/MinimalMainLayout/MinimalMainLayout";
import MainLayout from "./components/MainLayout/MainLayout";
import OverlayTest from "./pages/OverlayTest";


function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Layout mínimo do header e do footer */}
          <Route element={<MinimalMainLayout />}>
            <Route path="/login" element={<Login />} />
            

            {/* TESTES */}
            <Route path="/overlaytest" element={<OverlayTest />} />

          </Route>
          {/* Layout completo do header e do footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />          
          </Route>

          {/* <Route path="/createuser" element={<CreateUser />} /> */}
          <Route path="/createdonation" element={
            <ProtectedRoute>
              <CreateDonation />
            </ProtectedRoute>
          } />

          <Route path="/userdonation" element={
            <ProtectedRoute>
              <UserDonation />
            </ProtectedRoute>
          } />

          <Route path="/user" element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          } />


        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App