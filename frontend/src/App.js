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
  const VIDEO_FOLDER = "videos/DESFAM_F_Sequences/"
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
