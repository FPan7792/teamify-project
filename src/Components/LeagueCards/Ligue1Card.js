import React, { useState } from "react";
import { useQueryClient } from "react-query";
import axios from "axios";

// import des icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// composants
import TeamsCards from "../TeamsCards";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

// render LIGUE1CARD
const LeagueCards = ({ datas, reveal, setReveal }) => {
  // afficher les equipes au clic

  // gestions de l'affichage des infos de la league au survol
  // creer une fonction qui change la cle display a true selon le chanpionnat et qui remet l'autre a zero
  const toggleRevealIdentity = (value) => {
    let newReveal = [...reveal];

    newReveal[0].display.identity = value;
    setReveal(newReveal);
  };

  // changer l'etat pour reveler le contenu equipe etc..
  const toggleRevealContent = (value) => {
    let newReveal = [...reveal];

    newReveal.forEach((elem) =>
      elem.name !== "ligue1"
        ? (elem.display.content = false)
        : (elem.display.content = true)
    );

    newReveal[0].display.content = value;
    setReveal(newReveal);
  };

  // envoyer les informations de la ligue dans le state
  const getTeamsFromLeagues = (value) => {
    let newReveal = [...reveal];

    newReveal[0].content = value.response;
    console.log(newReveal);
    setReveal(newReveal);
  };

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
        className=" animate-pulse-slower hover:animate-none relative bg-ligue1-logo bg-cover bg-no-repeat bg-center h-32 w-4/5 opacity-80 transition-all duration-1000 ease-in-out hover:opacity-100 cursor-pointer rounded-br-2xl rounded-tl-2xl transform m-5 hover:translate-x-20 hover:scale-105 hover:border-green-700 border-2 border-solid flex justify-between "
        // prefetcher l'ensemble des équipes de la ligue au survol du composant
        onMouseEnter={async () => {
          await queryClient.prefetchQuery(
            "Ligue1Teams",
            fetchTeamsFromLeagues,
            {
              staleTime: 3000000,
            }
          );
          await getTeamsFromLeagues(queryClient.getQueryData("Ligue1Teams"));
          toggleRevealIdentity(true);
        }}
        onMouseLeave={async () => {
          toggleRevealIdentity(false);
        }}
      >
        {reveal[0].content && (
          <button
            className=" transition-all duration-500 rounded-full h-7 w-7 border-green-800 bg-white border-2 absolute right-2 bottom-2 "
            onClick={() => {
              reveal[0].display.content
                ? toggleRevealContent(false)
                : toggleRevealContent(true);
            }}
          >
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
        )}
      </section>
      {/* LIGUE 1 */}
      <section className=" hidden border-solid border-blue-400 border-2 flex-nowrap w-full mx-10 h-32 ">
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
              // renvoi un composant EQUIPE qui est de base (logo)

              <section
                className=" cursor-pointer border-red-400 border-solid border-2 "
                key={team.team.id}
                onClick={async () => {
                  await queryClient.prefetchQuery("TeamPlayers", fetchPlayers);
                  await setTeamPlayers(queryClient.getQueryData("TeamPlayers"));
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
    </>
  );
};

export default LeagueCards;
