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

const Home = () => {
  // requetes des leagues dans le json stocké en local
  // utilisation de useQuery pour la gestion des requetes et l'affichage conditionnel
  const leagues = useQuery("leagues", fetchLeagues);
  const { isLoading, isError, isSuccess, data } = leagues;

  return (
    <div className="flex-1 flex items-center flex-col p-5 bg-green-50 rounded-2xl my-5 ml-2 h-full">
      <section className=" p-10 flex flex-col items-center">
        <h1 className="font-bold">Bienvenue sur TEAMIFY</h1>
      </section>
      <SearchBar />

      <div className=" border-green-500 bg-white rounded-xl border-4 border-solid w-full ">
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
    </div>
  );
};

export default Home;
