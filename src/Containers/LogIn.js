import { useState } from "react";
import { Link } from "react-router-dom";

// GESTION DU FORMULAIRE
import { useForm } from "react-hook-form";

function LogIn() {
  // css conditionnel des inputs
  const inputStyle =
    " transition-all duration-200 h-10 mb-5 w-4/6 rounded-full text-center mx-auto text-xs text-black focus:outline-none focus:bg-green-100 focus-within:font-bold shadow focus:ring-4 focus:ring-green-300";
  const noValidInputStyle =
    " transition-all duration-500 h-10 mb-5 w-4/6 rounded-full text-center mx-auto text-xs text-black focus:outline-none focus:bg-green-100 focus-within:font-bold shadow focus:ring-4 focus:ring-red-500";

  // ====================>

  // message d'alerte
  const [alerte, setAlerte] = useState({
    message: null,
    display: false,
    success: true,
  });

  const provideAlerte = (message, display, success) => {
    setAlerte({ message, display, success });

    setTimeout(function () {
      setAlerte({ ...alerte, message, display: false });
    }, 4000);
  };

  // collecte et envoie des form
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // collecte et envoie des form
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log("Je viens d remplir email avec ca ");
    setEmail(data.email);
    console.log(email);
    console.log("Je viens d remplir password avec ca ");
    setPassword(data.password);
    console.log(password);

    setAlerte({
      ...alerte,
      message: "Tu es maintenant connecté. Bienvenue !",
      display: !alerte.display,
    });
  };
  const onError = () => console.log(errors);

  const errorsInputStyle =
    " transtion-all duration-500 text-red-500 font-bold opacity-100 h-full ";
  const errorsInputStyleInvisible =
    " transtion-all duration-1000 font-bold opacity-0 h-0";

  // Message erreurs
  // ---------------------------------
  const errorMessages = {
    required: "Ce champs est requis",
    minLength: "Ce champs requiert au moins 5 caractères",
    validate: "✅",
  };

  const { required, minLength, validate } = errorMessages;
  // ==============================>

  return (
    <div className=" relative font-Dosis overflow-hidden ">
      <section className="bg-black bg-opacity-70 w-4/6 relative m-auto mt-20 rounded-lg flex flex-col items-center ">
        <h1 className="text-2xl text-green-200 font-bold py-10">
          Connectes-toi pour retrouver tes équipes !
        </h1>
        <form
          className=" flex flex-col justify-center items-center h-full w-5/6 text-green-100 "
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <section className=" flex flex-col w-full ">
            <p className="w-2/6 underline ">E-mail</p>
            <input
              className={!errors.email ? inputStyle : noValidInputStyle}
              placeholder="Adresse email"
              {...register("email", { required: true })}
            />
          </section>
          <span
            className={
              errors.email ? errorsInputStyle : errorsInputStyleInvisible
            }
          >
            {errors.email
              ? errors.email.type === "required"
                ? required
                : errors.email.type === "minLength" && minLength
              : validate}
          </span>

          <section className=" flex flex-col w-full ">
            <p className="w-2/6 underline ">Mot de passe</p>
            <input
              className={!errors.password ? inputStyle : noValidInputStyle}
              placeholder="Mot de passe"
              {...register("password", { required: true })}
            />
          </section>
          <span
            className={
              errors.password ? errorsInputStyle : errorsInputStyleInvisible
            }
          >
            {errors.password
              ? errors.password.type === "required"
                ? required
                : errors.password.type === "minLength" && minLength
              : validate}
          </span>

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
              ? " transition-all duration-1000 inline-block bg-green-500 rounded p-10 ease-in-out mt-5 mr-10 w-2/6 text-center text-white font-bold bg-opacity-100 border-2 border-white border-solid "
              : " transition-all duration-1000 inline-block bg-green-500 rounded p-10 transform translate-y-30 opacity-0 ease-in-out mt-5 mr-10 w-2/6 text-center text-white font-bold bg-opacity-0 border-2 border-white border-solid "
          }
        >
          {alerte.message}
        </section>
      </div>
    </div>
  );
}

export default LogIn;
