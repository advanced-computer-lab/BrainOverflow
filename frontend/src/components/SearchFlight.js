import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import JSONDATA from './MOCK_DATA.json';

import { useNavigate } from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    CardBody, Card,CardImg,CardGroup,CardTitle,CardSubtitle,CardText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader, Form, Input, FormGroup, Label, Button, Container, Row, Col, Table
} from 'reactstrap';


function AllFlights() {
    const searchObject={
        Cabin:'',
        Adults:0,
        Children:0
    };


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
    Baggage:0
},
Business:{
    SeatId:[],
    Price:0,
    Baggage:0
},
First:{
    SeatId:[],
    Price:0,
    Baggage:0
},
Departure:{
    Date:new Date(),
    Time:''
},
Arrival:{
    Date:new Date(),
    Time:''
}


  };
    const [searchTerm , setSearchTerm] =useState('');
    const [closeId, setId] = useState(0);
    const [show, setShow] = useState(false);
    const [View,setView] = useState(true);
    const [firstView ,setFirst ]=useState(false);
    const [BusinessView ,setBusiness ]=useState(false);
    const [EconomyView ,setEconomy ]=useState(false);
    const navigate = useNavigate();
    const [flights, setFlights] = useState([initialstate]);
    const[mysearch,setSearch]=useState(searchObject);
    //const[searchItem,setSearchItem]=useState([]);
    const [displayed, setDisplayed] = useState([initialstate]);

    //const toggle = () => setS(!show);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setId(id);
    }

     useEffect(() => {
        axios.get(`http://localhost:8000/user/viewFlights`).then(res => {
            setFlights(res.data);
            setDisplayed(res.data);

        })

    }, []);
    console.log(flights);


    /*for(let i =0 ; i<filteredFirst.length;i++){
        if(filteredFirst[i].length == 0){
            filteredFirst.splice(i,1);
        }
    
    }*/

    

    //console.log("array : ", flights.length);

   
    //console.log("length" ,flights[3]);



    const addtoList = (event) => {
        event.preventDefault()
        setView(true)
    console.log(View)
    setSearch({Cabin:event.target[0].value,
        Adults:event.target[1].value,
        Children:event.target[2].value}
  );
  console.log(mysearch);
        setDisplayed(flights.filter((f) => {
            let flag1 = false
            let flag2 = false
            let flag3 = false
            let flag4 = false
            let flag5 = false
            let flag6 = false
            let flagFirst =false 
            let flagBusiness =false 
            let flagEconomy =false 
            /*

            const filteredBussiness  =[];
            const filteredEconomy  =[];
            const filteredFirst  =[];
        
            let len = f.length ;
        
            for(let i=0; i< len;i++ ){
                //console.log('lehhhhh');
                //console.log("is booked : ", flights[i].Business.SeatId[0]);
                let lenBusiness = flights[i].Business.SeatId.length;
                let lenEconomy = flights[i].Economy.SeatId.length;
                let lenFirst = flights[i].First.SeatId.length;
                const filteredSeats =[];
                
        
                //console.log(len2);
        
        
        
                for (let b = 0; b < lenBusiness; b++) {
                    //console.log("is booked : ", flights[i].Business.SeatId[b].IsBooked);
                    if (flights[i].Business.SeatId[b].IsBooked == false) {
                        filteredBussiness.push(flights[i]);
                    }
                }
        
                for (let c = 0; c < lenEconomy; c++) {
                    //console.log("is ECobooked : ", flights[i].Economy.SeatId[c].IsBooked);
                    if (flights[i].Economy.SeatId[c].IsBooked == false) {
                        filteredEconomy.push(flights[i].Business.SeatId[c]);
                    }
                }
        
                for (let f = 0; f < lenFirst; f++) {
                    //console.log("is First booked : ", flights[i].First.SeatId[f].IsBooked);
                    if (flights[i].First.SeatId[f].IsBooked == false) {
                        filteredSeats.push(flights[i].First.SeatId[f]);
                    }
                }
                filteredFirst.push(filteredSeats);
        
            };*/
        

            

            if (event.target[0].value !== ''&& event.target[0].value == 'First') { 
                //console.log("class is" ,event.target[0].value);
                setBusiness(false);
                setFirst(true);
                setEconomy(false);
                flagFirst = true  }

            if (event.target[0].value !== ''&& event.target[0].value == 'Business') { 
                //console.log("class is",event.target[0].value);
                setBusiness(true);
                setFirst(false);
                setEconomy(false);
                flagBusiness = true}

            if (event.target[0].value !== ''&& event.target[0].value == 'Economy') { 
                //console.log("class is",event.target[0].value);
                setBusiness(false);
                setFirst(false);
                setEconomy(true);
                flagEconomy = true }

            if (flagFirst){
                //console.log("total is",parseInt(event.target[1].value)+ parseInt(event.target[2].value));
                //console.log("length is",f.First.SeatId.length);
                if(event.target[1].value ==''){
                    flag1 = ((0 + parseInt(event.target[2].value))<=f.First.SeatId.length )
                }
                else if (event.target[2].value==''){
                    flag1 = ((parseInt(event.target[1].value)+ 0)<=f.First.SeatId.length)

                }
                else if (event.target[1].value=='' && event.target[2].First==''){
                    flag1 = (0<=f.First.SeatId.length)
                }
                else {
                    flag1 = ((parseInt(event.target[1].value)+ parseInt(event.target[2].value))<=f.First.SeatId.length)

                }

            }
            else { flag1 = true }

            if (flagBusiness){
                //console.log("total is",parseInt(event.target[1].value)+ parseInt(event.target[2].value));
                if(event.target[1].value ==''){
                    flag2 = ((0 + parseInt(event.target[2].value))<=f.Business.SeatId.length)
                }
                else if (event.target[2].value==''){
                    flag2 = ((parseInt(event.target[1].value)+ 0)<=f.Business.SeatId.length)

                }
                else if (event.target[1].value=='' && event.target[2].value==''){
                    flag2 = (0<=f.Business.SeatId.length)
                }
                else {
                    flag2 = ((parseInt(event.target[1].value)+ parseInt(event.target[2].value))<=f.Business.SeatId.length)

                }

            }
            else { flag2 = true }

            if (flagEconomy ){
                //console.log("total is",parseInt(event.target[1].value)+ parseInt(event.target[2].value));
                if(event.target[1].value ==''){
                    flag3 = ((0 + parseInt(event.target[2].value))<=f.Economy.SeatId.length)
                }
                else if (event.target[2].value==''){
                    flag3 = ((parseInt(event.target[1].value)+ 0)<=f.Economy.SeatId.length)

                }
                else if (event.target[1].value=='' && event.target[2].value==''){
                    flag3 = (0<=f.Economy.SeatId.length)
                }
                else {
                    flag3 = ((parseInt(event.target[1].value)+ parseInt(event.target[2].value))<=f.Economy.SeatId.length)

                }
                
            }
            else { flag3 = true }

            if(event.target[3].value !==''){
                //console.log("3 is",event.target[3].value);
                flag4 =(event.target[3].value.toLocaleLowerCase()==f.From.Airport.toLocaleLowerCase());}
            else{flag4 = true}

           if(event.target[4].value !==''){
                //console.log("4 is",event.target[4].value);
                flag5=(event.target[4].value.toLocaleLowerCase()==f.To.Airport.toLocaleLowerCase())}
            else{flag5 = true}

           if (event.target[5].value !== '') {

                let d1 = event.target[5].value
                let d2 = f.Departure.Date.slice(0, 10)
                //console.log("5 is",event.target[5].value);
                //console.log(d2);
                flag6 = (d1 == d2);

            } else { flag6 = true }
                            
            return flag1 & flag2 & flag3 & flag4 & flag5 & flag6 ;
        }

        ))
        

        console.log(displayed);
        
        

    }


    return (
        

        <div>
            <Form onSubmit={addtoList}>
                <Col md={3}>
                    <FormGroup>
                        <input list= "class" placeholder = "class" required ></input>
                        <datalist id ="class">
                            <option value ="First">First</option>
                            <option value ="Economy">Economy</option>
                            <option value ="Business">Business</option>
                        </datalist>
                        <br></br>
                        <br></br>
                        <label>  Number of adult passengers :</label>
                        <Input
                            id="passengers"
                            name="passengers"
                            default ="0"
                            placeholder="passengers placeholder"
                            type="Number"
                            required
                        />
                        <br></br>
                        <br></br>
                        <Label for="PassengersChild">
                            Number of children passengers :
                        </Label>
                        <Input
                            id="Childpassengers"
                            default ="0"
                            placeholder="passengers placeholder"
                            type="Number"
                            required
                        />
                        <br></br>
                        <Label for=" departure City ">
                            departure City :
                        </Label>
                        <Input
                            id="DepartureCity "
                            name="departureCity"
                            placeholder="search..."
                            list ="departureCity"
                            onChange={event =>{setSearchTerm(event.target.value)}}
                            required
                        />
                        <datalist id="departureCity">
                        {JSONDATA.filter((val)=>{
                            if(searchTerm==""){
                                return val
                            } else if(val.city.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())||val.country.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())||val.Airport.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
                                return val 
                            }
                        }).map((val,key)=>{
                            return<option value={val.city} key={key}>{val.AirportCode},{val.Airport},{val.city}, {val.country}</option>
                        })}
                        </datalist>
                        <br></br>
                        <Label for=" Arrival city ">
                            Arrival City :
                        </Label>
                        <Input
                            id="ArrivalCity "
                            name="ArrivalCity"
                            placeholder="search..."
                            list ="arrivalCity"
                            onChange={event =>{setSearchTerm(event.target.value)}}
                            required
                        />
                        <datalist id="arrivalCity">
                        {JSONDATA.filter((val)=>{
                            if(searchTerm==""){
                                return val
                            } else if(val.city.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())||val.country.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())||val.Airport.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
                                return val 
                            }
                        }).map((val,key)=>{
                            return<option value={val.city} key={key}>{val.AirportCode},{val.Airport},{val.city}, {val.country}</option>
                        })}
                        </datalist>
                        <br></br>
                        <Label for="departure Date">
                            departure Date:
                        </Label>
                        <Input
                            id="DepartureDate"
                            name="DepartureDate"
                            placeholder="DepartureDate"
                            type="date"
                            
                        />
                        <br></br>
                        <Label for="arrival Date">
                            Return Date:
                        </Label>
                        <Input
                            id="ReturnDate"
                            name="ArrivalDate"
                            placeholder="ArrivalDate"
                            type="date"
                            
                        />
            
                        

                
                    </FormGroup>
                </Col>

                <div className="search">
                    <Button
                        color="info"
                        size="lg"
                        type="submit"
                    >
                        Search</Button>
                </div>
            </Form>

            {View ? 


            <div className="">
                <div className="content">
                <CardGroup>

                    {displayed.map((flight) => (
                        <Card>
                        <CardBody>
                          <CardTitle tag="h5">
                            Flight summary :
                          </CardTitle>
                          <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                          >
                            From :{flight.From.Airport}
                            To :{flight.To.Airport}
                          </CardSubtitle>
                          <CardText>
                          {firstView ? <label>price of First class : {flight.First.Price}</label> :<label></label>}
                          {BusinessView?<label> price of Business class : {flight.Business.Price}</label>:<label></label>}
                          {EconomyView?<label> price of Economy class : {flight.Economy.Price}</label>:<label></label>}
                          Arrival time:{flight.Arrival.Time} 
                          Departure time: {flight.Departure.Time}</CardText>
                          <Button>
                          <Link to={{ pathname:`/user/viewFlight/${flight._id}` 
                         , search:'?'+new URLSearchParams(mysearch).toString()
                           }}className="btn btn-primary">Show Details</Link>
                          </Button>
                        </CardBody>
                      </Card>
                    ))}
                    </CardGroup>

                </div>
            </div>
            :<label></label>}   

        </div>


    );
}




export default AllFlights;