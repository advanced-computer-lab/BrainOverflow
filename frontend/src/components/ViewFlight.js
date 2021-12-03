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
  const Summary={
    Cabin:'',
    Adults:0,
    Children:0,
    //ReturnFlight
    From:'',
    To:'',
    ReturnDate:'',
    ReturnTime:'',
    ReturnArrivalDate:'',
    ReturnArrivalTime:'',
    ReturnFlightNumber:'',
    ReturnPriceAdult:0,
    ReturnPriceChild:0,
    ReturnTotalPrice:0,
    ReturnBaggage:0
    //ReturnSeat:
    //ReturnDuration:
};

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

    const [viewSummary,setViewSummary] = useState(false);
    const [viewReturn,setReturnView] = useState(true);
    const [ViewOutBound,setViewOutBound] = useState(true);


    const[mysummary,setSummary]=useState(Summary);


    const { id } = useParams();
    const childTicketsno=parseInt(search.get('Children')) ;
    const adultTicketsno=parseInt(search.get('Adults')) ;
    const cabin=search.get('Cabin');
    const returnDate =search.get('ReturnDate');
    const adultTicket= (cabin=="First")?flight.First.Price:(cabin=="Business")?flight.Business.Price:(cabin=="Economy")?flight.Economy.Price:0;
    const childTicket= (cabin=="First")?flight.First.ChildPrice:(cabin=="Business")?flight.Business.ChildPrice:(cabin=="Economy")?flight.Economy.ChildPrice:0;
    const totalPrice= childTicketsno*childTicket+adultTicketsno*adultTicket;
    const mysearch={
      Cabin:search.get("Cabin"),
      Adults:adultTicketsno,
      Children:childTicketsno,
      DepartureFrom:flight.From.Airport,
      DepartureTo:flight.To.Airport,
      
    }
    console.log("Return",search.get('ReturnDate'));
    

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
    const total =mysearch.Adults+mysearch.Children;
    console.log("total : ", total);

      function handleSummary(FromAirport,ToAirport,FirstPrice,BusinessPrice,EconomyPrice,ArrivalTime,DepartureTime,DepartureDate,ArrivalDate,FlightNumber,FirstChildPrice,BusinessChildPrice,EconomyChildPrice,FirstBaggage,BusinessBaggage,EconomyBaggage) {  
        setReturnView(false);
        const ReturnadultTicket= (cabin=="First")?FirstPrice:(cabin=="Business")?BusinessPrice:(cabin=="Economy")?EconomyPrice:0;
        const ReturnchildTicket= (cabin=="First")?FirstChildPrice:(cabin=="Business")?BusinessChildPrice:(cabin=="Economy")?EconomyChildPrice:0;
        const ReturntotalPrice= childTicketsno*childTicket+adultTicketsno*adultTicket;
        const Baggage =(cabin=="First")?FirstBaggage:(cabin=="Business")?BusinessBaggage:(cabin=="Economy")?EconomyBaggage:0;


        setSummary({
          Cabin:cabin,
          Adults:adultTicketsno,
          Children:childTicketsno,
          //ReturnFlight
          From: FromAirport,
          To:ToAirport,
          ReturnDate:DepartureDate,
          ReturnTime:DepartureTime,
          ReturnArrivalDate: ArrivalDate,
          ReturnArrivalTime:ArrivalTime,
          ReturnFlightNumber:FlightNumber,
          ReturnPriceAdult:ReturnadultTicket,
          ReturnPriceChild:ReturnchildTicket,
          ReturnTotalPrice:ReturntotalPrice,
          ReturnBaggage: Baggage
        })
        setViewSummary(true);
        setViewOutBound(false);

      }
      console.log(mysummary);
      
      function handleConfirm(){

      }


      return(
        <div>
    {ViewOutBound ?
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
       
      </CardColumns>:<label></label>}

{viewReturn?
<div className="">
    <div className="content">
    <CardGroup>
  {Returnflight.filter((f) => {
    let flag1 =false ;
    let flag2=false ;
    let flag3 =false ;
    let flag4 =false ;
    console.log("depart ",f.Departure.Date);

    if(f.To.Airport ==flight.From.Airport && f.From.Airport ==flight.To.Airport && f.Departure.Date.slice(0,10)==returnDate){
      flag4 = true ;
    }
    if (cabin =="first"){
      let len = f.First.SeatId.length;
      let countseats=0;
      console.log("length of First ", len)
      for(let i =0 ;i<len ;i++){
        if(f.First.SeatId[i].IsBooked == false){
          countseats++;
       }
       }
       flag1 = (total<= countseats)
  }
  else { flag1 = true }

  if (cabin =="Economy"){
    let len = f.Economy.SeatId.length;
    let countseats=0;
    console.log("length of Economy ", len)
    for(let i =0 ;i<len ;i++){
      if(f.Economy.SeatId[i].IsBooked == false){
        countseats++;
     }
     }
     flag2 = (total<= countseats)
}
else { flag2 = true }
if (cabin =="Business"){
  let len = f.Business.SeatId.length;
  let countseats=0;
  console.log("length of Business ", len)
  for(let i =0 ;i<len ;i++){
    if(f.Business.SeatId[i].IsBooked == false){
      countseats++;
   }
   }
   flag3 = (total<= countseats)
}
else { flag3 = true }

 
return flag1 & flag2 & flag3 & flag4 ;  
})
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
                            From :{x.From.Airport} To :{x.To.Airport}
                          </CardSubtitle>
                          <CardText>
                            FlightNumber:{x.FlightNumber}<br></br>
                          {(mysearch.Cabin =="First")&& (adultTicketsno >0)? <label>price of First class Adult Ticket : {x.First.Price} </label> :
                          (cabin =="Business") && (adultTicketsno >0)?<label> price of Business class Adult Ticket: {x.Business.Price}</label>:
                          (cabin =="Economy")&& (adultTicketsno>0)?<label> price of Economy class Adult Ticket : {x.Economy.Price}</label>:<label></label>}<br/>
                          {(cabin =="First")&& (childTicketsno >0)? <label>price of First class Children Ticket : {x.First.ChildPrice}</label> :
                          (cabin =="Business") && (childTicketsno>0)?<label> price of Business class Children Ticket: {x.Business.ChildPrice}</label>:
                          (cabin =="Economy")&& (childTicketsno >0)?<label> price of Economy class Children Ticket : {x.Economy.ChildPrice}</label>:<label></label>}<br/>
                          
                          Departure Date: {x.Departure.Date.slice(0, 10)}
                          <br></br>
                          Departure time: {x.Departure.Time}
                          <br></br>
                          Arrival Date: {x.Arrival.Date.slice(0, 10)}
                          <br></br>
                          Arrival time:{x.Arrival.Time} 
                          <br></br>
                          </CardText>
                          <br></br>
                        </CardBody>
                        <Button onClick={() => handleSummary(x.From.Airport,x.To.Airport,x.First.Price,x.Business.Price,x.Economy.Price,x.Arrival.Time,x.Departure.Time,x.Departure.Date.slice(0, 10),x.Arrival.Date.slice(0, 10),x.FlightNumber,x.First.ChildPrice,x.Business.ChildPrice,x.Economy.ChildPrice,x.First.Baggage,x.Business.Baggage,x.Economy.Baggage)}>Show Summary</Button>
                        
                      </Card>
                      
                      

  ))}

    
        </CardGroup>

    </div>
</div>
:<label></label>}


{viewSummary? <div>
  <Card>
    <CardBody>
                 <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  > OutBound {flight.Departure.Date.slice(0, 10)} at {flight.Departure.Time}<br/>
                    </CardSubtitle>
                    <CardText>
                    Flight From  {flight.From.Airport} to {flight.To.Airport}
                    Duration :
                    </CardText>
           </CardBody>

</Card>
  <Card>
    <CardBody>
                 <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    Return {mysummary.ReturnDate} at {mysummary.ReturnTime}<br/>

                    </CardSubtitle>
                    <CardText>
                    Flight From {mysummary.From} to {mysummary.To}
                    Duration :
                    </CardText>
           </CardBody>

</Card>
<CardColumns>
  <Card>
    
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
                    Baggage Allowance: {(cabin=="First")?<label>{flight.First.Baggage}</label>:(cabin=="Business")?<label>{flight.Business.Baggage}</label>:(cabin=="Economy")?<label>{flight.Economy.Baggage}</label>:
                   (adultTicketsno>0)?(<label> price / Adult ticket: {adultTicket} </label>):
                   (childTicketsno>0)?(<label> price / Child ticket: {childTicket}</label>):<label></label>}<br/>
                   Total Tickets price for OutBound Flight:{totalPrice}<br/> 
                   </CardText> 
                   <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    Return Flight From {mysummary.From} to {mysummary.To}

                    </CardSubtitle>
                    <CardText>
                    Flight number: {mysummary.ReturnFlightNumber}<br/>
                    Departure Date: {mysummary.ReturnDate} at {mysummary.ReturnTime}<br/>
                    Arrival Date: {mysummary.ReturnArrivalDate} at {mysummary.ReturnArrivalTime}<br/>
                    Cabin Class: {cabin}<br/>
                    Baggage Allowance:{mysummary.ReturnBaggage}<br/>
                    Total Tickets price For Return Flight: {mysummary.ReturnTotalPrice}<br/> 
                    TotalPrice {mysummary.ReturnTotalPrice + totalPrice} <br/> 
                    </CardText>
                    <Button >
                    <Link to={{ pathname:`/user/confirmFlight/${flight._id}` 
                         , search:'?'+new URLSearchParams(mysummary).toString()
                           }}className="btn btn-primary">Confirm</Link> 
                      </Button>


      </CardBody>
      </Card>
      </CardColumns>
      </div>:<label></label>}


</div>
      
      )
}
export default ViewFlight;
