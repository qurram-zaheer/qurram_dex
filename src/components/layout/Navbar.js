import React, { Component } from 'react';




export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className = "navbar fixed-top nav-shadow" >
                    <b><a className= ' mx-2 navbar-brand col-sm-3 col-md-2 align-items-center' >Qurram's pokedex</a></b>
                </nav>
            </div>
        )
    }
}

