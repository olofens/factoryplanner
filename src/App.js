import React, { Component } from 'react';
import './App.css';
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';
import Playground from "./Playground.jsx"
import Selection from "./Selection.jsx"

class App extends Component {
  render() {
    return (
      <div className="App">
        <DragDropContextProvider backend={HTML5Backend}>
          <table>
            <tbody>
              <tr>
                <td><Playground /></td>
                <td><Selection /></td>
              </tr>
            </tbody>
          </table>
        </DragDropContextProvider>
      </div>
    );
  }
}

export default App;
