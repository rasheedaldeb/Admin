import { useContext, useState } from "react"
import "./CompanyRegisterForm.css"
import SectionHeader from "../SectionHeader"
import axios from "axios"
import { Oval } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"
import { StatesContext } from "../../Context/Context"
const CompanyRegisterForm = () => {
  const token = localStorage.getItem("token")
  const {setCreatedCompany, createdCompany} = useContext(StatesContext)
  const [showPass, setShowPass] = useState(false)
  // company inputs states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [authCode, setAuthCode] = useState("")
  const [image, setImage] = useState("")
  const [socialUrl, setSocialUrl] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()
  // form data to send to backend
  const companyData = new FormData()
  companyData.append("name" , name)
  companyData.append("email" , email)
  companyData.append("password" , password)
  companyData.append("phone" , phone)
  companyData.append("location" , location)
  companyData.append("auth_code" , authCode)
  companyData.append("profileImageUrl" , image)
  companyData.append("webSiteURL" , socialUrl)
  // company register api request
  const companyRegister = async (e)=>{
    e.preventDefault()
    setIsSending(true)
    await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/company/register` , companyData , {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{
        setCreatedCompany(!createdCompany)
        setSuccess(res.data.message)
        setTimeout(()=>{
          setSuccess("")
        },2000)
        setName("")
        setEmail("")
        setImage("")
        setAuthCode("")
        setLocation("")
        setPassword("")
        setPhone("")
        setSocialUrl("")
      console.log(res)
      setIsSending(false)
    }).catch((err)=>{
      setError(err.response.data.message);
      setTimeout(()=>{
        setError("")
      },2000)
      console.log(err)
      setIsSending(false)
      if(err.response.status === 401){
        alert("انتهت صلاحية الجلسة سجل الدخول مرة اخرى")
          localStorage.removeItem("token")
        navigate("/admin-signin")
      }
    })
  }
  return (
    <section className="p-10 flex flex-col gap-10" dir="rtl">
      <SectionHeader title="اضافة شركة"/>
      <form className="flex flex-col   gap-6"
       onSubmit={(e)=> companyRegister(e)}>
        <div className="grid grid-cols-2 gap-6">
        <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              اسم الشركة
            </label>
            <input
              name="name"
              type="text"
              value={name}
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل اسم الشركة "
              required
              onChange={(e)=> setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              البريد الالكتروني
            </label>
            <input
              name="email"
              type="text"
              value={email}
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل بريد الشركة الالكتروني"
              required
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              رقم الهاتف
            </label>
            <input
              name="number"
              type="tel"
              value={phone}
              className="
              border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل رقم الهاتف"
              onInvalid={(e)=>{
                e.currentTarget.setCustomValidity("يجب ان يبدأ الرقم ب , 09")
              }}
              required
              minLength={10}
              onChange={(e)=> setPhone(e.target.value)}
              dir="rtl"
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              كلمة المرور
            </label>
            <div className="border-primary w-full rounded-3xl border bg-gray-100 h-[55px]
           flex items-center justify-between px-4
           text-lg text-gray-800 transition-all outline-none focus:bg-gray-100">
           <input
              name="password"
              value={password}
              type={showPass ?  "text": "password"}
              className="w-[80%] h-full outline-none "
              placeholder="ضع كلمة مرور قوية"
              required
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img src={showPass ? "/public/images/eye.png": "/images/closed-eye.png"} alt="eye" 
            onClick={()=> setShowPass(!showPass)}
            className="cursor-pointer"/>
           </div>
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              عنوان الشركة
            </label>
            <input
              name="name"
              type="text"
              value={location}
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل عنوان الشركة "
              required
              onChange={(e)=> setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              رقم السجل التجاري
            </label>
            <input
              name="name"
              type="number"
              value={authCode}
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل رقم السجل التجاري "
              required
              onChange={(e)=> setAuthCode(e.target.value)}
            />
          </div>
          <div className="image flex items-center justify-between">
                <label htmlFor="image" className="bg-primary flex h-[52px] w-[140px] cursor-pointer items-center justify-center rounded-lg text-[17px] font-medium text-white">
                   اضافة صورة 
                </label>
                <input type="file" 
                id="image" 
                className="hidden"
                required
                onChange={(e)=> setImage(e.target.files[0])}
                />
                <img  
                src={image ? URL.createObjectURL(image) : "/images/no-image-icon-0.jpg"}
                alt="addv" 
                className="w-[150px] h-[150px] rounded-xl"
                />
            </div>
            <div>
            <label className="text-secondary mb-2 block text-lg font-bold">
              رابط صفحة سوشل ميديا من اختيارك
            </label>
            <input
              name="name"
              type="url"
              onInvalid={(e)=>{
                e.currentTarget.setCustomValidity('يجب ان يبدأ الرابط ب , https')
              }}
              onInput={(e)=>{
                e.currentTarget.setCustomValidity('')
              }}
              value={socialUrl}
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل رابط"
              required
              onChange={(e)=> setSocialUrl(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="flex items-center justify-center text-xl font-bold text-red-600">
          {error}
          </div>}  
          {success && <div className="flex items-center justify-center text-xl font-bold text-green-600">
            {success}
            </div>}
        <div className="flex items-center justify-center">
          <button
          disabled={isSending} 
          type="submit"
           className="bg-primary flex items-center justify-center  hover:bg-secondary  cursor-pointer rounded-3xl px-10 py-3 text-lg tracking-wider text-white">
            {isSending? 
          <Oval
          visible={true}
          height="40"
          width="40"
          color="#fff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
          /> 
          : "انشاء الحساب" 
          }
          </button>
        </div>
      </form>
    </section>
  )
}

export default CompanyRegisterForm
