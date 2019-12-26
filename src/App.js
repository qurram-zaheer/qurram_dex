import React,{ Component } from 'react';
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
          
          <div className = 'container-fluid mx-0'>
            <Dashboard />
            
          </div>
        </div>
    </Router>
      
    )
  } 
}

export default App;
