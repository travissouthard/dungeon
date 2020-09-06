import React, { Component } from 'react'

export default class Screen extends Component {
    render() {
        return (
            <main>
                {this.props.tiles.map((tile, i) => {
                    return <div className={"tile " + tile} key={i} id={i}>{i}</div>
                })}
            </main>
        )
    }
}
