import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import {
  fetchTransfertInfos,
  AddPlayerToMyTeam,
  displayMyTeam,
} from "../Requests/requests";

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
    <section className="m-10 w-4/5 rounded flex flex-col items-center justify-center">
      <input
        className=" h-12 border-solid border-black border-2 text-center rounded-3xl my-1 w-4/5"
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
      {alert && alert}
      <div>
        <button
          className=" text-white h-7 w-40 bg-blue-200 hover:bg-blue-400 hover:shadow-lg text-center mr-3 rounded-xl shadow"
          onClick={() => {
            fetch();
          }}
        >
          Rechercher
        </button>
        <button
          className=" text-green-500 hover:text-green-900 h-7 w-40 rounded bg-green-100 hover:bg-green-200 hover:shadow-lg text-center rounded-xl shadow "
          onClick={() => {
            console.log(playerFetched);
            playerFetched &&
              playerFetched !== 404 &&
              (validAddPlayers
                ? AddPlayer.mutate(playerFetched)
                : provideAlert("Vous avez déja recruté ce joueur !"));

            // on vide l'input, la variable JOUEUR et on permet de nouveau l'ajout
            setPlayerFetched();
            setSearch("");
            setValidAddPlayers(true);
          }}
        >
          Recruter
        </button>
      </div>

      <section className="m-5">
        {playerFetched && (
          <>
            <p className="font-bold">{playerFetched.name}</p>
            <p className="italic">{playerFetched.value}</p>
          </>
        )}
      </section>
    </section>
  );
};

export default SearchBar;
