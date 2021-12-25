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
import "../Style/summay.css"
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
    try{
      //await     
      axios.post(`http://localhost:8000/user/confirmReserved`,Summary) 
          } catch (error) {
          console.error(error);
        }
      
    

      for(let i =0;i<(parseInt(Summary.Children));i++ ){
        Summary.ChildrenNames.push("placeHolder");

      }
      for(let i =0;i<(parseInt(Summary.Adults));i++ ){
        Summary.AdultNames.push("placeHolder");

      }  
  
     
    
    return (
      <div style={{backgroundColor:'#FFF'}}>
      <Container >   
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
                           }}className="btn btn-primary " style={{color:'#FFFFFF',backgroundColor:'#d4902a'}}>Proceed to payment</Link> 
                     }
          
         
        </ModalFooter>
      </Modal>
         
          
             <Form style={{marginTop:'20%',margin:'10%',backgroundColor:'#95D1CC',width:'80%',paddingTop:'5%' ,paddingBottom:'5%' ,borderRadius:'5px'}}>
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
                   

                  <Button style={{color:'#FFFFFF',width:'30%',backgroundColor:'#d4902a',padding:'10px',borderRadius:'6px',marginLeft:'35%',marginRight:'auto'}} onClick={() =>{ 
                   setShow(true);}}> Confirm and Submit </Button>
                  </Form>
                   
        
 
                </Container>  
                </div>
                 

             
          
       

                                                         


  );
                  }
  export default ReserveFlight;