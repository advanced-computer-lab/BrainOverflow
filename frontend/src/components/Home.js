import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/Navbar.css';
import '../Style/summay.css';
//import "../css/style.css";



import { useNavigate } from 'react-router-dom';
import JSONDATA from './MOCK_DATA.json';

//import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  CardBody, Card, CardTitle , Dropdown,CardSubtitle,CardText,Alert,CardGroup, DropdownToggle, DropdownMenu, DropdownItem, CardHeader, Form, Input, FormGroup, Label, Button, Container, Row, Col, Table
} from 'reactstrap';
import{
  UncontrolledCarousel
} from 'reactstrap';






function Home() {
  const searchObject = {
      Cabin: '',
      Adults: 0,
      Children: 0,
      ReturnDate: new Date()
  };


  const initialstate =
  {
      From: {
          Airport: '',
          Terminal: ''
      },
      To: {
          Airport: '',
          Terminal: ''
      },
      Economy: {
          SeatId: [],
          Price: 0,
          Baggage: 0
      },
      Business: {
          SeatId: [],
          Price: 0,
          Baggage: 0
      },
      First: {
          SeatId: [],
          Price: 0,
          Baggage: 0
      },
      Departure: {
          Date: new Date(),
          Time: ''
      },
      Arrival: {
          Date: new Date(),
          Time: ''
      }


  };
  const [searchTerm, setSearchTerm] = useState('');
  const [closeId, setId] = useState(0);
  const [show, setShow] = useState(false);
  const [View, setView] = useState(false);
  const [HasError, setHasError] = useState(false);
  const [Error, setError] = useState('');
  const [firstView, setFirst] = useState(false);
  const [BusinessView, setBusiness] = useState(false);
  const [EconomyView, setEconomy] = useState(false);
  const navigate = useNavigate();
  const [flights, setFlights] = useState([initialstate]);
  const [mysearch, setSearch] = useState(searchObject);
  const [wrongDate,setWrongDate]=useState(false);
  const [wrongPass,setPassengers]=useState(false);

  const [noResult,setnoResult]=useState(false);


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
      }).catch((err)=> {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
           if (err.response) {
              setHasError(true);
              setError(err.message)
           }
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
  //setView(false)

  const addtoList = (event) => {
      event.preventDefault()
      setView(true)
      console.log(View)
      setSearch({
          Cabin: event.target[0].value,
          Adults: event.target[1].value,
          Children: event.target[2].value,
          ReturnDate: event.target[6].value
      });
      setDisplayed(flights.filter((f) => {
          let flag1 = false
          let flag2 = false
          let flag3 = false
          let flag4 = false
          let flag5 = false
          let flag6 = false
          let flagFirst = false
          let flagBusiness = false
          let flagEconomy = false
          let total = parseInt(event.target[1].value) + parseInt(event.target[2].value)
          let cabin = event.target[0].value == 'Business'
          let returnfrom =event.target[4].value.toLocaleLowerCase()
          let returnto =event.target[3].value.toLocaleLowerCase()
          let ReturnDate = event.target[6].value
          console.log("returnto : " , returnto);
          console.log("returnfrom : " , returnfrom);


          

          if (event.target[0].value !== '' && event.target[0].value == 'First') {
              //console.log("class is" ,event.target[0].value);
              setBusiness(false);
              setFirst(true);
              setEconomy(false);
              flagFirst = true;
              cabin ='First'
          }

          if (event.target[0].value !== '' && event.target[0].value == 'Business') {
              //console.log("class is",event.target[0].value);
              setBusiness(true);
              setFirst(false);
              setEconomy(false);
              flagBusiness = true;
              cabin ='Bussiness'
          }

          if (event.target[0].value !== '' && event.target[0].value == 'Economy') {
              //console.log("class is",event.target[0].value);
              setBusiness(false);
              setFirst(false);
              setEconomy(true);
              flagEconomy = true;
              cabin ='Economy'
          }

          if (flagFirst) {
              //console.log("total is",parseInt(event.target[1].value)+ parseInt(event.target[2].value));
              //console.log("length is",f.First.SeatId.length);
              let len = f.First.SeatId.length;
              let countseats = 0;
              console.log("length of First ", len)
              for (let i = 0; i < len; i++) {
                  if (f.First.SeatId[i].IsBooked == false) {
                      countseats++;
                  }
              }
              flag1 = (((parseInt(event.target[1].value) + parseInt(event.target[2].value)) <= countseats) && (countseats != 0)
              &&((parseInt(event.target[1].value) + parseInt(event.target[2].value)) <= f.First.SeatsLeft)
              )
              }else { flag1 = true }

          if (flagBusiness) {
              let len = f.Business.SeatId.length;
              let countseats = 0;
              console.log("length of Bussiness ", len)
              for (let i = 0; i < len; i++) {
                  if (f.Business.SeatId[i].IsBooked == false) {
                      countseats++;
                  }
              }
            
           flag2 = (((parseInt(event.target[1].value) + parseInt(event.target[2].value)) <= countseats) && (countseats != 0)
           &&((parseInt(event.target[1].value)+ parseInt(event.target[2].value)) <= f.Business.SeatsLeft)
           )
          }
          else { flag2 = true }

          if (flagEconomy) {
              let len = f.Economy.SeatId.length;
              let countseats = 0;
              console.log("length of Economy ", len)
              for (let i = 0; i < len; i++) {
                  if (f.Economy.SeatId[i].IsBooked == false) {
                      countseats++;
                  }
              }

          flag3 = (((parseInt(event.target[1].value) + parseInt(event.target[2].value)) <= countseats) && (countseats != 0) 
          &&((parseInt(event.target[1].value) + parseInt(event.target[2].value)) <= f.Economy.SeatsLeft)
          )

          }
          else { flag3 = true }

          if (event.target[3].value !== '') {
              //console.log("3 is",event.target[3].value);
              flag4 = (event.target[3].value.toLocaleLowerCase() == f.From.Airport.toLocaleLowerCase());
          }
          else { flag4 = true }

          if (event.target[4].value !== '') {
              //console.log("4 is",event.target[4].value);
              flag5 = (event.target[4].value.toLocaleLowerCase() == f.To.Airport.toLocaleLowerCase())
          }
          else { flag5 = true }

          if (event.target[5].value !== '') {

              let d1 = event.target[5].value
              let d2 = f.Departure.Date.slice(0, 10)
              //console.log("5 is",event.target[5].value);
              //console.log(d2);
              flag6 = (d1 == d2);

          } else { flag6 = true }
          
           const result =  flights.filter(rflight=> {
              let rflag1 =false;
              let rflag2 =false;
              let rflag3 =false;
              let rflag4 = false;
              rflag1 =((rflight.To.Airport.toLocaleLowerCase() == returnto) && (rflight.From.Airport.toLocaleLowerCase() ==returnfrom) && (rflight.Departure.Date.slice(0,10) == ReturnDate))

              if(cabin =='First'){
                  //change later to 
                  rflag2=(total<=rflight.First.SeatsLeft)
                  //rflag2=(total<=rflight.First.SeatId.length)
              }else{rflag2 = true }

              if(cabin =='Business'){
                  //change later to 
                  rflag3=(total<=rflight.Business.SeatsLeft)
                  //rflag3=(total<=rflight.Business.SeatId.length)
              }else{rflag3 = true }
              if(cabin =='Economy'){
                  //change later to ***
                  rflag4=(total<=rflight.Economy.SeatsLeft)
                  //rflag4=(total<=rflight.Economy.SeatId.length)
              }else{rflag4 = true }
              return rflag1 & rflag2 & rflag3 &rflag4 ;
          }
            )
          
      console.log("looop : ", result);
      console.log("looop : ", result.length);
      let returnflag = false;
      if(result.length>0 && result.length!=flights.length){
          returnflag = true ;
      }else{
          returnflag = false ;
      }
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      //checking the date 
      if (event.target[5].value > event.target[6].value || event.target[5].value<date ||event.target[6].value<date) {
        setWrongDate(true);
        returnflag = false ;

    }else{
        setWrongDate(false);
    }
    if(event.target[0].value==null ||event.target[1].value==null||event.target[2].value==null||event.target[3].value==null||event.target[4].value==null||event.target[5].value==null||event.target[6].value==null){
        returnflag=false;
    }
    if(parseInt(event.target[1].value) + parseInt(event.target[2].value)==0){
        returnflag=false;
        setPassengers(true);
    }
    else{
        setPassengers(false);
    }

    setnoResult(!(flag1 & flag2 & flag3 & flag4 & flag5 & flag6 & returnflag))

      
      return flag1 & flag2 & flag3 & flag4 & flag5 & flag6 & returnflag;
          

      }

      ))



      console.log(displayed);
      
  }




  return (
      <div>
      <img src ="https://i.pinimg.com/originals/f7/ef/fc/f7effc7dd95bfcf8b3a41a0a54910a9c.gif"></img>
    <div style={{backgroundColor: 'rgb(255, 255, 255)'}}>

      <section class ="search" >
      <Container style={{padding:"5% 2%",backgroundColor: '#F6F2D',borderRadius:'5px'}}>
      <h1>Search For A Flight</h1>

              <Row xs="1" className=''>

                  <Form onSubmit={addtoList} >
                      <FormGroup row>
                      <Col>
                          <Label for="Class">Cabin Class :</Label>
                        
                              <input list="class" placeholder="class" required name ="Class" id ="Class"></input>
                              <datalist id="class" >
                                  <option value="First">First</option>
                                  <option value="Economy">Economy</option>
                                  <option value="Business">Business</option>
                              </datalist>
                              </Col>
                              <Col>
                              <Label for="Passengers">  Adults :</Label>
                                                             <Input
                                  id="passengers"
                                  name="passengers"
                                  default="0"
                                  placeholder="passengers"
                                  type="Number"
                                  min={0}
                                  required
                              />
                          </Col>
                          <Col>
                              <Label for="PassengersChild">
                                  Children :
                              </Label>
                              <Input

                                  id="Childpassengers"
                                  default="0"
                                  placeholder="Children"
                                  type="Number"
                                  min={0}
                                  required
                                  class="form-control"
                                  
                              />
                          </Col>
                          <Col>
                              <Label for=" departure City ">
                                  Departure City :
                              </Label>
                              <Input
                                  id="DepartureCity "
                                  name="departureCity"
                                  placeholder="search..."
                                  list="departureCity"
                                  onChange={event => { setSearchTerm(event.target.value) }}
                                  required
                              />
                          
         
                              <datalist id="departureCity">
                                  {JSONDATA.filter((val) => {
                                      if (searchTerm == "") {
                                          return val
                                      } else if (val.city.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.country.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.Airport.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                          return val
                                      }
                                  }).map((val, key) => {
                                      return <option value={val.city} key={key}>{val.AirportCode},{val.Airport},{val.city}, {val.country}</option>
                                  })}
                              </datalist>
                          </Col>
                          <Col>
                              <Label for=" Arrival city ">
                                  Arrival City :
                              </Label>
                              <Input
                                  id="ArrivalCity "
                                  name="ArrivalCity"
                                  placeholder="search..."
                                  list="arrivalCity"
                                  onChange={event => { setSearchTerm(event.target.value) }}
                                  required
                              />
                              
                              <datalist id="arrivalCity">
                                  {JSONDATA.filter((val) => {
                                      if (searchTerm == "") {
                                          return val
                                      } else if (val.city.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.country.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.Airport.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                          return val
                                      }
                                  }).map((val, key) => {
                                      return <option value={val.city} key={key}>{val.AirportCode},{val.Airport},{val.city}, {val.country}</option>
                                  })}
                              </datalist>
                          </Col>
                          <Col>
                              <Label for="departure Date">
                                  Departure Date:
                              </Label>
                              <Input
                                  id="DepartureDate"
                                  name="DepartureDate"
                                  placeholder="DepartureDate"
                                  type="date"
                                  required
                              />
                          </Col>
                          <Col>
                              <Label for="Return Date">
                                  Return Date:
                              </Label>
                              <Input
                                  id="ReturnDate"
                                  name="ArrivalDate"
                                  placeholder="ArrivalDate"
                                  type="date"
                                  required
                              />
                              </Col>



                      </FormGroup>

                      <div className="search" class="center">
                          <Button  style={{backgroundColor: 'rgb(34, 87, 126)',width:'500px'}}
                              color="info"
                              size="lg"
                              type="submit"
                              class="btn-search"
                          >
                              Search For A Flight <span class= "glyphicon glyphicon-send"></span></Button>
                              <br/><br/>
                      </div>
                  </Form>
              </Row>
              {View ?
                  <div className="">
                      <div className="content">

                              {displayed.map((flight) => (
                                  <Card style={{padding:"0% 2%",backgroundColor: '#B2DADB',borderRadius:'5px',width:'70%',marginLeft:'auto',marginRight:'auto'}}>
                                      <CardBody>
                                          <CardTitle tag="h5">
                                          <label className="infofrom" style={{width:'80%',marginLeft:'10%',marginRight:'auto'}}> <b>
                                          From :  {flight.From.Airport} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                              <img style={{width:'100px',height:'60px',transform:"scale(3)"}} src='https://starpng.com/public/uploads/preview/divider-line-png-line-with-circle-end-51575252914xxvixllcy9.png'></img>
                                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To :  {flight.To.Airport} </b></label>
                                          </CardTitle>
                                          <CardText style={{color:'rgb(0, 0, 0)'}}>
                                              {(firstView) && (mysearch.Adults > 0) ? <label>Price of First class Adult Ticket : {flight.First.Price}<br></br> </label> :
                                                  BusinessView && (mysearch.Adults > 0) ? <label> Price of Business class Adult Ticket: {flight.Business.Price}<br></br> </label> :
                                                      EconomyView && (mysearch.Adults > 0) ? <label> Price of Economy class Adult Ticket : {flight.Economy.Price}<br></br> </label> : <label></label>}

                                              {(firstView) && (mysearch.Children > 0) ? <label>Price of First class Children Ticket : {flight.First.ChildPrice}<br></br> </label> :
                                                  BusinessView && (mysearch.Children > 0) ? <label> Price of Business class Children Ticket: {flight.Business.ChildPrice}<br></br> </label> :
                                                      EconomyView && (mysearch.Children > 0) ? <label> price of Economy class Children Ticket : {flight.Economy.ChildPrice}<br></br> </label>: <label></label>}
                                                      <br/>
                                              Departure Date : {(flight.Departure.Date.toString()).slice(0,10)}<br/>
                                              Departure time: {flight.Departure.Time}<br/>
                                              Arrival Date : {(flight.Arrival.Date.toString()).slice(0,10)}<br/>
                                              Arrival time:{flight.Arrival.Time}<br/>
                                          </CardText>
                                          <Button class="center" style={{backgroundColor: '#96C7C1' ,marginLeft:'80%',marginTop:'-20%',padding:'10px'}}>
                                              <Link  style={{backgroundColor: '#22577E'}}to={{
                                                  pathname: `/user/viewFlight/${flight._id}`
                                                  , search: '?' + new URLSearchParams(mysearch).toString()
                                              }} className="btn btn-primary">Choose This Flight</Link>
                                          </Button>
                                      </CardBody>
                                  </Card>
                                  
                              ))}

                      </div>

                  </div>
                  
                  : <label></label>}
{!(View) &&<Alert color="danger"><a align="center">Enter search parameters to view flights</a></Alert>}

{console.log(displayed.length)}
{(wrongDate) &&<Alert color="info"><a align="center">Please Enter a valid Date</a></Alert>}

{(wrongPass) &&<Alert color="info"><a align="center">Please Enter Number of Seats </a></Alert>}
{(noResult) &&(displayed.length==0)&&<Alert color="danger"><a align="center">Sorry, No Flights are Available for these requirements</a></Alert>
}
{HasError &&  <Col className="bg-light "> <Alert align="center" color="danger" Row > 
<a align="center" style={(Error)?{display: 'block',color:'red',fontSize:'20px'}:{display: 'none'}}><CardTitle>{Error}</CardTitle></a></Alert></Col> 
}

      </Container>
      
      </section>

      
      </div>
      
      
      </div>
      
  );
}


export default Home;
