import React from "react";
import { Switch, Route, Link, useSearchParams } from "react-router-dom";
import { get, patch, put } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useParams, useLocation } from "react-router-dom";
import {
    Container, Table, CardBody, Card, CardColumns, CardImg, CardSubtitle, CardText,
    Button, CardTitle , Modal ,ModalHeader,ModalBody,ModalFooter,Col,Alert
} from 'reactstrap';

function ChangeFlight() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [HasError, setHasError] = useState(false);
  const [Error, setError] = useState('');
  const handleClose = () => setShow(false);
  const [ChosenFlightId, setchosenFlightId] = useState(false);

  const handleShow = (flightId) => {
    setShow(true);
    setchosenFlightId(flightId);
  }
  async function handleReserve(ChosenFlightId) {
    try {
        //console.log(chosenSeatId)
      await axios.put(`http://localhost:8000/user/changeFlight/${ticketId}/${ChosenFlightId}`)
      .then(navigate(`/user/viewReserved/${id}`, { replace: true }));

    } catch (error) {
      setHasError(true);
      setError('Sorry , An error occured');
    }
  }

    const [flights, setFlights] = useState([]);
    const [ticket, setTicket] = useState([]);

    const {id} = useParams();
    const { ticketId } = useParams();

    useEffect(() => {
           axios.get(`http://localhost:8000/user/changeFlight/${ticketId}`).then(res => {
            // console.log("ANA geet change flight")
            console.log(res.data);
            setFlights(res.data.flights);
            console.log(res.data);
            setTicket(res.data.ticket);
            if(res.data.flights.length==0){
                setHasError(true);
                setError("No Flights available with similar Departure and Arrival")
            }
        }).catch((err)=> {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
           if (err.response) {
              setHasError(true);
              setError("There's no other flights available")
              setError(err.message)
           }
         })
    }, []);
    return (
        
        <Container className='mt-5 mb-5' >
            <Modal isOpen={show}  >
        <ModalHeader
          charCode="Y"

        >
          Confirmation
        </ModalHeader>
        <ModalBody>
          Are you Sure you want to reserve This Flight ?
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => handleReserve(ChosenFlightId)}
          >
            Yes
          </Button>
          {' '}
          <Button onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
        
      {!(HasError) &&  <Card>
              
              <CardBody>
                <CardTitle tag="h5">
                  Available Flights from {ticket.From} To{ticket.To}  
                </CardTitle>
                <Container>

                <Table>
                  <thead><tr>
                    <th>Flight Number</th>
                    <th>Departure Date</th>
                    <th>Departure Time</th>
                    <th>Arrival Date</th>
                    <th>Arrival Time</th>
                    <th>Difference in Cost</th>
                  </tr>
                  </thead>

                  <tbody>

              {
              flights.map((flight) => (

                      <tr key ={flight._id}>
                        <td>{flight.FlightNumber}</td>
                        <td>{flight.Departure.Date}</td>
                        <td>{flight.Departure.Time}</td>
                        <td>{flight.Arrival.Date}</td>
                        <td>{flight.Arrival.Time}</td>
                       {ticket.Cabin =="Economy"? <td>{ticket.Price-flight.Economy.Price}</td>:ticket.Cabin=="Business"?<td>{ticket.Price-flight.Business.Price}</td>:<td>{ticket.Price-flight.First.Price}</td>}
                       
                        <td> <Button color="success" onClick={() => handleShow(flight._id)}> Choose </Button>

                         </td>
                      </tr>
                       ))
                      }
                    </tbody>
                  </Table>

                </Container>
              </CardBody>
            </Card>}
            {HasError &&  <Col className="bg-light "> <Alert align="center" color="danger" Row > 
<a align="center" style={(Error)?{display: 'block',color:'red',fontSize:'20px'}:{display: 'none'}}><CardTitle>{Error}</CardTitle></a></Alert></Col> 
}
            </Container>
     )
}
export default ChangeFlight;