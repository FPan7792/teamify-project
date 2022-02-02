import { useEffect, useState } from 'react';

// import Cookies from "js-cookie";
import Cookies from 'js-cookie';

import {
   useQuery,
   useMutation,
   useQueryClient,
   UseQueryResult,
} from 'react-query';

import { Player } from '../Requests/Intefaces/interfaces-requests';

import {
   removeFromMyTeam,
   saveMyTeams,
   fetchMySavedTeams,
   updateMyTeams,
   resetMyTeam,
} from '../Requests/requests';

interface Style {
   globalAppearence: string;
}

function SideBar(Props: Style) {
   const { globalAppearence } = Props;

   // enregistrer mes équipes
   const isConnected = Cookies.get('userToken') || null;

   // Savoir si une equipe existe déja
   const [userHasTeamsExisting, setUserHasTeamsExisting] = useState(false);

   const { data, isSuccess } = useQuery(
      'DEFAULT_TEAM',
      fetchMySavedTeams
   ) as UseQueryResult<any, Error>;
   // console.log('data', data);

   useEffect(() => {
      if (isConnected && isSuccess) {
         if (data.equipe.length > 0) {
            setUserHasTeamsExisting(true);
            console.log('existing teams ');
         }

         return () => {
            setUserHasTeamsExisting(false);
            console.log('existing team false');
         };
      }
   }, [isSuccess, data, isConnected]);

   // ======================================================================>
   // ======================================================================>

   // GESTION DE LAFFICHAGE DES EQUIPES
   // ============================================>
   const parseValue = (value: number) => {
      let result;
      let valueAmount = '';
      if (value !== 0) {
         if (value / 1000000000 > 1) {
            valueAmount = ' MM';
            result = value / 1000000000;
         } else if (value / 1000000 > 1) {
            valueAmount = ' M';
            result = value / 1000000;
         } else if (value / 1000 > 1) {
            valueAmount = ' K';
            result = value / 1000;
         } else {
            valueAmount = '';
            result = value;
         }
         result = Number(result) + ' ' + valueAmount;
         return result;
      }
      return value + ' ';

      // a tester avec else return value + ' '
   };

   const parsePlayerValue = (value: string) => {
      let result = value;
      if (value === '0' || value === '-') {
         result = 'Non valorisé';
      }
      return result;
   };

   // retirer un joueur de l'équipe
   const queryClient = useQueryClient();
   const removePlayer = useMutation(removeFromMyTeam, {
      onSuccess: () => {
         queryClient.invalidateQueries('DEFAULT_TEAM');
      },
   });

   const removeAllPlayers = useMutation(resetMyTeam, {
      onSuccess: () => {
         // queryClient.invalidateQueries("MY_TEAM");
         queryClient.invalidateQueries('DEFAULT_TEAM');
      },
   });

   // ============================================>
   // ============================================>

   return !isSuccess ? (
      <p>Loading ..</p>
   ) : (
      <div className={globalAppearence}>
         <span className=' text-amber-400 font-semibold text-base md:text-lg text-center md:flex md:justify-center md:items-center md:flex-col xl:mb-4 xl:bg-white xl:px-9 xl:py-1 xl:rounded-xl xl:shadow '>
            Budget engagé : {'  '}
            <span className='text-amber-700 text-xl text-bold '>
               {parseValue(data.valeur) + '€'}
            </span>
         </span>

         <section className=' flex xl:flex-col overflow-x-auto xl:overflow-y-auto w-full px-2 md:p-2 xl:h-full bg-none md:bg-white sm:bg-opacity-100 rounded-2xl '>
            {data.equipe.length > 0 ? (
               data.equipe.map((player: Player, index: number) => {
                  return (
                     <section
                        className='  bg-white md:bg-green-200 md:bg-opacity-50 rounded-xl shadow m-1 md:m-2 p-2 w-50 transform hover:scale-110 text-xs sm:text-sm md:text-base text-center md:text-left flex flex-col justify-between items-center  '
                        key={index}
                     >
                        <p className='font-semibold text-center xl:mr-10 '>
                           {player.name}
                        </p>
                        <p className='px-1 text-xs sm:text-sm md:text-sm text-green-500 bg-white w-20 shadow rounded md:ml-16 text-center '>
                           {parsePlayerValue(player.value)}
                        </p>

                        <button
                           type='button'
                           className='bg-red-400 rounded-xl mt-2 md:mt-4  px-1 md:px-2 text-xs md:text-sm shadow hover:bg-black hover:text-white '
                           onClick={() => {
                              removePlayer.mutate({
                                 player,
                                 index,
                              });
                           }}
                        >
                           Licencier
                        </button>
                     </section>
                  );
               })
            ) : (
               <p className='m-auto italic opacity-50 text-red-700 text-center text-xs sm:text-sm md:text-base'>
                  (Aucun joueur dans l&apos;équipe)
               </p>
            )}
         </section>

         {isConnected && (
            <button
               type='button'
               className='rounded-2xl bg-yellow-400 px-2 hover:bg-yellow-500'
               onClick={() => {
                  if (userHasTeamsExisting) {
                     updateMyTeams();
                  } else saveMyTeams();

                  //  userHasTeamsExisting ? updateMyTeams() : saveMyTeams();
                  // implementer element a uptader
               }}
            >
               Sauvegarder cette équipe
            </button>
         )}
         {data.equipe.length > 0 && (
            <button
               type='button'
               className='px-1 rounded-lg text-xs sm:text-sm md:text-base mb-2 bg-amber-500 text-white cursor-pointer mt-2 hover:bg-amber-600 '
               onClick={() => {
                  removeAllPlayers.mutate();
               }}
            >
               Réinitialiser l&apos;équipe
            </button>
         )}
      </div>
   );
}

export default SideBar;

// Mettre en place système de limitation de prix
// AJOUTER A LA SAUVEGARDE UNE PROPS DE POSTE POUR LE JOUEUR : mise en place des ROLES
