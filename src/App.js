import React, { Component } from 'react';
import './App.css';
import Screen from "./components/Screen"

// Variables to create board
const width = 10
const height = 10
const boardSize = width * height
const tiles = []
for (let i = 0; i < (boardSize); i++) {
  if (i === (width/2 - 1) || i === (width/2) || i === (boardSize - width/2 - 1) || i === (boardSize - width/2)) {
    tiles.push("door")
  } else if (i < width || i % width === 0 || i % width === width - 1 || i >= (boardSize - width)) {
    tiles.push("wall")
  } else if (i === 44) {
    tiles.push("npc")
  } else if (i === 55) {
    tiles.push("treasure")
  } else {
    tiles.push("ground")
  }
}

class App extends Component {
  state = {
    player: {
      inventory: [],
      direction: "up",
      location: 84,
    },
    npc: {
      location: 44,
      direction: "down",
      response: "Oh hello, traveler!",
    },
    treasure: [],
  }

  placePlayer = () => {
    let playerImage = "<img src='./images/player-" + this.state.player.direction + ".png' alt=''></img>"
    document.getElementById(this.state.player.location).innerHTML = playerImage
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
    const currentLocation = this.state.player.location
    document.getElementById(currentLocation).innerHTML = ""
    let newLocation = currentLocation
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
        direction: direction,
        location: newLocation,
      }
    })
    this.placePlayer()
  }

  interact = (direction) => {
    if (this.checkTile(direction)[1] === "npc") {
      console.log(this.state.npc.response)
    } else if (this.checkTile(direction)[1] === "treasure") {
      if (this.state.treasure.length === 0) {
        console.log("Nothing here.")
      } else {
        console.log("You picked up a " + this.state.treasure[0] + "!")
      }
    }
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
    } else if (key === 74){
      this.interact(this.state.player.direction)
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
          <h3>How to play:</h3>
          <p>WASD to move, J &amp; K to interact</p>
        </div>
      </>
    )
  }
}

export default App;
