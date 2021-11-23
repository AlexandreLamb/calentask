import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MainForm from './compenents/MainForm.js';
import Configuration from './compenents/Configuration';

function App() {
  return (
    <Router>
      <Route exact path="/">
        <MainForm videoFolder="/DESFAM_F_H98_VENDREDI"/>
      </Route>
      <Route path="/configuration">
        <Configuration videoFolder="/DESFAM_F_H98_VENDREDI"/>
      </Route>
    </Router>
      
  );
}

export default App;
