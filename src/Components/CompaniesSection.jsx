import { useContext, useEffect, useState } from "react"
import SectionHeader from "./SectionHeader"
import axios from "axios"
import { Oval } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import { StatesContext } from "../Context/Context"
const CompaniesSection = () => {
  const token = localStorage.getItem("token")
  const {createdCompany} = useContext(StatesContext)
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState("")
  // delete states
  const [companyId, setCompanyId] = useState("")
  const [confirm, setConfirm] = useState(null)
  const {isDeleted, setIsDeleted} = useContext(StatesContext)
  const [isDeleting, setIsDeleting] = useState(false)
  // fetch companies states
  const [isLoading, setIsLoading] = useState(false)
  const [companiesData, setCompaniesData] = useState([])
  useEffect(()=>{
    const fetchCompanies = async ()=>{
      setIsLoading(true)
      try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/accounts` , {
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        const filterData = res.data.data.filter((item)=> item.role === "company")
        setCompaniesData(filterData)
        console.log(res.data)
        setIsLoading(false)
      }catch(e){
        console.log(e)
        if(e.status === 401){
          alert(e.response.data.message)
          localStorage.removeItem("token")
          navigate("/admin-signin")
        }
      }
    }
    fetchCompanies()
  },[createdCompany, isDeleted])
  // delete logic
  // open and close confirm section
  const confirmToggle = (i)=>{
    if(confirm == i){
      return setConfirm(null)
    }
    setConfirm(i)
  }
  // delete api request
  const deleteCompany = async ()=>{
    setIsDeleting(true)
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/auth/account/${companyId}` , {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{
      console.log(res)
      setIsDeleting(false)
      setTimeout(()=>{
        setIsDeleted(!isDeleted)
      },2000)
    }).catch((err)=>{
      console.log(err)
      setIsLoading(false)
    })
  }
  return (
    <section className="px-10 flex flex-col gap-10">
      <SectionHeader title="كافة الشركات"/>
      <input type="text" 
        placeholder="ابحث"
        onEnter={(e)=> setInputValue(e.target.value)}
        className="w-full h-[50px] rounded-3xl border-primary border outline-none px-3" dir="rtl"/>
      <div className="companies max-h-screen overflow-y-scroll" dir="rtl">
       {isLoading ? 
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
      </div>
      :  companiesData.filter((item)=> item.name.toLowerCase().includes(inputValue)).map((item)=>(
        <div className="company flex items-center justify-between border-b border-primary pb-3">
        <div className="name flex flex-col items-center gap-3">
          <h4 className="text-xl text-primary font-bold">اسم الشركة</h4>
          <p className="text-lg text-secondary font-bold">{item.name}</p>
        </div>
        <div className="email flex flex-col items-center gap-3">
          <h4 className="text-xl text-primary font-bold">البريد الالكتروني</h4>
          <p className="text-lg text-secondary font-bold">{item.email}</p>
        </div>
        <div className="phone flex flex-col items-center gap-3">
          <h4 className="text-xl text-primary font-bold">رقم التواصل</h4>
          <p className="text-lg text-secondary font-bold">{item.phone}</p>
        </div>
        <div className="auth-code flex flex-col items-center gap-3">
          <h4 className="text-xl text-primary font-bold">رقم السجل التجاري</h4>
          <p className="text-lg text-secondary font-bold">{item.authCode}</p>
        </div>
        <div className="delete flex flex-col items-center gap-2">
          <button 
          onClick={()=> {
            setCompanyId(item.id)
            confirmToggle(item.id)
          }}
          className="w-[100px] h-[40px] rounded-xl bg-red-600 text-white cursor-pointer">حذف</button>
          <p className={`${confirm === item.id ? "block" : "hidden"} text-xl text-secondary`}>هل انت متأكد من الحذف</p>
          <button 
          onClick={()=>{
            deleteCompany()
          }}
          className={`${confirm === item.id ? "" : "hidden"}
           w-[100px] h-[40px] rounded-xl bg-primary
           flex items-center justify-center
            text-white cursor-pointer`}>
            {isDeleting ? 
            <Oval
            visible={true}
            height="30"
            width="30"
             color="#fff"
             ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          : "تأكيد"
          }
            </button>
        </div>
        </div>
      )) 
      }
      </div>
    </section>
  )
}

export default CompaniesSection
