// import navigation
import { Link } from "react-router-dom";

// import logo
import logo from "../assets/noun_soccer.png";

//  import des states
import { useState } from "react";

// import icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [displayMenu, setDisplayMenu] = useState(true);

  return (
    <nav className=" flex justify-center items-center shadow-md w-11/12 mx-auto xl:bg-black xl:bg-opacity-80  xl:justify-between xl:items-center xl:w-full rounded xl:rounded-b-lg p-3 font-Dosis ">
      <Link to="/">
        <section className="flex justify-center items-center cursor-pointer ">
          <span className=" border-white border-2 border-solid shadow-lg bg-green-200 bg-opacity-90 rounded-full p-2 xl:inline-block hidden ">
            <img
              className="inline-block  "
              src={logo}
              alt="teamify-logo"
              width="50"
            />
          </span>
          <span className=" font-Dosis mx-2 font-sans font-bold text-xl xl:text-3xl xl:text-green-200 ">
            TEAMIFY
          </span>

          <button
            className={
              !displayMenu
                ? " bg-green-500 w-7 h-7 rounded-full transition-all duration-1000 ease-in-out transform translate-x-60 xl:hidden"
                : "bg-white bg-opacity-40 w-10 h-10 rounded-full transition-all duration-1000 ease-in-out m-2 xl:hidden "
            }
            onClick={() => {
              setDisplayMenu(!displayMenu);
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </section>
      </Link>
      <nav
        className={
          displayMenu
            ? " visible opacity-100 transition-all duration-1000 ease-in-out rounded text-green-500 xl:hidden "
            : " invisible opacity-0 transition-all duration-1000  ease-in-out rounded text-green-500"
        }
      >
        <Link to="/login">
          <button
            className={
              displayMenu
                ? " transition-all opacity-100 duration-100 px-2 rounded-lg hover:bg-white hover:bg-opacity-80 hover:text-green-900 cursor-pointer bg-white bg-opacity-40 mx-1 "
                : "  transition-all opacity-0 duration-100 ease-in-out px-2 rounded-lg "
            }
          >
            Se connecter
          </button>
        </Link>
        <Link to="/signup">
          <button
            className={
              displayMenu
                ? "  transition-all opacity-100 duration-100 px-2 rounded-lg hover:bg-white hover:bg-opacity-80 hover:text-green-900 cursor-pointer bg-white bg-opacity-40 mx-1"
                : "  transition-all opacity-0 duration-100 ease-in-out px-2 rounded-lg "
            }
          >
            Rejoindre la communauté
          </button>
        </Link>
      </nav>

      <section className=" hidden xl:flex justify-end text-white font-Dosis w-2/6 items-center flex-shrink text-xs lg:text-base ">
        {displayMenu ? (
          <nav className="w-3/5 flex justify-between transition-all duration-1000 ease-in-out h-7 rounded-xl ">
            <Link to="/login">
              <button
                className={
                  displayMenu
                    ? " transition-all opacity-100 duration-500 bg-green-500 bg-opacity-30 px-2 rounded-lg hover:bg-white hover:bg-opacity-80 hover:text-green-700 cursor-pointer "
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
                    ? " transition-all opacity-100 duration-500 bg-green-500 bg-opacity-30 px-2 rounded-lg hover:bg-white hover:bg-opacity-80 hover:text-green-700 cursor-pointer ml-2"
                    : " transition-all opacity-0 duration-500 ease-in-out px-2 rounded-lg  "
                }
              >
                Rejoindre la communauté
              </button>
            </Link>
          </nav>
        ) : (
          <nav className=" transition-all duration-1000 ease-in-out opacity-0 h-7 ">
            {" "}
          </nav>
        )}
        <button
          className={
            displayMenu
              ? " bg-green-500 w-7 h-7 rounded-full transition-all ml-5 bg-opacity-30"
              : "bg-green-500 w-7 h-7 rounded-full transition-all transform -translate-x-10  "
          }
          onClick={() => {
            setDisplayMenu(!displayMenu);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </section>
    </nav>
  );
};

export default Header;
