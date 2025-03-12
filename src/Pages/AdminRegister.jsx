import AdminRegisterForm from "../Components/AdminRegisterForm"


const AdminRegister = () => {
  return (
    <div
     className="relative  h-screen flex items-center justify-center">
      <img 
      src="/images/register-signin.jpg" 
      alt=""
      className="absolute top-0 left-0 w-full h-full z-[-1]"
       loading="lazy"/>
      <AdminRegisterForm/>
    </div>
  )
}

export default AdminRegister
