import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import CreateFlight from './components/CreateFlight';
import AllFlights from './components/AllFlights';
import MyNavBar from './components/MyNavbar';
import { Container } from 'reactstrap';


class App extends Component {
  render() {
    return (
      <div>
        <MyNavBar>
        </MyNavBar>
        <div> <CreateFlight></CreateFlight></div>
        
      </div>

    );
  }
}

export default App;