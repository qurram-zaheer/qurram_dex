import React, { Component } from 'react';
import PokemonList from '../pokemon/PokemonList';

export default class Dashboard extends Component {
    render() {
        return (
            <div className = 'bgmain row'>
                <div className = 'col mt-4 ml-0 mr-0'>
                    <PokemonList/>
                </div>
            </div>
        )
    }
}

