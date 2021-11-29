import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { get, patch,put } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {useParams} from "react-router-dom";
import {Modal,ModalHeader,ModalBody,ModalFooter,CardBody, Card, CardHeader, Form, Input, FormGroup,
        Label, Button, Container, Row, Col, Table} from 'reactstrap';
      
function ViewReserved(props){
 
   
  
    const initialstate = {
        FirstName: '',
        LastName: '',
        Tickets: []
    }
 
    const[closeId, setId]=useState(0);
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (theid) => {setShow(true);
                              setId(theid);}
    const { id } = useParams()
    const [user, setUser] = useState(initialstate);
    useEffect(() => {
       console.log(id);
        async function getUser() {
            try {
                const response = await get(`http://localhost:8000/user/viewReserved/${id}`);
                setUser(response.data);
               
                
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [props]);

       

    async function handleSubmit() { 
    
      console.log(closeId);
      console.log(user.Tickets.filter(function(s){ 
        return s._id !== closeId; }));
      try {
         

         await axios.put(`http://localhost:8000/user/updateReserved/${id}`,user.Tickets.filter(function(s){ 
          return s._id !== closeId; })).then(
      
      setUser({FirstName:user.FirstName,
        LastName:user.LastName,
        Tickets:user.Tickets.filter(function(s){ 
          return s._id !== closeId; })
          
        }),handleClose()
        )
        
      }
      catch(error) {
        console.error(error);
      }
    }
    
    

  


return (
  <div>
     <Modal isOpen={show}  >
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
       <div className="">
       <div className="content">
         <h1>Flights Reserved: </h1>
 
         <br />
         <Container>
 
             <Table bordered>
               <thead><tr>
                 <th>FlightNo</th>
                   <th>From</th>
                   <th>To</th>
                   <th> Flight Date</th>
                   <th>Arrival time </th>
                   <th>Departure time</th>
                   <th>Terminal</th>
                   
                 </tr>
               </thead>
               </Table>
               </Container>
 
 
 
         {user.Tickets.map((flight) => (
           <Container>
             <Table bordered>            
               <tbody>
 
                 <tr>
                   <td>{flight.Id._id}</td>
                   <td>{flight.Id.From }</td>
                   <td>{flight.Id.To}</td>
                   <td>{flight.Id.FlightDate.slice(0,10)}</td>
                   <td>{flight.Id.Arrival}</td>
                   <td>{flight.Id.Departure}</td>
                   <td>{flight.Id.Terminal}</td>
                  <Button color="danger"onClick={()=>handleShow(flight._id)}> Cancel </Button>
                   
                   
                 </tr>
               </tbody>
             </Table>
 
           </Container>
           ))}
 
       </div>
     </div>
     </div>
     
   
   
   );
 }
 
export default ViewReserved;