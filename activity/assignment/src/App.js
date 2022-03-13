import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import './App.css';
import Signin from './Signin/Signin';
import Signup from './Signup/Signup';
import Home from './Home/Home';
import React ,{useState}from 'react'

function App() {
  return (
      <div className="app">
       <Router>
          <Switch>
            <Route  exact path="/"><Signin /></Route>
            <Route  path="/signup" ><Signup /></Route>
            <Route  path="/home" ><Home /></Route>
          </Switch>
        </Router>
      </div> 
    
  );
}

export default App;
