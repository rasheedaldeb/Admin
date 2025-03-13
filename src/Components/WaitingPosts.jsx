import React, { useState } from "react";
import SectionHeader from "./SectionHeader";

const WaitingPosts = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-10 py-5">
      <SectionHeader title="المنشورات المعلقة" />
      <div
        className="posts max-h-screen w-full overflow-y-scroll px-5"
        dir="rtl"
      >
        <div className="post border-primary flex items-center justify-between border-b pb-3">
          <div className="flex w-[60%] items-center gap-10">
            <div className="image">
              <img src="/images/user.png" alt="post-image" />
            </div>
            <div className="content flex items-center gap-8" dir="rtl">
              <div className="flex flex-col items-center gap-3">
                <div className="name flex items-center gap-2">
                  <h4 className="text-primary text-xl font-bold">
                    نوع العقار:
                  </h4>
                  <p className="text-secondary text-lg font-bold">منزل</p>
                </div>
                <div className="company flex items-center gap-2">
                  <h4 className="text-primary text-xl font-bold">الشركة:</h4>
                  <p className="text-secondary text-lg font-bold">اسم الشركة</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="price-rent flex items-center gap-2">
                  <h4 className="text-primary text-xl font-bold">
                    {" "}
                    سعر الأيجار :
                  </h4>
                  <p className="text-secondary text-lg font-bold">150$</p>
                </div>
                <div className="price-sale flex items-center gap-2">
                  <h4 className="text-primary text-xl font-bold">
                    سعر البيع :
                  </h4>
                  <p className="text-secondary text-lg font-bold">300$</p>
                </div>
              </div>
            </div>
          </div>
          <div className="buttons flex w-[35%] flex-col items-center gap-2">
            <div className="flex items-center gap-5">
              <button
                className="cursor-pointer rounded-xl bg-red-500 px-6 py-3 text-white"
                onClick={() => setOpen(!open)}
              >
                رفض
              </button>
              <button className="cursor-pointer rounded-xl bg-green-500 px-6 py-3 text-white">
                قبول
              </button>
            </div>
            <form
              className={`reason ${open ? "flex" : "hidden"} w-full flex-col gap-2`}
            >
              <label className="text-secondary text-xl">سبب الرفض</label>
              <input
                type="text"
                className="border-primary w-full rounded-3xl border px-3 py-2 outline-none"
                placeholder="اكتب السبب"
              />
              <div className="flex items-center justify-center">
                <button className="bg-primary mx-auto block cursor-pointer rounded-3xl border-white px-6 py-3 tracking-wider text-white">
                  تأكيد
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingPosts;
