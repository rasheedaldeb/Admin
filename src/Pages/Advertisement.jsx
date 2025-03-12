import AddAdvertisement from "../Components/AddAdvertisement"
import AdvertisementSection from "../Components/AdvertisementSection"
import SideBar from "../Components/SideBar"

const Advertisement = () => {
  return (
    <div className="flex w-screen justify-between">
      <SideBar/>
      <div className="w-[70%] flex flex-col gap-10">
        <AddAdvertisement/>
        <AdvertisementSection/>
      </div>
    </div>
  )
}

export default Advertisement
