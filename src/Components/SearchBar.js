import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import {
  fetchTransfertInfos,
  AddPlayerToMyTeam,
  displayMyTeam,
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
      () => setAlert({ message, success: null, display: false }),
      2000
    );
  };

  // EMPECHER L AJOUT DU MEME JOUEUR PLUSIEURS FOIS DANS LA MEME EQUIPE

  // on fetch les data de l'équipe mis en cache
  const fetchmyTeam = useQuery("MyTeam", displayMyTeam);
  const { data } = fetchmyTeam;

  // fonction qui permet d'ajouter un joueur en cliquant sur RECRUTER
  const queryClient = useQueryClient();
  const AddPlayer = useMutation("MyTeam", AddPlayerToMyTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries("MyTeam");
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
    <section className=" m-10 h-4/5 w-4/5 rounded-xl flex flex-col items-center justify-center">
      <div className=" flex w-full justify-center items-center ">
        <FontAwesomeIcon
          className={
            isLoading
              ? "animate-spin visible transition-all duration-150 mr-2"
              : " animate-spin invisible transition-all ease-in-out duration-300 opacity-0  "
          }
          icon={faSpinner}
          color="lightgreen"
          size="2x"
        />

        <input
          className=" focus:outline-none focus:shadow h-12 text-center text-white rounded-3xl my-7 w-4/5 shadow-xl bg-black bg-opacity-75"
          type="text"
          placeholder="Tape le nom du joueur que tu recherches "
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
        <button
          className=" active:bg-green-700 active:scale-105 inline-block rounded-full bg-opacity-50 shadow-md bg-green-500 xl:bg-opacity-100 hover:scale-110 transform translate-x-2 xl:-translate-x-11 w-12 h-12 cursor-pointer  "
          onClick={() => {
            fetch();
          }}
        >
          <FontAwesomeIcon icon={faSearch} color="white" />
        </button>
      </div>
      <section
        className={
          alert.display && search == ""
            ? " transition-all duration-500 ease-in-out p-5 rounded-2xl w-3/5 flex justify-center items-center flex-col"
            : playerFetched || alert.display
            ? " opacity-100 transition-all duration-500 ease-in-out p-5 shadow-md bg-opacity-50 bg-white rounded-2xl w-3/5 flex justify-center items-center flex-col "
            : " opacity-0 transition-all duration-500 ease-in shadow p-5 bg-white bg-opacity-30 rounded-md w-3/5 flex justify-center items-center flex-col"
        }
      >
        <div>
          <section
            className={
              alert.success === "OK"
                ? " transition-all duration-500 flex items-center justify-center flex-col p-4 bg-opacity-80 rounded-xl bg-green-100 m-5 "
                : alert.success === "NO"
                ? " transition-all duration-500  flex items-center justify-center flex-col p-4 bg-opacity-80 rounded-xl bg-red-100 m-5 "
                : playerFetched
                ? " transition-all duration-500 flex items-center justify-center flex-col p-4 opacity-100 bg-white m-5 rounded-xl border-white border-2 border-solid "
                : " transition-all duration-500 flex items-center justify-center flex-col p-4 opacity-0 bg-white m-5 rounded-xl border-white border-2 border-solid "
            }
          >
            {playerFetched ? (
              <>
                <p className="font-bold text-xl">{playerFetched.name}</p>
                <p className="italic text-green-700 ">{playerFetched.value}</p>
              </>
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
                  {alert.message}
                </p>
              )
            )}
          </section>
        </div>

        <section
          className={
            playerFetched
              ? " transition-all duration-1000 flex w-2/3 justify-between items-center opacity-100 "
              : " opacity-0 transition-all duration-1000 flex w-2/3 justify-between items-center "
          }
        >
          <button
            className="active:bg-green-900 active:text-white active:scale-105 inline-block my-2 text-green-700 hover:text-green-900 h-full bg-green-100 hover:bg-green-200 hover:shadow-lg text-center rounded-xl shadow px-3 font-bold transform hover:scale-105 "
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
            className="bg-red-600 text-white font-bold rounded-full px-2 transform hover:scale-105 h-7 hover:bg-red-700 "
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
