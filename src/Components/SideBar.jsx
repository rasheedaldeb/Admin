import { Link, useNavigate } from "react-router-dom"
import { Oval } from "react-loader-spinner";
import { useState } from "react";
import axios from "axios";
const SideBar = () => {
  const token = localStorage.getItem("token")
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const navigate = useNavigate()
    const logout = async ()=>{
      setIsLoggingOut(true)
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout` , {}, {
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then((res)=>{
      setIsLoggingOut(false)
      console.log(res)
      localStorage.removeItem("token")
      navigate("/admin-signin")
    }).catch((err)=>{
      if(err.status === 401){
        localStorage.removeItem("token")
        navigate("/admin-signin")
      }
    })
    }
  return (
    <aside className="w-[20%] border-l border-primary flex flex-col items-center gap-3 h-full top-0 right-0 fixed overflow-hidden">
      <div className="logo">
        <img src="/images/logo.png" alt="logo" className="w-[170px] h-[170px]"/>
      </div>
      <div className="links">
        <ul className="flex flex-col items-center gap-8">
          <li><Link to="/" className="text-xl text-secondary font-bold">الرئيسية</Link></li>
          <li><Link to="/advertisement" className="text-xl text-secondary font-bold">الاعلانات</Link></li>
          <li><Link to="/companies" className="text-xl text-secondary font-bold">الشركات</Link></li>
          <li><Link to="/complaints" className="text-xl text-secondary font-bold">الشكاوي</Link></li>
          <li><Link to="/users" className="text-xl text-secondary font-bold">المستخدمين</Link></li>
        </ul>
      </div>
      <div className="logout">
        <button 
        onClick={logout}
        className="p-3 bg-primary text-white rounded-xl cursor-pointer">
          {isLoggingOut ? 
          <Oval
        visible={true}
        height="40"
        width="40"
        color="#fff"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
  /> : "تسجيل الخروج"
        }</button>
      </div>
    </aside>
  )
}

export default SideBar
