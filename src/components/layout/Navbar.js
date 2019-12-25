import React, { Component } from 'react';




export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className = "navbar fixed-top" >
                    <a href = "" className= 'navbar-brand col-sm-3 col-md-2 mr-0 align-items-center' style = {{fontSize: "12"}}>Qurram's pokedex</a>
                </nav>
            </div>
        )
    }
}

