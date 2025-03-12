import { useEffect, useState } from "react"
import SectionHeader from "./SectionHeader"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Oval } from "react-loader-spinner"
const Users = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  // fetch companies states
  const [inputValue, setInputValue] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const [userData, setUserData] = useState([])
  useEffect(()=>{
    const fetchUsers = async ()=>{
      setIsFetching(true)
      try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/accounts` , {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        const filterData = res.data.data.filter((item)=> item.role === "user")
        setUserData(filterData)
        console.log(res.data)
        setIsFetching(false)
      }catch(e){
        console.log(e)
        if(e.status === 401){
          alert(e.response.data.message)
          localStorage.removeItem("token")
          navigate("/admin-signin")
        }
      }
    }
    fetchUsers()
  },[])
  return (
    <section className="px-10 flex flex-col gap-10">
      <SectionHeader title="المستخدمين"/>
      <input type="text" 
        placeholder="ابحث"
        onChange={(e)=> setInputValue(e.target.value)}
        className="w-full h-[50px] rounded-3xl border-primary border outline-none px-3" dir="rtl"/>
        <div className="users max-h-screen overflow-y-scroll" dir="rtl">
          {isFetching ? 
          <div className="flex items-center justify-center">
            <Oval
          visible={true}
          height="40"
          width="40"
          color="rgb(23, 43, 78)"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
          </div>:
          userData.filter((item)=> item.name.toLowerCase().includes(inputValue))
          .map((item)=>(
            <div className="user flex items-center justify-between border-b border-primary pb-3">
            <div className="name flex flex-col items-center gap-3">
              <h4 className="text-xl text-primary font-bold">اسم المستخدم</h4>
              <p className="text-lg text-secondary font-bold">{item.name}</p>
            </div>
            <div className="email flex flex-col items-center gap-3">
            <h4 className="text-xl text-primary font-bold">البريد الالكتروني</h4>
            <p className="text-lg text-secondary font-bold">r{item.email}</p>
            </div>
            <div className="phone flex flex-col items-center gap-3">
            <h4 className="text-xl text-primary font-bold">رقم الهاتف</h4>
            <p className="text-lg text-secondary font-bold">{item.phone}</p>
            </div>
          </div>
          ))
        }
        </div>
    </section>
  )
}

export default Users
