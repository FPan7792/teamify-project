import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import {
  fetchTransfertInfos,
  AddPlayerToMyTeam,
  displayMyTeam,
} from "../Requests/requests";

// import des icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [playerFetched, setPlayerFetched] = useState();

  // afficher un message à l'utlisateur en cas d'erreur
  const [alert, setAlert] = useState();

  const provideAlert = (message) => {
    setAlert(message);

    setTimeout(function () {
      setAlert();
    }, 3000);
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
  const fetch = async () => {
    const response = await fetchTransfertInfos(search);
    console.log(response);

    // retourne false si le joueur est deja dans l'équipe
    const valid = await checkAndAdd(response.name);

    if (!valid) {
      setValidAddPlayers(false);
    }

    // on envoie les données de transfert dans PlayerFetched
    setPlayerFetched(response);
  };

  return (
    <section className="m-10 w-4/5 rounded-xl flex flex-col items-center justify-center border-solid p-7">
      <div className="flex w-full justify-center items-center">
        <input
          className=" h-12 text-center text-white rounded-3xl my-7 w-4/5 shadow-xl bg-black bg-opacity-75"
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
          className=" inline-block rounded-full bg-green-400 transform -translate-x-11 w-14 h-14 cursor-pointer  "
          onClick={() => {
            fetch();
          }}
        >
          <FontAwesomeIcon icon={faSearch} color="white" />
        </button>
      </div>
      {alert && alert}

      {playerFetched && (
        <section className="shadow p-5 bg-white bg-opacity-50 rounded-md w-3/5 flex justify-center items-center flex-col">
          <section className="m-5">
            {playerFetched && (
              <>
                <p className="font-bold text-xl">{playerFetched.name}</p>
                <p className="italic">{playerFetched.value}</p>
              </>
            )}
          </section>
          <button
            className=" inline-block my-2 text-green-700 hover:text-green-900 h-7 bg-green-100 hover:bg-green-200 hover:shadow-lg text-center rounded-xl shadow px-3 font-bold "
            onClick={async () => {
              console.log(playerFetched);
              playerFetched &&
                playerFetched !== 404 &&
                ((await validAddPlayers)
                  ? AddPlayer.mutate(playerFetched)
                  : provideAlert("Ce joueur est déja dans ton effectif !"));
              validAddPlayers &&
                provideAlert(
                  ` Félicitation ! ${playerFetched.name} viens de rejoindre ton équipe ! `
                );

              // on vide l'input, la variable JOUEUR et on permet de nouveau l'ajout
              setPlayerFetched();
              setSearch("");
              setValidAddPlayers(true);
            }}
          >
            Recruter {playerFetched.name}
          </button>
        </section>
      )}
    </section>
  );
};

export default SearchBar;
