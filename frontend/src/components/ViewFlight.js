import React, { Children,useContext } from "react";
import { Switch, Route, Link, useSearchParams} from "react-router-dom";

import { get, patch,put } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom'
import {useParams,useLocation} from "react-router-dom";
import { CardBody, Card, CardColumns,CardImg,CardSubtitle,CardText,CardGroup,Toast,ToastBody,ToastHeader,Container,
          Button,CardTitle,Col,Row} from 'reactstrap';
import "../Style/summay.css";
import "../Style/Navbar.css";

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
    const {loggedIn} = useContext(AuthContext);
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
    //  let history = useHistory();

    // function handleClick() {
    //   history.push("/home");
    // }
  

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
        <div style={{backgroundColor:'#FFFFFF'}}>
    {ViewOutBound ?



         <Toast className="center" style={{marginTop:'10%'}}>
            <ToastHeader icon="primary">
                <label> Flight From {flight.From.Airport} to {flight.To.Airport}</label>
            </ToastHeader>
            <ToastBody>
            { (adultTicketsno>0)?(<label> Price / Adult ticket: {adultTicket} <br/></label>):<label></label> }<br/>
             {(childTicketsno>0)?(<label> Price / Child ticket: {childTicket} <br/></label>):<label></label>}<br/>
              <label>Flight number: {flight.FlightNumber} </label><br/><br/>
              <label>Departure Date: {flight.Departure.Date.slice(0, 10)} at {flight.Departure.Time}</label><br/><br/>
              <label>Arrival Date: {flight.Arrival.Date.slice(0, 10)} at {flight.Arrival.Time}</label><br/><br/>
              {/*longest trip duration is 18 hours and 50 mins*/}
              {/* Trip Duration:{(diffDays==0)?<label>{ }hours and   </label> :}<br/> */}
              <label>Cabin Class: {cabin}</label><br/><br/>
              <label>Baggage Allowance: </label>{(cabin=="First")?<label>{flight.First.Baggage}</label>:(cabin=="Business")?<label>{flight.Business.Baggage}</label>:(cabin=="Economy")?<label>{flight.Economy.Baggage}</label>:<label></label>}<br/><br/>
              <label>Total Tickets price: {totalPrice}</label><br/><br/>                      
            </ToastBody>
          </Toast>


       
      :<label></label>}

      <br></br>


{viewReturn?
<div className="" style={{backgroundColor:"#FFFFFF"}}>
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

 
                        <Toast >
                          <ToastHeader  style={{color:'#5584AC'}}>
                            Return From {x.From.Airport} To :{x.To.Airport}
                          </ToastHeader>
                          <ToastBody>
                            
                          <label>FlightNumber:{x.FlightNumber}</label><br/><br/>
                          {(mysearch.Cabin =="First")&& (adultTicketsno >0)? <label>Price of First class Adult Ticket : {x.First.Price}<br/><br/> </label> :
                          (cabin =="Business") && (adultTicketsno >0)?<label> Price of Business class Adult Ticket: {x.Business.Price}<br/><br/></label>:
                          (cabin =="Economy")&& (adultTicketsno>0)?<label> Price of Economy class Adult Ticket : {x.Economy.Price}<br/><br/></label>:<label></label>}
                          {(cabin =="First")&& (childTicketsno >0)? <label>Price of First class Children Ticket : {x.First.ChildPrice}<br/><br/></label> :
                          (cabin =="Business") && (childTicketsno>0)?<label> Price of Business class Children Ticket: {x.Business.ChildPrice}<br/><br/></label>:
                          (cabin =="Economy")&& (childTicketsno >0)?<label> Price of Economy class Children Ticket : {x.Economy.ChildPrice}<br/><br/></label>:<label></label>}
                          
                          <label>Departure Date: {x.Departure.Date.slice(0, 10)}</label>
                          <br></br><br/>
                          <label>Departure time: {x.Departure.Time}</label>
                          <br></br><br/>
                          <label>Arrival Date: {x.Arrival.Date.slice(0, 10)}</label>
                          <br></br><br/>
                          <label>Arrival time:{x.Arrival.Time} </label>
                          <br/><br/>
                          <Button onClick={() => handleSummary(x.From.Airport,x.To.Airport,x.First.Price,x.Business.Price,
                          x.Economy.Price,x.Arrival.Time,x.Departure.Time,x.Departure.Date.slice(0, 10),
                          x.Arrival.Date.slice(0, 10),x._id,x.FlightNumber,x.First.ChildPrice,x.Business.ChildPrice,
                          x.Economy.ChildPrice,x.First.Baggage,x.Business.Baggage,x.Economy.Baggage)} style={{backgroundColor:'#5584A'}}>Select</Button>
                          </ToastBody>
                          <br></br>
                          </Toast>

                        

                      
                      

  ))}


</CardGroup>
    </div>
</div>
:<label></label>}
{NoFlights? <label>No Available Return Flight</label>:<label></label>}


{viewSummary? <div style={{marginTop:'10%',marginLeft:'10%',backgroundColor:'#FFFFFF'}}>
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
  <Card className="summary"  >
    
        <CardBody>
                  <CardTitle tag="h5">
                    <h1>Summary of Your Round Trip </h1>
                  </CardTitle>
                  <img style={{width:'100px',height:'60px',transform:"scale(1.2)",marginLeft:'80%',transform:"rotate(20deg)",}}src="https://cdn3.vectorstock.com/i/1000x1000/16/82/airline-tickets-flights-flat-material-design-vector-28931682.jpg"></img>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    <label className="info2">Flight From {flight.From.Airport} to {flight.To.Airport}</label>
                    </CardSubtitle>
                    <img class ='imgDepart'src='https://ak.picdn.net/shutterstock/videos/1045833544/thumb/4.jpg'></img>
                    <CardText>
                    <label className="data">Flight number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{flight.FlightNumber}</label>  <br/><br/>
                    <label className="data"> Departure Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {flight.Departure.Date.slice(0, 10)}  at  {flight.Departure.Time}</label><br/><br/>
                    <label className="data"> Arrival Date  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {flight.Arrival.Date.slice(0, 10)} at {flight.Arrival.Time}</label> <br/><br/>

                    {/*longest trip duration is 18 hours and 50 mins*/}
                    {/* Trip Duration:{(diffDays==0)?<label>{ }hours and   </label> :}<br/> */}
                    <label className="data">Cabin Class &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cabin} </label><br/><br/>
                    
                    <label className="data">Baggage Allowance &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     {(cabin=="First")?<label style={{color:'#FFFFFF'}}>{flight.First.Baggage}</label>:(cabin=="Business")?<label style={{color:'#FFFFFF'}}>{flight.Business.Baggage}</label>:(cabin=="Economy")?<label style={{color:'#FFFFFF'}}>{flight.Economy.Baggage}</label>:<label></label>} </label><br/><br/>
                    <label className="data">Total price for OutBound Flight  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{totalPrice}</label><br/> 
                   </CardText> 
                   <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    <label className="info2">Return Flight From {mysummary.From} to {mysummary.To}</label>

                    </CardSubtitle>
                    <img class='imgreturn' src='https://ak.picdn.net/shutterstock/videos/1045833544/thumb/4.jpg'></img>

                    <CardText>
                    <label className="data">Flight number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mysummary.ReturnFlightNumber}</label>  <br/><br/>
                    <label className="data"> Departure Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {mysummary.ReturnDate}  at  {mysummary.ReturnTime}</label><br/><br/>
                    <label className="data"> Arrival Date  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {mysummary.ReturnArrivalDate} at {mysummary.ReturnArrivalTime}</label> <br/><br/>
                    {/*longest trip duration is 18 hours and 50 mins*/}
                    {/* Trip Duration:{(diffDays==0)?<label>{ }hours and   </label> :}<br/> */}
                    <label className="data">Cabin Class &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{cabin} </label><br/><br/>
                    <label className="data">Baggage Allowance &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mysummary.ReturnBaggage}</label> <br/><br/>
                    <label className="data">Total price For Return Flight: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mysummary.ReturnTotalPrice}</label> <br/> <br/>
                    <label className="orange">TotalPrice &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mysummary.ReturnTotalPrice + totalPrice} </label>
                    </CardText>
                    
                   {loggedIn && <Button >
                    <Link to={{ pathname:`/user/confirmFlight` 
                         , search:'?'+new URLSearchParams(myData).toString()
                           }}className="btn btn-primary">You have to sign up to be able to reserve</Link>      
                      </Button>
                    }
                    
                   {(id)&& <Button style={{backgroundColor: '#96C7C1',marginLeft:'30%'}}>
                    <Link style={{backgroundColor: '#96C7C1'}}to={{ pathname:`/user/confirmFlight/${id}` 
                         , search:'?'+new URLSearchParams(myData).toString()
                           }}className="btn btn-primary">Confirm and book</Link> 
                      </Button>}


      </CardBody>
                         
      </Card>

      </div>:<label></label>}
      <div>

      <Button > <Link to={{pathname:'/'}}></Link>Back</Button>
      </div>
   



</div>

      
      )
}
export default ViewFlight;
