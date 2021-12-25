import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/Navbar.css';
import '../Style/summay.css';
//import "../css/style.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import Tooltip from '@mui/material/Tooltip';


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
  

  const itemData = [
    {
        img: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0006/7923/brand.gif?itok=eP_eGDs8',
        title: 'Star Alliance',
      },
    {
      img: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/9634cf4370615.560c988391020.png',
      title: 'Booking',
    },
    {
      img: 'https://i.pinimg.com/originals/de/f7/b6/def7b694904830d5804ee5975b69e9ed.png',
      title: 'Hotel',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkfxv65nxgDStYa4OhFH4fpNtJaNf0yI0w0kMB764oUDcQNA0F2e0CCEiLJUPybgXVyFA&usqp=CAU',
      title: 'Magazine',
    },
    {
      img: 'https://i.pinimg.com/564x/cd/57/d1/cd57d12a9440dadbf544022d4c4804cc.jpg',
      title: 'Tour',
    },
    {
      img: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0022/4681/brand.gif?itok=sYYrRRuI',
      title: 'Drinks',
    },
    {
      img: 'https://farm6.staticflickr.com/5314/14232620011_972aae2885_z.jpg',
      title: 'Nestle',
    },
    {
      img: 'https://i.pinimg.com/564x/5a/f2/c0/5af2c059dac5a8d9a8227b09ad1ffb4c.jpg',
      title: 'Coffee',
    },
    {
      img: 'https://i.pinimg.com/564x/5e/8f/02/5e8f02bc0c9fea1e82b10a829d0accc6.jpg',
      title: 'dessert',
    },
    {
      img: 'https://i.pinimg.com/564x/08/68/dc/0868dcacc7c50ca2c7d35b27be81e5a9.jpg',
      title: 'Entirtenment',
    },
  ];



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
            // flag6 = true

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
      <h1>Search For A Flight</h1><br/><br/>

              <Row xs="1" className=''>

                  <Form onSubmit={addtoList} >
                      <FormGroup row>
                      <Tooltip title="Which cabin you want ?" arrow>
                      <Col>
                          <Label for="Class">Cabin Class :</Label>
                        
                              <input list="class" placeholder="class" required name ="Class" id ="Class"></input>
                              <datalist id="class" >
                                  <option value="First">First</option>
                                  <option value="Economy">Economy</option>
                                  <option value="Business">Business</option>
                              </datalist>
                              </Col>
                              </Tooltip>
                            <Tooltip title="Number of Adults passengers" arrow>
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
                          </Tooltip>
                          
                          <Tooltip title="Number of Children" arrow>
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
                          </Tooltip>
                          <Tooltip title="From where you will depart" arrow>
                          <Col>
                              <Label for=" departure City ">
                                From:
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
                          </Tooltip>

                          <Tooltip title="to Where you are going " arrow>

                          <Col>
                              <Label for=" Arrival city ">
                                  To :
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
                          </Tooltip>

                          <Tooltip title="When you will leave" arrow>

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
                          </Tooltip>

                          <Tooltip title="When you will Return" arrow>

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
                              </Tooltip>



                      </FormGroup>
                      <Tooltip title="Search A Flight" arrow>
                      <div className="search" class="center">

                          <Button  style={{width:'500px',color:'#FFFFFF',backgroundColor:'#d4902a'}}
                              color="info"
                              size="lg"
                              type="submit"
                              class="btn-search"
                          >
                              <FlightTakeoffIcon></FlightTakeoffIcon> Search For A Flight</Button>
                              <br/><br/>
                      </div>
                      </Tooltip>
                  </Form>
              </Row>
              {View ?
                  <div className="">
                      <div className="content">

                              {displayed.map((flight) => (
                                  <Card style={{padding:"0% 2%",backgroundColor: '##FFFFFF',borderRadius:'5px',width:'70%',marginLeft:'auto',marginRight:'auto',marginTop:'4%'}}>
                                      <CardBody>
                                          <CardTitle tag="h5">
                                          <label className="infofrom" style={{width:'110%',marginLeft:'-5%',marginRight:'auto',marginTop:'-10%'}}> <b>
                                          <AirplaneTicketOutlinedIcon fontSize="large"></AirplaneTicketOutlinedIcon>
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; From :  {flight.From.Airport} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                              <img style={{width:'150px',height:'60px',transform:"scale(3)"}} src='https://starpng.com/public/uploads/preview/divider-line-png-line-with-circle-end-51575252914xxvixllcy9.png'></img>
                                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To :  {flight.To.Airport}         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     <AirplaneTicketOutlinedIcon fontSize="large"></AirplaneTicketOutlinedIcon>

                                              </b></label>

                                          </CardTitle>
                                          <CardText >
                                              {(firstView) && (mysearch.Adults > 0) ? <Label>Price of First class Adult Ticket : {flight.First.Price}<br></br> </Label> :
                                                  BusinessView && (mysearch.Adults > 0) ? <Label>Price of Business class Adult Ticket: {flight.Business.Price}<br></br> </Label> :
                                                      EconomyView && (mysearch.Adults > 0) ? <Label>Price of Economy class Adult Ticket : {flight.Economy.Price}<br></br> </Label>: <label></label>}<br/>
                                              {(firstView) && (mysearch.Children > 0) ? <Label>Price of First class Children Ticket : {flight.First.ChildPrice}<br></br> </Label> :
                                                  BusinessView && (mysearch.Children > 0) ? <Label>Price of Business class Children Ticket: {flight.Business.ChildPrice}<br></br> </Label> :
                                                      EconomyView && (mysearch.Children > 0) ? <Label> price of Economy class Children Ticket : {flight.Economy.ChildPrice}<br></br> </Label>: <label></label>}
                                                      <br/>
                                       &nbsp;&nbsp;&nbsp;Departure Date : {(flight.Departure.Date.toString()).slice(0,10)}<br/>
                                       &nbsp;&nbsp;&nbsp;Departure time: {flight.Departure.Time}<br/>
                                       &nbsp;&nbsp;&nbsp;Arrival Date : {(flight.Arrival.Date.toString()).slice(0,10)}<br/>
                                       &nbsp;&nbsp;&nbsp;Arrival time:{flight.Arrival.Time}<br/>

                                          </CardText>
  
                                          <Button class="center" style={{backgroundColor: '#5584AC' ,marginLeft:'80%',marginTop:'-25%',padding:'10px'}}>
                                              <Link  style={{backgroundColor: '#d4902a',color:'#FFF'}}to={{
                                                  pathname: `/user/viewFlight/${flight._id}`
                                                  , search: '?' + new URLSearchParams(mysearch).toString()
                                              }} className="btn btn-primary"> <FlightTakeoffIcon></FlightTakeoffIcon>Choose This Flight</Link>
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
      {/* Partners  */}
      <div style={{marginLeft:'auto',marginRight:'auto',width:'80%'}}>
      <h1>Our Parteners</h1>

      <ImageList sx={{ width: 1100, height: 300 }} cols={5} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    <br/>
    <br/>
          
      </div>

      <div style={{background:'#95D1CC',marginTop:'10%',borderRadius:'25px',padding:'5%',width:'90%',marginLeft:'5%'}}>
          <h1> Learn How to book a Flight</h1>

      <video class="video-fluid z-depth-1" autoplay loop controls muted>
  <source src="https://mdbootstrap.com/img/video/Sail-Away.mp4" type="video/mp4" />
    </video>
      </div>
      
      </div>
      
  );
}


export default Home;






