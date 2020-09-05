import React, { Component } from 'react';
import './App.css';
import Screen from "./components/Screen"

// Variables to create board
const width = 20
const height = 15
const tiles = []
for (let i = 0; i < (width * height); i++) {
  tiles.push("tile")
}

class App extends Component {
  
  render() {
    return (
      <>
        <h1>Dungeon Game</h1>
        <Screen tiles={tiles}/>
      </>
    )
  }
}

export default App;
