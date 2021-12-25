import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom'
import {Modal,ModalHeader,ModalBody,ModalFooter,CardBody, Card, CardHeader, Form, Input, FormGroup,
        Label, Button, Container, Row, Col, Table} from 'reactstrap';
import {useParams,useLocation} from "react-router-dom";
function ReserveFlight(){

    let location = useLocation();
    let search=new URLSearchParams(location.search);
    const Summary={
        AdultNames:[],
        ChildrenNames:[],
        Cabin:search.get('Cabin'),
        Adults:search.get('Adults'),
        Children:search.get('Children'),
        DepartureId:search.get('DepartureId'),
        ReturnFlightId:search.get('ReturnFlightId'),
        DeparturePriceAdult:search.get('DeparturePriceAdult'),
        DeparturePriceChild:search.get('DeparturePriceChild'),
        DepatureTotalPrice:search.get('DepatureTotalPrice'),
        ReturnPriceAdult:search.get('ReturnPriceAdult'),
        ReturnPriceChild:search.get('ReturnPriceChild'),
        ReturnTotalPrice:search.get('ReturnTotalPrice')
                       
    };
   
    const{id}=useParams();
    console.log(id);
     
    const [show, setShow] = useState(false);
    

      for(let i =0;i<(parseInt(Summary.Children));i++ ){
        Summary.ChildrenNames.push("placeHolder");

      }
      for(let i =0;i<(parseInt(Summary.Adults));i++ ){
        Summary.AdultNames.push("placeHolder");

      }  
  
     

    return (
      <Container>   
         <Modal isOpen={show}  >
         <ModalHeader
          charCode="Y"

        >
          Tickets Reservation
        </ModalHeader>
        <ModalBody>
          To confirm your tickets , please click proceed to payment
        </ModalBody>
        <ModalFooter>
          { 
                    <Link to={{ pathname:`/user/payment` 
                         , search:'?'+new URLSearchParams(Summary).toString()
                           }}className="btn btn-primary " color="success">Proceed to payment</Link> 
                     }
          
         
        </ModalFooter>
      </Modal>
         
          
             <Form>
                   {    
                  Summary.AdultNames.map((thename)=>(
                    <FormGroup>
                    <Label for="exampleEmail">
                      Enter The Name for the adult Passenger:
                    </Label>
                    <Input
                      name="Name"
                      placeholder="FirstName LastName"
                      type="text"
                      onChange={(e)=>{
                        thename=e.target.value;
                        console.log(thename);
                        Summary.AdultNames.shift();
                        Summary.AdultNames.push(thename);
                        console.log(Summary)
                      }}
                    />
                     </FormGroup>))
                 
                   
                  
                  }
                  { Summary.ChildrenNames.map((thename)=>(
                    <FormGroup>
                    <Label for="exampleEmail">
                      Enter The Name for the adult Passenger:
                    </Label>
                    <Input
                      name="Name"
                      placeholder="FirstName LastName"
                      type="text"
                      onChange={(e)=>{
                        thename=e.target.value;
                        console.log(thename);
                        Summary.ChildrenNames.shift();
                        Summary.ChildrenNames.push(thename);
                      }}
                    />
                     </FormGroup>
                  )
                    
                  )}
                   

                  <Button color="danger" onClick={() =>{ 
                                            setShow(true);}}> Confirm and Submit </Button>
                  </Form>
                   
        
 
                </Container>  
                 

             
          
       

                                                         


  );
  }
  export default ReserveFlight;