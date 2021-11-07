import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CardBody, Card, CardHeader, Form, Input, FormGroup, Label, Button, Container, Row, Col, Table
} from 'reactstrap';
import UpdateFlight from "./UpdateFlight";

function AllFlights() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  //const[searchItem,setSearchItem]=useState([]);
  const [displayed, setDisplayed] = useState([]);
  const updateClick=(id)=>{
    axios.get("http://localhost:8000/admin/updateFlight"+id,{
    }).then(navigate('http://localhost:8000/admin/updateFlight"+id', { replace: true }));
  }
  

  useEffect(() => {
    axios.get('http://localhost:8000/admin/viewFlights').then(res => {
      setFlights(res.data);
      setDisplayed(res.data);
 
 

    })

  }, []);
  
  const addtoList=(event)=>{
    event.preventDefault()
    console.log("heloooooooooo")
   
    console.log(event.target[0].value)
    setDisplayed(flights.filter((f) => { 
    let flag= false //initialize flag

    if(event.target[0].value !==''){

    let d1 = event.target[0].value
    let d2= f.FlightDate.slice(0,10) 
    console.log(event.target[0].value)
    console.log(d2)
    flag= (d1==d2)  
   }
   if(event.target[1].value !==''){flag=(event.target[1].value==f.Terminal)}
   if(event.target[2].value !==''){flag=(event.target[2].value==f._id)}
   if(event.target[3].value !==''){flag=(event.target[3].value==f.Departure)}
   if(event.target[4].value !==''){flag=(event.target[4].value==f.Arrival)}

   return flag;
  }
 

      ))
      console.log(displayed);
  }
 
  return (
 <div>
    <Form onSubmit={addtoList}>

    <Col md={3}>
   
    <FormGroup>
    <Label for="exampleDate">
      Date:
    </Label>
    <Input
      id="Date"
      name="date"
      placeholder="date placeholder"
      type="date"
      
    />
    <Label for="terminal">
      terminal:
    </Label>
    <Input
      id="terminal"
      name="terminal"
      placeholder="search..."
      type="text"
   
      />
      <Label for="flight number">
      flight number:
    </Label>
      <Input
      id="flight number"
      name="flight number"
      placeholder="search by flight number..."
      type="text"
   
     
    />
    <Label for="departure time">
      departure time:
    </Label>
    <Input
      id="departure time"
      name="departure time"
      placeholder="search..."
      type="time"
   
      />
      <Label for="arrival time">
      arrival time:
    </Label>
      <Input
      id="arrival time"
      name="arrival time"
      placeholder="search..."
      type="time"
   
     
    />
  </FormGroup>
  </Col>
  <div className="search">
  <Button 
    color="info"
    size="lg"
    type="submit"
    >
   Search</Button>
</div>
</Form>

    <div className="">
      <div className="content">
        <h1>Flights available : </h1>

        <br />
        <Container>

            <Table>
              <thead><tr>
                <th>FlightNo</th>
                  <th>From</th>
                  <th>To</th>
                  <th> Flight Date</th>
                  <th> Economy </th>
                  <th>Business</th>
                  <th>First class</th>
                  <th>Arrival time </th>
                  <th>Departure time</th>
                  <th>Terminal</th>
                  <th>        </th>
                </tr>
              </thead>
              </Table>
              </Container>



        {displayed.map((flight) => (
          <Container>
            <Table>            
              <tbody>

                <tr>
                  <td>{flight._id}</td>
                  <td>{flight.From }</td>
                  <td>{flight.To}</td>
                  <td>{flight.FlightDate}</td>
                  <td>{flight.Economy}</td>
                  <td>{flight.Business}</td>
                  <td>{flight.First}</td>
                  <td>{flight.Arrival}</td>
                  <td>{flight.Departure}</td>
                  <td>{flight.Terminal}</td>
                  <td><button>update </button>
                  <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            </Table>

          </Container>



        ))}

      </div>
    </div>
    </div>
  );
}




export default AllFlights;