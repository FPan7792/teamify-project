import React, { useState } from "react";
import { useQueryClient } from "react-query";
import axios from "axios";

// composants
import TeamsCards from "../TeamsCards";

// render
const LeagueCards = ({ datas }) => {
  // afficher les equipes au clic
  // afficher les equipes au clic

  const [hidden, setHidden] = useState(true);

  //  switch la classname du composant pour afficher ou non les equipes
  function change() {
    setHidden(!hidden);
  }

  // id de la ligue passée en props
  const id = datas.league.id;

  // requeter les équipes en fonction l'id passé en props
  const fetchTeamsFromLeagues = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/leagues/${id}`);

      return response.data;
    } catch (error) {
      const response = error;
      return response;
    }
  };

  // stocker l'ensemble des equipes fetchées par la fonction précédente
  const [allTeams, setAllTeams] = useState();

  // méthode de prefetching
  const queryClient = useQueryClient();

  // juste après le prefetch, stocker l'ensemble des joueurs d'une equipe au clic sur le composant
  const [teamPlayers, setTeamPlayers] = useState();

  return (
    <section
      className="border-green border-solid border-2 bg-primeira-logo m-20 "
      // prefetcher l'ensemble des équipes de la ligue au survol du composant
      onMouseEnter={async () => {
        await queryClient.prefetchQuery(
          "PortugalTeams",
          fetchTeamsFromLeagues,
          {
            staleTime: 3000000,
          }
        );
        await setAllTeams(queryClient.getQueryData("PortugalTeams"));
      }}
    >
      {/* LIGUE 1 */}
      <p>{datas.league.name}</p>
      <button
        onClick={() => {
          change();
        }}
      >
        Afficher les equipes
      </button>

      {!hidden && (
        <section>
          {/* Le tableau des equipes de la ligue : */}
          {allTeams &&
            allTeams.response.map((team) => {
              const fetchPlayers = async () => {
                try {
                  console.log("...fetching start");
                  const response = await axios.get(
                    `http://127.0.0.1:3001/players/team/${team.team.id}`
                  );
                  console.log("datas fetched !");
                  console.log(response.data);
                  return response.data[0];
                } catch (error) {
                  console.log(error);
                  return error;
                }
              };
              return (
                // renvoi un composant EQUIPE
                <section
                  onClick={async () => {
                    await queryClient.prefetchQuery(
                      "TeamPlayers",
                      fetchPlayers,
                      {
                        staleTime: 900000,
                      }
                    );
                    await setTeamPlayers(
                      queryClient.getQueryData("TeamPlayers")
                    );
                    console.log(teamPlayers);
                  }}
                >
                  <TeamsCards
                    datas={team}
                    players={teamPlayers}
                    id={team.team.id}
                  />
                </section>
              );
            })}
        </section>
      )}
    </section>
  );
};

export default LeagueCards;
