import React, { Component } from 'react';
import PokemonList from '../pokemon/PokemonList';

export default class Dashboard extends Component {
    render() {
        return (
            <div className = 'row'>
                <div className = 'col ml-0 mr-0'>
                    <PokemonList/>
                </div>
            </div>
        )
    }
}

