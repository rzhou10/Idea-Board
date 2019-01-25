import React, { Component } from "react";
import IdeaBoard from "./components/IdeaBoard"
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <IdeaBoard />
        </header>
      </div>
    );
  }
}

export default App;