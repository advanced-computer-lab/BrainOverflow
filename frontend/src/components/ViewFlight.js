import React, { Children } from "react";
import { Switch, Route, Link, useSearchParams } from "react-router-dom";
import { get, patch,put } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {useParams,useLocation} from "react-router-dom";
import { CardBody, Card, CardColumns,CardImg,CardSubtitle,CardText,CardGroup,Toast,ToastBody,ToastHeader,
          Button,CardTitle,Col,Row} from 'reactstrap';
import "../Style/summay.css";
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
    const [NoFlights,setReturn]=useState(false);

    const [viewSummary,setViewSummary] = useState(false);
    const [viewReturn,setReturnView] = useState(true);
    const [ViewOutBound,setViewOutBound] = useState(true);
    const { id } = useParams();
    const childTicketsno=parseInt(search.get('Children')) ;
    const adultTicketsno=parseInt(search.get('Adults')) ;
    const cabin=search.get('Cabin');
    const [HasError, setHasError] = useState(false);
  const [Error, setError] = useState('');
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
    const Summary={
   
      Cabin:cabin,
      Adults:adultTicketsno,
      Children:childTicketsno,
      //ReturnFlight
      From: '',
      To:"",
      ReturnDate:"",
      ReturnTime:"",
      ReturnArrivalDate: "",
      ReturnArrivalTime:"",
      ReturnFlightId:"",
      ReturnFlightNumber:"",
      ReturnPriceAdult:0,
      ReturnPriceChild:0,
      ReturnTotalPrice:0,
      ReturnBaggage: 0 }
    const Data={
      Cabin:cabin,
      Adults:adultTicketsno,
      Children:childTicketsno,
      DepartureId:"",
      ReturnFlightId:"",
      DeparturePriceAdult:0,
      DeparturePriceChild:0,
      DepatureTotalPrice:0,
      ReturnPriceAdult:0,
      ReturnPriceChild:0,
      ReturnTotalPrice:0

    }
    const[mysummary,setSummary]=useState(Summary);
    const[myData,setData]=useState(Data);
    
    console.log("Return",search.get('ReturnDate'));
    

    useEffect(() => {
      console.log( parseInt(search.get('Adults')) );
     
        axios.get(`http://localhost:8000/user/viewFlight/${id}`).then(res => {
          setFlight(res.data.aFlight);
          setReturnFlights(res.data.allFlight);
          setDisplayed(res.data.allFlight);
          if(!(id)){
            setHasError(true);
            setError("The user doesn't exist , you have to create an account first")
          }
          if(!res.data.allFlight){
            setHasError(true);
            setError("No flight with this id exists")
          }
          console.log("Iam the res.data.allFlight",res.data.allFlight);
           }).catch((err)=> {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
             if (err.response) {
                setHasError(true);
                setError("This flight doesn't exist")
             }
           })
        

    }, [props]);
    console.log("children : ",mysearch.Children);
    console.log("adults : ",mysearch.Adults);
    const total =mysearch.Adults+mysearch.Children;
    console.log("total : ", total);

      function handleSummary(FromAirport,ToAirport,FirstPrice,BusinessPrice,EconomyPrice,
        ArrivalTime,DepartureTime,DepartureDate,ArrivalDate,FlightId,FlightNumber,FirstChildPrice,
        BusinessChildPrice,EconomyChildPrice,FirstBaggage,BusinessBaggage,EconomyBaggage) {  
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
          ReturnFlightId:FlightId,
          ReturnFlightNumber:FlightNumber,
          ReturnPriceAdult:ReturnadultTicket,
          ReturnPriceChild:ReturnchildTicket,
          ReturnTotalPrice:ReturntotalPrice,
          ReturnBaggage: Baggage,
         
      })
        setViewSummary(true);
        setViewOutBound(false);
        setData( {
          Cabin:cabin,
          Adults:adultTicketsno,
          Children:childTicketsno,
          DepartureId:flight._id,
          ReturnFlightId:FlightId,
          DeparturePriceAdult: adultTicket,
          DeparturePriceChild:childTicket,
          DepatureTotalPrice: totalPrice,
          ReturnPriceAdult:ReturnadultTicket,
          ReturnPriceChild:ReturnchildTicket,
          ReturnTotalPrice:ReturntotalPrice,
    
        })

      }
      console.log(mysummary);
      
    


      return(
        <div>
    {ViewOutBound ?



         <Toast className="center">
            <ToastHeader icon="primary">
                <label> Flight From {flight.From.Airport} to {flight.To.Airport}</label>
            </ToastHeader>
            <ToastBody>
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
            </ToastBody>
          </Toast>


       
      :<label></label>}

      <br></br>


{viewReturn?
<div className="">
    <div className="content">
    <CardGroup>
  {Returnflight.filter((f) => {
    let flag1 =false ;
    let flag2 =false ;
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
//return check 

return flag1 & flag2 & flag3 & flag4 ;  
})
  .map(x => (

 
                        <Toast>
                          <ToastHeader  icon="secondary">
                            Return Flight summary :
                          </ToastHeader>
                          <ToastBody>
                            From :{x.From.Airport} To :{x.To.Airport}
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
                          <Button onClick={() => handleSummary(x.From.Airport,x.To.Airport,x.First.Price,x.Business.Price,
                          x.Economy.Price,x.Arrival.Time,x.Departure.Time,x.Departure.Date.slice(0, 10),
                          x.Arrival.Date.slice(0, 10),x._id,x.FlightNumber,x.First.ChildPrice,x.Business.ChildPrice,
                          x.Economy.ChildPrice,x.First.Baggage,x.Business.Baggage,x.Economy.Baggage)}>Show Summary</Button>
                          </ToastBody>
                          <br></br>
                          </Toast>

                        

                      
                      

  ))}


</CardGroup>
    </div>
</div>
:<label></label>}
{NoFlights? <label>No Available Return Flight</label>:<label></label>}


{viewSummary? <div>
  <Toast>
    <ToastHeader icon="primary">
     OutBound {flight.Departure.Date.slice(0, 10)} at {flight.Departure.Time}<br/>
    </ToastHeader>
    <ToastBody>
    Flight From  {flight.From.Airport} to {flight.To.Airport}   
     </ToastBody>
  </Toast>
  <Toast>
    <ToastHeader icon="secondary">
    Return {mysummary.ReturnDate} at {mysummary.ReturnTime}<br/>
    </ToastHeader>
    <ToastBody>
    Flight From {mysummary.From} to {mysummary.To}
    </ToastBody>
  </Toast>
  <Card className="summary">
    
        <CardBody>
                  <CardTitle tag="h5">
                    <h1>Summary of Your Round Trip </h1>
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    <label className="info">Flight From {flight.From.Airport} to {flight.To.Airport}</label>
                    </CardSubtitle>
                    <img class ='imgDepart'src='https://ak.picdn.net/shutterstock/videos/1045833544/thumb/4.jpg'></img>
                    <CardText>
                    <label className="data">Flight number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{flight.FlightNumber}</label>  <br/><br/>
                    <label className="data"> Departure Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  {flight.Departure.Date.slice(0, 10)}  at  {flight.Departure.Time}</label><br/><br/>
                    <label className="data"> Arrival Date  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {flight.Arrival.Date.slice(0, 10)} at {flight.Arrival.Time}</label> <br/><br/>
                    {/*longest trip duration is 18 hours and 50 mins*/}
                    {/* Trip Duration:{(diffDays==0)?<label>{ }hours and   </label> :}<br/> */}
                    <label className="data">Cabin Class &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cabin} </label><br/><br/>
                    <label className="data">Baggage Allowance &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     {(cabin=="First")?<label>{flight.First.Baggage}</label>:(cabin=="Business")?<label>{flight.Business.Baggage}</label>:(cabin=="Economy")?<label>{flight.Economy.Baggage}<br/><br/></label>:
                   (adultTicketsno>0)?(<label> price / Adult ticket: {adultTicket} <br/><br/></label>):
                   (childTicketsno>0)?(<label> price / Child ticket: {childTicket}<br/><br/></label>):<label></label>} </label>
                    <label className="data">Total price for OutBound Flight  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{totalPrice}</label><br/> 
                   </CardText> 
                   <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    <label className="info2">Return Flight From {mysummary.From} to {mysummary.To}</label>

                    </CardSubtitle>
                    <img class='imgreturn' src='https://ak.picdn.net/shutterstock/videos/1045833544/thumb/4.jpg'></img>

                    <CardText>
                    <label className="data">Flight number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mysummary.ReturnFlightNumber}</label>  <br/><br/>
                    <label className="data"> Departure Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  {mysummary.ReturnDate}  at  {mysummary.ReturnTime}</label><br/><br/>
                    <label className="data"> Arrival Date  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {mysummary.ReturnArrivalDate} at {mysummary.ReturnArrivalTime}</label> <br/><br/>
                    {/*longest trip duration is 18 hours and 50 mins*/}
                    {/* Trip Duration:{(diffDays==0)?<label>{ }hours and   </label> :}<br/> */}
                    <label className="data">Cabin Class &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cabin} </label><br/><br/>
                    <label className="data">Baggage Allowance &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mysummary.ReturnBaggage}</label> <br/><br/>
                    <label className="data">Total price For Return Flight: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mysummary.ReturnTotalPrice}</label> <br/> <br/>
                    <label className="info">TotalPrice {mysummary.ReturnTotalPrice + totalPrice} </label>
                    </CardText>
                    {(!id)&& <Button >
                    {/* <Link to={{ pathname:`/user/confirmFlight/${id}` 
                         , search:'?'+new URLSearchParams(myData).toString()
                           }}className="btn btn-primary"></Link>  */}
                           You have to sign up to be able to reserve
                      </Button>}
                   {(id)&& <Button >
                    <Link to={{ pathname:`/user/confirmFlight/${id}` 
                         , search:'?'+new URLSearchParams(myData).toString()
                           }}className="btn btn-primary">Confirm and book</Link> 
                      </Button>}


      </CardBody>
                         
      </Card>
      </div>:<label></label>}


</div>
      
      )
}
export default ViewFlight;
