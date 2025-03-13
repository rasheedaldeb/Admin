import SectionHeader from "./SectionHeader";
const ComplaintSection = () => {
  return (
    <section className="flex flex-col gap-10 px-10">
      <SectionHeader title="الشكاوي" />
      <input
        type="text"
        placeholder="ابحث"
        className="border-primary h-[50px] w-full rounded-3xl border px-3 outline-none"
        dir="rtl"
      />
      <div className="complaints max-h-screen overflow-y-scroll" dir="rtl">
        <div className="complaint border-primary flex items-center justify-between border-b pb-3">
          <div className="name flex flex-col items-center gap-3">
            <h4 className="text-primary text-xl font-bold">اسم المستخدم</h4>
            <p className="text-secondary text-lg font-bold">رشيد</p>
          </div>
          <div className="company flex flex-col items-center gap-3">
            <h4 className="text-primary text-xl font-bold">اسم الشركة</h4>
            <p className="text-secondary text-lg font-bold">رشيد</p>
          </div>
          <div className="complaint-content flex w-[50%] flex-col items-center gap-3">
            <h4 className="text-primary text-xl font-bold">الشكوى</h4>
            <p className="text-secondary text-lg font-bold">test test test</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplaintSection;
