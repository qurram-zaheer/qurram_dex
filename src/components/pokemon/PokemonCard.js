import React, { Component } from 'react';
import styled from 'styled-components';
import spinner from '../pokemon/spinner.gif'

const Sprite = styled.img`
    width: 5em;
    height: 5em;
    display: none;
`
const Card = styled.div`
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover{
        box-shadow: 0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22)
    }
    -moz-user-select: none;
    -website-user-select: none;
    -user-select: none;
    -o-user-select: none;

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
                
                <Card className = 'card'>
                    <h5 className = 'card-header'>#{this.state.pokemonIndex}</h5>
                    {this.state.imageLoading ? (
                        <img src = {spinner}  
                        className = 'card-img-top mx-auto mt-5'
                        style = {{width: "5em",height:"5em"}}
                        ></img>
                    ):null}
                    {/* <img onLoad = {() => this.setState({imageLoading: false})} onError = {() => this.setState({error:true})} style = {this.state.error ? {display: "none"}:null,this.state.imageLoading ? null:{display: "block"},{width: "120px", height: "120px", backgroundPosition: "50% 50%", position:"relative",float:"left",backgroundSize:"cover",backgroundRepeat:"no-repeat"}} className = 'card-img-top mx-auto mt-2'  src = {this.state.img}></img> */}
                    <Sprite
                    className="card-img-top rounded mx-auto mt-2"
                    src={this.state.img}
                    onLoad={() => this.setState({ imageLoading: false })}
                    onError={() => this.setState({ error: true })}
                    style={
                    this.state.error
                        ? { display: 'none' }
                        : this.state.imageLoading
                        ? null
                        : { display: 'block' }
              }
            />
                    {
                    this.state.error ? (<h6 className = 'mx-auto'>
                        <span className = 'badge badge-danger mt-2'>Too many requests</span>
                    </h6>):null
                    } 
                    <div className = 'card-body mx-auto'>
                        <h6 className= 'card-title '>{this.state.name.toLowerCase().split(" ").map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(" ")}</h6>
                    </div>
                </Card>
            </div>
        )
    }
}


