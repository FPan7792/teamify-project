import { useState, useEffect } from 'react';
// navigation du site

// GESTION DES COOKIES
import Cookies from 'js-cookie';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import des icones FONT AWESOME
// ================================>
import { library } from '@fortawesome/fontawesome-svg-core';
import {
   faAngleDown,
   faSearch,
   faAngleDoubleDown,
} from '@fortawesome/free-solid-svg-icons';

// ================================>
// GESTION DE LA FENETRE D'ALERTE
// ================================>
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { resetAlerte, displayAlerte } from './Requests/alerts';
// ================================>

import Header from './Containers/Header';
import Main from './Containers/Main';
import LogIn from './Containers/LogIn';
import SignUp from './Containers/SignUp';
import Welcome from './Components/Welcome';

library.add(faAngleDown, faSearch, faAngleDoubleDown);

function App() {
   // Modale à la premiere connexion (INFOS MAJ & WELCOME)
   const [welcome, setWelcome] = useState({ vital: false, display: false });

   // GESTION DE LA FENETRE D'ALERTE
   // fecth alert
   const alerte = useQuery('Alerte', displayAlerte);
   // stocker alerte
   const { data } = alerte;
   // mettre a jour alerte
   const queryClient = useQueryClient();
   const alerteReset = useMutation('Alerte', resetAlerte, {
      onSuccess: () => {
         queryClient.invalidateQueries('Alerte');
      },
   });
   // faire disparaitre la fenetre d'alerte apres delai
   useEffect(() => {
      if (data?.display) {
         setTimeout(() => alerteReset.mutate(), 4000);
      }
   });

   // GESTION DE LA MODALE D'INFORMATION
   // ========================================>
   useEffect(() => {
      if (!Cookies.get('teamify')) {
         setWelcome({ vital: true, display: false });
         const date = new Date();
         Cookies.set('teamify', date);

         setWelcome({ vital: true, display: true });
      }
   }, []);
   // ========================================>

   return (
      <Router>
         <div className='relative m-auto xl:h-screen bg-gradient-to-r from-[#f1cb7b]/70 to-[#8ed550]/70 md:m-5 rounded-xl p-5 md:p-2 border-4 border-amber-200 '>
            <Header />
            <Switch>
               <Route path='/login'>
                  <LogIn />
               </Route>
               <Route path='/signup'>
                  <SignUp />
               </Route>
               <Route path='/'>
                  <Main />
               </Route>
            </Switch>

            <p
               className={
                  data?.display
                     ? data.success
                        ? ' transition-all duration-1000 absolute top-28 right-5 border-2 border-solid border-black bg-green-200 bg-opacity-100 rounded p-6 ease-in-out font-Dosis z-0'
                        : ' transition-all duration-1000 absolute top-28 right-5 border-2 border-solid border-black bg-yellow-200 bg-opacity-100 rounded p-6 ease-in-out font-Dosis z-0 '
                     : ' transition-all duration-1000 absolute top-20 right-5 border-2 border-solid border-black bg-green-200 bg-opacity-50 rounded p-6 opacity-0 ease-in-out font-Dosis z-0 '
               }
            >
               {data?.message}
            </p>
         </div>
         <Welcome welcome={welcome} setWelcome={setWelcome} />
      </Router>
   );
}

export default App;
