
import { useContext, useEffect, useState } from "react"
import SectionHeader from "./SectionHeader"
import { StatesContext } from "../Context/Context"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Oval } from "react-loader-spinner"
const AdvertisementSection = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  // delete ad states
  const {isDeleted, setIsDeleted} = useContext(StatesContext)
  const [confirm, setConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [adId, setAdId] = useState()
  // fetch ads states
  const [advertisement, setAdvertisement] = useState([])
  const {createdAd} = useContext(StatesContext)
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState("")
  // fetch ads api
  useEffect(()=>{
    const fetchAds = async ()=>{
      setIsLoading(true)
      try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/external_ad` , {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        console.log(res)
        setAdvertisement(res.data.data)
        setIsLoading(false)
      }catch(e){
        console.log(e)
        if(e.status === 401){
          alert("انتهت صلاحية الجلسة, يرجى تسجيل الدخول مرة اخرى")
          localStorage.removeItem("token")
          navigate("/admin-signin")
        }
      }
    }
    fetchAds()
  },[createdAd, isDeleted])
  // open and close confirm section
  const confirmToggle = (i)=>{
    if(confirm == i){
      return setConfirm(null)
    }
    setConfirm(i)
  }
  // delete ad api request
  const deleteAd = async ()=>{
    setIsDeleting(true)
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/external_ad/${adId}` , {
      headers:{
        Authorization: `Bearer ${token}`
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
      <SectionHeader title="كافة الاعلانات"/>
        <input type="text" 
        placeholder="ابحث"
        onChange={(e)=> setInputValue(e.target.value)}
        className="w-full h-[50px] rounded-3xl border-primary border outline-none px-3" dir="rtl"/>
      <div className="addvs grid grid-cols-4 gap-5">
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
              </div>:
              advertisement.filter((item)=> item.content.toLowerCase().includes(inputValue)).map((item)=> (
                <div className="addv flex flex-col items-center gap-2">
                <img src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`} 
                loading="lazy"
                alt="add" 
                className="h-[250px]"/>
                <p className="text-xl text-secondary">{item.content}</p>
                <div className="flex flex-col items-center gap-2">
                <button 
                onClick={()=>{
                  setAdId(item.id)
                  confirmToggle(item.id)
                }}
                className="w-[100px] h-[40px] rounded-xl bg-red-600 text-white cursor-pointer">
                  حذف
                  </button>
                  <div className={`${confirm === item.id ? "flex" : "hidden"} flex-col items-center gap-2`}>
                    <p text-xl text-secondary>هل انت متأكد من الحذف؟</p>
                    <button
                    onClick={()=> {
                      deleteAd()
                    }}
                     className=" w-[100px] h-[40px] rounded-xl bg-primary
           flex items-center justify-center
            text-white cursor-pointer">
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
              </div>
              ))
      }
      </div>
    </section>
  )
}

export default AdvertisementSection
