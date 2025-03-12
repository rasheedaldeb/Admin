import axios from "axios";
import { useState } from "react";
import {  Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
const AdminRegisterForm = () => {
  const [showPass, setShowPass] = useState(false)
  // inputes data values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const role = "admin"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSeccess] = useState("")
  const navigate = useNavigate();
   // form data object to send to the backend
   const adminData = new FormData();
   adminData.append("name", name);
   adminData.append("email", email);
   adminData.append("password", password);
   adminData.append("phone", number);
   adminData.append("role", role);
   // register function
  const adminRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await axios
      .post(`${import.meta.env.VITE_API_URL}/api/auth/register`, adminData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setSeccess(res.data.message)
        console.log(res.data)
        localStorage.setItem("token", res.data.token)
        setIsSubmitting(false);
        setTimeout(()=>{
          navigate("/")
        },2000)
      })
      .catch((err) => {
        setError(err.response.data.message);
        setIsSubmitting(false);
      });
  };
  return (
    <section
      className=" px-10 flex w-full flex-col items-center gap-6"
      dir="rtl"
    >
      <h2 className="text-white text-3xl font-bold">انشاء حساب جديد</h2>
      <form className="w-full" onSubmit={(e)=> adminRegister(e)}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="text-white mb-2 block text-lg font-bold">
              الاسم
            </label>
            <input
              name="name"
              type="text"
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل اسمك "
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-white mb-2 block text-lg font-bold">
              البريد الالكتروني
            </label>
            <input
              name="email"
              type="text"
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل بريدك الالكتروني"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-white mb-2 block text-lg font-bold">
              رقم الهاتف
            </label>
            <input
               name="number"
              type="number"
              className="border-primary w-full rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
              placeholder="ادخل رقم هاتفك"
              required
              minLength={10}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="text-white mb-2 block text-lg font-bold">
              كلمة المرور
            </label>
            <div className="border-primary w-full rounded-3xl border bg-gray-100 h-[55px]
           flex items-center justify-between px-4
           text-lg text-gray-800 transition-all outline-none focus:bg-gray-100">
           <input
              name="password"
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
        </div>
          
          <div class="mt-8 flex w-full items-center justify-around">
            <p className="flex items-center justify-center font-bold text-white">
              هل لديك حساب بالفعل؟
              <Link to="/admin-signin" className="text-secondary underline">
                تسجيل الدخول
              </Link>
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              class="bg-primary flex items-center justify-center  hover:bg-secondary  cursor-pointer rounded-3xl px-10 py-3 text-lg tracking-wider text-white"
            >
              {isSubmitting ?
               <Oval
               visible={true}
              height="40"
              width="40"
              color="#fff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            /> : "انشاء حساب"}
            </button>
          </div>
        {error ? <div className="flex items-center justify-center text-xl font-bold text-red-600">
          {error}
          </div> : <div className="flex items-center justify-center text-xl font-bold text-green-600">
            {success}
            </div>}
        {/* facebook & google buttons */}
        <div className="flex items-center justify-center gap-3">
          <button>
            <img src="/images/facebook.png" alt="facebook" />
          </button>
          <button>
            <img src="/images/google.png" alt="google" />
          </button>
        </div>
      </form>
    </section>
  )
}

export default AdminRegisterForm
