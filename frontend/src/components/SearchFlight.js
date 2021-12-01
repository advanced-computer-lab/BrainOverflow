import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    CardBody, Card,CardImg,CardGroup,CardTitle,CardSubtitle,CardText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader, Form, Input, FormGroup, Label, Button, Container, Row, Col, Table
} from 'reactstrap';
import UpdateFlight from "./UpdateFlight";

function AllFlights() {
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
    SeatId:[{IsBooked:''}],
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

<<<<<<< Updated upstream
  };
    
    const [closeId, setId] = useState(0);
    const [show, setShow] = useState(false);
=======


  };
  const searchObject={
    Cabin:'',
    Adults:0,
    Children:0,
};
    const [searchTerm , setSearchTerm] =useState('');
    const [closeId, setId] = useState(0);
    const [show, setShow] = useState(false);
    const [View,setView] = useState(true);
    const [firstView ,setFirst ]=useState(false);
    const [BusinessView ,setBusiness ]=useState(false);
    const [EconomyView ,setEconomy ]=useState(false);
>>>>>>> Stashed changes
    const navigate = useNavigate();
    const [flights, setFlights] = useState([initialstate]);
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


<<<<<<< Updated upstream


        })

    }, []);
    async function handleDelete() {
        console.log(closeId);
        try {

            await axios.delete(`http://localhost:8000/admin/delete/${closeId}`).then(
=======
        })

    }, []);
    function myFunction(item) {
         return (item.IsBooked =='false');
         
      };
     // foreach((element) => { flights.filter((f)=>{element.isbooked=true} )})
    //  const filteredSeates =  flights.filter(f =>(f.Business.SeatId.foreach((element) => { SeatId.filter((f)=>{element.isbooked==false} )});

    const filteredBusinessSeats = flights.filter(f =>(f.Business.SeatId.filter((s)=> s.IsBooked!='true')));
    

    console.log(flights[0].Business.SeatId[0].IsBooked);
    console.log(filteredBusinessSeats);
>>>>>>> Stashed changes

                setFlights(flights.filter((f) => { return f._id != closeId })),
                setDisplayed(flights.filter((f) => { return f._id != closeId })),
                handleClose()
            )



        } catch (error) {
            console.error(error);
        }
    }


    const addtoList = (event) => {
        event.preventDefault()
<<<<<<< Updated upstream
    console.log(event.target[0].value)
=======
        setView(true);
        console.log(View);
>>>>>>> Stashed changes
        setDisplayed(flights.filter((f) => {
            let flag1 = false
            let flag2 = false
            let flag3 = false
            let flag4 = false
            let flag5 = false
            let flag6= false
            let flag7 = false
            let flagFirst =false 
            let flagBusiness =false 
            let flagEconomy =false 
            if(event.target[0].value !=''){
                setSearch(
                    {Cabin:event.target[0].value,
                    Adults:event.target[1].value,
                    Children:event.target[2].value,
                  }
              );
                 console.log(mysearch);
            }


<<<<<<< Updated upstream
=======
            if (flagFirst){
                //console.log("length is",f.First.SeatId.length);
                if(event.target[1].value ==''){
                    flag1 = ((0 + parseInt(event.target[2].value))<=f.First.SeatId.length )
                }
                else if (event.target[2].value==''){
                    flag1 = ((parseInt(event.target[1].value)+ 0)<=f.First.SeatId.length)

                }
                else if (event.target[1].value=='' && event.target[2].value==''){
                    flag1 = (0<=f.First.SeatId.length)
                }
                else {
                    flag1 = ((parseInt(event.target[1].value)+ parseInt(event.target[2].value))<=f.First.SeatId.length)

                }
>>>>>>> Stashed changes

            if (event.target[0].value !== ''&& event.target[0].value == 'First') { flagFirst = true }

            if (event.target[0].value !== ''&& event.target[0].value == 'Business') { flagBusiness = true}

            if (event.target[0].value !== ''&& event.target[0].value == 'Economy') { flagEconomy = true }

            if (flagFirst){
                console.log("1 is",event.target[1].value);
                flag1 = (
                    (event.target[1].value + event.target[2].value)<=f.First.SeatId.length)
            }
            else { flag1 = true }

            if (flagBusiness){
<<<<<<< Updated upstream
                console.log("1 is",event.target[1].value);
                flag2 = ((event.target[1].value + event.target[2].value)<=f.Business.SeatId.length)
=======
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

>>>>>>> Stashed changes
            }
            else { flag2 = true }

            if (flagEconomy ){
                console.log("1 is",event.target[1].value);
                flag3 = ((event.target[1].value + event.target[2].value)<=f.Economy.SeatId.length)
            }
            else { flag3 = true }

            if(event.target[3].value !==''){
<<<<<<< Updated upstream
                console.log("3 is",event.target[3].value);
                flag4=(event.target[3].value==f.From.Airport);}
            else{flag4 = true}

            if(event.target[4].value !==''){
                console.log("4 is",event.target[4].value);
                flag5=(event.target[4].value==f.To.Airport)}
=======
                //console.log("3 is",event.target[3].value);
                flag4 =(event.target[3].value.toLocaleLowerCase()==f.From.Airport.toLocaleLowerCase());}
            else{flag4 = true}

           if(event.target[4].value !==''){
                //console.log("4 is",event.target[4].value);
                flag5=(event.target[4].value.toLocaleLowerCase()==f.To.Airport.toLocaleLowerCase())}
>>>>>>> Stashed changes
            else{flag5 = true}

            if (event.target[5].value !== '') {

                let d1 = event.target[5].value
                let d2 = f.Departure.Date.slice(0, 10)
                console.log("5 is",event.target[5].value);
                console.log(d2);
                flag6 = (d1 == d2);

            } else { flag6 = true }

<<<<<<< Updated upstream
            if (event.target[6].value !== '') {

                let d1 = event.target[6].value;
                let d2 = f.Arrival.Date.slice(0, 10);
                console.log("6 is",event.target[6].value);
                console.log(d2);
                flag7 = (d1 == d2);

            } else { flag7 = true }
            


            return flag1 & flag2 & flag3 & flag4 & flag5 &flag6 &flag7;
        }

           
=======
                            
            return flag1 & flag2 & flag3 & flag4 & flag5 & flag6 ;
        }


        ))

>>>>>>> Stashed changes


        ))
        console.log(displayed);
    }

    return (

        <div>
            <Form onSubmit={addtoList}>
                <Col md={3}>
                    <FormGroup>
                        <select id="Class">
                            <option value="First" selected>First Class</option>
                            <option value="Economy">Economy</option>
                            <option value="Business">Business</option>
                        </select>
                        <Label for="passengersAdult">
                            Number of adult passengers :
                        </Label>
                        <Input
                            id="passengers"
                            name="passengers"
                            placeholder="passengers placeholder"
                            type="Number"
                        />
                        <Label for="PassengersChild">
                            Number of children passengers :
                        </Label>
                        <Input
                            id="Childpassengers"
                            name="Childpassengers"
                            placeholder="passengers placeholder"
                            type="Number"
                        />
                        <Label for=" departure airport ">
                            departure airport :
                        </Label>
                        <Input
                            id="departureAirport "
                            name="departureAirport"
                            placeholder="departureAirport"
                            type="text"
                        />
                        <Label for=" Arrival airport ">
                            Arrival airport :
                        </Label>
                        <Input
                            id="ArrivalAirport "
                            name="ArrivalAirport"
                            placeholder="ArrivalAirport"
                            type="text"
                        />
                        <Label for="departure Date">
                            departure Date:
                        </Label>
                        <Input
                            id="DepartureDate"
                            name="DepartureDate"
                            placeholder="DepartureDate"
                            type="date"
                        />
<<<<<<< Updated upstream
                        <Label for="arrival Date">
                            arrival Date:
=======
                        <br></br>
                        <Label for="Return Date">
                            Return Date:
>>>>>>> Stashed changes
                        </Label>
                        <Input
                            id="ReturnDate"
                            placeholder="ReturnDate"
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

            <div className="">
                <div className="content">
                <CardGroup>

                    {displayed.map((flight) => (
                        <Card>
                        <CardImg
                          alt="Card image cap"
                          src="https://picsum.photos/318/180"
                          top
                          width="100%"
                        />
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
                          price of First class : {flight.First.Price}
                          price of Business class : {flight.Business.Price}
                          price of Economy class : {flight.Economy.Price}
                          Arrival time:{flight.Arrival.Time} 
                          Departure time: {flight.Departure.Time}</CardText>
                          <Button>
                            Book
                          </Button>
                        </CardBody>
                      </Card>
                    ))}
                    </CardGroup>

                </div>
            </div>
<<<<<<< Updated upstream
=======
            :<label> </label>}   
>>>>>>> Stashed changes

        </div>


    );
}




export default AllFlights;