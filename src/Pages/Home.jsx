import Posts from "../Components/Posts";
import SideBar from "../Components/SideBar";
import TypeButtons from "../Components/TypeButtons";
import PostsByState from "../Components/PostsByState";

const Home = () => {
  return (
    <div className="flex justify-between">
      <SideBar />
      <div className="flex w-[75%] flex-col gap-10 py-10">
        <TypeButtons />
        <PostsByState />
        <Posts />
      </div>
    </div>
  );
};

export default Home;
