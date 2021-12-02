import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { get, patch,put } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {useParams} from "react-router-dom";
import {Modal,ModalHeader,ModalBody,ModalFooter,CardBody,CardColumns,CardTitle,CardSubtitle, Card, CardHeader, Form, Input, FormGroup,
        Label, Button, Container, Row, Col, Table,Alert} from 'reactstrap';
      
function ViewReserved(props){
  const[theObject,setTheObject]=useState({
    SeatId:"",
    Ticket:[""]
  })
 const initialState={_id:"",
 FirstName:"",
 LastName:"shreef",
  TicketsId:[{Flight:
    {
      FlightId:""
      ,Number:""},
  Departure:{Airport:"",Terminal:0,Date:"",Time:""},
  Arrival:{Airport: "",
  Terminal:0,
  Date:"",
  Time:""},
  Seat:{SeatNumber:"",
        SeatId:""},
    _id:"",
    UserId:"",
    Cabin:" ",
    Price:0,
    Name:""}],
  Country:""};
    
  const[theUser,setTheUser]=useState(initialState);
  const[closeId,setId]=useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (theid) => {setShow(true);
                                setId(theid);}
                               
 const { id } = useParams();
   var theIds=[];
  
  useEffect(() => {
          axios.get(`http://localhost:8000/user/viewReserved/${id}`).then(res => {
            setTheUser(res.data) 
             
          
           })
      }, [props]);
console.log(theUser);

       

    async function handleSubmit() { 
    
      (theUser.TicketsId).forEach((t)=>{
       theIds.push(t._id)
     } ) 
      console.log(theIds);
      console.log(closeId);
      console.log(theIds.filter(function(s){ 
        return  s!== closeId; })   );
      
        theObject.Ticket= theIds.filter(function(s){ 
        return  s!== closeId; }) ;
      

    

       
      console.log(theObject);
      try {
         

         await axios.put(`http://localhost:8000/user/updateReserved/${id}`,theObject).then(
        
         theUser.TicketsId=(theUser.TicketsId).filter(function(s){ 
          return  s._id!== closeId; })  
          
       ,handleClose()
        )
        
      }
      catch(error) {
        console.error(error);
      }
    }
    
    

  


return (
  <div>
     <Modal isOpen={show}>
     <ModalHeader
       charCode="Y">
       Delete Flight
     </ModalHeader>
     <ModalBody>
      Are you Sure you want to Cancel this ticket no: ${closeId}
     </ModalBody>
     <ModalFooter>
       <Button
         color="danger"
         onClick={()=>handleSubmit()}
       >
         Yes, Delete
       </Button>
       {' '}
       <Button onClick={handleClose}>
         Cancel
       </Button>
     </ModalFooter>
   </Modal>
   <CardColumns>
   <Row>
   <Col sm="6">
    { (theUser.TicketsId).map((ticket) => ( 
                     
          <Card >      
        <CardBody>
        <CardTitle tag="h5">
         SkyOverFlow  
        </CardTitle>
        <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
          Passenger Name: {ticket.Name} &nbsp;&nbsp;FlightNumber: {ticket.Flight.Number}&nbsp;&nbsp;Ticket Number: {ticket._id} <br/>
          From: {ticket.Departure.Airport }&nbsp;&nbsp;To: {ticket.Arrival.Airport} <br/>
          Class: {ticket.Cabin}&nbsp;&nbsp;Seat:{ticket.Seat.SeatNumber} &nbsp;&nbsp; Date:{ticket.Departure.Date}&nbsp;&nbsp;Departs At:{ticket.Departure.Time} &nbsp;&nbsp;  Arrives At:{ticket.Arrival.Time} <br/>
          Departure Terminal: {ticket.Departure.Terminal}&nbsp;&nbsp;Arrival Terminal:{ticket.Arrival.Terminal} <br/>
         <Button color="danger"onClick={()=>{handleShow(ticket._id);
                                             theObject.SeatId=ticket.Seat.SeatId;}}> Cancel </Button>
         </CardSubtitle>
         </CardBody>
         </Card> 
         
         
    ))}  </Col>
    </Row></CardColumns> 
      
         </div>
               
               )
              }
 
export default ViewReserved;