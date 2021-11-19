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
    <nav className=" shadow-md bg-black bg-opacity-40 flex justify-between items-center w-full rounded p-3">
      <Link to="/">
        <section className="flex justify-center items-center cursor-pointer">
          <span className="inline-block bg-green-100 bg-opacity-90 rounded-full p-2 ">
            <img
              className="inline-block "
              src={logo}
              alt="teamify-logo"
              width="50"
            />
          </span>
          <span className=" font-Dosis ml-2 font-sans font-bold text-3xl text-green-100 inline-block ">
            TEAMIFY
          </span>
        </section>
      </Link>

      <section className="flex justify-end text-white font-Dosis w-2/6">
        {displayMenu ? (
          <nav className="w-3/5 flex justify-between transition-all duration-1000 ease-in-out h-7 rounded-xl ">
            <Link to="/login">
              <button
                className={
                  displayMenu
                    ? " transition-all opacity-100 duration-500 bg-green-500 bg-opacity-30 px-2 rounded-lg hover:bg-white hover:bg-opacity-80 hover:text-green-700 cursor-pointer"
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
                    ? " transition-all opacity-100 duration-500 bg-green-500 bg-opacity-30 px-2 rounded-lg hover:bg-white hover:bg-opacity-80 hover:text-green-700 cursor-pointer"
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
