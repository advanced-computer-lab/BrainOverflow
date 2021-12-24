import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CardBody, Card, CardHeader, Form, Input, FormGroup, Label, Button, Container, Row, Col, Table
} from 'reactstrap';
import logo from './Plane Loop.gif';

function AllFlights() {
<<<<<<< Updated upstream
=======
  let navigateBack = useNavigate(); 
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

  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/admin/viewFlights').then(res => {
      setFlights(res.data);

    })
  }, []);
<<<<<<< Updated upstream

  return (
<<<<<<< Updated upstream
    <div className="">
      <div className="content">
        <h1>Flights available : </h1>
=======
    <div style={{padding:"5%" , backgroundColor:"rgb(34, 87, 126)"}}>
        <div > <img style={{width:"100%" , height:"400px"}} src= {logo}></img></div> 
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
  function handleClick() {
    navigateBack(-1)
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
        let d2 = f.Departure.Date
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
    <div style={{padding:"5%" , backgroundColor:"rgb(34, 87, 126)"}}>
        <div > <img style={{width:"100%" , height:"400px"}} src= {logo}></img></div> 
        
>>>>>>> Stashed changes
      
    <Container>
      <Modal isOpen={show}  >
        <ModalHeader
          charCode="Y"

        >
          Delete Flight
        </ModalHeader>
        <ModalBody >
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
      
      <h1 style={{color:"#ECDBBA"}} >Search For Flight</h1>
      <Row xs="1">
        <Form onSubmit={addtoList}>
         
         
         
        <FormGroup row>
            <Col>
              <Label for="exampleDate" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
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
              <Label for="terminal" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
                Terminal:
              </Label>
              <Input
                id="terminal"
                name="terminal"
                placeholder="Ex: 1 , 2"
                type="text"

              />
            </Col>
            <Col>
              <Label for="flight number" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
                Flight Number:
              </Label>
              <Input
                id="flight number"
                name="flight number"
                placeholder="Ex:MS788"
                type="text"


              />
            </Col>
            <Col>
              <Label for="departure time" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
                Departure Time:
              </Label>
              <Input
                id="departure time"
                name="departure time"
                placeholder="search..."
                type="time"

              />
            </Col>
            <Col>
              <Label for="arrival time" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
                Arrival Time:
              </Label>
              <Input
                id="arrival time"
                name="arrival time"
                placeholder="search..."
                type="time"
>>>>>>> Stashed changes

        <br />
        <Container>

<<<<<<< Updated upstream
            <Table striped>
              <thead><tr>
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
              />
            </Col>
          </FormGroup>
          <div className="search">
            <Button
              style={{backgroundColor:"white",color:"#22577E" , width:"100px",fontWeight: "bold"}}
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
            <h1  style={{color:"#95D1CC"}}>Flights available : </h1>

            <Table>
              <thead><tr style={{color:"#95D1CC" , fontWeight: "bold"}}>
                <th>Flight No</th>
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
>>>>>>> Stashed changes
              </thead>
              </Table>
              </Container>



<<<<<<< Updated upstream
        {flights.map((flights) => (
          <Container>

<<<<<<< Updated upstream
            <Table striped>
              
              <tbody>
=======
=======
>>>>>>> Stashed changes
                    <tr key={flight._id} style={{color:"#F6F2D4" , fontWeight: "bold"}}>
                      <td>{flight.FlightNumber}</td>
                      <td>{flight.From.Airport}</td>
                      <td>{flight.From.Terminal}</td>
                      <td>{flight.To.Airport}</td>
                      <td>{flight.To.Terminal}</td>
                      <td>{flight.Departure.Date}</td>
                      <td>{flight.Departure.Time}</td>
                      <td>{flight.Arrival.Date}</td>
                      <td>{flight.Arrival.Time}</td>
                      <td><Link to={`/admin/updateFlight/${flight._id}`} className="btn btn-primary" style={{backgroundColor:"#F6F2D4",color:"#22577E" , width:"100px",fontWeight: "bold"}}>Edit</Link>

                        <Button color="danger" onClick={() => handleShow(flight._id)} style={{color:"#F6F2D4" , width:"100px",fontWeight: "bold"}}> Delete </Button>
<<<<<<< Updated upstream
>>>>>>> Stashed changes

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
=======

                      </td>
                    </tr>
                  ))
                }
>>>>>>> Stashed changes
              </tbody>
            </Table>

          </Container>


<<<<<<< Updated upstream

        ))}

      </div>
    </div>
=======
    </Container></div>
>>>>>>> Stashed changes

    <Button 
onClick={handleClick} 
style={{backgroundColor:"white",color:"#22577E" , width:"150px",fontWeight: "bold" }}
// size="lg"
>go back</Button> 
    
    
    
    </div>

  );
}




export default AllFlights;
