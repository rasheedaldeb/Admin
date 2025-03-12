import { Routes, Route } from "react-router-dom";
import { StatesProvider } from "./Context/Context";
import Home from "./Pages/Home"
import AdminRegister from "./Pages/AdminRegister"
import AdminSignin from "./Pages/AdminSignin"
import Advertisement from "./Pages/Advertisement"
import Companies from "./Pages/Companies";
import Complaint from "./Pages/Complaint";
import RegistrationUsers from "./Pages/RegistrationUsers";
import ProtectedRoute from "./Components/ProtectedRoute";
function App() {
  return (
    <>
    <StatesProvider>
      <Routes>
        <Route path="/admin-register" element={<AdminRegister/>}/>
        <Route path="/admin-signin" element={<AdminSignin/>}/>
        <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/advertisement" element={<Advertisement/>}/>
        <Route path="/companies" element={<Companies/>}/>
        <Route path="/complaints" element={<Complaint/>}/>
        <Route path="/users" element={<RegistrationUsers/>}/>
        </Route>
      </Routes>
    </StatesProvider>
    </>
  );
}

export default App;
