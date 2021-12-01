import React, { Children } from "react";
import { Switch, Route, Link, useSearchParams } from "react-router-dom";
import { get, patch,put } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {useParams,useLocation} from "react-router-dom";
import { CardBody, Card, CardColumns,CardImg,CardSubtitle,CardText,
          Button,CardTitle } from 'reactstrap';
      
function ViewFlight(props){
    const initialstate=
    {From:{
    Airport:'',
    Terminal:''
},
      To:{
  Airport:'',
  Terminal:''
},
Economy:{
  SeatId:[],
  Price:0,
  ChildPrice:0,
  Baggage:0
},
Business:{
  SeatId:[],
  Price:0,
  ChildPrice:0,
  Baggage:0
},
First:{
  SeatId:[],
  Price:0,
  ChildPrice:0,
  Baggage:0
},
Departure:{
  Date:'',
  Time:''
},
Arrival:{
  Date:'',
  Time:''
} 

};
 
    let location = useLocation();
    let search=new URLSearchParams(location.search)
    const [flight, setFlight] = useState(initialstate);
    const { id } = useParams();
    const childTicketsno=parseInt(search.get('Children')) ;
    const adultTicketsno=parseInt(search.get('Adults')) ;
    const cabin=search.get('Cabin');
    const adultTicket= (cabin=="First")?flight.First.Price:(cabin=="Business")?flight.Business.Price:(cabin=="Economy")?flight.Economy.Price:0;
    const childTicket= (cabin=="First")?flight.First.ChildPrice:(cabin=="Business")?flight.Business.ChildPrice:(cabin=="Economy")?flight.Economy.ChildPrice:0;
    const totalPrice= childTicketsno*childTicket+adultTicketsno*adultTicket;
    

    useEffect(() => {
      console.log( parseInt(search.get('Adults')) );
     
        axios.get(`http://localhost:8000/user/viewFlight/${id}`).then(res => {
          setFlight(res.data);
           })
      }, [props]);

      return(
        <CardColumns>
        <Card>
          <CardImg
            alt="Card image cap"
            src="https://picsum.photos/256/186"
            top
            width="100%"
          />
          <CardBody>
            <CardTitle tag="h5">
              Flight From {flight.From.Airport} to {flight.To.Airport}
            </CardTitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >

              Flight number: {flight.FlightNumber}<br/>
              Departure Date: {flight.Departure.Date.slice(0, 10)} at {flight.Departure.Time}<br/>
              Arrival Date: {flight.Arrival.Date.slice(0, 10)} at {flight.Arrival.Time}<br/>
              {/*longest trip duration is 18 hours and 50 mins*/}
              {/* Trip Duration:{(diffDays==0)?<label>{ }hours and   </label> :}<br/> */}
              Cabin Class: {cabin}<br/>
              Baggage Allowance: {(cabin=="First")?<label>{flight.First.Baggage}</label>:(cabin=="Business")?<label>{flight.Business.Baggage}</label>:(cabin=="Economy")?<label>{flight.Economy.Baggage}</label>:<label></label>}<br/>
             { (adultTicketsno>0)?(<label> price / Adult ticket: {adultTicket} </label>):<label></label> }<br/>
             {(childTicketsno>0)?(<label> price / Child ticket: {childTicket}</label>):<label></label>}<br/>
             Total Tickets price:{totalPrice}<br/>
               
              
                
              
              
              
            </CardSubtitle>
            <CardText>
              
            </CardText>
            <Button>
                          <Link to={{ pathname:`/user/viewFlight/${flight._id}` 
                         , search:'?'+new URLSearchParams(mysearch).toString()
                           }}className="btn btn-primary">Show Details</Link>
                          
                          </Button>
          </CardBody>
        </Card>
       
      </CardColumns>
      
      )
}
export default ViewFlight;