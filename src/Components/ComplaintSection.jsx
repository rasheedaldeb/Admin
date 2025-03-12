import SectionHeader from "./SectionHeader"
const ComplaintSection = () => {
  return (
    <section className="px-10 flex flex-col gap-10">
      <SectionHeader title="الشكاوي"/>
      <input type="text" 
        placeholder="ابحث"
        className="w-full h-[50px] rounded-3xl border-primary border outline-none px-3" dir="rtl"/>
      <div className="complaints max-h-screen overflow-y-scroll" dir="rtl">
        <div className="complaint flex items-center justify-between border-b border-primary pb-3">
          <div className="name flex flex-col items-center gap-3">
            <h4 className="text-xl text-primary font-bold">اسم المستخدم</h4>
            <p className="text-lg text-secondary font-bold">رشيد</p>
          </div>
          <div className="company flex flex-col items-center gap-3">
          <h4 className="text-xl text-primary font-bold">اسم الشركة</h4>
          <p className="text-lg text-secondary font-bold">رشيد</p>
          </div>
          <div className="complaint-content w-[50%] flex flex-col items-center gap-3 ">
          <h4 className="text-xl text-primary font-bold">الشكوى</h4>
          <p className="text-lg text-secondary font-bold">test test test</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComplaintSection
