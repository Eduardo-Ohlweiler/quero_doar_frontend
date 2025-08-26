import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider} from "./context/AuthContext ";
import CreateUser from "./pages/CreateUser";
import CreateDonation from "./pages/CreateDonation";
import UserDonation from "./pages/UserDonation";
import User from "./pages/User";


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

            <Route path="/createdonation" element={
              <ProtectedRoute>
                <CreateDonation/>
              </ProtectedRoute>
            } />

            <Route path="/userdonation" element={
              <ProtectedRoute>
                <UserDonation/>
              </ProtectedRoute>
            } />

            <Route path="/user" element={
              <ProtectedRoute>
                <User/>
              </ProtectedRoute>
            } />


        </Routes>
      </Router>
      </AuthProvider>
  )
}

export default App