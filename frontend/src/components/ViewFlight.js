import React, { Children,useContext } from "react";
import { Switch, Route, Link, useSearchParams} from "react-router-dom";

import { get, patch,put } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import {useParams,useLocation} from "react-router-dom";
import { CardBody, Card, CardColumns,CardImg,CardSubtitle,CardText,CardGroup,Toast,ToastBody,ToastHeader,Container,Form,FormGroup,Label,Alert,
          Button,CardTitle,Col,Row} from 'reactstrap';
import "../Style/summay.css";
import "../Style/Navbar.css";
import"../Style/ticketSymmary.css";
import JSONDATA from './MOCK_DATA.json';


 import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
 import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
 import summary1 from "./travelThree.jpeg";
 import summary2 from "./travelFour.jpg";

 





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
    const { getLoggedIn } = useContext(AuthContext);
    let navigateBack = useNavigate();
    const navigate = useNavigate();
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
    const [viewForm,setviewForm]=useState(false);

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notCorrect, setAvailable] = useState(false);

  async function logout(e) {
    e.preventDefault();
    console.log("log out here")


    try {
        await axios.get("http://localhost:8000/authorize/logout")
        navigate('/user', { replace: true });

      }
      catch(err){
        console.error(err);

      }}

 
  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };
        await axios.post("http://localhost:8000/authorize/login",loginData)
        await getLoggedIn();
        setViewSummary(true);
        setViewOutBound(false);
        setviewForm(false);

        setAvailable(false);

      }
      catch(err){
        console.error(err);
        setAvailable(true);

      }}
    
    console.log("Return",search.get('ReturnDate'));
    

    useEffect(() => {
      console.log( parseInt(search.get('Adults')) );
      
     
        axios.get(`http://localhost:8000/user/viewFlight/${id}`).then(res => {
          setFlight(res.data.aFlight);
          setReturnFlights(res.data.allFlight);
          setDisplayed(res.data.allFlight);
          console.log(res.data.aFlight);
          console.log("fliiiiight",flight);


          
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

    async function handleClick(){
        setViewSummary(false);
        setViewOutBound(false);
        setviewForm(true);
        await getLoggedIn();
    }
    function handleBack() {
      navigateBack(-1)
    }

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
      
      function handleBack() {
        navigateBack(-1)
      }

      let DeptC =flight.From.Airport;
      let result1 = DeptC.substring(0, 3);

      let ArrC=flight.To.Airport;
      let result2=ArrC.substring(0, 3);

      


      return(
        <div style={{ backgroundColor:"white" }}>
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
    <CardGroup >
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

                        <div >
                        <Toast >
                          <ToastHeader  style={{color:'#5584AC' , marginRight:"100px"}}>
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
                          </Toast></div>

                        

                      
                      

  ))}





</CardGroup>
    </div>
</div>
:<label></label>}
{NoFlights? <label>No Available Return Flight</label>:<label></label>}


{viewSummary? <div style={{marginTop:'10%',marginLeft:'10%'}}>
  

 

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

  <div class="body1" style={{width:"700px", height:"300px", position:'absolute', top:"70%", right:"65%" ,transform:'scale(0.5)',borderRadius:'10px' }}  >
  <div class="section1">
    <div class="ticket__wrapper"  >
      <div class="w-layout-grid ticket__main-grid" >
        <div id="w-node-_4de94962-9e0c-9272-b6ee-d4681c5881b4-21b78d9a" class="ticket__left-wrapper">
          <div id="w-node-ac4e0c7f-8087-572e-be1e-bb12f70742ab-21b78d9a" class="flex-vertical">
            <div>{cabin}</div>
            {/* <div class="ticket__important-info">Lucas rocha</div> */}
          </div>
          <div class="flex-vertical" ><img src={"https://uploads-ssl.webflow.com/60c68219dd06b60c362068f0/6116eb1714613cc5260a6f77_android-chrome-256x256.png"} loading="lazy" alt="" class="qr-code-img"></img></div>
          <div class="flex-vertical">
            <div>Gate</div>
            <div class="ticket__important-info">d7</div>
          </div>
          <div class="flex-vertical">
            <div>Flight</div>
            <div class="ticket__important-info">{flight.FlightNumber}</div>
          </div>
          <div class="flex-vertical">
            <div>Seat</div>
            <div class="ticket__important-info">NA</div>
          </div>
          <div id="w-node-_02ddaefd-aa9d-15e5-8dcb-dc87316bed27-21b78d9a" class="ticket__hole-wrapper">
            <div class="ticket__hole"></div>
          </div>
          <div class="ticket__left-bg"></div>
        </div>
        <div id="w-node-_424ca1ea-6be4-621b-4443-87861569ed47-21b78d9a" class="ticket__right-wrapper">
          <div class="w-layout-grid ticket__right-content-wrapper">
            <div class="ticket__destiny-wrapper">
              <div>From </div>
              <div class="ticket__country-text" style={{ textTransform: 'uppercase'}}>{result1}</div>
              <div >{flight.From.Airport} Airport</div>
            </div>
            <div class="ticket__destiny-wrapper">
              <div>To</div>
              <div class="ticket__country-text" style={{ textTransform: 'uppercase'}}>{result2}</div>
              <div>{flight.To.Airport} Airport</div>
            </div>
            <div id="w-node-f707f957-883b-d67f-5d7a-451aaafb833d-21b78d9a" class="ticket__id-info-wrapper">
              <div class="ticket__id-label">Departure Date</div>
              <div class="weight-600">{flight.Departure.Date.slice(0, 10)}  at  {flight.Departure.Time}</div>
            </div>
            <div id="w-node-a0034b52-4bd3-6271-0e5d-2b333fd4ca24-21b78d9a" class="ticket__id-info-wrapper">
              <div class="ticket__id-label">Arrival Data</div>
              <div class="weight-600">{flight.Arrival.Date.slice(0, 10)} at {flight.Arrival.Time}</div>
            </div><img src={"https://uploads-ssl.webflow.com/60c68219dd06b60c362068f0/6116ad41eeed6d29728453f8_4aa534605d1afc465c5bdc5dd80f1ecb.png"} loading="lazy" id="w-node-_394c5a89-bbdd-4f0f-fd9d-dc484c91094c-21b78d9a" alt="" class="ticket__right-bg-img"></img>
          </div>
        </div>
      </div>
    </div>
  </div>
 
</div>


  <Card className="summary" style={{marginTop:'-10%'}} >
    
        <CardBody>
                  <CardTitle tag="h5">
                    <h1> Summary of Your Round Trip </h1>
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    <h3>Adults : {adultTicketsno} &nbsp;&nbsp;&nbsp;Children :{childTicketsno} &nbsp;&nbsp;&nbsp;Cabin:{cabin}</h3><br/>

                    </CardSubtitle>
                      <CardImg style={{opacity:"0.5",borderRadius:'10px'}}src="https://cdn.pixabay.com/photo/2019/04/19/01/37/manhattan-4138442_960_720.jpg"></CardImg>
                      <img style={{marginTop:'-80%',marginLeft:'10%'}}class ='imgDepart'src='https://ak.picdn.net/shutterstock/videos/1045833544/thumb/4.jpg'></img>
                      <div style={{marginTop:'-50%',position:'absolute',marginLeft:'35%'}}>
                      <h1>Departing</h1>
                      </div>
                      
                      <div id="depart" style={{marginTop:'-40%',position:'absolute'}}>
                      <h2>{flight.From.Airport}</h2> <br/>
                      <label className="data">{flight.Departure.Date.slice(0, 10)}  at  {flight.Departure.Time}</label><br/>
                      <label className="data">Baggage Allowance {(cabin=="First")?<label >{flight.First.Baggage}</label>:(cabin=="Business")?<label >{flight.Business.Baggage}</label>:(cabin=="Economy")?<label>{flight.Economy.Baggage}</label>:<label></label>} </label><br/>
                      </div>
                      <div id="arrival" style={{marginTop:'-40%',position:'absolute',marginLeft:'75%'}}>
                        <h2>{flight.To.Airport}</h2><br/>
                        <label classname="data"> {flight.Arrival.Date.slice(0, 10)} at {flight.Arrival.Time}</label><br/>
                        <label className="data">Baggage Allowance {(cabin=="First")?<label >{flight.First.Baggage}</label>:(cabin=="Business")?<label >{flight.Business.Baggage}</label>:(cabin=="Economy")?<label>{flight.Economy.Baggage}</label>:<label></label>} </label><br/>                        

                      </div>
                     <CardText>
                     <label className="info2"> Flight Number :&nbsp;&nbsp; {flight.FlightNumber}</label><br/><br/>
                    <label className="info2">Total price for OutBound Flight :&nbsp;&nbsp; {totalPrice}</label><br/> 
                   </CardText> 
                   {/* <img style={{width:"100%" , height:"400px"}} src= {summary2}></img>
                   <img style={{width:'100px',height:'60px',transform:"scale(1.2)",marginLeft:'80%',transform:"rotate(20deg)",}}src="https://cdn3.vectorstock.com/i/1000x1000/16/82/airline-tickets-flights-flat-material-design-vector-28931682.jpg"></img> */}
                   <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                </CardSubtitle>
              </CardBody>

            </Card>
            <br/> <br/> <br/>

            <Card className="summary"  >

              <CardBody>

                    <CardImg style={{opacity:"0.5",borderRadius:'10px'}}src="https://cdn.pixabay.com/photo/2019/04/19/01/37/manhattan-4138442_960_720.jpg"></CardImg>
                      <img style={{marginTop:'-80%',marginLeft:'10%'}}class ='imgDepart'src='https://ak.picdn.net/shutterstock/videos/1045833544/thumb/4.jpg'></img>
                      <div style={{marginTop:'-50%',position:'absolute',marginLeft:'35%'}}>
                      <h1>Return</h1></div>

                      <div id="depart" style={{marginTop:'-40%',position:'absolute'}}>
                      <h2>{mysummary.From}</h2> <br/>
                      <label className="data">{mysummary.ReturnDate}  at  {mysummary.ReturnTime}</label><br/>
                      <label className="data">Baggage Allowance : {mysummary.ReturnBaggage}</label><br/>
                      </div>
                      <div id="arrival" style={{marginTop:'-40%',position:'absolute',marginLeft:'75%'}}>
                        <h2>{mysummary.To}</h2><br/>
                        <label classname="data"> {mysummary.ReturnArrivalDate} at {mysummary.ReturnArrivalTime}</label><br/>
                        <label className="data">Baggage Allowance :{mysummary.ReturnBaggage}</label><br/>

                      </div>

                    <CardText>
                    <label className="info2">Flight number :&nbsp;&nbsp; {mysummary.ReturnFlightNumber}</label>  <br/><br/>
                    <label className="info2">Total price For Return Flight :&nbsp;&nbsp; {mysummary.ReturnTotalPrice}</label> <br/> <br/>
                    <label style={{backgroundColor:"#d4902a",color:'white',padding: '6px',borderRadius: '10px',wordSpacing: '10px'}}>TotalPrice &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mysummary.ReturnTotalPrice + totalPrice} </label>
                    </CardText>
                    
                   {(!loggedIn) && <Button onClick={() => handleClick()}>
                     Login First
                      </Button>
                    }
                    
                   {(loggedIn)&& <Button style={{backgroundColor: '#96C7C1' , color:"#22577E",marginLeft:'30%' }}>
                    <Link style={{backgroundColor: '#96C7C1' , color:"#22577E" , fontSize:"200%",fontWeight: "bold"}}to={{ pathname:`/user/confirmFlight` 
                         , search:'?'+new URLSearchParams(myData).toString()
                           }}className="btn btn-primary">Confirm and Book</Link> 
                      </Button>}


      </CardBody>
                         
      </Card>





</div>

      :<label></label>}
<div>
      <Button onClick={handleBack}><ArrowCircleLeftRoundedIcon fontSize="large"></ArrowCircleLeftRoundedIcon></Button>
      </div>


     
     
  {(viewForm)?

      <div style={{backgroundColor:'#FFFFFF'}}>
      <Form onSubmit={login} style={{marginTop:'10%',margin:'10%',backgroundColor:'#95D1CC',width:'80%',paddingTop:'5%' ,paddingBottom:'5%' ,borderRadius:'5px'}}>
      <FormGroup>
      <h1>Login to your account</h1>

    <Label >
      Email:
    </Label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        </FormGroup>
        <FormGroup>
    <Label >
      Password:
    </Label>
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        </FormGroup>
        <button class="orange" type="submit"><FlightTakeoffIcon color="white" ></FlightTakeoffIcon> Login</button>

      </Form>
      {(notCorrect) &&<Alert color="danger"><a align="center">Invalid Username Or Password Please Try Again  </a></Alert>
}
</div>:<label></label>}
   

{(loggedIn) &&<Button onClick={logout} color="danger" align="center">Log Out</Button>}


</div>

      
      )
}
export default ViewFlight;
