import React, { Component } from 'react'

export default class Screen extends Component {
    render() {
        return (
            <main>
                {this.props.tiles.map((tile, i) => {
                    return <div class={tile}>{i}</div>
                })}
            </main>
        )
    }
}
