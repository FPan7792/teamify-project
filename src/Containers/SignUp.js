import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  // css des inputs
  const inputStyle =
    "h-10 mb-5 w-4/6 rounded-full text-center mx-auto text-xs text-black focus:outline-none focus:bg-green-100 focus-within:font-bold shadow focus:ring-4 focus:ring-green-300";

  const noValidInputStyle =
    "h-10 mb-5 w-4/6 rounded-full text-center mx-auto text-xs text-black focus:outline-none focus:bg-green-100 focus-within:font-bold shadow focus:ring-4 focus:ring-red-500";

  // message d'alerte
  const [alerte, setAlerte] = useState({ text: "", display: false });

  // validation du form
  const [formInputIsValid, setFormInputIsValid] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {}, [formInputIsValid]);

  const verif = () => {
    const result = userName.split("");
    if (result.length >= 3) {
      formInputIsValid.userName = true;
      console.log(result.length);
    } else if (result.length < 3) formInputIsValid.userName = false;
  };

  // collecte et envoie des form
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    verif();
    console.log(formInputIsValid);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
  };

  // validation du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setAlerte({
      ...alerte,
      text: "Ton compte à bien été créé. Bienvenue dans l'équipe !",
      display: !alerte.display,
    });
  };

  //   affichage de validation

  //   const [validation, setValidation] = useState(false);

  return (
    <div className=" relative font-Dosis overflow-hidden">
      <section className="bg-black bg-opacity-70 w-4/6 relative m-auto mt-10 rounded-lg flex flex-col items-center ">
        <h1 className="text-2xl text-green-200 font-bold py-10">
          Rejoins la communauté en créant ton compte dès maintenant
        </h1>
        <form
          className=" flex flex-col justify-center items-center h-full w-5/6 text-green-100 "
          onSubmit={handleSubmit}
        >
          <section className=" flex flex-col w-full ">
            <p className="w-2/6">Nom d'utilisateur</p>
            <input
              className={
                formInputIsValid.userName ? inputStyle : noValidInputStyle
              }
              type="text"
              placeholder="Nom d'utilisateur"
              value={userName}
              name="username"
              onChange={handleUserNameChange}
            />
          </section>

          <section className=" flex flex-col w-full ">
            <p className="w-2/6">E-mail</p>
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
            <p className="w-2/6">Mot de passe</p>
            <input
              className={inputStyle}
              type="text"
              placeholder="Mot de passe"
              value={password}
              name="password"
              onChange={handlePasswordChange}
            />
          </section>

          <section className=" flex flex-col w-full ">
            <p className="w-2/6">Confirmer mot de passe</p>
            <input
              className={inputStyle}
              type="text"
              placeholder="Confirmation du mot de passe"
              value={confirmPassword}
              name="ConfirmPassword"
              onChange={handleConfirmPasswordChange}
            />
          </section>
          <button className=" p-2 px-3 rounded-full bg-green-500 bg-opacity-80 text-white font-bold transform hover:scale-105">
            Valider{" "}
          </button>
        </form>
        <section className="text-green-100 py-6 flex flex-col justify-center items-center">
          Tu as déja un compte ?
          <Link to="/login">
            <p className="hover:underline">Connectes-toi en cliquant ici</p>
          </Link>
        </section>
      </section>
      <section
        className={
          alerte.display
            ? " transition-all duration-1000 absolute bottom-1 right-5 bg-green-200 bg-opacity-100 rounded p-10 ease-in-out"
            : " transition-all duration-1000 absolute bottom-1 right-5 bg-green-200 bg-opacity-50 rounded p-10 opacity-0 ease-in-out "
        }
      >
        {alerte.text}
      </section>
      )
    </div>
  );
}

export default SignUp;
