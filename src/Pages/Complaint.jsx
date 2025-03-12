import ComplaintSection from "../Components/ComplaintSection"
import SideBar from "../Components/SideBar"

const Complaint = () => {
  return (
    <div className="flex w-screen justify-between items-center">
      <SideBar/>
      <div className="w-[70%] flex flex-col gap-10 py-10">
      <ComplaintSection/>
      </div>
    </div>
  )
}

export default Complaint
