import Posts from "../Components/Posts";
import SideBar from "../Components/SideBar";
import WaitingPosts from "../Components/WaitingPosts";

const Home = () => {
  return (
    <div className="flex justify-between">
      <SideBar />
      <div className="flex w-[70%] flex-col gap-10">
        <WaitingPosts />
        <Posts />
      </div>
    </div>
  );
};

export default Home;
