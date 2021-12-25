import React, { Children, useContext } from "react";
import { Switch, Route, Link, useSearchParams } from "react-router-dom";
import { get, patch, put } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom'
import { useParams, useLocation } from "react-router-dom";
import {
  CardBody, Card, CardColumns, CardImg, CardSubtitle, CardText, CardGroup, Toast, ToastBody, ToastHeader, Container,Modal,ModalBody,ModalHeader,ModalFooter,
  Button, CardTitle, Col, Row
} from 'reactstrap';
import "../Style/summay.css";
function ViewFlightEd(props) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
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
      ChildPrice: 0,
      Baggage: 0
    },
    Business: {
      SeatId: [],
      Price: 0,
      ChildPrice: 0,
      Baggage: 0
    },
    First: {
      SeatId: [],
      Price: 0,
      ChildPrice: 0,
      Baggage: 0
    },
    Departure: {
      Date: '',
      Time: ''
    },
    Arrival: {
      Date: '',
      Time: ''
    }

  };
  const { loggedIn } = useContext(AuthContext);
  let location = useLocation();
  let search = new URLSearchParams(location.search);
  const [flight, setFlight] = useState(initialstate);
  const OldCabin = search.get('OldCabin');
  const NewCabin = search.get('NewCabin');
  const OldPrice = search.get('OldPrice');
  const TicketId = search.get('TicketId');

  const IsChild = search.get('IsChild');
var PriceDifference=0;

  (NewCabin=="First" && IsChild)?PriceDifference=flight.First.ChildPrice-OldPrice:
  (NewCabin=="First" && !IsChild)?PriceDifference=flight.First.Price-OldPrice:

  (NewCabin=="Business" && IsChild)?PriceDifference=flight.Business.ChildPrice-OldPrice:
  (NewCabin=="Business" && !IsChild)?PriceDifference=flight.Business.ChildPrice-OldPrice:

  (NewCabin=="Economy" && !IsChild)?PriceDifference=flight.Economy.ChildPrice-OldPrice:
  PriceDifference=flight.Economy.Price-OldPrice

  const [HasError, setHasError] = useState(false);
  const [Error, setError] = useState('');
  const { flightId } = useParams();
  useEffect(() => {
    console.log(PriceDifference);

    axios.get(`http://localhost:8000/user/viewFlight/${flightId}`).then(res => {
      setFlight(res.data.aFlight);
      if (!res.data.allFlight) {
        setHasError(true);
        setError("No flight with this id exists")
      }
      console.log("Iam the res.data.allFlight", res.data.allFlight);
    }).catch((err) => {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (err.response) {
        setHasError(true);
        setError("This flight doesn't exist")
      }
    })


  }, [props]);
 

  return (
  <Container>
     <Modal isOpen={show}  >
         <ModalHeader
          charCode="Y"

        >
          Tickets Reservation
        </ModalHeader>
        <ModalBody>
        { PriceDifference<0? "Are you sure you want to change your reserved flight to this one ?":PriceDifference>0?"Please click proceed to payment to chsnge your flight":"You will be charged 0$ , click proceed to confirm"}
        </ModalBody>
        <ModalFooter>
          { PriceDifference>0 &&
                  <Link to={{ pathname:`/user/payment` 
                         , search:'?'+new URLSearchParams({PriceDifference:PriceDifference,TicketId:TicketId,flightId:flightId}).toString()
                           }}className="btn btn-primary " color="success">Proceed to payment</Link> 
                     }
                             { PriceDifference<0 &&
                  <Link to={{ pathname:`/user/payment` 
                         , search:'?'+new URLSearchParams({PriceDifference:PriceDifference,TicketId:TicketId,flightId:flightId}).toString()
                           }}className="btn btn-primary " color="success">Proceed to Refund</Link> 
                     }
                           { PriceDifference==0 &&
                  <Link to={{ pathname:`/user/viewReserved` 
                       
                           }}className="btn btn-primary " color="success">Proceed</Link> 
                     }
          
         
        </ModalFooter>
      </Modal>
    <div>
    <Card
    >
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
                    <label className="data">Flight number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{flight.FlightNumber}</label>  <br/><br/>
                    <label className="data"> Departure Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  {flight.Departure.Date.slice(0, 10)}  at  {flight.Departure.Time}</label><br/><br/>
                    <label className="data"> Arrival Date  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {flight.Arrival.Date.slice(0, 10)} at {flight.Arrival.Time}</label> <br/><br/>
                    {/*longest trip duration is 18 hours and 50 mins*/}
                    {/* Trip Duration:{(diffDays==0)?<label>{ }hours and   </label> :}<br/> */}
                    <label className="data">Cabin Class &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NewCabin}</label><br></br> <br></br>
                    <label className="data">Baggage Allowance &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     {(NewCabin=="First")?flight.First.Baggage:
                     (NewCabin=="Business")?flight.Business.Baggage:
                     flight.Economy.Baggage}
                     
                     </label><br></br><br></br>
                                       <label className="data">Price Difference :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ PriceDifference}</label><br/><br/>

                     
                     
                   </CardText> 
        {PriceDifference>0 &&<Button onClick={() =>{ 
                                            setShow(true);}}>
          Pay Difference
        </Button>}
        {PriceDifference<0 &&<Button onClick={() =>{ 
                                            setShow(true);}}> Click to refund</Button>
      }
      {PriceDifference==0 &&<Button onClick={() =>{ 
                                            setShow(true);}}> Confirm and Submit </Button>
      }
      </CardBody>
    </Card>
  </div>
  </Container>
  )
}
export default ViewFlightEd;
