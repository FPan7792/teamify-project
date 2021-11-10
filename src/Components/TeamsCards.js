import { fetchTransfertInfos, AddPlayerToMyTeam } from "../Requests/requests";
import { useMutation, useQueryClient } from "react-query";
import _ from "lodash";
import { useState } from "react";

// passer id en props pour recuperer au moment de la requete
const TeamsCards = ({ datas, players, id, setTeamPlayers }) => {
  // requete pour afficher les joueurs en fonction des equipes

  const [playerInfos, setPlayerInfos] = useState();
  const [covered, setCovered] = useState(true);
  const [displayPlayers, setDisplayPlayers] = useState(true);

  const parse = (data) => {
    let dataToParse = _.split(data, " ");
    // console.log(dataToParse);
    dataToParse = dataToParse[dataToParse.length - 1];
    return dataToParse;
  };

  const queryClient = useQueryClient();
  const AddPlayer = useMutation("MyTeam", AddPlayerToMyTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries("MyTeam");
    },
  });

  return (
    <section className=" my-3 flex w-full items-center justify-center flex-wrap border-solid border-green-500 border-2 ">
      <section className=" flex border-green-500 border-solid border-2 w-1/4 justify-between">
        <img
          className=" hover:scale-105 w-3/6 "
          src={datas.team.logo}
          alt={datas.team.name}
        />

        {players && players.team.id === id && (
          <button
            className=" inline-block border-solid border-black border-2"
            onClick={() => {
              setDisplayPlayers(!displayPlayers);
            }}
          >
            {displayPlayers ? "Cacher" : "Afficher"}
          </button>
        )}
      </section>

      {displayPlayers && players && players.team.id === id && (
        <section
          className=" w-full flex flex-wrap justify-center my-3 "
          onMouseLeave={() => {
            setCovered(true);
          }}
        >
          {players &&
            id === players.team.id &&
            players.players.map((player, index) => {
              // let color = player.position === "Defender" ? "bg-purple-500" : player.position === "Midfielder" ? "bg-yellow-500" : player.position === "Attacker" && "bg-green-500"
              return (
                <>
                  {!covered ? (
                    <section>
                      <section
                        onClick={() => {
                          const fetch = async () => {
                            const parsedName = parse(player.name);
                            const response = await fetchTransfertInfos(
                              parsedName
                            );
                            setPlayerInfos(response);
                          };
                          fetch();
                        }}
                        className="` m-5 p-5 bg-green-100 flex items-center justify-around h-20 w-64 text-xs rounded-xl shadow cursor-pointer hover:shadow-lg`"
                      >
                        <img
                          src={player.photo}
                          alt={player.name}
                          className="rounded-full w-16"
                        />
                        <section className="flex-col">
                          <p>Nom : {player.name}</p>
                          <p>Age : {player.age}</p>
                          <p>
                            Poste :{" "}
                            {player.position === "Defender"
                              ? "Défenseur"
                              : player.position === "Midfielder"
                              ? "Milieu"
                              : player.position === "Attacker"
                              ? "Attaquant"
                              : "Gardien"}
                          </p>
                        </section>
                      </section>
                      <section>
                        {playerInfos &&
                          parse(playerInfos.name) === parse(player.name) && (
                            <section className="shadow p-5 bg-white bg-opacity-50 rounded-md w-3/5 flex justify-center items-center flex-col">
                              <p>{playerInfos.name}</p>
                              <p>{playerInfos.value}</p>
                              <button
                                onClick={() => {
                                  console.log(playerInfos);
                                  playerInfos && AddPlayer.mutate(playerInfos);
                                }}
                                className=" shadow bg-green-400 rounded "
                              >
                                Recruter
                              </button>
                            </section>
                          )}
                      </section>
                    </section>
                  ) : (
                    <section className="flex h-full border-red-200 border-2 border-solid">
                      <section
                        onClick={() => {
                          const fetch = async () => {
                            const parsedName = parse(player.name);
                            const response = await fetchTransfertInfos(
                              parsedName
                            );
                            setPlayerInfos(response);
                          };
                          fetch();
                        }}
                        onMouseOver={() => {
                          console.log(players.players);
                          console.log(player);
                          players.players[index].id === player.id &&
                            setCovered(false);
                        }}
                        className=" border-black border-solid border-2 m-1 p-1 bg-green-100 flex items-center justify-around w-28 text-xs rounded-xl shadow cursor-pointer hover:shadow-lg"
                      >
                        <p className="font-bold">{player.name}</p>
                      </section>
                    </section>
                  )}
                </>
              );
            })}
        </section>
      )}
    </section>
  );
};

export default TeamsCards;
