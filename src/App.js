import "./App.css";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Containers/Header";
import Main from "./Containers/Main";

// import des icones
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faSearch,
  faAngleDoubleDown,
} from "@fortawesome/free-solid-svg-icons";
library.add(faAngleDown, faSearch, faAngleDoubleDown);

function App() {
  return (
    <div className="relative">
      <section className=" rounded absolute top-0 bg-main-bg bg-center bg-no-repeat h-screen w-full bg-cover font-Dosis"></section>
      <>
        <Header />
        <Main />
      </>
    </div>
  );
}

export default App;
