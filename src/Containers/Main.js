import Home from "./Home";
import SideBar from "./SideBar";

const Main = () => {
  const sideBarMobileDesign =
    " flex flex-col shadow-md h-full m-3 p-5 bg-white bg-opacity-70 rounded sticky top-10 font-Dosis justify-center items-center xl:hidden ";
  const sideBarWebDesign =
    " flex-initial shadow-md h-full m-3 p-5 bg-white bg-opacity-80 rounded-xl sticky top-10 font-Dosis justify-center items-center flex-col hidden xl:flex cursor-default    ";

  return (
    <div className=" xl:flex relative h-full px-5 ">
      <div>
        <SideBar globalAppearence={sideBarMobileDesign} />
      </div>
      <Home />
      <SideBar globalAppearence={sideBarWebDesign} />
    </div>
  );
};

export default Main;
