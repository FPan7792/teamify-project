import { useState } from "react";
import axios from "axios";
import _ from "lodash";
import { useMutation, useQueryClient } from "react-query";
import {
  alerteErrorFormEmail,
  alerteErrorFormUsername,
  alerteValidationCreateAccount,
} from "../Requests/requests";

// GESTION DE LA NAVIGATION
import { Link } from "react-router-dom";

// GESTION DU FORMULAIRE
import { useForm } from "react-hook-form";

// Gestion des cookies de connexion
import Cookies from "js-cookie";

function SignUp() {
  // css conditionnel des inputs
  const inputStyle =
    " transition-all duration-200 h-10 mb-5 w-4/6 rounded-full text-center mx-auto text-xs text-black focus:outline-none focus:bg-green-100 focus-within:font-bold shadow focus:ring-4 focus:ring-green-300";

  const noValidInputStyle =
    " transition-all duration-500 h-10 mb-5 w-4/6 rounded-full text-center mx-auto text-xs text-black focus:outline-none focus:bg-green-100 focus-within:font-bold shadow focus:ring-4 focus:ring-red-500";

  // ====================>

  // GESTION DE LA FENETRE D'ALERTE
  const queryClient = useQueryClient();
  const alerteEmail = useMutation("Alerte", alerteErrorFormEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries("Alerte");
    },
  });

  const alerteUsername = useMutation("Alerte", alerteErrorFormUsername, {
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

  // ==============================================>

  // collecte et envoie des form
  // react hook form config
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm();

  // =================================>

  // verification des données collectées des inputs
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  // ==================================>

  //
  const [validation, setValidation] = useState(true);

  // soumission du form
  const onSubmit = (data) => {
    setValidation(true);
    console.log(data);
    const infos = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    console.log(infos);

    const sendInfos = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3001/user/signup",
          infos
        );
        console.log(response.data);

        const { token } = response.data;
        await Cookies.set("userToken", token, { expires: 30 });

        // provideAlerte(
        //   "Votre compte à bien été créé, Bienvenue dans l'équipe !",
        //   true,
        //   true
        // );
        alerteValidation.mutate();
      } catch (error) {
        console.log(error.response);
        if (error.response.data === "This email already has an account") {
          setError(
            "email",
            { message: "should change email" },
            { shouldFocus: true }
          );
          return alerteEmail.mutate("Cet email dispose déjà d'un compte");
          // provideAlerte(
          //   "Cet email dispose déja d'un compte",
          //   true,
          //   false
          // );
        } else if (error.response.data === "Username already taken") {
          setError(
            "username",
            { message: "should change username" },
            { shouldFocus: true }
          );
          return alerteUsername.mutate();

          // provideAlerte(
          //   "Ce nom d'utilisateur est déja pris",
          //   true,
          //   false
          // );
        }
      }
    };

    if (data.password === data.confirmPassword) {
      sendInfos();
    } else setValidation(false);
  };

  const onError = () => console.log(errors);

  const resetAll = () => {
    resetField("username");
    resetField("email");
    resetField("password");
    resetField("confirmPassword");
  };

  const errorsInputStyle =
    " transtion-all duration-500 text-red-500 font-bold opacity-100 h-full ";
  const errorsInputStyleInvisible =
    " transtion-all duration-1000 font-bold opacity-0 h-0";

  // Message erreurs
  // ---------------------------------
  const errorMessages = {
    required: "Ce champs est requis",
    minLength: "Ce champs requiert au moins 6 caractères",
    validate: "✅",
  };

  const { required, minLength, validate } = errorMessages;
  // ==============================>

  const parseEmail = (value) => {
    let result = _.trim(value, " ");
    result = _.replace(result, " ", "");
    return result;
  };

  return (
    <div className=" relative font-Dosis h-full flex justify-center items-center ">
      <section className="bg-black bg-opacity-70 w-4/6 relative rounded-lg flex flex-col items-center my-12 h-5/6 ">
        <h1 className="text-2xl text-green-200 font-bold py-10">
          Rejoins la communauté en créant ton compte dès maintenant
        </h1>
        <form
          className=" flex flex-col justify-center items-center h-full w-5/6 text-green-300 "
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <section className=" flex flex-col w-full ">
            <p className="w-2/6 underline ">Nom d'utilisateur</p>
            <input
              className={!errors.username ? inputStyle : noValidInputStyle}
              placeholder="Ton nom d'utilisateur"
              {...register("username", {
                required: "Ce champs est requis",
                minLength: 5,
                pattern: /^[\w]+$/,
                validate: (value) => {
                  setUsername(value);
                },
              })}
            />
          </section>
          <span
            className={
              errors.username ? errorsInputStyle : errorsInputStyleInvisible
            }
          >
            {errors?.username?.type === "required"
              ? required
              : errors?.username?.type === "minLength"
              ? minLength
              : errors?.username?.type === "pattern"
              ? "Les lettres, les chiffres et le '_' sont autorisés"
              : validate}
          </span>

          <section className=" flex flex-col w-full ">
            <p className="w-2/6 underline ">E-mail</p>
            <input
              className={!errors.email ? inputStyle : noValidInputStyle}
              placeholder="Ton adresse email"
              {...register("email", {
                required: "Ce champs est requis",
                pattern: /[@]/g,
                validate: (value) => {
                  value = parseEmail(value);
                  setEmail(value);
                },
              })}
            />
          </section>
          <span
            className={
              errors.email ? errorsInputStyle : errorsInputStyleInvisible
            }
          >
            {errors?.email?.type === "required"
              ? required
              : errors?.email?.type === "minLength"
              ? minLength
              : errors?.email?.type === "pattern"
              ? "Email non valide"
              : validate}
          </span>

          <section className=" flex flex-col w-full ">
            <p className="w-2/6 underline">Mot de passe</p>
            <input
              className={!errors.password ? inputStyle : noValidInputStyle}
              placeholder="Ton mot de passe "
              type="password"
              {...register("password", {
                required: "Ce champs est requis",
                minLength: 6,
                pattern: /^[\S]+$/,
                validate: (value) => {
                  setPassword(value);
                },
              })}
            />
          </section>
          <span
            className={
              errors.password ? errorsInputStyle : errorsInputStyleInvisible
            }
          >
            {errors?.password?.type === "required"
              ? required
              : errors?.password?.type === "minLength"
              ? minLength
              : errors?.password?.type === "pattern"
              ? "Au moins une lettre et un chiffre sont requis"
              : validate}
          </span>

          <section className=" flex flex-col w-full ">
            <p className="w-2/6 underline">Confirmer mot de passe</p>
            <input
              className={
                !errors.confirmPassword ? inputStyle : noValidInputStyle
              }
              type="password"
              placeholder="Confirme ton mot de passe "
              {...register("confirmPassword", {
                required: "Ce champs est requis",
                minLength: 6,
                pattern: /^[\S]+$/g,
                validate: (value) => {
                  setConfirmPassword(value);
                },
              })}
            />
          </section>
          <span
            className={
              errors.confirmPassword || !validation
                ? errorsInputStyle
                : errorsInputStyleInvisible
            }
          >
            {errors?.confirmPassword?.type === "required"
              ? required
              : errors?.confirmPassword?.type === "minLength"
              ? minLength
              : errors?.confirmPassword?.type === "pattern"
              ? "Au moins une lettre et un chiffre sont requis"
              : !validation
              ? "Les 2 mots de passes doivent être identiques "
              : validate}
          </span>

          <button className=" p-2 px-3 rounded-full bg-green-500 bg-opacity-80 text-white font-bold transform hover:scale-105 active:bg-green-800 focus:outline-none">
            Valider{" "}
          </button>
        </form>
        <button
          className="p-1 mt-2 bg-red-500 bg-opacity-80 active:bg-red-800 text-white font-bold rounded text-xs"
          onClick={() => {
            resetAll();
          }}
        >
          Réinitialiser tous les champs
        </button>
        <section className="text-green-100 py-6 flex flex-col justify-center items-center">
          Tu as déja un compte ?
          <Link to="/login">
            <p className="hover:underline">Connectes-toi en cliquant ici</p>
          </Link>
        </section>
      </section>
      <section
      // className={
      //   alerte.display
      //     ? alerte.success
      //       ? " transition-all duration-1000 absolute bottom-1 right-5 bg-green-200 bg-opacity-100 rounded p-10 ease-in-out"
      //       : " transition-all duration-1000 absolute bottom-1 right-5 bg-yellow-200 bg-opacity-100 rounded p-10 ease-in-out  "
      //     : " transition-all duration-1000 absolute bottom-1 right-5 bg-green-200 bg-opacity-50 rounded p-10 opacity-0 ease-in-out "
      // }
      ></section>
    </div>
  );
}

export default SignUp;
