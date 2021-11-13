import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function LogIn() {
  // css des inputs
  const inputStyle =
    "h-10 mb-5 w-4/6 rounded-full text-center mx-auto text-xs text-black focus:outline-none focus:bg-green-100 focus-within:font-bold shadow focus:ring-4 focus:ring-green-300";

  // message d'alerte
  const [alerte, setAlerte] = useState({ text: "", display: false });

  // collecte et envoie des form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlerte({
      ...alerte,
      text: "Ton compte à bien été crée. Bienvenue dans l'équipe !",
      display: !alerte.display,
    });
  };

  const [globalHeight, setGlobalHeight] = useState();
  const [globalWidth, setGlobalWidth] = useState();

  return (
    <div
      className=" relative font-Dosis overflow-hidden "
      //   style={{ height: "calc(50 % + 10px)", border: "solid red 1px" }}
    >
      <section className="bg-black bg-opacity-70 w-4/6 relative m-auto mt-20 rounded-lg flex flex-col items-center ">
        <h1 className="text-2xl text-green-200 font-bold py-10">
          Connectes-toi pour retrouver tes équipes !
        </h1>
        <form
          className=" flex flex-col justify-center items-center h-full w-5/6 text-green-100 "
          onSubmit={handleSubmit}
        >
          <section className=" flex flex-col w-full ">
            <p className="w-2/6 underline ">E-mail</p>
            <input
              className={inputStyle}
              type="text"
              placeholder="Adresse email"
              value={email}
              name="email"
              onChange={handleEmailChange}
            />
          </section>

          <section className=" flex flex-col w-full ">
            <p className="w-2/6 underline ">Mot de passe</p>
            <input
              className={inputStyle}
              type="text"
              placeholder="Mot de passe"
              value={password}
              name="password"
              onChange={handlePasswordChange}
            />
          </section>

          <button className=" my-5 p-2 px-3 rounded-full bg-green-500 bg-opacity-80 text-white font-bold transform hover:scale-105">
            Valider{" "}
          </button>
        </form>
        <section className="text-green-100 py-6 flex flex-col justify-end items-center">
          Tu n'as pas encore de compte ?
          <Link to="/signup">
            <p className="hover:underline">Viens vite t'inscrire ici !</p>
          </Link>
        </section>
      </section>

      <div className="flex justify-end ">
        <section
          className={
            alerte.display
              ? " transition-all duration-1000 inline-block bg-green-400 rounded p-10 ease-in-out mt-5 mr-10 w-2/6 text-center text-white font-bold bg-opacity-100 "
              : " transition-all duration-1000 inline-block bg-green-400 rounded p-10 transform translate-y-30 opacity-0 ease-in-out mt-5 mr-10 w-2/6 text-center text-white font-bold bg-opacity-0 "
          }
        >
          {alerte.text}
        </section>
      </div>
    </div>
  );
}

export default LogIn;
