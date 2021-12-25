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
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


function ReserveFlight(){
  
    let navigateBack = useNavigate();
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
      function handleBack() {
        navigateBack(-1)
      }
  
     

    return (
      <div style={{background:"#FFF"}}>
      <Container style={{background:"#FFF"}}>   
         <Modal isOpen={show} style={{marginTop:'20%'}} >
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
                           }}className="btn btn-primary " style={{backgroundColor:'#d4902a'}}> <CreditCardIcon></CreditCardIcon>Proceed to payment</Link> 
                     }
          
         
        </ModalFooter>
      </Modal>
         
          
             <Form  style={{marginTop:'30%',margin:'10%',backgroundColor:'#95D1CC',width:'80%',paddingTop:'5%' ,paddingBottom:'5%' ,borderRadius:'5px'}}>
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
                      required
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
                      required
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
                   

                  <Button style={{backgroundColor:'#d4902a',marginLeft:'40%'}}onClick={() =>{ 
                  setShow(true);}}> <CheckCircleOutlineIcon></CheckCircleOutlineIcon> Confirm and Submit </Button>
                  </Form>
                  <br/><br/><br/>
                  <div>
      <Button onClick={handleBack}><ArrowCircleLeftRoundedIcon fontSize="large"></ArrowCircleLeftRoundedIcon> Back </Button>
      </div>
                   
        
 
                </Container>  
                 

             
          
       </div>

                                                         


  );
  }
  export default ReserveFlight;