import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import {
  alerteErrorFormEmail,
  alerteValidationCreateAccount,
} from "../Requests/requests";

import axios from "axios";

// GESTION DU FORMULAIRE
import { useForm } from "react-hook-form";

// Gestion des cookies de connexion
import Cookies from "js-cookie";

function LogIn() {
  // css conditionnel des inputs
  const inputStyle =
    " transition-all duration-200 h-10 mb-5 w-4/6 rounded-full text-center mx-auto text-xs text-black focus:outline-none focus:bg-green-100 focus-within:font-bold shadow focus:ring-4 focus:ring-green-300";
  const noValidInputStyle =
    " transition-all duration-500 h-10 mb-5 w-4/6 rounded-full text-center mx-auto text-xs text-black focus:outline-none focus:bg-green-100 focus-within:font-bold shadow focus:ring-4 focus:ring-red-500";

  // ====================>

  // message d'alerte
  // GESTION DE LA FENETRE D'ALERTE
  const queryClient = useQueryClient();
  const alerteEmail = useMutation("Alerte", alerteErrorFormEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries("Alerte");
    },
  });

  const alerteValidation = useMutation(
    "Alerte",
    alerteValidationCreateAccount,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("Alerte");
      },
    }
  );

  // collecte et envoie des form
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // collecte et envoie des form
  // react hook form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const infos = {
      email: data.email,
      password: data.password,
    };

    const sendInfos = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3001/user/login",
          infos
        );
        console.log(response.data);

        const { token } = response.data;
        Cookies.set("userToken", token);

        return alerteValidation.mutate();
      } catch (error) {
        console.log(error.response);
        setError(
          "email",
          { message: "should change email" },
          { shouldFocus: true }
        );
        return alerteEmail.mutate(
          "Erreur d'authentification. Email ou mot de passe incorrect "
        );
      }
    };

    if (data.email && data.password) {
      // ajouter redirection
      sendInfos();
    }
  };
  const onError = () => {
    console.log(errors);
  };

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
    <div className=" relative font-Dosis h-screen flex justify-center items-center -mt-12 ">
      <section className="bg-black bg-opacity-70 w-4/6 relative rounded-lg flex flex-col items-center ">
        <h1 className="text-2xl text-green-200 font-bold py-20">
          Connectes-toi pour retrouver tes équipes !
        </h1>
        <form
          className=" flex flex-col justify-center items-center h-full w-5/6 text-green-300 "
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

          <button className=" my-5 p-2 px-3 rounded-full bg-green-500 bg-opacity-80 text-white font-bold transform hover:scale-105 active:bg-green-700">
            Valider{" "}
          </button>
        </form>
        <section className="text-green-300 py-6 flex flex-col justify-end items-center">
          Tu n'as pas encore de compte ?
          <Link to="/signup">
            <p className="hover:underline">Viens vite t'inscrire ici !</p>
          </Link>
        </section>
      </section>
    </div>
  );
}

export default LogIn;
