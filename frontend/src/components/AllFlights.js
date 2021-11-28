import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< Updated upstream
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CardBody, Card, CardHeader, Form, Input, FormGroup, Label, Button, Container, Row, Col, Table
=======

import { useNavigate } from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  CardBody, Card, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader, Form, Input, FormGroup, Label, Button, Container, Row, Col, Table
>>>>>>> Stashed changes
} from 'reactstrap';

function AllFlights() {
<<<<<<< Updated upstream

  const [flights, setFlights] = useState([]);
=======
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

>>>>>>> Stashed changes

  useEffect(() => {
    axios.get('http://localhost:8000/admin/viewFlights').then(res => {
      setFlights(res.data);
<<<<<<< Updated upstream
=======
      setDisplayed(res.data);



>>>>>>> Stashed changes

    })
  }, []);
<<<<<<< Updated upstream

  return (
    <div className="">
      <div className="content">
        <h1>Flights available : </h1>

        <br />
        <Container>
=======
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

      if (event.target[0].value !== '') {

        let d1 = event.target[0].value
        let d2 = f.FlightDate.slice(0, 10)
        console.log(event.target[0].value)
        console.log(d2)
        flag1 = (d1 == d2)

      } else { flag1 = true }

      if (event.target[1].value !== '') { flag2 = (event.target[1].value == f.Terminal) }
      else { flag2 = true }
      if (event.target[2].value !== '') { flag3 = (event.target[2].value == f._id) }
      else { flag3 = true }
      if (event.target[3].value !== '') { flag4 = (event.target[3].value == f.Departure) }
      else { flag4 = true }
      if (event.target[4].value !== '') { flag5 = (event.target[4].value == f.Arrival) }
      else { flag5 = true }

      return flag1 & flag2 & flag3 & flag4 & flag5;
    }


    ))
    console.log(displayed);
  }

  return (
    <div>
      <Modal isOpen={show}  >
        <ModalHeader
          charCode="Y"

        >
          Delete Flight
        </ModalHeader>
        <ModalBody>
          Are you Sure you want to delete flight no: ${closeId}
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => handleDelete()}
          >
            Yes, Delete
          </Button>
          {' '}
          <Button onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Form onSubmit={addtoList}>

        <Col md={3}>

          <FormGroup>
            <Label for="exampleDate">
              Date:
            </Label>
            <Input
              id="Date"
              name="date"
              placeholder="date placeholder"
              type="date"

            />
            <Label for="terminal">
              terminal:
            </Label>
            <Input
              id="terminal"
              name="terminal"
              placeholder="search..."
              type="text"

            />
            <Label for="flight number">
              flight number:
            </Label>
            <Input
              id="flight number"
              name="flight number"
              placeholder="search by flight number..."
              type="text"


            />
            <Label for="departure time">
              departure time:
            </Label>
            <Input
              id="departure time"
              name="departure time"
              placeholder="search..."
              type="time"

            />
            <Label for="arrival time">
              arrival time:
            </Label>
            <Input
              id="arrival time"
              name="arrival time"
              placeholder="search..."
              type="time"


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
          <h1>Flights available : </h1>

          <br />
          <Container>
>>>>>>> Stashed changes

            <Table>
              <thead><tr>
<<<<<<< Updated upstream
                  <th>From</th>
                  <th>To</th>
                  <th> Flight Date</th>
                  <th> Economy </th>
                  <th>Business</th>
                  <th>First class</th>
                  <th>Arrival time </th>
                  <th>Departure time</th>
                  <th>Terminal</th>
                  <th>        </th>
                </tr>
=======
                <th>FlightNo</th>
                <th>From</th>
                <th>To</th>
                <th> Flight Date</th>
                <th> Economy </th>
                <th>Business</th>
                <th>First class</th>
                <th>Arrival time </th>
                <th>Departure time</th>
                <th>Terminal</th>
                <th>        </th>
              </tr>
>>>>>>> Stashed changes
              </thead>
            </Table>
          </Container>



<<<<<<< Updated upstream
        {flights.map((flights) => (
          <Container>

            <Table>
              
              <tbody>

                <tr>
                  <td>{flights.From }</td>
                  <td>{flights.To}</td>
                  <td>{flights.FlightDate}</td>
                  <td>{flights.Economy}</td>
                  <td>{flights.Business}</td>
                  <td>{flights.First}</td>
                  <td>{flights.Arrival}</td>
                  <td>{flights.Departure}</td>
                  <td>{flights.Terminal}</td>
                  <td><button>update</button>
                  <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            </Table>

          </Container>
=======
          {displayed.map((flight) => (
            <Container>
              <Table bordered>
                <tbody>

                  <tr>
                    <td>{flight._id}</td>
                    <td>{flight.From}</td>
                    <td>{flight.To}</td>
                    <td>{flight.FlightDate.slice(0, 10)}</td>
                    <td>{flight.Economy}</td>
                    <td>{flight.Business}</td>
                    <td>{flight.First}</td>
                    <td>{flight.Arrival}</td>
                    <td>{flight.Departure}</td>
                    <td>{flight.Terminal}</td>
                    <td><Link to={`/admin/updateFlight/${flight._id}`} className="btn btn-primary">Edit</Link>

                      <Button color="danger" onClick={() => handleShow(flight._id)}> Delete </Button>

                    </td>
                  </tr>
                </tbody>
              </Table>

            </Container>
>>>>>>> Stashed changes




          ))}

        </div>
      </div>
      <Form >

        <Col md={3}>
          <FormGroup>

            <div className="d-flex justify-content-center p-5">
              <Dropdown isOpen toggle={function noRefCheck() { }}>
                <DropdownToggle caret>
                  Class
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={function noRefCheck(){}}>
                    First
                  </DropdownItem>
                  <DropdownItem onClick={function noRefCheck(){}}>
                    Business
                  </DropdownItem>
                  <DropdownItem onClick={function noRefCheck(){}}>
                    Economy
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Label for="class">
              Number of adult passengers :
            </Label>
            <Input
              id="passengers"
              name="passengers"
              placeholder="passengers placeholder"
              type="Number"
            />
            <Label for="class">
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
            <Label for="departure time">
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
    </div>

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
  );
}




export default AllFlights;
