import Home from "./Home";
import SideBar from "./SideBar";

// Packages
import { useQuery } from "react-query";

import { getUser } from "../Requests/user";

const Main = () => {
  const sideBarMobileDesign =
    " flex flex-col shadow-md h-full md:p-2 bg-[#7BF1A8] bg-opacity-60 rounded sticky md:my-7 py-1 font-Dosis justify-center items-center xl:hidden";
  const sideBarWebDesign =
    " xl:h-[500px] shadow-md p-5 bg-amber-400 bg-opacity-80 rounded-xl sticky top-10 font-Dosis items-center flex-col hidden xl:flex cursor-default ";

  const userName = useQuery("USER", getUser).data?.userName;

  return (
    <div className="xl:flex xl:justify-around">
      <div className=" relative xl:flex xl:flex-col font-Dosis xl:w-2/3 xl:px-10 xl:h-[500px] shadow mx-10 xl:m-0  bg-[#F7F0F5] p-10 pt-0 rounded ">
        {/* <section className="border-blue-600 border-2"> */}
        <h1 className=" text-2xl md:text-5xl font-semibold mx-auto mt-4 text-center">
          Bienvenue {userName && userName} !
        </h1>

        <p className=" text-sm md:text-base mb-3 md:mb-6 md:my-2 text-center ">
          ⚽️ Construis ton équipe sans plus attendre ⚽️
        </p>

        <Home />
        <SideBar globalAppearence={sideBarMobileDesign} />
        {/* </section> */}
        {/* <div className="flex justify-center xl:flex-initial xl:max-h-96rem relative "> */}
        {/* </div> */}
      </div>
      <SideBar globalAppearence={sideBarWebDesign} />
    </div>
  );
};

export default Main;
