import React, { Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios'

import CreateFlight from './components/CreateFlight';
import AllFlights from './components/AllFlights';
<<<<<<< Updated upstream
=======
import UpdateFlight from './components/UpdateFlight';
import SearchFlight from './components/SearchFlight';
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import MyNavBar from './components/MyNavbar';
import { Container } from 'reactstrap';

<<<<<<< Updated upstream

class App extends Component {
  
  render() {
    return (
      <div>
        <MyNavBar>
        </MyNavBar>
        <div> <AllFlights></AllFlights></div>
        
      </div>

    );
  }
  

=======
function App() {
  return (
    
    <BrowserRouter>
    <MyNavBar></MyNavBar>
    <Routes>
      <Route path="/admin/createFlight" element={<CreateFlight />} />
      <Route path="/admin" element={<AllFlights />} />
      <Route path="/admin/UpdateFlight/:id" element={<UpdateFlight/>}/> 
<<<<<<< Updated upstream
      <Route path="admin/SearchFlight" element ={<SearchFlight/>}/>
=======
      <Route path="/admin/SearchFlight" element={<SearchFlight/>}/> 

      
>>>>>>> Stashed changes
       
    </Routes>
  </BrowserRouter>
  );
>>>>>>> Stashed changes
}


export default App;