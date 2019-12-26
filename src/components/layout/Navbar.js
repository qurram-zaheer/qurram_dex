import React, { Component } from 'react';




export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className = "navbar fixed-top nav-shadow" >
                    <b><a className= ' mx-2 navbar-brand col-sm-3 col-md-2 align-items-center' >Qurram's pokedex</a></b>
                    <a href = 'https://github.com/qurram-zaheer/qurram_dex' target = "_blank">
                    <span className="navbar-text def-font">
                    
                        <span className="badge badge-pill badge-secondary git">
                            <img src="https://img.icons8.com/material-outlined/24/000000/github.png"></img>
                        </span>
                        </span></a>
                </nav>
            </div>
        )
    }
}

