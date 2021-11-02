import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CreateUser from './components/CreateUser';
import ViewFlights from './components/ViewFlights';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Route exact path='/' component={ViewFlights} />
          <Route path='/create-user' component={CreateUser} />
    
        </div>
      </Router>
    );
  }
}

export default App;