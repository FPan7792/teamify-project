// import navigation
import { Link } from "react-router-dom";

// import logo
import logo from "../assets/noun_soccer.png";

//  import des states
import { useState } from "react";

// import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// GESTION DE CONNEXION DU USER
import Cookies from "js-cookie";
import { getUser, removeUserTokenToDefault } from "../Requests/user";
// utlisation de Reactquery
import { useQuery, useMutation, useQueryClient } from "react-query";

const Header = () => {
  const [displayMenu, setDisplayMenu] = useState(true);

  // GESTION DE LA CONNEXION
  const queryClient = useQueryClient();

  const isConnected = useQuery("USER", getUser).data?.connected;

  const removeTokenForDisconnection = useMutation(
    "USER",
    removeUserTokenToDefault,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("USER");
        console.log("UT REMOVED ... Disconnection");
      },
    }
  );

  // Creer le bouton de deconnexion et afficher

  return (
    <nav className=" flex justify-around items-center mb-4 md:my-7 shadow-2xl mx-auto xl:items-center xl:w-11/12 rounded xl:rounded-b-lg p-2 md:p-5 xl:px-10 font-Dosis bg-[#F7F0F5]  ">
      <Link
        to="/"
        className="flex justify-center items-center xl:bg-white xl:shadow xl:p-2 xl:rounded-3xl  "
      >
        <span className=" border-2 border-amber-400 shadow-lg  bg-opacity-50 rounded-full p-2 xl:inline-block hidden ">
          <img
            className="inline-block  "
            src={logo}
            alt="teamify-logo"
            width="50"
          />
        </span>
        <span className=" font-Dosis font-sans font-bold xl:text-5xl text-xl md:text-3xl xl:text-amber-500 xl:ml-3 ">
          TEAMIFY
        </span>
      </Link>

      <button
        className={
          !displayMenu
            ? " md:bg-green-500 p-1 md:p-2 rounded-full transition-all duration-1000 ease-in-out transform xl:hidden  "
            : " bg-green-500 bg-opacity-40 p-1 md:p-2 rounded-full transition-all duration-1000 ease-in-out md:m-2 xl:hidden "
        }
        onClick={() => {
          setDisplayMenu(!displayMenu);
        }}
      >
        <FontAwesomeIcon icon={faBars} width="50" />
      </button>

      {!isConnected ? (
        <nav
          className={
            displayMenu
              ? "  opacity-100 transition-all duration-1000 ease-in-out rounded text-green-500 xl:hidden flex justify-center text-sm md:text-base "
              : " hidden text-green-500 "
          }
        >
          <Link to="/login">
            <button
              className={
                displayMenu
                  ? " transition-all opacity-100 duration-100 px-2 md:p-3 rounded-lg hover:bg-white hover:bg-opacity-80 hover:text-green-900 cursor-pointer bg-white bg-opacity-40 mx-1 md:shadow "
                  : "  transition-all opacity-0 duration-100 ease-in-out rounded-lg "
              }
            >
              Se connecter
            </button>
          </Link>
          <Link to="/signup">
            <button
              className={
                displayMenu
                  ? " transition-all opacity-100 duration-100 px-2 md:p-3 rounded-lg hover:bg-white hover:bg-opacity-80 hover:text-green-900 cursor-pointer bg-white bg-opacity-40 mx-1 md:shadow"
                  : " transition-all opacity-0 duration-100 ease-in-out px-2 rounded-lg "
              }
            >
              Rejoindre la communauté
            </button>
          </Link>
        </nav>
      ) : (
        <button
          className={
            displayMenu
              ? " visible opacity-100 transition-all duration-1000 ease-in-out text-red-500 px-2 rounded xl:hidden bg-opacity-50 bg-white hover:font-bold active:bg-red-300 "
              : " invisible opacity-0 transition-all duration-1000 ease-in-out "
          }
          onClick={async () => {
            await Cookies.remove("userToken");
            removeTokenForDisconnection.mutate();
          }}
        >
          Déconnexion
        </button>
      )}

      <section className=" hidden xl:flex justify-around text-white font-Dosis w-3/6 items-center flex-shrink text-xs lg:text-base ">
        {displayMenu ? (
          !isConnected ? (
            <nav className="w-3/5 flex justify-between items-center transition-all duration-1000 ease-in-out h-7 rounded-xl ">
              <Link to="/login">
                <button
                  className={
                    displayMenu
                      ? " transition-all opacity-100 duration-500 bg-amber-400 px-3 xl:py-2 xl:shadow  rounded-lg hover:bg-white hover:bg-opacity-80 hover:text-green-700 cursor-pointer text-lg  "
                      : " transition-all opacity-0 duration-500 ease-in-out px-2 rounded-lg "
                  }
                >
                  Se connecter
                </button>
              </Link>
              <Link to="/signup">
                <button
                  className={
                    displayMenu
                      ? " transition-all opacity-100 duration-500 bg-amber-400 xl:shadow px-3 xl:py-2 rounded-lg hover:bg-white hover:bg-opacity-80 hover:text-green-700 cursor-pointer ml-2 text-lg"
                      : " transition-all opacity-0 duration-500 ease-in-out px-2 rounded-lg  "
                  }
                >
                  Rejoindre la communauté
                </button>
              </Link>
            </nav>
          ) : (
            <button
              className="text-white font-bold px-2 py-1 rounded-xl bg-amber-800 hover:bg-amber-900 hover:text-red-500 xl:transform xl:translate-x-40 "
              onClick={async () => {
                await Cookies.remove("userToken");
                removeTokenForDisconnection.mutate();
              }}
            >
              Déconnexion
            </button>
          )
        ) : (
          <nav className=" transition-all duration-1000 ease-in-out opacity-0 h-7 ">
            {" "}
          </nav>
        )}
        <button
          className={
            displayMenu
              ? " bg-amber-700 xl:shadow w-7 h-7 xl:w-10 xl:h-10 rounded-full transition-all"
              : "bg-white xl:shadow w-7 h-7 xl:w-10 xl:h-10 rounded-full transition-all  "
          }
          onClick={() => {
            setDisplayMenu(!displayMenu);
          }}
        >
          <FontAwesomeIcon icon={faBars} color="orange" />
        </button>
      </section>
    </nav>
  );
};

export default Header;
