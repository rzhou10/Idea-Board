import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import IdeaBoard from "./components/IdeaBoard";
import EditIdea from "./components/EditIdea";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={IdeaBoard} />
          <Route exact={true} path="/edit" component={EditIdea} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;