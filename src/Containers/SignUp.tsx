import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';

// Gestion des cookies de connexion
import Cookies from 'js-cookie';

import { useMutation, useQueryClient } from 'react-query';

// GESTION DE LA NAVIGATION
import { Link, useHistory } from 'react-router-dom';

// GESTION DU FORMULAIRE
import { useForm } from 'react-hook-form';

import { setUserToken } from '../Requests/user';
import {
   alerteErrorFormEmail,
   alerteErrorFormUsername,
   alerteValidationCreateAccount,
} from '../Requests/alerts';

import { Alerte, User } from '../Requests/Intefaces/interfaces-requests';
import { URL } from '../Requests/requests';

type FormData = {
   username: string;
   email: string;
   password: string;
   confirmPassword: string;
};

function SignUp() {
   const history = useHistory();

   // css conditionnel des inputs
   const inputStyle =
      ' transition-all duration-200 h-10 mb-5 w-4/6 rounded-full text-center mx-auto text-xs text-black focus:outline-none focus:bg-green-100 focus-within:font-bold shadow focus:ring-4 focus:ring-green-300';

   const noValidInputStyle =
      ' transition-all duration-500 h-10 mb-5 w-4/6 rounded-full text-center mx-auto text-xs text-black focus:outline-none focus:bg-green-100 focus-within:font-bold shadow focus:ring-4 focus:ring-red-500';

   // ====================>

   // GESTION DE LA FENETRE D'ALERTE
   const queryClient = useQueryClient();
   const alerteEmail = useMutation<Alerte, Error, string, Alerte>(
      'Alerte',
      alerteErrorFormEmail,
      {
         onSuccess: () => {
            queryClient.invalidateQueries('Alerte');
         },
      }
   );

   const alerteUsername = useMutation<Alerte, Error>(
      'Alerte',
      alerteErrorFormUsername,
      {
         onSuccess: () => {
            queryClient.invalidateQueries('Alerte');
         },
      }
   );

   const alerteValidation = useMutation<Alerte, Error>(
      'Alerte',
      alerteValidationCreateAccount,
      {
         onSuccess: () => {
            queryClient.invalidateQueries('Alerte');
            history.push('/');
         },
      }
   );

   // ==============================================>

   // GESTION DU USERTOKEN
   // ====================>

   const setTokenForUserConnexion = useMutation<User, Error, string, User>(
      'USER',
      setUserToken,
      {
         onSuccess: () => {
            queryClient.invalidateQueries('USER');
         },
      }
   );

   // collecte et envoie des form
   // react hook form config
   const {
      register,
      handleSubmit,
      resetField,
      setError,
      formState: { errors },
   } = useForm<FormData>();

   // =================================>

   // verification des donn??es collect??es des inputs
   const [userName, setUserName] = useState(null);
   const [email, setEmail] = useState(null);
   const [password, setPassword] = useState(null);
   const [confirmPassword, setConfirmPassword] = useState(null);
   // ==================================>

   //
   const [validation, setValidation] = useState(true);

   // soumission du form
   const onSubmit = (data: FormData) => {
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
            const response = (await axios.post(
               `${URL}user/signup`,
               infos
            )) as AxiosResponse;

            console.log(response.data);

            const { token, username } = response.data as {
               email: string;
               username: string;
               token: string;
               salt: string;
               hash: string;
            };
            await Cookies.set('userToken', token, { expires: 30 });
            await Cookies.set('userName', username);
            await setTokenForUserConnexion.mutate(username);

            alerteValidation.mutate();
         } catch (error: any) {
            console.log(error.response);
            if (error.response.data === 'This email already has an account') {
               setError(
                  'email',
                  { message: 'should change email' },
                  { shouldFocus: true }
               );
               return alerteEmail.mutate("Cet email dispose d??j?? d'un compte");
            } else if (error.response.data === 'Username already taken') {
               setError(
                  'username',
                  { message: 'should change username' },
                  { shouldFocus: true }
               );
               return alerteUsername.mutate();
            }
         }
      };

      if (data.password === data.confirmPassword) {
         sendInfos();
      } else setValidation(false);
   };

   const onError = () => console.log(errors);

   const resetAll = () => {
      resetField('username');
      resetField('email');
      resetField('password');
      resetField('confirmPassword');
   };

   const errorsInputStyle =
      ' transtion-all duration-500 text-red-500 font-bold opacity-100 h-full ';
   const errorsInputStyleInvisible =
      ' transtion-all duration-1000 font-bold opacity-0 h-0';

   // Message erreurs
   // ---------------------------------
   const errorMessages = {
      required: 'Ce champs est requis',
      minLength: 'Ce champs requiert au moins 6 caract??res',
      validate: '???',
   };

   const { required, minLength, validate } = errorMessages;
   // ==============================>

   const parseEmail = (value: string) => {
      let result = _.trim(value, ' ');
      result = _.replace(result, ' ', '');
      return result;
   };

   return (
      <div className=' font-Dosis '>
         <section className='bg-black bg-opacity-70 w-4/6 rounded-lg flex flex-col items-center mx-auto '>
            <h1 className='text-2xl text-green-200 font-bold py-5'>
               Rejoins la communaut?? en cr??ant ton compte d??s maintenant
            </h1>
            <form
               className=' flex flex-col justify-center items-center h-full w-5/6 text-green-300 '
               onSubmit={handleSubmit(onSubmit, onError)}
            >
               <section className=' flex flex-col w-full '>
                  <p className='w-2/6 underline '>Nom d&apos;utilisateur</p>
                  <input
                     className={
                        !errors.username ? inputStyle : noValidInputStyle
                     }
                     placeholder="Ton nom d'utilisateur"
                     {...register('username', {
                        required: 'Ce champs est requis',
                        minLength: 5,
                        pattern: /^[\w]+$/,
                        validate: (value) => {
                           return setUserName(value);
                        },
                     })}
                  />
               </section>
               <span
                  className={
                     errors.username
                        ? errorsInputStyle
                        : errorsInputStyleInvisible
                  }
               >
                  {errors?.username?.type === 'required'
                     ? required
                     : errors?.username?.type === 'minLength'
                     ? minLength
                     : errors?.username?.type === 'pattern'
                     ? "Les lettres, les chiffres et le '_' sont autoris??s"
                     : validate}
               </span>

               <section className=' flex flex-col w-full '>
                  <p className='w-2/6 underline '>E-mail</p>
                  <input
                     className={!errors.email ? inputStyle : noValidInputStyle}
                     placeholder='Ton adresse email'
                     {...register('email', {
                        required: 'Ce champs est requis',
                        pattern: /[@]/g,
                        validate: (value) => {
                           value = parseEmail(value);
                           return setEmail(value);
                        },
                     })}
                  />
               </section>
               <span
                  className={
                     errors.email ? errorsInputStyle : errorsInputStyleInvisible
                  }
               >
                  {errors?.email?.type === 'required'
                     ? required
                     : errors?.email?.type === 'minLength'
                     ? minLength
                     : errors?.email?.type === 'pattern'
                     ? 'Email non valide'
                     : validate}
               </span>

               <section className=' flex flex-col w-full '>
                  <p className='w-2/6 underline'>Mot de passe</p>
                  <input
                     className={
                        !errors.password ? inputStyle : noValidInputStyle
                     }
                     placeholder='Ton mot de passe '
                     type='password'
                     {...register('password', {
                        required: 'Ce champs est requis',
                        minLength: 6,
                        pattern: /^[\S]+$/,
                        validate: (value) => {
                           return setPassword(value);
                        },
                     })}
                  />
               </section>
               <span
                  className={
                     errors.password
                        ? errorsInputStyle
                        : errorsInputStyleInvisible
                  }
               >
                  {errors?.password?.type === 'required'
                     ? required
                     : errors?.password?.type === 'minLength'
                     ? minLength
                     : errors?.password?.type === 'pattern'
                     ? 'Au moins une lettre et un chiffre sont requis'
                     : validate}
               </span>

               <section className=' flex flex-col w-full '>
                  <p className='w-2/6 underline'>Confirmer mot de passe</p>
                  <input
                     className={
                        !errors.confirmPassword ? inputStyle : noValidInputStyle
                     }
                     type='password'
                     placeholder='Confirme ton mot de passe '
                     {...register('confirmPassword', {
                        required: 'Ce champs est requis',
                        minLength: 6,
                        pattern: /^[\S]+$/g,
                        validate: (value) => {
                           return setConfirmPassword(value);
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
                  {errors?.confirmPassword?.type === 'required'
                     ? required
                     : errors?.confirmPassword?.type === 'minLength'
                     ? minLength
                     : errors?.confirmPassword?.type === 'pattern'
                     ? 'Au moins une lettre et un chiffre sont requis'
                     : !validation
                     ? 'Les 2 mots de passes doivent ??tre identiques '
                     : validate}
               </span>

               <input
                  type='submit'
                  className=' p-2 px-3 rounded-full bg-green-500 bg-opacity-80 text-white font-bold transform hover:scale-105 active:bg-green-800 focus:outline-none cursor-pointer '
               />
            </form>
            <button
               type='button'
               className='p-1 mt-2 bg-red-500 bg-opacity-80 active:bg-red-800 text-white font-bold rounded text-xs'
               onClick={() => {
                  resetAll();
               }}
            >
               R??initialiser tous les champs
            </button>
            <section className='text-green-100 py-2 flex flex-col justify-center items-center'>
               Tu as d??ja un compte ?
               <Link to='/login'>
                  <p className='hover:underline'>
                     Connectes-toi en cliquant ici
                  </p>
               </Link>
            </section>
         </section>
      </div>
   );
}

export default SignUp;
