import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import CreateFlight from './components/CreateFlight';


class App extends Component {
  render() {
    return (
     
        <CreateFlight/>

    );
  }
}

export default App;