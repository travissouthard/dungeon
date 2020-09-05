import React, { Component } from 'react';
import './App.css';
import Screen from "./components/Screen"

// Variables to create board
const width = 20
const height = 15
const tiles = []
for (let i = 0; i < (width * height); i++) {
  if (i === 9 || i === 10 || i === 289 || i === 290) {
    tiles.push("door")
  } else if (i < 21 || i % 20 === 0 || i % 20 === width - 1 || i >= 281) {
    tiles.push("wall")
  } else if (i === 129) {
    tiles.push("npc")
  } else {
    tiles.push("ground")
  }
}

class App extends Component {
  render() {
    return (
      <>
        <h1>Dungeon Game</h1>
        <Screen tiles={tiles}/>
        <div id="key">
          <div className="tile wall">wall</div>
          <div className="tile treasure">tr</div>
          <div className="tile ground">gr</div>
          <div className="tile npc">npc</div>
          <div className="tile door">door</div>
        </div>
      </>
    )
  }
}

export default App;
