import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import {
  fetchTransfertInfos,
  AddPlayerToMyTeam,
  fetchMySavedTeams,
} from "../Requests/requests";

// import des icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [playerFetched, setPlayerFetched] = useState(null);

  // afficher un message à l'utlisateur en cas d'erreur
  const [alert, setAlert] = useState({
    message: null,
    success: null,
    display: false,
  });

  const provideAlert = (message, success) => {
    setAlert({ message, success, display: true });

    setTimeout(
      () => setAlert({ message: null, success: null, display: false }),
      3000
    );
  };

  // EMPECHER L AJOUT DU MEME JOUEUR PLUSIEURS FOIS DANS LA MEME EQUIPE

  // on fetch les data de l'équipe mis en cache
  const fetchmyTeam = useQuery("DEFAULT_TEAM", fetchMySavedTeams);
  const { data } = fetchmyTeam;

  // fonction qui permet d'ajouter un joueur en cliquant sur RECRUTER
  const queryClient = useQueryClient();
  const AddPlayer = useMutation(AddPlayerToMyTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries("DEFAULT_TEAM");
    },
  });

  // valider l'ajout de joueurs a l'equipe
  const addPlayerValidation = () => {
    AddPlayer.mutate(playerFetched);
    provideAlert(
      `Félicitation ! ${playerFetched.name} vient de rejoindre ton équipe !`,
      "OK"
    );
  };

  // TRUE de base. on set a FALSE si le joueur est deja dans l'équipe pour empecher l'ajout
  const [validAddPlayers, setValidAddPlayers] = useState(true);

  // fonction permet mapper le tableau et retourne false si le joueur s'y trouve
  const checkAndAdd = (playerName) => {
    const equipe = data.equipe;
    let result = true;

    for (let i = 0; i < equipe.length; i++) {
      const find = equipe.find((elem) => playerName === elem.name);

      if (find) {
        result = false;
      }
    }
    return result;
  };

  // fonction envoie la valeur de l'input (nom d'un joueur) et retourne les données tranferts
  const [isLoading, setIsLoading] = useState(false);

  const giveUpContracts = () => {
    provideAlert("Abandon du contrat", null);
    setPlayerFetched(null);
    setSearch("");
    setValidAddPlayers(true);
  };

  const fetch = async () => {
    if (playerFetched) {
      giveUpContracts();
    }

    // Activation de l'icone de charge
    setIsLoading(true);

    if (search !== "") {
      try {
        // on lance une recherche vers le back avec les données de search (entrée dans la barre de recherche )
        const response = await fetchTransfertInfos(search);

        // retourne false si le joueur est deja dans l'équipe
        if (response === "400" || response === "404") {
          provideAlert("Aucun joueur ne correspond à ta recherche 🥺", "NO");
        } else {
          setPlayerFetched(response);
          const valid = await checkAndAdd(response.name);
          if (!valid) {
            await setValidAddPlayers(false);
          } else setPlayerFetched(response);
        }
      } catch (error) {
        console.log(error.response);
      }
    } else provideAlert("Tu peux entrer le nom de ton joueur", "NO");

    // Desactivation de l'icone de charge
    setIsLoading(false);
  };

  return (
    <section className=" relative w-full rounded-xl flex flex-col items-center mt-2 ">
      <div className="flex flex-col md:flex-row w-4/5 items-center ">
        <input
          className=" focus:outline-none focus:bg-opacity-100 h-9 md:h-12 text-center md:text-base text-amber-300 font-semibold rounded-3xl w-full shadow-xl bg-black bg-opacity-75"
          type="text"
          placeholder="Entres ici le nom du joueur que tu recherches "
          name="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              fetch();
            }
          }}
        />
      </div>

      <button
        className=" flex active:bg-white active:scale-105 rounded-full bg-opacity-100 shadow-md bg-amber-400 xl:bg-opacity-100 hover:scale-110 w-8 h-8 p-4 md:p-5 md:mt-2 cursor-pointer justify-center items-center"
        onClick={() => {
          fetch();
        }}
      >
        <FontAwesomeIcon icon={faSearch} color="black" />
      </button>

      <FontAwesomeIcon
        className={
          isLoading
            ? "animate-spin visible transition-all duration-300 mb-2 mt-4 md:mb-5 "
            : " animate-spin invisible transition-all ease-in-out duration-100  "
        }
        icon={faSpinner}
        color="orange"
        size="2x"
      />

      <section
        className={
          alert.display && search === ""
            ? " transition-all duration-500 ease-in-out rounded-2xl w-full flex-col mt-8 bg-white bg-opacity-0  "
            : playerFetched || alert.display
            ? " opacity-100 transition-all duration-500 ease-in-out shadow-md bg-opacity-50 bg-white rounded-2xl w-4/5 p-3 md:p-4 md:py-5 mb-3 xl:flex xl:flex-col xl:justify-center "
            : " opacity-0 transition-all duration-500 ease-in shadow bg-opacity-0 rounded-md w-full flex justify-center items-center flex-col "
        }
      >
        <div>
          <section
            className={
              alert.success === "OK"
                ? " transition-all duration-500 flex items-center flex-col p-1 md:p-4 bg-none rounded-xl my-1 md:my-5 w-full "
                : alert.success === "NO"
                ? " transition-all duration-500 flex items-center flex-col p-2 md:p-4 bg-opacity-80 rounded-xl md:my-5 "
                : playerFetched
                ? " transition-all duration-500 flex items-center flex-col p-4 opacity-80 bg-amber-400 bg-none sm:bg-white rounded-xl border-solid w-4/5 shadow-2xl mx-auto "
                : " transition-all duration-100 items-center justify-center flex-col  opacity-0 h-0 bg-white md:m-5 rounded-xl border-white border-2 border-solid "
            }
          >
            {playerFetched ? (
              <div className="min-h-full">
                <p className="font-bold md:text-xl md:px-10">
                  {playerFetched.name}
                </p>
                <p className="italic text-green-700 font-bold text-sm md:text-xl md:px-10 ">
                  {playerFetched.value}
                </p>
              </div>
            ) : (
              alert.message && (
                <p
                  className={
                    alert.success === "NO"
                      ? " transition-all duration-500 font-bold font-Dosis italic text-red-500 opacity-100 text-center "
                      : alert.success === "OK"
                      ? " transition-all duration-500 font-bold font-Dosis italic text-green-700 opacity-100 text-center"
                      : !alert.success &&
                        " transition-all duration-500 font-bold font-Dosis italic text-yellow-400 text-center"
                  }
                >
                  <div className=" h-full md:h-11 font-normal ">
                    {alert.message}
                  </div>
                </p>
              )
            )}
          </section>
        </div>

        <section
          className={
            playerFetched
              ? " transition-all duration-500 w-1/2 mx-auto md:w-full flex items-center flex-col md:flex-row opacity-100 h-full flex-wrap md:justify-around"
              : " opacity-0 transition-all duration-500 flex w-0 justify-between items-center "
          }
        >
          <button
            className="active:bg-green-900 active:text-white active:scale-105 inline-block my-2 text-green-700 hover:text-green-900 bg-green-100 hover:bg-green-200 hover:shadow-lg text-center rounded-xl shadow px-3 font-bold transform hover:scale-105 w-3/4 md:w-2/4 text-xs sm:text-sm md:text-base py-1 sm:py-2"
            onClick={async () => {
              console.log(playerFetched);
              playerFetched
                ? validAddPlayers
                  ? addPlayerValidation()
                  : provideAlert("Ce joueur est déja dans ton effectif !", "NO")
                : console.log("NOTHING  TO ADD ");
              // on vide l'input, la variable JOUEUR et on permet de nouveau l'ajout
              setPlayerFetched();
              setSearch("");
              setValidAddPlayers(true);
            }}
          >
            Recruter{" "}
            {
              playerFetched?.name?.split(" ")[
                playerFetched.name.split(" ").length - 1
              ]
            }{" "}
          </button>
          <button
            className="bg-red-500 text-white font-bold rounded-full px-2 transform hover:scale-105 hover:bg-red-700 w-3/4 md:w-1/4 text-xs sm:text-sm md:text-base"
            onClick={() => {
              giveUpContracts();
            }}
          >
            Annuler
          </button>
        </section>
      </section>
    </section>
  );
};

export default SearchBar;

// PROBLEME LORSQUE JE REFETCH SUR UN JOUEUR DEJA FECTH
