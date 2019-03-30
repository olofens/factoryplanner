import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';
import Example from "./dndexample.jsx";
import Constructor from "./Constructor.jsx"

class App extends Component {
  render() {
    return (
      <div className="App">
        <DragDropContextProvider backend={HTML5Backend}>
					<Example />
          <Constructor />
				</DragDropContextProvider>
      </div>
    );
  }
}

export default App;
