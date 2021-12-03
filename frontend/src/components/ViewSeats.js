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
    Button, CardTitle , Modal ,ModalHeader,ModalBody,ModalFooter
} from 'reactstrap';

function ViewSeats() {
  const [show, setShow] = useState(false);
  const [chosenSeatId, setchosenSeatId] = useState(0);
  const [chosenSeatNum, setchosenSeatNum] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = (seatId,seatNum) => {
    setShow(true);
    setchosenSeatId(seatId);
    console.log(chosenSeatId)
    setchosenSeatNum(seatNum);
    console.log(chosenSeatNum)
  }
  async function handleReserve(chosenSeatId) {
    try {
        console.log(chosenSeatId)
      await axios.post(`http://localhost:8000/user/viewSeats/${chosenSeatId}/${TicketId}`).then(
        handleClose()
      )

    } catch (error) {
      console.error(error);
    }
  }

    const [seats, setSeats] = useState([]);
    const { FlightId } = useParams();
    const { Cabin } = useParams();
    const { TicketId } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8000/user/viewSeats/${FlightId}/${Cabin}/${TicketId}`).then(res => {
            console.log(res.data);
            setSeats(res.data);
        })
    }, []);
    return (
        //<h1>HI</h1>
        <Container className='mt-5 mb-5'>
            <Modal isOpen={show}  >
        <ModalHeader
          charCode="Y"

        >
          Confirmation
        </ModalHeader>
        <ModalBody>
          Are you Sure you want to reserve seat no: {chosenSeatNum}?
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => handleReserve(chosenSeatId)}
          >
            Yes
          </Button>
          {' '}
          <Button onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
        
            <Card>
              <CardImg  
                alt="Card image cap"
                src="https://picsum.photos/256/186"
                top
                width="100%"
              />
              <CardBody>
                <CardTitle tag="h5">
                  Available Seats in {Cabin} Cabin 
                </CardTitle>
                <Container>

                <Table>
                  <thead><tr>
                    <th>Seat Number</th>
                    <th>Cabin</th>

                  </tr>
                  </thead>

                  <tbody>


              {
              seats.map((seat) => (

                      <tr key ={seat.SeatNumber}>
                        <td>{seat.SeatNumber}</td>
                        <td>{seat.Cabin}</td>
                       
                        <td> <Button color="success" onClick={() => handleShow(seat._id,seat.SeatNumber)}> Reserve </Button>

                         </td>
                      </tr>
                       ))
                      }
                    </tbody>
                  </Table>

                </Container>
              </CardBody>
            </Card>
            </Container>
     )
}
export default ViewSeats;