import React, { Component } from 'react'

export default class SearchBox extends Component {
    render() {
        return (
            <input type = 'search' 
        placeholder = 'search' 
        onChange = {this.props.searchChange}>
        </input>
        )
    }
}
