import { fetchTransfertInfos, AddPlayerToMyTeam } from "../Requests/requests";
import { useMutation, useQueryClient } from "react-query";
import _ from "lodash";
import { useState } from "react";

// passer id en props pour recuperer au moment de la requete
const TeamsCards = ({ datas, players, id }) => {
  // requete pour afficher les joueurs en fonction des equipes

  const [playerInfos, setPlayerInfos] = useState();
  const [covered, setCovered] = useState(true);

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
    <section className=" rounded-full my-3 border-solid flex w-full items-center justify-center flex-wrap  ">
      <img src={datas.team.logo} alt={datas.team.name} width="100" />

      <section
        className=" w-full flex flex-wrap border-2 border-solid justify-center my-3 "
        onMouseLeave={() => {
          setCovered(true);
        }}
      >
        {players &&
          id === players.team.id &&
          players.players.map((player, index) => {
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
                      className=" m-5 p-5 bg-green-100 flex items-center justify-around h-20 w-64 text-xs rounded-xl shadow cursor-pointer hover:shadow-lg"
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
                          <>
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
                          </>
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
                        console.log(player.id);
                        players.players[index].id === player.id &&
                          setCovered(false);
                      }}
                      className=" border-black border-solid border-2 m-1 p-1 bg-green-100 flex items-center justify-around w-28 text-xs rounded-xl shadow cursor-pointer hover:shadow-lg"
                    >
                      <p>{player.name}</p>
                    </section>
                  </section>
                )}
              </>
            );
          })}
      </section>
    </section>
  );
};

export default TeamsCards;
