import "./App.css";
import React from "react";

import { BrowserRouter as Router, Redirect, Route, Link } from "react-router-dom";
import MainForm from "./compenents/MainForm.js";
import Configuration from "./compenents/Configuration";
const VIDEO_FOLDER = "videos/DESFAM_F_Sequences/";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    return (
      <Router>
        <Route exact path="/">
          <MainForm
            videoFolder={VIDEO_FOLDER}
          />
        </Route>
        <Route path="/configuration">
          <Configuration videoFolder={VIDEO_FOLDER} />
        </Route>
      </Router>
    );
  }
}

export default App;
