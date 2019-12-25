import React, { Component } from 'react'

export default class SearchBox extends Component {
    render() {
        return (
            <div className = ' row mr-4 '>

            <input className = 'form-control'  style = {{boxShadow: "0 0 3px #CC0000", margin: "10px"}}
            type = 'search' 
        placeholder = 'Find a Pokemon!' 
        onChange = {this.props.searchChange}>
        </input>
        </div>
        )
    }
}
