import "./App.css";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Containers/Header";
import Main from "./Containers/Main";

// import des icones
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleDown);

function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
