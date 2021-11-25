import Home from "./Home";
import SideBar from "./SideBar";

const Main = () => {
  return (
    <div className=" xl:flex relative h-full ">
      <Home />
      <SideBar />
    </div>
  );
};

export default Main;
