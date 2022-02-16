// import des Components des différentes leagues. La requete est faites dans HOME
// puis les datas-props sont passées dans la map des données

//  FUTURS COMPOSANTS LIGUES
// import PremierLeagueCard from "../Components/LeagueCards/PremierLeagueCard";
// import LigaCard from "../Components/LeagueCards/LigaCard";
// import BundesligaCard from "../Components/LeagueCards/BundesligaCard";
// import PrimeiraDivisionCard from "../Components/LeagueCards/PrimeiraDivisionCard";
// import SerieACard from "../Components/LeagueCards/SerieACard";

// states et icones
import { useState } from 'react';
// ----------------------------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faAngleDoubleDown,
   faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';

// --------------------------->

//  import des requetes

// composant test
import Ligue1Card from '../Components/LeagueCards/Ligue1Card';

import leaguesDatas from '../Datas/Leagues.json';
import { LeaguesSchemas } from '../Datas/interfaces';

// barre de recherche
import SearchBar from '../Components/SearchBar';

function Home() {
   return (
      <div className='font-Dosis flex justify-center items-center flex-col'>
         <SearchBar />
      </div>
   );
}

export default Home;

// SECTION WIP

// Implementer le composant leagues dans les props
// structure + CSS composant ligues (afficher equipes, joueurs)
