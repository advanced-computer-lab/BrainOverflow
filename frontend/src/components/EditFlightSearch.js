import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import JSONDATA from './MOCK_DATA.json';
import { useParams, useLocation } from "react-router-dom";

import ReactHTMLDatalist from "react-html-datalist";

import { useNavigate } from 'react-router-dom'
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    CardBody, Card, CardImg, CardGroup, CardTitle, CardSubtitle, CardText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader, Form, Input, FormGroup, Label, Button, Container, Row, Col, Table
,Alert} from 'reactstrap';
function EditSearchFlight() {
    const [NewCabin, setCabin] = useState({ Cabin_id: "" });
    const [PriceDifference, setPriceDifference] = useState(0);

    const handleChange = e => {
      e.target.value==1?setCabin("First"): e.target.value==2?setCabin('Economy'):setCabin('Business')
    };
    const[DepartureDate,setDepartureDate]=useState(new Date());
    

    const initialstate =
    {
        From: {
            Airport: '',
            Terminal: ''
        },
        To: {
            Airport: '',
            Terminal: ''
        },
        Economy: {
            SeatId: [],
            Price: 0,
            Baggage: 0
        },
        Business: {
            SeatId: [],
            Price: 0,
            Baggage: 0
        },
        First: {
            SeatId: [],
            Price: 0,
            Baggage: 0
        },
        Departure: {
            Date: new Date(),
            Time: ''
        },
        Arrival: {
            Date: new Date(),
            Time: ''
        }


    };

    const ticketInitialState= {
        IsChild:false,
        Name:'',
        UserId:'',
        Flight:{
            FlightId:'',
            Number:''
        },
        Price :0,
        Seat :{
            SeatId:'',
            SeatNumber:''
        },
        Cabin :'',
        Arrival:{
            Airport:'',
            Terminal:0,
            Date :new Date(),
            Time : ''
        },
        Departure:{
            Airport:'',
            Terminal:0,
            Date :new Date(),
            Time : ''
        }

    }
    const ticketId =useParams();
    const [HasError, setHasError] = useState(false);
    const [displayFlights, setDisplayFlights] = useState(false);
    const [Error, setError] = useState('');
    const [flights, setFlights] = useState([initialstate]);
    const [Ticket, setTicket] = useState([ticketInitialState]);

    async function handleSubmit() {
        await axios.post(`http://localhost:8000/user/editFlightSearch/${ticketId.ticketId}`, {NewCabin:NewCabin,Departure:DepartureDate})
        .then(
            res => {
                console.log(res.data.flights);
                setFlights(res.data.flights);
                setTicket(res.data.ticket);
                setDisplayFlights(true);
                setHasError(false);
                if(res.data.flights.length==0){
                    console.log("d5lt if")
                    setHasError(true);
                    setError("No Flights available with similar Departure and Arrival In this timing")
                }
            }).catch((err)=> {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
               if (err.response) {
                console.log("d5lt catch")

                  setHasError(true);
                  setError("There's no other flights available")
                  setError(err.message)
               }
             })
    }
    return (

        <Container>

                <Row xs="1" className=''>

                    <Form onSubmit={
                        handleSubmit}>
                        <FormGroup row>
                        <Col>
                        <p>
        Choose Cabin Class: 
      </p>
 
 
      <ReactHTMLDatalist
            name={"Cabin_id"}
            onChange={handleChange}
            classNames={"classone classtwo"}
            options={[
              { text: "First", value: "1" },
              { text: "Economy", value: "2" },
              { text: "Business", value: "3" },
            ]}
      />
                       
                                </Col>
                                <Col>
                                <Label for="departure Date">
                                    departure Date:
                                </Label>
                                <Input
                                    id="DepartureDate"
                                    name="DepartureDate"
                                    placeholder="DepartureDate"
                                    type="date"
                                    required
                                    onChange={(e)=>{
                                        setDepartureDate(e.target.value);
                                      }}
                                />
                            </Col>
                        </FormGroup>

<div className="search">
    <Button
        color="info"
        size="lg"
        onClick={handleSubmit}
    >
        Search</Button>
        <br/><br/>
</div>
</Form>
</Row>
{(displayFlights)&&(!HasError)&&<div className="">
                        <div className="content">
                            <CardGroup>

                                {flights.map((flight) => (
                                    <Card>
                                        <CardBody>
                                            <CardTitle tag="h5">
                                               <h2> Flight summary :</h2>
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2 text-muted"
                                                tag="h6"
                                            >
                                                <label className="info">
                                                From :  {flight.From.Airport}.............................
                                                To :  {flight.To.Airport}</label>
                                            </CardSubtitle>
                                            <CardText>
                                                {(NewCabin=='Economy' &&Ticket.IsChild )?<label>differnce in price :{Ticket.Price-flight.Economy.ChildPrice}<br></br> </label> :
                                                   (NewCabin=='Economy' &&!Ticket.IsChild ) ? <label> differnce in price : {Ticket.Price-flight.Economy.Price}<br></br> </label> :
                                                   (NewCabin=='First' &&!Ticket.IsChild ) ?<label> differnce in price : {Ticket.Price-flight.First.Price}<br></br> </label> :
                                                   (NewCabin=='First' &&Ticket.IsChild ) ?<label> differnce in price : {Ticket.Price-flight.First.ChildPrice}<br></br> </label> :
                                                   (NewCabin=='Business' &&Ticket.IsChild ) ?<label> differnce in price : {Ticket.Price-flight.Business.ChildPrice}<br></br> </label> :
                                                   <label> differnce in price : {Ticket.Price-flight.Business.Price}<br></br> </label>
                                                }
                                                                                                <br></br>
                                                <br></br>
                                                 Departure Date : {(flight.Departure.Date.toString()).slice(0,10)}<br/><br/>
                                                Departure time: {flight.Departure.Time}<br/><br/>
                                                Arrival Date : {(flight.Arrival.Date.toString()).slice(0,10)}<br/><br/>
                                                Arrival time:{flight.Arrival.Time}<br/><br/>
                                            </CardText>
                                            <Button> 
                                                 <Link to={{
                                                    pathname: `/user/viewFlightEd/${flight._id}`
                                                    , search: '?' + new URLSearchParams({OldCabin :Ticket.Cabin,OldPrice:Ticket.Price,NewCabin:NewCabin,IsChild:Ticket.IsChild,TicketId:Ticket._id}).toString()
                                                }} className="btn btn-primary">Choose Flight</Link> 
                                         </Button>
                                        </CardBody>
                                    </Card>
                                ))}
                            </CardGroup>

                        </div>
                    </div>
}
{HasError &&  <Col className="bg-light "> <Alert align="center" color="danger" Row > 
<a align="center" style={(Error)?{display: 'block',color:'red',fontSize:'20px'}:{display: 'none'}}><CardTitle>{Error}</CardTitle></a></Alert></Col> }
</Container>
    );
    
}




export default EditSearchFlight;