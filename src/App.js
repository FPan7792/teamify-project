import "./App.css";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Containers/Header";
import Main from "./Containers/Main";

// import des icones
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleDown, faSearch);

function App() {
  return (
    <div
      className="bg-main-bg bg-center bg-no-repeat bg-cover h-screen font-Dosis"
    >
      <Header />
      <Main />
    </div>
  );
}

export default App;
