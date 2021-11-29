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
  const VIDEO_FOLDER = "DESFAM_F_Sequences/DESFAM_F_H98_VENDREDI_1S/DESFAM_F_H98_VENDREDI"
  return (
    <Router>
      <Route exact path="/">
        <MainForm videoFolder={VIDEO_FOLDER}/>
      </Route>
      <Route path="/configuration">
        <Configuration videoFolder={VIDEO_FOLDER}/>
      </Route>
    </Router>
      
  );
}

export default App;
