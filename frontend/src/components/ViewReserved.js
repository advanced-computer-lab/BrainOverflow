import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { get, patch, put } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import {
  Modal, ModalHeader, ModalBody, ModalFooter, CardBody, CardColumns, CardTitle, CardSubtitle, Card, CardHeader, Form, Input, FormGroup,
  Label, Button, Container, Row, Col, Table, Alert , CardText,Badge
} from 'reactstrap';
import '../App.css'

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
    LastName: "shreef",
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

  const [theUser, setTheUser] = useState(initialState);
  const [closeId, setId] = useState();
  const [HasError, setHasError] = useState(false);
  const [Error, setError] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (theid) => {
    setShow(true);
    setId(theid);
  }

  const { id } = useParams();
  var theIds = [];

  useEffect(() => {
    axios.get(`http://localhost:8000/user/viewReserved/${id}`).then(res => {
      setTheUser(res.data)

      if(!(theUser)){
        console.log("i came here ");
        setHasError(true);
        setError("You have to sign up to book a flight")
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


      await axios.put(`http://localhost:8000/user/updateReserved/${id}`, theObject).then(

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
    <Container style={{backgroundColor: '#F0F8FF'}} >
        <Modal isOpen={show}>
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
        <h1 className="mb-2 mt-3"> Your reserved tickets : </h1>
        <CardColumns>
          <Row>
              {(!HasError)&&(theUser.TicketsId).map((ticket) => (

                <Card className="mb-2">
                  <CardBody>
                    <CardTitle tag="h5" className="title">
                      SkyOverFlow
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6"
                    >
                     <CardText className="mt-2 mb-2 mr-5 ml-5  text-dark" >  
                     Passenger Name: 
  <Badge style={{color: '#f1f1f1'}} className='ml-5'> {ticket.Name}</Badge> <br/></CardText>
                     <CardText className="mt-2 mb-2 mr-5  text-dark" >  FlightNumber:<Badge style={{backgroundColor: '#f1f1f1'}}> {ticket.Flight.Number}<br/></Badge></CardText>
                     <CardText className="mt-2 mb-2 mr-5 ml-5 text-dark">  Ticket Number: <Badge style={{color: '#f1f1f1'}} >{ticket._id} <br /></Badge></CardText>
                     <CardText className="mt-2 mb-2 mr-5 ml-5 text-dark">  From:<Badge style={{color: '#f1f1f1'}} > {ticket.Departure.Airport}</Badge></CardText>
                     <CardText className="mt-2 mb-2 mr-5 ml-5 text-dark"> To: <Badge style={{color: '#f1f1f1'}} >{ticket.Arrival.Airport} <br /></Badge></CardText>
                     <CardText className="mt-2 mb-2 mr-5 ml-5 text-dark">  Class:<Badge style={{color: '#f1f1f1'}} > {ticket.Cabin}<br/></Badge></CardText>
                     <CardText className="mt-2 mb-2 mr-5 ml-5 text-dark">   Seat: {(ticket.Seat.SeatId===null)?(<Button> <Link to={`/user/viewSeats/${id}/${ticket.Flight.FlightId}/${ticket.Cabin}/${ticket._id}`}> Reserve The Seat</Link></Button>):ticket.Seat.SeatNumber }</CardText>
                     <CardText className="mt-2 mb-2 mr-5 ml-5 text-dark">    Date:<Badge style={{color: '#f1f1f1'}} > {ticket.Departure.Date}<br/></Badge></CardText>
                       <CardText className="mt-2 mb-2 mr-5 ml-5 text-dark">    Departs At:<Badge style={{color: '#f1f1f1'}} > {ticket.Departure.Time} <br/></Badge></CardText>
                       <CardText className="mt-2 mb-2 mr-5 ml-5 text-dark  ">     Arrives At: <Badge style={{color: '#f1f1f1'}} >{ticket.Arrival.Time} <br /></Badge></CardText>
                       <CardText className="mt-2 mb-2 mr-5 ml-5 text-dark">     Departure Terminal: <Badge style={{color: '#f1f1f1'}} >{ticket.Departure.Terminal}<br/></Badge></CardText>
                       <CardText className="mt-2 mb-2 mr-5 ml-5 text-dark">     Arrival Terminal: <Badge style={{color: '#f1f1f1'}} >{ticket.Arrival.Terminal} <br /></Badge></CardText>
                       <Button className="float-right" color="danger"  onClick={() => {
                        handleShow(ticket._id);
                        theObject.SeatId = ticket.Seat.SeatId;
                        theObject.Price = ticket.Price
                        theObject.TicketName = ticket.Name
                      }}> Cancel </Button>

{ 
                    <Link to={{ pathname:`/user/changeSeats/${id}/${ticket.Flight.FlightId}/${ticket.Cabin}/${ticket._id}/${ticket.Seat.SeatId}` 
                         
                           }}className="btn btn-primary " color="success">Change Seat</Link> 

                    
                     }
                     { 
                    <Link to={{ pathname:`/user/changeSeats/${id}/${ticket.Flight.FlightId}/${ticket.Cabin}/${ticket._id}/${ticket.Seat.SeatId}` 
                         
                           }}className="btn btn-primary " color="success">Change Flight</Link> 

                    
                     }
                    </CardSubtitle>
                  </CardBody>
                </Card>


              ))}  
          </Row></CardColumns>

          {HasError &&  <Col className="bg-light "> <Alert align="center" color="danger" Row > 
<a align="center" style={(Error)?{display: 'block',color:'red',fontSize:'20px'}:{display: 'none'}}><CardTitle>{Error}</CardTitle></a></Alert></Col> 
}
    </Container>
  )
}

export default ViewReserved;