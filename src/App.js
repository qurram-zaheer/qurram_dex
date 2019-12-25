import React,{ Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import Pokemon from './components/pokemon/Pokemon';

class App extends Component{
  render(){
    return (
      <Router>
        <div className = 'App'>
          <NavBar />
          
          <div className = 'container mx-0'>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
            </Switch>
            
          </div>
        </div>
    </Router>
      
    )
  } 
}

export default App;
