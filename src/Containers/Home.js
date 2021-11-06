// Packages
import { useQuery } from "react-query";

//  import des requetes
import { fetchLeagues } from "../Requests/requests";

// import des Components des différentes leagues. La requete est faites dans HOME
// puis les datas-props sont passées dans la map des données
// import LeagueCards from "../Components/LeagueCards";

import PremierLeagueCard from "../Components/LeagueCards/PremierLeagueCard";
import LigaCard from "../Components/LeagueCards/LigaCard";
import Ligue1Card from "../Components/LeagueCards/Ligue1Card";
import BundesligaCard from "../Components/LeagueCards/BundesligaCard";
import PrimeiraDivisionCard from "../Components/LeagueCards/PrimeiraDivisionCard";
import SerieACard from "../Components/LeagueCards/SerieACard";
import SearchBar from "../Components/SearchBar";
import { useState } from "react";

const Home = () => {
  // requetes des leagues dans le json stocké en local
  // utilisation de useQuery pour la gestion des requetes et l'affichage conditionnel
  const leagues = useQuery("leagues", fetchLeagues);
  const { isLoading, isError, isSuccess, data } = leagues;

  const [displayLeagues, setDisplayLeagues] = useState(false);
  const switchDisplayLeagues = () => {
    setDisplayLeagues(!displayLeagues);
  };

  return (
    <div className="flex-1 flex items-center flex-col py-5 rounded-2xl my-5 ml-2 ">
      <section className=" font-Dosis p-10 py-20 flex flex-col items-center w-full bg-black bg-opacity-50 rounded-xl ">
        <h1 className="font-bold text-2xl mt-10 mb-20">
          Bienvenue dans l'univers de
          <span className="text-green-100"> TEAMIFY</span>
        </h1>
        <p className="text-white text-center">
          Construis ton équipe sans plus attendre !
        </p>

        <SearchBar />
      </section>

      {
        <section className="mt-52 w-full border-blue-200 border-4 border-solid rounded-3xl">
          {displayLeagues ? (
            <button
              className={"bg-white border-black border-2 border-solid rounded-full p-2 mx-96 "}
              onClick={() => {
                switchDisplayLeagues();
              }}
            >
              Cacher les leagues
            </button>
          ) : (
            <button
              className="bg-black text-white rounded-full p-2 mx-96 "
              onClick={() => {
                switchDisplayLeagues();
              }}
            >
              Afficher les leagues
            </button>
          )}
          {displayLeagues && (
            <div className=" bg-cover bg-no-repeat w-full rounded-xl flex flex-col items-center shadow-xl py-12 border-black border-2 border-solid ">
              {isLoading
                ? "Chargement en cours"
                : isError
                ? "Données introuvables"
                : isSuccess &&
                  data.map((league) => {
                    const id = league.league.id;
                    return id === 39 ? (
                        <PremierLeagueCard key={id} datas={league} />
                    ) : id === 140 ? (
                      <LigaCard key={id} datas={league} />
                    ) : id === 61 ? (
                      <Ligue1Card key={id} datas={league} />
                    ) : id === 78 ? (
                      <BundesligaCard key={id} datas={league} />
                    ) : id === 94 ? (
                      <PrimeiraDivisionCard key={id} datas={league} />
                    ) : (
                      id === 135 && <SerieACard key={id} datas={league} />
                    );
                  })}
            </div>
          )}
        </section>
      }
    </div>
  );
};

export default Home;
