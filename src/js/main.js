import "../css/style.css";
//import app from "./components/app";
import AppContainer from "./components/AppContainer";

const appContainer = new AppContainer();

document.getElementById("app").append(appContainer.app());
