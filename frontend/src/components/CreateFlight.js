import React, {useState} from 'react';
import Axios from 'axios'
//To , FlightDate,Economy,Business,First
function CreateFlight() {
  const [From,setFrom]=React.useState("");
  const [To,setTo]=React.useState("");
  const [FlightDate,setFlightDate]=React.useState(new Date());
  const [Economy,setEconomy]=React.useState(0);
  const [Business,setBusiness]=React.useState(0);
  const [First,setFirst]=React.useState(0);

  const addtoList=()=>{
      console.log(From,To,FlightDate,Economy,First,Business)
    Axios.post("http://localhost:8000/admin/createFlight",{
        From:From,
        To:To,
        FlightDate:FlightDate,
        Economy:Economy,
        Business:Business,
        First:First
    });
  }
  return (
    <div className="App">
        <label> From </label><input type = "text"
        onChange={(e)=>{
          setFrom(e.target.value);
        }}></input>
         <label> To </label><input type = "text"
        onChange={(e)=>{
          setTo(e.target.value);
        }}></input>
         <label> Date </label><input type = "text"
        onChange={(e)=>{
          setFlightDate(e.target.value);
        }}></input>
         <label> Economy </label><input type = "text"
        onChange={(e)=>{
          setEconomy(e.target.value);
        }}></input>
         <label> Business </label><input type = "text"
        onChange={(e)=>{
          setBusiness(e.target.value);
        }}></input>
         <label> First </label><input type = "text"
        onChange={(e)=>{
          setFirst(e.target.value);
        }}></input>
      <button onClick={addtoList}>Add</button>
    </div>
  );
}

export default CreateFlight;
