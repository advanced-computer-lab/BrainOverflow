import React, { Component} from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios'

import CreateFlight from './components/CreateFlight';
import AllFlights from './components/AllFlights';
import UpdateFlight from './components/UpdateFlight';
 
 
import MyNavBar from './components/MyNavbar';
 
import ViewReserved from'./components/ViewReserved';
import SearchFlight from'./components/SearchFlight';
import ViewFlight from './components/ViewFlight';
 
 
import UpdateProfile from './components/UpdateProfile';
import UserProfile from './components/UserProfile';
import Page404 from './components/Page404';
import ViewSeats from './components/ViewSeats';
import ReserveFlight from './components/ReserveFlight';


import { Container } from 'reactstrap';
function App() {
 
  return (
    
    <BrowserRouter>
    <MyNavBar></MyNavBar>
    <Routes>
      <Route path="/admin/createFlight" element={<CreateFlight />} />
      <Route path="/admin" element={<AllFlights />} />
      <Route path="/admin/UpdateFlight/:id" element={<UpdateFlight/>}/> 
      <Route path="user/viewReserved/:id" element={<ViewReserved/>}/>
      <Route path="/user/viewFlights" element={<SearchFlight />} />
      <Route path="/user/viewFlight/:id" element={<ViewFlight />} />
      <Route path="/user/viewSeats/:FlightId/:Cabin/:TicketId" element={<ViewSeats/>}/>  
      <Route path="/user/updateProfile/:id" element={<UpdateProfile/>}/>
      <Route path="/user/userProfile/:id" element={<UserProfile/>}/> 

      <Route path="/user/confirmFlight/:id" element={<ReserveFlight/>}/> 
      <Route element={Page404} />
      <Route path="/user/ " element={<UserProfile/>}/> 

    </Routes>
  </BrowserRouter>
  );
 
}

export default App;
