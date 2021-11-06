import React, { useState } from "react";
import { useQueryClient } from "react-query";
import axios from "axios";

// import des icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// composants
import TeamsCards from "../TeamsCards";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

// render LIGUE1CARD
const LeagueCards = ({ datas }) => {
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
    <>
      <section
        className=" bg-liga-logo bg-cover bg-no-repeat bg-center h-32 w-2/5 opacity-80 transition-all duration-1000 ease-in-out hover:opacity-100 cursor-pointer rounded-br-2xl rounded-tl-2xl transform -translate-x-40 m-5 hover:-translate-x-32 hover:scale-105 hover:border-green-700 border-2 border-solid "

        // prefetcher l'ensemble des équipes de la ligue au survol du composant
        onMouseEnter={async () => {
          await queryClient.prefetchQuery(
            "Ligue1Teams",
            fetchTeamsFromLeagues,
            {
              staleTime: 3000000,
            }
          );
          await setAllTeams(queryClient.getQueryData("Ligue1Teams"));
        }}
      >
        {/* LIGUE 1 */}

        <button
          className=" rounded-full h-7 w-7 border-green-800 bg-green-400 border-2 "
          onClick={() => {
            change();
          }}
        >
          <FontAwesomeIcon icon={faAngleDown} />
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
                // console.log(team);
                return (
                  // renvoi un composant EQUIPE qui est de base le logo

                  <section
                    className="flex flex-col"
                    key={team.team.id}
                    onClick={async () => {
                      await queryClient.prefetchQuery(
                        "TeamPlayers",
                        fetchPlayers
                      );
                      await setTeamPlayers(
                        queryClient.getQueryData("TeamPlayers")
                      );
                      // console.log(teamPlayers);
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
    </>
  );
};

export default LeagueCards;
