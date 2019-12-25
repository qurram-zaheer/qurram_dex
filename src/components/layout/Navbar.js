import React, { Component } from 'react';




export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className = "navbar navbar-expand-md fixed-top" >
                    <a href = "" style = {{color: 'white'}} className= 'navbar-brand col-sm-3 col-md-2 mr-0 align-items-center' >Pokedex</a>
                </nav>
            </div>
        )
    }
}

