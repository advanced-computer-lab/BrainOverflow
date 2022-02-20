import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { get, patch, put } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from './AuthContext';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import {
  Modal, ModalHeader, ModalBody, ModalFooter, CardBody, CardColumns, CardTitle, CardSubtitle, Card, CardHeader, Form, Input, FormGroup,
  Label, Button, Container, Row, Col, Table, Alert , CardText,Badge
} from 'reactstrap';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import '../App.css';
import '../Style/Ticket.css';
import AirlineSeatLegroomExtraOutlinedIcon from '@mui/icons-material/AirlineSeatLegroomExtraOutlined';
import CloudCircleOutlinedIcon from '@mui/icons-material/CloudCircleOutlined';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';


 
function ViewReserved(props) {
  const [theObject, setTheObject] = useState({
    SeatId: "",
    Ticket: [""],
    theTicket: "",
    Email: "",
    Price: 0,
    TicketName: '',
    UserName: ''
  })
  const initialState = {
    _id: "",
    FirstName: "",
    LastName: "",
    Email: "",
    TicketsId: [{
      Flight:
      {
        FlightId: ""
        , Number: ""
      },
      Departure: { Airport: "", Terminal: 0, Date: "", Time: "" },
      Arrival: {
        Airport: "",
        Terminal: 0,
        Date: "",
        Time: ""
      },
      Seat: {
        SeatNumber: "",
        SeatId: ""
      },
      _id: "",
      UserId: "",
      Cabin: " ",
      Price: 0,
      Name: ""
    }],
    Country: ""
  };
const initialMyState={
  Flight:
  {
    FlightId: ""
    , Number: ""
  },
  Departure: { Airport: "", Terminal: 0, Date: "", Time: "" },
  Arrival: {
    Airport: "",
    Terminal: 0,
    Date: "",
    Time: ""
  },
  Seat: {
    SeatNumber: "",
    SeatId: ""
  },
  _id: "",
  UserId: "",
  Cabin: " ",
  Price: 0,
  Name: ""
}
  const [theUser, setTheUser] = useState(initialState);
  const [closeId, setId] = useState();
  const [HasError, setHasError] = useState(false);
  const [Error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [errShow,seterrShow]=useState(false);
  const handleClose = () => setShow(false);
  const handleErrClose = () => seterrShow(false);

  const[MyTicket,setMyTicket]=useState(initialMyState);
  const [mailfailed,setmail]=useState(false);
  const handleShow = (theid) => {
    setShow(true);
    setId(theid);
  }
  let navigateBack = useNavigate();


   
  var theIds = [];
  const refreshPage = ()=>{
    window.location.reload();
 }
  useEffect(() => {
    axios.get(`http://localhost:8000/user/viewReserved`).then(res => {
         // window.location.reload()
         //refreshPage();
      setTheUser(res.data)

      if((theUser.TicketsId.length==0)){
        console.log("i came here ");
        setHasError(true);
        setError("You haven't reserved any flights yet!")
      }
    }).catch((err)=> {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
       if (err.response) {
          setHasError(true);
          setError("You entered non valid id")
       }
     })
  }, [props]);
  console.log(theUser);

async function handleMail(Ticket){
  setMyTicket( (theUser.TicketsId).filter((t)=>{
 return  t._id == Ticket }));
 
  console.log(MyTicket[0]);
  try{
    await axios.post(`http://localhost:8000/user/mailmyTicket`, MyTicket[0]);
    setmail(true);
  }catch(err){
    setmail(true);

  }
  // await axios.post(`http://localhost:8000/user/mailmyTicket`, MyTicket[0]);
  

  console.log(MyTicket);

}
function handleBack() {
  navigateBack(-1)
}

  async function handleSubmit() {

    (theUser.TicketsId).forEach((t) => {
      theIds.push(t._id)
    })

    console.log(theIds);
    console.log(closeId);
    console.log(theIds.filter(function (s) {
      return s !== closeId;
    }));

    theObject.Ticket = theIds.filter(function (s) {
      return s !== closeId;
    });
    theObject.theTicket = closeId;
    theObject.Email = theUser.Email;
    theObject.UserName = theUser.FirstName;



    console.log(theObject);
    try {


      await axios.put(`http://localhost:8000/user/updateReserved`, theObject).then(

        theUser.TicketsId = (theUser.TicketsId).filter(function (s) {
          return s._id !== closeId;
        })

        , handleClose()
      )

    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    
    <Container style={{backgroundColor:'#FFFFFF'}} >

        <Modal isOpen={show} style={{marginTop:'20%'}}>
          <ModalHeader
            charCode="Y">
            Cancel Flight Reservation
          </ModalHeader>
          <ModalBody>
            Are you Sure you want to Cancel this ticket no: ${closeId}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => handleSubmit()}
            > Yes, Delete
            </Button>
            {' '}
            <Button onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>        
        </Modal>

        <Modal isOpen={errShow} style={{marginTop:'20%'}}>
          {!(mailfailed)?<ModalHeader>Problem Has Happened ,Try Again</ModalHeader>:<ModalHeader><CheckCircleOutlineSharpIcon></CheckCircleOutlineSharpIcon> Mail Sent</ModalHeader> }
          <ModalFooter>
            {/* <Button
              color="danger"
              onClick={() => handleSubmit()}
            > Yes, Delete
            </Button> */}
            {' '}
            <Button onClick={handleErrClose}>
              Cancel
            </Button>
          </ModalFooter>        
        </Modal>

        <div>
        <h1 className="mb-2 mt-3" style={{paddingTop:'10%'}}> Your reserved tickets : </h1>
        </div>


        <CardColumns >
          <Row >
              {(!HasError)&&(theUser.TicketsId).map((ticket) => (
                

                <Card className="mb-2" >
                  <CardBody>
                    <label class="title">
                      <CloudCircleOutlinedIcon fontSize="large"></CloudCircleOutlinedIcon>&nbsp;&nbsp;&nbsp;
                    SkyOverFlow &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Flight Number:{ticket.Flight.Number}
                    </label>
                     <CardText > 

                     <label class='big'>{ticket.Departure.Airport} <FlightTakeoffOutlinedIcon fontSize="large" ></FlightTakeoffOutlinedIcon>{ticket.Arrival.Airport} </label><br/><br/>

                     <label class="dep">Departure Date:  {(ticket.Departure.Date.toString()).slice(0,10)} </label><br/>
                     <label class="dep"> Departs At:  {ticket.Departure.Time}</label><br/>
                     <label class="dep"> Departure Terminal:  {ticket.Departure.Terminal}</label><br/>


                    <div style={{marginTop:'-7%'}}>
                     <label class="arr">Arrival Date:  {(ticket.Arrival.Date.toString()).slice(0,10)} </label><br/>
                     <label class="arr"> Arrives At:  {ticket.Arrival.Time}</label><br/>
                     <label class="arr"> Arrival Terminal:  {ticket.Arrival.Terminal}</label><br/>
                     </div>
                     <div class='right' style={{marginTop:'-9%',marginLeft:'70%'}}>
                       <label>Passenger Name: {ticket.Name} </label><br/>
                       <label> Ticket Number: {ticket._id} </label><br/>
                       <label>Class: {ticket.Cabin} </label><br/>
                       <label>Seat: {(ticket.Seat.SeatId===null)?(<Button style={{backgroundColor: '#d4902a'}} > <Link  style={{backgroundColor: '#d4902a',color:'#FFF'}} to={`/user/viewSeats/${ticket.Flight.FlightId}/${ticket.Cabin}/${ticket._id}`}> <AirlineSeatLegroomExtraOutlinedIcon></AirlineSeatLegroomExtraOutlinedIcon> Reserve The Seat</Link></Button>):ticket.Seat.SeatNumber }</label><br/>
                     </div>
                      </CardText>
                       <Button className="float-right" color="danger"  onClick={() => {
                        handleShow(ticket._id);
                        theObject.SeatId = ticket.Seat.SeatId;
                        theObject.Price = ticket.Price
                        theObject.TicketName = ticket.Name
                      }}> Cancel </Button>

                      <Button className="float-right" style={{backgroundColor: '#5584AC'}}  onClick={() => {
                        seterrShow(true);
                        handleMail(ticket._id) ;}}> mail me the ticket </Button>

                        
                        <Button> <Link to={{ pathname:`/user/changeSeats/${ticket.Flight.FlightId}/${ticket.Cabin}/${ticket._id}/${ticket.Seat.SeatId}`}}> Change Seat </Link></Button>
                        <Button> <Link to={{pathname:`/user/EditFlightSearch/${ticket._id}` }}>Change Flight</Link></Button>


                      {
                      /* { 
                    <Link to={{ pathname:`/user/changeSeats/${id}/${ticket.Flight.FlightId}/${ticket.Cabin}/${ticket._id}/${ticket.Seat.SeatId}` 
{ 
                    <Link to={{ pathname:`/user/changeSeats/${ticket.Flight.FlightId}/${ticket.Cabin}/${ticket._id}/${ticket.Seat.SeatId}` 
                         
                           }}className="btn btn-primary " color="success">Change Seat</Link> 

                    
                     }
                     
{ 
                    <Link to={{pathname:`/user/EditFlightSearch/${ticket._id}` 
                         
                           }}className="btn btn-primary " color="success">Change Flight</Link> 

                    
                     } */}

                     

                  </CardBody>
                </Card>


              ))
              
              }  
          </Row></CardColumns>

 {HasError && <Alert>{Error}</Alert>}

 <div>
      <Button onClick={handleBack}><ArrowCircleLeftRoundedIcon fontSize="large"></ArrowCircleLeftRoundedIcon> Back </Button>
      </div>



    </Container>
  )
}

export default ViewReserved;