import SideBar from "../Components/SideBar"
import Users from "../Components/Users"
const RegistrationUsers = () => {
  return (
    <div  className="flex w-screen justify-between py-10">
      <SideBar/>
      <div className="w-[70%] flex flex-col gap-10">
        <Users/>
      </div>
    </div>
  )
}

export default RegistrationUsers
