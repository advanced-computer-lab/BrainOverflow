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
    const [closeId, setId] = useState(0);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]);
    //const[searchItem,setSearchItem]=useState([]);
    const [displayed, setDisplayed] = useState([]);
    //const toggle = () => setS(!show);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setId(id);
    }



    const updateClick = (id) => {
        axios.get("http://localhost:8000/admin/updateFlight" + id, {
        }).then(navigate('http://localhost:8000/admin/updateFlight"+id', { replace: true }));
    }


    useEffect(() => {
        axios.get('http://localhost:8000/admin/viewFlights').then(res => {
            setFlights(res.data);
            setDisplayed(res.data);




        })

    }, []);
    async function handleDelete() {
        console.log(closeId);
        try {

            await axios.delete(`http://localhost:8000/admin/delete/${closeId}`).then(

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
        console.log("heloooooooooo")

        console.log(event.target[0].value)
        setDisplayed(flights.filter((f) => {
            let flag1 = false
            let flag2 = false
            let flag3 = false
            let flag4 = false
            let flag5 = false
            let flagFirst =false 
            let flagBusiness =false 
            let flagEconomy =false 



            if (event.target[0].value !== ''&& event.target[0].value == 'First') { flagFirst = true }

            if (event.target[0].value !== ''&& event.target[0].value == 'Business') { flagBusiness = true}

            if (event.target[0].value !== ''&& event.target[0].value == 'Economy') { flagEconomy = true }

            if (flagFirst && (event.target[1].value + event.target[2].value)<=f.First.seats){
                flag1 = ((event.target[1].value + event.target[2].value)<=f.First.seats)
            }
            else { flag1 = true }

            if (flagBusiness && (event.target[1].value + event.target[2].value)<=f.Business.seats){
                flag2 = ((event.target[1].value + event.target[2].value)<=f.Business.seats)
            }
            else { flag2 = true }

            if (flagEconomy && (event.target[1].value + event.target[2].value)<=f.Economy.seats){
                flag3 = ((event.target[1].value + event.target[2].value)<=f.Economy.seats)
            }
            else { flag3 = true }

            if (event.target[3].value !== '') {

                let d1 = event.target[3].value
                let d2 = f.FlightDate.slice(0, 10)
                console.log(event.target[3].value)
                console.log(d2)
                flag4 = (d1 == d2)

            } else { flag4 = true }

            if (event.target[4].value !== '') {

                let d1 = event.target[4].value
                let d2 = f.FlightDate.slice(0, 10)
                console.log(event.target[4].value)
                console.log(d2)
                flag5 = (d1 == d2)

            } else { flag5 = true }


            return flag1 & flag2 & flag3 & flag4 & flag5;
        }


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
                        <Label for="arrival Date">
                            arrival Date:
                        </Label>
                        <Input
                            id="ArrivalDate"
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
                            From :{flight.From.airport}
                            To :{flight.To.airport}
                          </CardSubtitle>
                          <CardText>
                          price of First class : {flight.First.price}
                          price of Business class : {flight.Business.price}
                          price of Economy class : {flight.Economy.price}
                          Arrival time:{flight.Arrival} 
                          Departure time: {flight.Departure}</CardText>
                          <Button>
                            Book
                          </Button>
                        </CardBody>
                      </Card>
                    ))}
                    </CardGroup>

                </div>
            </div>

        </div>


    );
}




export default AllFlights;