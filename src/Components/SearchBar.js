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
  const [playerFetched, setPlayerFetched] = useState();

  // afficher un message à l'utlisateur en cas d'erreur
  const [alert, setAlert] = useState({
    message: "",
    success: null,
    display: false,
  });

  const provideAlert = (message, success) => {
    setAlert({ message, success, display: true });

    setTimeout(
      () => setAlert({ message, success: null, display: false }),
      3000
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
      provideAlert(
        `Félicitation ! ${playerFetched.name} vient de rejoindre ton équipe !`,
        "OK"
      );
    },
  });

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

  const fetch = async () => {
    setIsLoading(true);

    const response = await fetchTransfertInfos(search);
    console.log(response);

    // retourne false si le joueur est deja dans l'équipe
    const valid = await checkAndAdd(response.name);

    if (!valid) {
      setValidAddPlayers(false);
    }

    // on envoie les données de transfert dans PlayerFetched
    setPlayerFetched(response);

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
          className=" active:bg-green-700 active:scale-105 inline-block rounded-full bg-green-400 transform -translate-x-11 w-12 h-12 cursor-pointer  "
          onClick={() => {
            fetch();
          }}
        >
          <FontAwesomeIcon icon={faSearch} color="white" />
        </button>
      </div>
      <section
        className={
          playerFetched || alert.display
            ? " opacity-100 transition-all duration-1000 shadow p-5 bg-black bg-opacity-80 rounded-md w-3/5 flex justify-center items-center flex-col "
            : " opacity-0 transition-all duration-500 shadow p-5 bg-white bg-opacity-30 rounded-md w-3/5 flex justify-center items-center flex-col"
        }
      >
        <p>
          <section
            className={
              alert.success === "OK"
                ? " transition-all duration-500 border-green-500 border-2 flex items-center justify-center flex-col p-4 bg-opacity-80 rounded-xl bg-green-100 "
                : alert.success === "NO"
                ? " transition-all duration-500 border-red-500 border-2 flex items-center justify-center flex-col p-4 bg-opacity-80 rounded-xl bg-red-100 "
                : " transition-all duration-500 flex items-center justify-center flex-col p-4 bg-opacity-80 bg-white rounded-xl "
            }
          >
            {playerFetched ? (
              <>
                <p className="font-bold text-xl">{playerFetched.name}</p>
                <p className="italic text-green-700 ">{playerFetched.value}</p>
              </>
            ) : (
              <p
                className={
                  alert.success === "NO"
                    ? " transition-all duration-500 font-bold font-Dosis italic text-red-500 opacity-100 "
                    : alert.success === "OK"
                    ? " transition-all duration-500 font-bold font-Dosis italic text-green-700 opacity-100"
                    : " transition-all duration-500 font-bold font-Dosis "
                }
              >
                {alert.message}
              </p>
            )}
          </section>
        </p>

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
              playerFetched !== 404 && (await validAddPlayers)
                ? AddPlayer.mutate(playerFetched)
                : provideAlert("Ce joueur est déja dans ton effectif !", "NO");

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
            className="bg-red-600 bg-opacity-60 text-white font-bold rounded-full px-2 transform hover:scale-105 h-7 hover:bg-red-700 "
            onClick={() => {
              setPlayerFetched();
              setSearch("");
              setValidAddPlayers(true);
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
