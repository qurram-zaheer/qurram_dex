import React, { Component } from 'react';
import styled from 'styled-components';
import spinner from '../pokemon/spinner.gif'

const Card = styled.div`


`;

export default class PokemonCard extends Component {
    state= {
        name: '',
        img: '',
        pokemonIndex: '',
        imageLoading: true,
        error: false
    }

    componentDidMount(){
        const {name,url}  = this.props;
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`; 
        //const img = `https://projectpokemon.org/images/normal-sprite/${name}.gif`
        this.setState({
                        name,
                        img,
                        pokemonIndex
                    });   
    }

    render() {
        return (
            
            <div className = 'col-md-2 col-sm-6 mb-5'>
                
                <div className = 'card'>
                    <h5 className = 'card-header'>{this.state.pokemonIndex}</h5>
                    {this.state.imageLoading ? (
                        <img src = {spinner}  className = 'card-img-top mx-auto mt-5'></img>
                    ):null}
                    <img onLoad = {() => this.setState({imageLoading: false})} onError = {() => this.setState({error:true})} style = {this.state.error ? {display: "none"}:null,this.state.imageLoading ? null:{display: "block"},{width: "120px", height: "120px", backgroundPosition: "50% 50%", position:"relative",float:"left",backgroundSize:"cover",backgroundRepeat:"no-repeat"}} className = 'card-img-top mx-auto mt-2'  src = {this.state.img}></img>
                    {
                    this.state.error ? (<h6 className = 'mx-auto'>
                        <span className = 'badge badge-danger mt-2'>Too many requests</span>
                    </h6>):null
                    } 
                    <div className = 'card-body mx-auto'>
                        <h6 className= 'card-title '>{this.state.name.toLowerCase().split(" ").map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(" ")}</h6>
                    </div>
                </div>
            </div>
        )
    }
}


