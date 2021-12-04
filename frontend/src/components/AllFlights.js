import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import '/Users/ok/Documents/GitHub/BrainOverflow/frontend/src/Style/Navbar.css';


import { useNavigate } from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  CardBody, Card, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, CardHeader, Form, Input, FormGroup, Label, Button, Container, Row, Col, Table
} from 'reactstrap';

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

      if (event.target[0].value !== '') {

        let d1 = event.target[0].value
        let d2 = f.FlightDate
        console.log(event.target[0].value)
        console.log(d2)
        flag1 = (d1 == d2)

      } else { flag1 = true }

      if (event.target[1].value !== '') { flag2 = (event.target[1].value == f.From.Terminal) }
      else { flag2 = true }
      if (event.target[2].value !== '') { flag3 = (event.target[2].value == f.FlightNumber) }
      else { flag3 = true }
      if (event.target[3].value !== '') { flag4 = (event.target[3].value == f.Departure.Time) }
      else { flag4 = true }
      if (event.target[4].value !== '') { flag5 = (event.target[4].value == f.Arrival.Time) }
      else { flag5 = true }

      return flag1 & flag2 & flag3 & flag4 & flag5;
    }


    ))
    console.log(displayed);
  }

  return (
    <Container>
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
      <Row xs="1">
        <Form onSubmit={addtoList}>


          <FormGroup row>
            <Col>
              <Label for="exampleDate">
                Date:
              </Label>
              <Input
                id="Date"
                name="date"
                placeholder="date placeholder"
                type="date"

              />
            </Col>
            <Col>
              <Label for="terminal">
                terminal:
              </Label>
              <Input
                id="terminal"
                name="terminal"
                placeholder="search..."
                type="text"

              />
            </Col>
            <Col>
              <Label for="flight number">
                flight number:
              </Label>
              <Input
                id="flight number"
                name="flight number"
                placeholder="search by flight number..."
                type="text"


              />
            </Col>
            <Col>
              <Label for="departure time">
                departure time:
              </Label>
              <Input
                id="departure time"
                name="departure time"
                placeholder="search..."
                type="time"

              />
            </Col>
            <Col>
              <Label for="arrival time">
                arrival time:
              </Label>
              <Input
                id="arrival time"
                name="arrival time"
                placeholder="search..."
                type="time"


              />
            </Col>
          </FormGroup>
          <div className="search">
            <Button
              color="info"
              size="lg"
              type="submit"
            >
              Search</Button>
          </div>
        </Form>
      </Row>
      <div className="">
        <div className="content">

          <br />
          <Container>
            <h1>Flights available : </h1>

            <Table>
              <thead><tr>
                <th>FlightNo</th>
                <th>From</th>
                <th>Deaprture Terminal</th>
                <th>To</th>
                <th>Arrival Terminal</th>
                <th> Departure Date</th>
                <th> Departure Time</th>
                <th>Arrival Date </th>
                <th>Arrival Time </th>
                <th>        </th>
              </tr>
              </thead>

              <tbody>


                {
                  displayed.map((flight) => (

                    <tr key={flight._id}>
                      <td>{flight.FlightNumber}</td>
                      <td>{flight.From.Airport}</td>
                      <td>{flight.From.Terminal}</td>
                      <td>{flight.To.Airport}</td>
                      <td>{flight.To.Terminal}</td>
                      <td>{flight.Departure.Date}</td>
                      <td>{flight.Departure.Time}</td>
                      <td>{flight.Arrival.Date}</td>
                      <td>{flight.Arrival.Time}</td>
                      <td><Link to={`/admin/updateFlight/${flight._id}`} className="btn btn-primary">Edit</Link>

                        <Button color="danger" onClick={() => handleShow(flight._id)}> Delete </Button>

                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>

          </Container>

        </div>
      </div>

    </Container>

  );
}




export default AllFlights;
