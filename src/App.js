import React, { Component } from 'react';
import './App.css';
import Screen from "./components/Screen"

// Variables to create board
const width = 16
const height = 12
const boardSize = width * height
const tiles = []
for (let i = 0; i < (boardSize); i++) {
  if (i === (width/2 - 1) || i === (width/2) || i === (boardSize - width/2 - 1) || i === (boardSize - width/2)) {
    tiles.push("door")
  } else if (i < width || i % width === 0 || i % width === width - 1 || i >= (boardSize - width)) {
    tiles.push("wall")
  } else if (i === 71) {
    tiles.push("npc")
  } else {
    tiles.push("ground")
  }
}

class App extends Component {
  state = {
    player: {
      inventory: [],
      direction: "up",
      location: 167,
      mainAction: "interact",
      secAction: "inspect"
    }
  }
  placePlayer = () => {
    let here = document.getElementById(this.state.player.location).innerHTML
    document.getElementById(this.state.player.location).innerHTML = "🧍🏽"
    console.log("Player is now at tile " + here + ".")
    console.log("Player is facing " + this.state.player.direction)
  }
  move = (direction) => {
    console.log("Player moved " + direction)
    const currentLocation = this.state.player.location
    document.getElementById(currentLocation).innerHTML = ""
    let newLocation = 0
    if (direction === "up") {
      newLocation = currentLocation - width
    }
    this.setState({
      player: {
        inventory: [],
        direction: direction,
        location: newLocation,
        mainAction: "interact",
        secAction: "inspect"
      }
    })
    this.placePlayer()
  }
  handleKeyPress = (event) => {
    let key = event.keyCode
    if (key === 87) {
      this.move("up")
    } else if (key === 74){
      console.log("Player interacted!")
    }
  }
  componentDidMount() {
    this.placePlayer()
    window.addEventListener("keydown", this.handleKeyPress)
    return () => {
      window.removeEventListener("keydown", this.handleKeyPress)
    }
  }
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
