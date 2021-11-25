// Packages
import { useQuery } from "react-query";

//  import des requetes
import { fetchLeagues } from "../Requests/requests";

// import des Components des différentes leagues. La requete est faites dans HOME
// puis les datas-props sont passées dans la map des données

// composant test
import Ligue1Card from "../Components/LeagueCards/Ligue1Card";

//  FUTURS COMPOSANTS LIGUES
// import PremierLeagueCard from "../Components/LeagueCards/PremierLeagueCard";
// import LigaCard from "../Components/LeagueCards/LigaCard";
// import BundesligaCard from "../Components/LeagueCards/BundesligaCard";
// import PrimeiraDivisionCard from "../Components/LeagueCards/PrimeiraDivisionCard";
// import SerieACard from "../Components/LeagueCards/SerieACard";

// barre de recherche
import SearchBar from "../Components/SearchBar";

// --------------------------->

// states et icones
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
// ----------------------------->

const Home = () => {
  // requetes des leagues dans le json stocké en local
  // utilisation de useQuery pour la gestion des requetes et l'affichage conditionnel
  const leagues = useQuery("leagues", fetchLeagues);
  const { isLoading, isError, isSuccess, data } = leagues;

  // afficgage des composants leagues
  const [displayLeagues, setDisplayLeagues] = useState(false);
  const switchDisplayLeagues = () => {
    setDisplayLeagues(!displayLeagues);
  };

  // gestion des affichages des championnats par states
  const [revealOneLigueOnHover, setRevealLigueOnHover] = useState([
    {
      name: "ligue1",
      display: { identity: false, content: false },
      content: null,
    },
    {
      name: "premleague",
      display: { identity: false, content: false },
      content: null,
    },
    {
      name: "bundesliga",
      display: { identity: false, content: false },
      content: null,
    },
    {
      name: "seriea",
      display: { identity: false, content: false },
      content: null,
    },
    {
      name: "portoliga",
      display: { identity: false, content: false },
      content: null,
    },
    {
      name: "liga",
      display: { identity: false, content: false },
      content: null,
    },
  ]);
  // set a true au survol des composants
  // si c'est true, on change les props du composant pour afficher la transition

  return (
    <div className="flex-1 flex items-center flex-col rounded-2xl my-5 relative xl:p-7 h-full ">
      <section className=" font-Dosis p-10 flex flex-col items-center w-11/12 xl:w-full h-54 bg-gray-700 bg-opacity-60 rounded-xl ">
        <h1 className="font-bold text-2xl">
          <span className="text-green-100"> Bienvenue</span>
        </h1>
        <p className="text-white text-center">
          Construis ton équipe sans plus attendre !
        </p>

        <SearchBar />
      </section>

      {
        <section className=" w-full rounded-3xl flex justify-center ">
          <button
            className={
              !displayLeagues
                ? "bg-black rounded-full p-2 mt-16 mt w-9 h-9 flex justify-center items-center hover:bg-gray-50 transition-all duration-150 ease-in-out animate-bounce "
                : "bg-black rounded-full p-2 mt-16 w-9 h-9 flex justify-center items-center transform hover:scale-125 transtion-all ease-in-out duration-150"
            }
            onClick={() => {
              switchDisplayLeagues();
            }}
          >
            {displayLeagues ? (
              <FontAwesomeIcon icon={faAngleDoubleUp} color={"white"} />
            ) : (
              <FontAwesomeIcon
                className="animate-bounce "
                icon={faAngleDoubleDown}
                color="lightgreen"
              />
            )}
          </button>

          {displayLeagues && (
            <div className=" bg-cover bg-no-repeat w-full rounded-xl flex flex-col items-center shadow-xl py-5 absolute top-full ">
              {isLoading
                ? "Chargement en cours"
                : isError
                ? "Données introuvables"
                : isSuccess &&
                  data.map((league) => {
                    const id = league.league.id;

                    return (
                      id === 61 && (
                        <div key={id} className=" w-full h-full flex flex-col ">
                          <section className="flex">
                            <div className=" flex-1">
                              <Ligue1Card
                                datas={league}
                                setReveal={setRevealLigueOnHover}
                                reveal={revealOneLigueOnHover}
                              />
                            </div>
                            <div
                              className={
                                revealOneLigueOnHover[0].display.identity
                                  ? " flex-initial w-2/5 transition all duration-1000 text-black opacity-100 ease-out delay-500 flex flex-col justify-center items-center text-xs "
                                  : " flex-initial w-2/5 transition all duration-1000 text-black opacity-0 ease-in flex flex-col justify-center items-center text-xs "
                              }
                            >
                              <img
                                className="rounded-full w20 h-20"
                                src={league.league.logo}
                                alt={league.league.name}
                              />
                              <p>Nom: {league.league.name}</p>
                              <p>Pays: {league.country.name}</p>
                              <p>Début officiel: {league.seasons[0].start}</p>
                              <p>Fin officielle: {league.seasons[0].end}</p>
                            </div>
                          </section>

                          <section
                            className={
                              !revealOneLigueOnHover[0].display.content
                                ? " w-full justify-center items-center flex-col py-10  h-0 transition-opacity duration-1000 ease-in opacity-0 text-xs "
                                : " w-full justify-center items-center flex-col py-10 transition-opacity ease-out delay-200 duration-500 opacity-100 h-full text-xs "
                            }
                          >
                            {/* <p>
                              Iic faire passer les inforamtion nécéssaires au
                              moment du clic pour présenter léquipe et les
                              joueurs
                            </p>
                            <p>Deuxieme element </p> */}
                            <section className="flex flex-shrink overflow-x-scroll ">
                              {revealOneLigueOnHover[0].content &&
                                revealOneLigueOnHover[0].content.map(
                                  (equipe) => {
                                    console.log(equipe);
                                    return (
                                      <div
                                        key={equipe.team.id}
                                        className="border-blue-200 border-2 border-solid  p-10 flex h-full flex-shrink-0 flex-col justify-center items-center"
                                      >
                                        {equipe.team.name}
                                        <img
                                          src={equipe.team.logo}
                                          alt={equipe.team.name}
                                          width="50"
                                        />
                                      </div>
                                    );
                                  }
                                )}
                            </section>
                          </section>
                          <div className=" my-2 p-5 bg-blue-100 w-4/5 h-full"></div>
                        </div>
                      )
                    );

                    // id === 39 ? (
                    //     <PremierLeagueCard key={id} datas={league} />
                    // ) : id === 140 ? (
                    //   <LigaCard key={id} datas={league} />
                    // ) :
                    // ) : id === 78 ? (
                    //   <BundesligaCard key={id} datas={league} />
                    // ) : id === 94 ? (
                    //   <PrimeiraDivisionCard key={id} datas={league} />
                    // ) : (
                    //   id === 135 && <SerieACard key={id} datas={league} />
                    // );
                  })}
            </div>
          )}
        </section>
      }
    </div>
  );
};

export default Home;

// SECTION WIP

// Implementer le composant leagues dans les props
// structure + CSS composant ligues (afficher equipes, joueurs)
