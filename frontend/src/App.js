import React, { Component} from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css';

import axios from 'axios'

import CreateFlight from './components/CreateFlight';
import AllFlights from './components/AllFlights';
import UpdateFlight from './components/UpdateFlight';
import Home from './components/Home'; 
import MyNavBar from './components/MyNavbar';
import NavBarUser from './components/MyNavbarUser';
import ViewReserved from'./components/ViewReserved';
import SearchFlight from'./components/SearchFlight';
import ViewFlight from './components/ViewFlight';
 
 
import UpdateProfile from './components/UpdateProfile';
import UserProfile from './components/UserProfile';
import Page404 from './components/Page404';
import ViewSeats from './components/ViewSeats';
import ReserveFlight from './components/ReserveFlight';
import ChangeFlight from './components/ChangeFlight'

import { Container } from 'reactstrap';
import StripeContainer from './components/StripeContainer';
function App() {
 
  return (
    
    <BrowserRouter>
    <NavBarUser></NavBarUser>
    <Routes>
      <Route path="/admin/createFlight" element={<CreateFlight />} />
      <Route path="/admin" element={<AllFlights />} />
      <Route path="/admin/UpdateFlight/:id" element={<UpdateFlight/>}/> 
      <Route path="/" element={<Home/>}/>
      
      <Route path="user/viewReserved/:id" element={<ViewReserved/>}/>
      <Route path="/user/viewFlights" element={<SearchFlight />} />
      <Route path="/user/viewFlight/:id" element={<ViewFlight />} />
      <Route path="/user/viewSeats/:id/:FlightId/:Cabin/:TicketId" element={<ViewSeats/>}/> 
      <Route path="/user/changeSeats/:id/:FlightId/:Cabin/:TicketId/:OldSeat" element={<ViewSeats/>}/>   
      <Route path="/user/updateProfile/:id" element={<UpdateProfile/>}/>
      <Route path="/user/userProfile/:id" element={<UserProfile/>}/> 
      <Route path="/user/confirmFlight/:id" element={<ReserveFlight/>}/> 
      <Route path="/user/payment/:id" element={<StripeContainer/>}/> 
      <Route path="/user/changeFlight/:id/:TicketId" element={<ChangeFlight/>}/> 
      <Route element={Page404} />
      <Route path="/user/" element={<UserProfile/>}/> 

    </Routes>
  </BrowserRouter>
  );
 
}

export default App;
