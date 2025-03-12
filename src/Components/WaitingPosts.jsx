import React, { useState } from 'react'
import SectionHeader from './SectionHeader'

const WaitingPosts = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className=' py-5 flex flex-col gap-10 items-center '>
      <SectionHeader title="المنشورات المعلقة"/>
      <div className="posts  w-full px-5 max-h-screen overflow-y-scroll" dir='rtl'>
        <div className="post  flex items-center justify-between border-b border-primary pb-3">
         <div className='flex items-center gap-10 w-[60%]'>
          <div className="image">
            <img src="/images/user.png" alt="post-image" />
          </div>
         <div className="content flex gap-8 items-center " dir='rtl'>
            <div className='flex flex-col items-center gap-3'>
            <div className="name flex items-center gap-2">
              <h4 className='text-xl text-primary font-bold'>نوع العقار:</h4>
              <p className='text-lg text-secondary font-bold'>منزل</p>
            </div>
            <div className="company flex  items-center gap-2">
              <h4 className='text-xl text-primary font-bold'>الشركة:</h4>
              <p className='text-lg text-secondary font-bold'>اسم الشركة</p>
            </div>
            </div>
            <div className='flex flex-col items-center gap-3'>
            <div className="price-rent flex items-center gap-2">
              <h4 className='text-xl text-primary font-bold'> سعر الأيجار :</h4>
              <p className='text-lg text-secondary font-bold'>150$</p>
            </div>
            <div className="price-sale flex items-center gap-2">
              <h4 className='text-xl text-primary font-bold'>سعر البيع :</h4>
              <p className='text-lg text-secondary font-bold'>300$</p>
            </div>
            </div>
          </div>
         </div>
         <div className="buttons flex flex-col items-center gap-2 w-[35%]">
          <div className='flex items-center gap-5'>
          <button className='py-3 px-6 rounded-xl bg-red-500 text-white cursor-pointer' onClick={()=> setOpen(!open)}>رفض</button>
          <button className='py-3 px-6 rounded-xl bg-green-500 text-white cursor-pointer' >قبول</button>
          </div>
          <form className={`reason ${open ? "flex" : "hidden"} flex-col gap-2 w-full`}>
            <label className='text-xl text-secondary'>
              سبب الرفض
            </label>
            <input type="text" className=' py-2 px-3 rounded-3xl w-full border border-primary outline-none' placeholder='اكتب السبب'/>
            <div className='flex items-center justify-center'>
            <button  className="bg-primary mx-auto block cursor-pointer rounded-3xl border-white px-6 py-3  tracking-wider text-white">
              تأكيد
            </button>
            </div>
          </form>
         </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingPosts
