// navigation du site
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "./Containers/Header";
import Main from "./Containers/Main";
import LogIn from "./Containers/LogIn";
import SignUp from "./Containers/SignUp";
import Welcome from "./Components/Welcome";

// cookies de première connexion
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

// gestions de la fenetre d'alerte
import { useQuery, useMutation, useQueryClient } from "react-query";
import { resetAlerte } from "./Requests/requests";

// import des icones
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faSearch,
  faAngleDoubleDown,
} from "@fortawesome/free-solid-svg-icons";
import { displayAlerte } from "./Requests/requests";
library.add(faAngleDown, faSearch, faAngleDoubleDown);

function App() {
  // Message de bienvenue à la premiere connexion
  const [welcome, setWelcome] = useState({ vital: false, display: false });

  // GESTION DE LA FENETRE D'ALERTE
  const alerte = useQuery("Alerte", displayAlerte);
  const { data } = alerte;
  console.log(alerte);
  // const [message, setMessage] = useState();
  const queryClient = useQueryClient();
  const alerteReset = useMutation("Alerte", resetAlerte, {
    onSuccess: () => {
      queryClient.invalidateQueries("Alerte");
    },
  });

  useEffect(() => {
    if (!Cookies.get("teamify")) {
      setWelcome({ vital: true, display: false });
      const date = new Date();
      Cookies.set("teamify", date);

      setWelcome({ vital: true, display: true });
    }
  }, []);
  // ========================================>

  useEffect(() => {
    if (data?.display) {
      setTimeout(() => alerteReset.mutate(), 4000);
    }
  });

  return (
    <Router>
      <div className="relative h-full bg-main-bg bg-center bg-cover bg-no-repeat ">
        {/* <section className=" rounded absolute top-0 bg-main-bg bg-center bg-no-repeat h-screen w-full bg-cover"></section> */}
        <div className="h-full">
          <Header />
          <Switch>
            <Route path="/login">
              <LogIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              {/* <section className="rounded-xl absolute top-full  bg-opacity-50 bg-terrain bg-center bg-no-repeat h-screen w-11/12 bg-cover "></section> */}
              <Main />
            </Route>
          </Switch>
        </div>
        <Welcome welcome={welcome} setWelcome={setWelcome} />
        <p
          className={
            data?.display
              ? data.success
                ? " transition-all duration-1000 absolute top-28 right-5 border-2 border-solid border-black bg-green-200 bg-opacity-100 rounded p-6 ease-in-out font-Dosis z-0"
                : " transition-all duration-1000 absolute top-28 right-5 border-2 border-solid border-black bg-yellow-200 bg-opacity-100 rounded p-6 ease-in-out font-Dosis z-0 "
              : " transition-all duration-1000 absolute top-20 right-5 border-2 border-solid border-black bg-green-200 bg-opacity-50 rounded p-6 opacity-0 ease-in-out font-Dosis z-0 "
          }
        >
          {data?.message}
        </p>
      </div>
    </Router>
  );
}

export default App;
