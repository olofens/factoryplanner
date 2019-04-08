import React, { Component } from 'react';
import Constructor from "./Constructor.jsx";
import Smelter from "./Smelter.jsx";
import MinerMK1 from "./MinerMK1.jsx";

export default class Selection extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Constructor position={"relative"}/>
          </li>
          <li>
          <Smelter position={"relative"}/>
          </li>
          <li>
          <MinerMK1 position={"relative"}/>
          </li>
        </ul>
      </div>
    )
  }
}
