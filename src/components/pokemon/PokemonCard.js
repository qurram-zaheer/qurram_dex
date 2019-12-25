import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import spinner from '../pokemon/spinner.gif'

const Sprite = styled.img`
    width: 30px;
    height: 30px;
    display: none;
`
const Card = styled.div`
    box-shadow: 0 8px 3px rgba(255,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover{
        box-shadow: 0 14px 28px rgba(255,0,0,0.25),0 10px 10px rgba(0,0,0,0.22)
    }
    -moz-user-select: none;
    -website-user-select: none;
    -user-select: none;
    -o-user-select: none;

`;

// const StyledLink = styled(Link)`
//     text-decoration: none;
//     color: black;
//     &:focus,
//     &:hover,
//     &:visited,
//     &.link,
//     &:active{
//         text-decoration:none;
//     }

// `

export default class PokemonCard extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
  }
    
    state= {
        name: '',
        img: '',
        pokemonIndex: '',
        imageLoading: true,
        error: false,
    }

    handleChange(index){
        this.props.onChange(this.state.pokemonIndex)
        
    }

    componentDidMount(){
        const url = this.props.url;
        let name1 = '';
            if(this.props.name === 'mimikyu-disguised'){
                console.log('kyu')
                name1 = 'mimikyu'
            }
            else if(this.props.name === 'minior-red-meteor'){
                console.log('mini')
                name1 = 'minior-meteor'
            }
            else {
                name1 = this.props.name
            }
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        //icon sprites, set Sprite to 40x30
        const img = `https://img.pokemondb.net/sprites/sun-moon/icon/${name1}.png`
        //animated bw sprite 
        //const img = `https://img.pokemondb.net/sprites/black-white/anim/normal/${name}.gif`
        //static 
        //const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`; 
        // gen7 animated 
        //const img = `https://projectpokemon.org/images/normal-sprite/${name}.gif`
        this.setState({
                        name: name1,
                        img,
                        pokemonIndex
                    });   
    }

    render() {
        return (
                            <div onClick = {this.handleChange}>
                                
                            {/* <StyledLink to = {`pokemon/${this.state.pokemonIndex}`}> */}
                                <Card  className = 'card mb-2 ml-3 mt-1' style = {{width: "50px"}}>
                                    {/* <h5 className = 'card-header'>#{this.state.pokemonIndex}</h5> */}
                                    {this.state.imageLoading ? (
                                        <img src = {spinner}  
                                        className = 'card-img-top mx-auto'
                                        style = {{width: "30px",height:"30px"}}
                                        alt = 'loading'
                                        ></img>
                                    ):null}
                                    <Sprite
                                    className="card-img-top rounded mx-auto"
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
                                    {/* <div className = 'card-body mx-auto'>
                                        <h6 className= 'card-title '>{this.state.name
                                        .toLowerCase()
                                        .split(" ")
                                        .map(letter => 
                                        letter.charAt(0).toUpperCase() + letter.substring(1))
                                        .join(" ")}</h6>
                                    </div> */}
                                </Card>
                            {/* </StyledLink> */}
                            </div>
        )
    }
}


