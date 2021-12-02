import React, { Children } from "react";
import { Switch, Route, Link, useSearchParams } from "react-router-dom";
import { get, patch,put } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {useParams,useLocation} from "react-router-dom";
import { CardBody, Card, CardColumns,CardImg,CardSubtitle,CardText,CardGroup,
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
    const [Returnflight, setReturnFlights] = useState([initialstate]);
    const [displayed, setDisplayed] = useState([initialstate]);

    const [viewSummary,setView] = useState(false);

    const { id } = useParams();
    const childTicketsno=parseInt(search.get('Children')) ;
    const adultTicketsno=parseInt(search.get('Adults')) ;
    const cabin=search.get('Cabin');
    const adultTicket= (cabin=="First")?flight.First.Price:(cabin=="Business")?flight.Business.Price:(cabin=="Economy")?flight.Economy.Price:0;
    const childTicket= (cabin=="First")?flight.First.ChildPrice:(cabin=="Business")?flight.Business.ChildPrice:(cabin=="Economy")?flight.Economy.ChildPrice:0;
    const totalPrice= childTicketsno*childTicket+adultTicketsno*adultTicket;
    const mysearch={
      Cabin:search.get("Cabin"),
      Adults:adultTicketsno,
      Children:childTicketsno,
      DepartureFrom:flight.From.Airport,
      DepartureTo:flight.To.Airport
      
    }
    

    useEffect(() => {
      console.log( parseInt(search.get('Adults')) );
     
        axios.get(`http://localhost:8000/user/viewFlight/${id}`).then(res => {
          setFlight(res.data.aFlight);
          setReturnFlights(res.data.allFlight);
          setDisplayed(res.data.allFlight);
          console.log(res.data.allFlight);
           })
        

    }, [props]);
    console.log("children : ",mysearch.Children);
    console.log("adults : ",mysearch.Adults);
    const total =mysearch.Children+mysearch.Children;
    console.log("total : ", total);

      function handleSummary() {
        setView(true);

        // alert(`hello, ${name}`);
        
      }






      return(
        <div>
        <CardColumns>
        <Card>
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


<div className="">
    <div className="content">
    <CardGroup>
  {Returnflight.filter((f) => (f.To.Airport ==flight.From.Airport && f.From.Airport ==flight.To.Airport && (mysearch.Adults+mysearch.Children)<f.First.SeatId.length))
  .map(x => (

    <Card>
                        <CardBody>
                          <CardTitle tag="h5">
                            Return Flight summary :
                          </CardTitle>
                          <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                          >
                            From :{x.From.Airport}
                            To :{x.To.Airport}
                          </CardSubtitle>
                          <CardText>
                          {(cabin =="first")? <label>price of First class : {x.First.Price}</label> :<label></label>}
                          {(cabin =="Business")?<label> price of Business class : {x.Business.Price}</label>:<label></label>}
                          {(cabin =="Economy")?<label> price of Economy class : {x.Economy.Price}</label>:<label></label>}
                          <br></br>
                          Arrival time:{x.Arrival.Time} 
                          <br></br>
                          Departure time: {x.Departure.Time}</CardText>
                          <br></br>
                        </CardBody>
                        <button onClick={() => handleSummary(x.From.Airport,x.To.Airport,x.First.Price,x.Business.Price,x.Economy.Price,x.Arrival.Time,x.Departure.Time)}>Show Summary</button>
                      </Card>
                      

  ))}

    
        </CardGroup>

    </div>
</div>
{viewSummary? <div><Card>
        <CardBody>
                  <CardTitle tag="h5">
                    Summary
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                    
                  >
                    Flight From {flight.From.Airport} to {flight.To.Airport}
                    </CardSubtitle>
                    <CardText>
                    
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
                   </CardText>           

                  
      </CardBody>
      </Card>
      </div>:<label></label>}


</div>
      
      )
}
export default ViewFlight;