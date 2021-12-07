import { useQueries, useMutation, useQueryClient } from "react-query";
import {
  removeFromMyTeam,
  saveMyTeams,
  fetchMySavedTeams,
  updateMyTeams,
  resetMyTeam,
} from "../Requests/requests";

// import Cookies from "js-cookie";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const SideBar = ({ globalAppearence }) => {
  // enregistrer mes équipes
  const isConnected = Cookies.get("userToken") || null;

  // Savoir si une equipe existe déja
  const [userHasTeamsExisting, setUserHasTeamsExisting] = useState(false);

  const fetchTeams = useQueries([
    { queryKey: "DEFAULT_TEAM", queryFn: fetchMySavedTeams },
  ]);

  const { isSuccess, data } = fetchTeams[0];

  useEffect(() => {
    if (isConnected) {
      if (data?.equipe?.length > 0) {
        setUserHasTeamsExisting(true);
        console.log("existing teams ");
      }

      return () => {
        setUserHasTeamsExisting(false);
        console.log("existing team false");
      };
    }
  }, [isSuccess, data, isConnected]);

  // ======================================================================>
  // ======================================================================>

  // GESTION DE LAFFICHAGE DES EQUIPES
  // ============================================>
  const parseValue = (value) => {
    let result;
    let valueAmount = "";
    if (value !== 0) {
      if (value / 1000000000 > 1) {
        valueAmount = " MM";
        result = value / 1000000000;
      } else if (value / 1000000 > 1) {
        valueAmount = " M";
        result = value / 1000000;
      } else if (value / 1000 > 1) {
        valueAmount = " K";
        result = value / 1000;
      } else {
        valueAmount = "";
        result = value;
      }
      result = Number(result) + " " + valueAmount;
      return result;
    } else return value + " ";
  };

  const parsePlayerValue = (value) => {
    if (value === "0" || value === "-") {
      value = "Non valorisé";
    }
    return value;
  };

  // retirer un joueur de l'équipe
  const queryClient = useQueryClient();
  const removePlayer = useMutation(removeFromMyTeam, {
    onSuccess: () => {
      // queryClient.invalidateQueries("MY_TEAM");
      queryClient.invalidateQueries("DEFAULT_TEAM");
    },
  });

  const removeAllPlayers = useMutation(resetMyTeam, {
    onSuccess: () => {
      // queryClient.invalidateQueries("MY_TEAM");
      queryClient.invalidateQueries("DEFAULT_TEAM");
    },
  });

  // ============================================>
  // ============================================>

  return (
    isSuccess && (
      <div className={globalAppearence}>
        <section className="flex-shrink-0">
          <p className=" text-green-700 text-xl text-center mx-8">
            Budget engagé : <br />
            <strong className="text-green-700 ">
              {parseValue(data.valeur) + "€"}
            </strong>
          </p>
        </section>

        <section
          className={
            " w-11/12 flex xl:flex-col overflow-x-hidden xl:h-96 my-3 p-5 bg-white bg-opacity-100 rounded-2xl "
          }
        >
          {data.equipe.length > 0 ? (
            data.equipe.map((player, index) => {
              console.log("c'est index");
              console.log(index);
              return (
                <section
                  className="bg-green-200 bg-opacity-50 rounded shadow m-2 p-2 transform hover:scale-110"
                  key={index}
                >
                  <div>
                    <strong>{player.name}</strong>
                    <p className="px-1 text-xs text-green-500 bg-white w-20 shadow rounded ml-16">
                      {parsePlayerValue(player.value)}
                    </p>
                  </div>
                  <button
                    className="bg-red-400 rounded-xl mt-4 px-2 text-xs shadow hover:bg-black hover:text-white"
                    onClick={() => {
                      removePlayer.mutate({ player: player, index: index });
                    }}
                  >
                    Licencier
                  </button>
                </section>
              );
            })
          ) : (
            <p className=" m-auto italic opacity-50 text-red-700 text-center ">
              Aucun joueur dans l'équipe
            </p>
          )}
        </section>

        {isConnected && (
          <>
            <button
              className="rounded-2xl bg-yellow-400 px-2 hover:bg-yellow-500"
              onClick={() => {
                userHasTeamsExisting ? updateMyTeams() : saveMyTeams();
                // implementer element a uptader
              }}
            >
              Sauvegarder cette équipe
            </button>
          </>
        )}
        {data.equipe.length > 0 && (
          <button
            className="px-1 rounded-lg bg-red-500 text-white cursor-pointer mt-2 hover:bg-red-600 "
            onClick={() => {
              removeAllPlayers.mutate();
            }}
          >
            Réinitialiser l'équipe
          </button>
        )}
      </div>
    )
  );
};

export default SideBar;

// Mettre en place système de limitation de prix
// AJOUTER A LA SAUVEGARDE UNE PROPS DE POSTE POUR LE JOUEUR : mise en place des ROLES
