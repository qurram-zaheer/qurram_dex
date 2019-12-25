import React, { Component } from 'react'
import PokemonCard from './PokemonCard';
import axios from 'axios';
import Pokemon from './Pokemon';
import Scroll from './Scroll'
import SearchBox from './SearchBox';

export default class PokemonList extends Component {
    constructor(){
        super()
        this.handler = this.handler.bind(this)
    }
    state= {
        url: 'https://pokeapi.co/api/v2/pokemon/?limit=649',
        showDetails: false,
        pokemonIndex: 0,
        searchField: '', 
        filtered: []
    }

    handler(index){
        
        this.setState({
            showDetails:true,
            pokeIndex:index
        })
    }

    async componentDidMount(){
        const res = await axios.get(this.state.url);
        this.setState({pokemon: res.data['results'],
                       });
    }


    onSearchChange=async (event)=>{
        let value = event.target.value
        this.setState({searchField: value})
        console.log(this.state.searchField)
        const filtered = await this.state.pokemon.filter(pokemon => 
            pokemon.name.toLowerCase().includes(this.state.searchField.toLowerCase()))
        this.setState({filtered: filtered})
        
        
    }

    render() {
       
        return (
            <React.Fragment>
                {this.state.pokemon ? 
                    (
                        
                    <div className = 'row mr-0 ml-2'>
                        <div className = 'col-4'>
                            <SearchBox searchChange = {this.onSearchChange}/>
                            <Scroll>
                                <div className = 'row'>
                                    
                                {this.state.filtered.map((pokemon,i)=> {
                                    return <PokemonCard
                                        key = {pokemon.name}
                                        name = {pokemon.name}
                                        url = {pokemon.url}
                                        onChange = {this.handler}
                                        />
                                        
                                })}
                                
                                </div>
                                </Scroll>
                        </div>
                        {this.state.showDetails ? 
                            (<div className = 'col ml-0'>
                                <Pokemon index = {this.state.pokeIndex}/>
                            </div>)
                            : (<div className =''>
                                <h2>Click a card on the left for more details!</h2>
                            </div>)
                        }
                    </div>
                    )
                    :(<h1>Loading Pokemon</h1>)}
            </React.Fragment>
            
            
        )
    }
}

