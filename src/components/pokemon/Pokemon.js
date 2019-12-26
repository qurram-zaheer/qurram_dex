import React, { Component } from "react";
import axios from "axios";
import spinner from './spinner.gif'
import "./card.css";
import styled from 'styled-components';


const Sprite = styled.img`
    
    display: none;
`

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6"
};

export default class Pokemon extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: ""
    },
    height: "",
    weight: "",
    eggGroups: "",
    abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    evs: "",
    hatchSteps: "",
    imageLoading: true,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.index !== this.props.index) {
      this.getPokemon();
    }
  }

  async getPokemon() {
    const pokemonIndex = this.props.index;
    //URLS
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
    const moveUrls = []
    for(let i = 1;i <= 621; i++){
      moveUrls.push(`https://pokeapi.co/api/v2/${i}/`)
    }

    

    
    ///info
    const pokemonResponse = await axios.get(pokemonUrl);

    
    const name = pokemonResponse.data.name;
    const imageUrl = pokemonResponse.data.sprites.front_default;
    

    
    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pokemonResponse.data.stats.map(stat => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        default:
          break;
      }
      return 0;
    });

    //convert decimeters to meters and feet, rounded to 2 decimal places
    const height =
      Math.round((pokemonResponse.data.height * 0.328084 + 0.0001) * 100) /
      1000;

    //convert hectometers to grams
    const weight = pokemonResponse.data.weight/10;

    const types = pokemonResponse.data.types.map(type => type.type.name);

    const abilities = pokemonResponse.data.abilities
      .map(ability =>
        ability.ability.name
          .toLowerCase()
          .split("-")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")
      )
      .join(", ");

    const evs = pokemonResponse.data.stats
      .filter(stat => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map(stat => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split("-")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")}`;
      })
      .join(", ");

    //get flavor text, egg group, gender ratio, steps, catch rate
    await axios.get(pokemonSpeciesUrl).then(res => {
      let description = "";
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });

      const femaleRate = res.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);

      const eggGroups = res.data["egg_groups"]
        .map(group =>
          group.name
            .toLowerCase()
            .split("-")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ")
        )
        .join(", ");

      const hatchSteps = 255 * (res.data["hatch_counter"] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps
      });

      this.setState({
        imageUrl,
        pokemonIndex,
        name,
        types,
        stats: {
          hp,
          attack,
          defense,
          speed,
          specialAttack,
          specialDefense
        },
        abilities,
        height,
        weight,
        evs,
        imageLoading: true,
      });
    });
  }
  async componentDidMount() {
    
    this.getPokemon();
  }
  render() {
    return (
      
        
        
          <div className="card shadow-card font mt-2">
            
            <div className="card-header">
              <div className="row">
                <div className="col-5 def-font mt-1">
                  <h4>#{this.state.pokemonIndex}</h4>
                </div>
                <div className="col-7">
                  <div className="float-right">
                    <h4>
                    {this.state.types.map(type => (
                      <span
                        key={type}
                        className="badge badge-pill mr-1 def-font"
                        style={{
                          backgroundColor: `#${TYPE_COLORS[type]}`,
                          color: "white"
                        }}
                      >
                        {type
                          .toLowerCase()
                          .split(" ")
                          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                          .join(" ").toUpperCase()}
                      </span>
                    ))}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className=" col-md-3 ">
                {this.state.imageLoading ? (
                                        <img src = {spinner}  
                                        className = 'card-img-top mx-auto'
                                        
                                        alt = ''
                                        ></img>
                                    ):null}
                  <Sprite
                    src={this.state.imageUrl}
                    className="card-img-top rounded mx-auto mt-2"
                    alt=""
                    onLoad={() => this.setState({ imageLoading: false })}
                    style = {this.state.imageLoading
                      ? null
                      : { display: 'block' }}
                  />
                </div>
                <div className="col-md-9">
                  <h4 className="mx-auto">
                    <b>{this.state.name
                      .toLowerCase()
                      .split("-")
                      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(" ")}
                      </b>
                  </h4>
                  <div className="row align-items-center">
                    <div
                      className={`col-12 col-md-${this.state.statTitleWidth}`}
                    >
                      HP
                    </div>
                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                      <div className="progress">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{
                            width: `${this.state.stats.hp / 2}%`,
                            backgroundColor: `#${this.state.themeColor}`
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="200"
                        >
                          <small><b>{this.state.stats.hp}</b></small>
                        </div>
                        <div
                          className="progress-bar progress-bar-white"
                          style={{
                            width: `${(200 - this.state.stats.hp) / 2}%`
                          }}
                          aria-valuenow="70"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div
                      className={`col-12 col-md-${this.state.statTitleWidth}`}
                    >
                      Attack
                    </div>
                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                      <div className="progress">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{
                            width: `${this.state.stats.attack / 2}%`,
                            backgroundColor: `#${this.state.themeColor}`
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="200"
                        >
                          <small><b>{this.state.stats.attack}</b></small>
                        </div>
                        <div
                          className="progress-bar progress-bar-white"
                          style={{
                            width: `${(200 - this.state.stats.attack) / 2}%`
                          }}
                          aria-valuenow="70"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div
                      className={`col-12 col-md-${this.state.statTitleWidth}`}
                    >
                      Defense
                    </div>
                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                      <div className="progress">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{
                            width: `${this.state.stats.defense / 2}%`,
                            backgroundColor: `#${this.state.themeColor}`
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="200"
                        >
                          <small><b>{this.state.stats.defense}</b></small>
                        </div>
                        <div
                          className="progress-bar progress-bar-white"
                          style={{
                            width: `${(200 - this.state.stats.defense) / 2}%`
                          }}
                          aria-valuenow="70"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div
                      className={`col-12 col-md-${this.state.statTitleWidth}`}
                    >
                      Sp Atk
                    </div>
                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                      <div className="progress">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{
                            width: `${this.state.stats.specialAttack / 2}%`,
                            backgroundColor: `#${this.state.themeColor}`
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="200"
                        >
                          <small><b>{this.state.stats.specialAttack}</b></small>
                        </div>
                        <div
                          className="progress-bar progress-bar-white"
                          style={{
                            width: `${(200 - this.state.stats.specialAttack) /
                              2}%`
                          }}
                          aria-valuenow="70"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div
                      className={`col-12 col-md-${this.state.statTitleWidth}`}
                    >
                      Sp Def
                    </div>
                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                      <div className="progress ">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{
                            width: `${this.state.stats.specialDefense / 2}%`,
                            backgroundColor: `#${this.state.themeColor}`
                          }}
                          aria-valuenow={this.state.stats.specialDefense}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small><b>{this.state.stats.specialDefense}</b></small>
                        </div>
                        <div
                          className="progress-bar progress-bar-white"
                          style={{
                            width: `${(200 - this.state.stats.specialDefense) /
                              2}%`
                          }}
                          aria-valuenow="70"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div
                      className={`col-12 col-md-${this.state.statTitleWidth}`}
                    >
                      Speed
                    </div>
                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                      <div className="progress">
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{
                            width: `${this.state.stats.speed / 2}%`,
                            backgroundColor: `#${this.state.themeColor}`
                          }}
                          aria-valuenow={this.state.stats.speed}
                          aria-valuemin="0"
                          aria-valuemax="200"
                        >
                          <small><b>{this.state.stats.speed}</b></small>
                        </div>
                        <div
                          className="progress-bar progress-bar-white"
                          style={{
                            width: `${(200 - this.state.stats.speed) / 2}%`
                          }}
                          aria-valuenow="70"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col def-font">
                  <p style = {{padding: "10px"}}>{this.state.description}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="card-body">
              
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-right"><b>Height:</b></h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-left">{this.state.height} ft.</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-right"><b>Weight:</b></h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-left">{this.state.weight} kgs</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-right"><b>Catch Rate:</b></h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-left">{this.state.catchRate}%</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-right"><b>Gender Ratio:</b></h6>
                    </div>
                    <div className="col-6">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${this.state.genderRatioFemale}%`,
                            backgroundColor: "#c2185b"
                          }}
                          aria-valuenow="15"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                        <small><b>{this.state.genderRatioFemale}</b></small>
                        </div>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${this.state.genderRatioMale}%`,
                            backgroundColor: "#1976d2"
                          }}
                          aria-valuenow="30"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small><b>{this.state.genderRatioMale}</b></small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-right"><b>Egg Groups:</b></h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-left">{this.state.eggGroups} </h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-right"><b>Hatch Steps:</b></h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-left">{this.state.hatchSteps}</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-right"><b>Abilities:</b></h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-left">{this.state.abilities}</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-right"><b>EVs:</b></h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-left">{this.state.evs}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted">
              Data From{" "}
              <a
                href="https://pokeapi.co/"
                target="_blank"
                className="card-link"
                rel="noopener noreferrer"
              >
                PokeAPI.co
              </a>
            </div>
          </div>
        
    );
  }
}
