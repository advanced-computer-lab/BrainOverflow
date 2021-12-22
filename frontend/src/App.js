import React, { Component,useContext } from 'react';
 
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
import Registeration from './components/Registeration';
import SignIn from './components/SignIn';
import UpdateProfile from './components/UpdateProfile';
import UserProfile from './components/UserProfile';
import Page404 from './components/Page404';
import ViewSeats from './components/ViewSeats';
import ReserveFlight from './components/ReserveFlight';
import ChangePass from './components/ChangePass';
import { AuthContextProvider } from "./components/AuthContext";
import AuthContext from "./components/AuthContext";


import { Container } from 'reactstrap';
axios.defaults.withCredentials = true;
function App() {
 
  return (
    
    <BrowserRouter>
     <AuthContextProvider>
    <NavBarUser></NavBarUser>
    <Routes>
      <Route path="/admin/createFlight" element={<CreateFlight />} />
      <Route path="/admin" element={<AllFlights />} />
      <Route path="/admin/UpdateFlight/:id" element={<UpdateFlight/>}/> 
      <Route path="/" element={<Home/>}/>
      
      <Route path="user/viewReserved" element={<ViewReserved/>}/>
      <Route path="/user/viewFlights" element={<SearchFlight />} />
      <Route path="/user/viewFlight/:id" element={<ViewFlight />} />
      <Route path="/user/viewSeats/:FlightId/:Cabin/:TicketId" element={<ViewSeats/>}/>  
      <Route path="/user/updateProfile" element={<UpdateProfile/>}/>
      <Route path="/user/userProfile" element={<UserProfile/>}/> 
      <Route path="/authorize/changepass" element={<ChangePass/>}/> 
      <Route path="/user/confirmFlight" element={<ReserveFlight/>}/> 
      <Route path="/authorize/signup" element={<Registeration/>}/> 
      <Route path="/authorize/login" element={<SignIn/>}/> 
      <Route element={Page404} />
      <Route path="/user/ " element={<UserProfile/>}/> 

    </Routes>
    </AuthContextProvider>
  </BrowserRouter>
  );
 
}

export default App;
