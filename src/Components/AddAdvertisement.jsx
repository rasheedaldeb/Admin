import { useContext, useState } from "react"
import SectionHeader from "./SectionHeader"
import axios from "axios"
import { Oval } from "react-loader-spinner"
import { StatesContext } from "../Context/Context"

const AddAdvertisement = () => {
  const token = localStorage.getItem("token")
  const {setCreatedAd, createdAd} = useContext(StatesContext)
  // create ad states
    const [image, setImage] = useState("")
    const [content, setContent] = useState("")
    const [isCreating, setIsCreating] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    // form data to send to backend
    const adData = new FormData()
    adData.append("content" , content)
    adData.append("image" , image)
    // create ad api request
    const createAd = async (e)=>{
      e.preventDefault()
      setIsCreating(true)
      await axios.post(`${import.meta.env.VITE_API_URL}/api/external_ad` , adData , {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then((res)=>{
        console.log(res)
        setCreatedAd(!createdAd)
        setSuccess(res.data.message)
        setSuccess("")
        setContent("")
        setImage("")
        setIsCreating(false)
      }).catch((err)=>{
        console.log(err)
        setIsCreating(false)
        if(err.status === 401){
          alert("انتهت صلاحية الجلسة, يرجى تسجيل الدخول مرة اخرى")
          localStorage.removeItem("token")
        }
        setError(err.reponse.data.message)
        setIsCreating(false)
      })
    }
  return (
    <section className="p-10 flex flex-col gap-10">
      <SectionHeader title="اضافة اعلان"/>
      <div>
        <form dir="rtl" className="flex flex-col gap-8" onSubmit={(e)=> createAd(e)}>
            <div className="image flex items-center justify-between">
                <label htmlFor="image" className="bg-primary flex h-[52px] w-[140px] cursor-pointer items-center justify-center rounded-lg text-[17px] font-medium text-white">
                   اضافة صورة 
                </label>
                <input type="file" 
                id="image" 
                className="hidden"
                onChange={(e)=> setImage(e.target.files[0])}
                />
                <img 
                src={image ? URL.createObjectURL(image) : "/images/no-image-icon-0.jpg"} 
                alt="addv" 
                className="w-[200px] h-[200px] rounded-xl"
                />
            </div>
            <div className="desc flex items-center justify-between">
                <div className="input w-[60%]">
                    <label className="text-secondary mb-2 block text-lg font-bold">
                        اضافة وصف
                    </label>
                    <input type="text" 
                    required
                    value={content}
                    placeholder="اضف وصف"
                    onChange={(e)=> setContent(e.target.value)}
                    className="border-primary w-full  rounded-3xl border bg-gray-100 px-4 py-3 text-lg text-gray-800 transition-all outline-none focus:bg-gray-100"
                    />
                </div>
                    <button class="bg-primary flex items-center justify-center  hover:bg-secondary  cursor-pointer rounded-3xl px-10 py-3 text-lg tracking-wider text-white">
                        {isCreating? 
                      <Oval
                      visible={true}
                      height="40"
                      width="40"
                      color="#fff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      />:
                      "تأكيد"  
                      }
                    </button>
            </div>
            {error ? <div className="flex items-center justify-center text-xl text-green-600 font-bold">
              {error}
            </div> : <div className="flex items-center justify-center text-xl text-green-600 font-bold">
              {success}
              </div>}
        </form>
      </div>
    </section>
  )
}

export default AddAdvertisement
