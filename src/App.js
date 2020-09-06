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
    document.getElementById(this.state.player.location).innerHTML = "🧍🏽"
  }

  checkTile = (direction) => {
    let tileIndex
    if (direction === "up") {
      tileIndex = this.state.player.location - width
    } else if (direction === "left") {
      tileIndex = this.state.player.location - 1
    } else if (direction === "down") {
      tileIndex = this.state.player.location + width
    } else if (direction === "right") {
      tileIndex = this.state.player.location + 1
    }
    return document.getElementById(tileIndex).classList
  }

  move = (direction) => {
    console.log("Player moved " + direction)
    const currentLocation = this.state.player.location
    document.getElementById(currentLocation).innerHTML = ""
    let newLocation = currentLocation
    let ground = (element) => {
      return element === "ground"
    }
    if (direction === "up" && this.checkTile(direction)[1] === "ground") {
      newLocation = currentLocation - width
    } else if (direction === "left" && this.checkTile(direction)[1] === "ground") {
      newLocation = currentLocation - 1
    } else if (direction === "down" && this.checkTile(direction)[1] === "ground") {
      newLocation = currentLocation + width
    } else if (direction === "right" && this.checkTile(direction)[1] === "ground") {
      newLocation = currentLocation + 1
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
    } else if (key === 65){
      this.move("left")
    } else if (key === 83){
      this.move("down")
    } else if (key === 68){
      this.move("right")
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
