import logo from "../assets/noun_soccer.png";
const Header = () => {
  return (
    <nav className=" shadow-md bg-black bg-opacity-40 flex justify-start items-center w-full rounded p-3">
      <p className="inline-block bg-green-100 bg-opacity-90 rounded-full h-full p-2 ">
        <img
          className="inline-block "
          src={logo}
          alt="teamify-logo"
          width="50"
        />
      </p>
      <span className=" font-Dosis m-2 font-sans font-bold text-3xl text-green-100  inline-block ">
        TEAMIFY
      </span>
    </nav>
  );
};

export default Header;
