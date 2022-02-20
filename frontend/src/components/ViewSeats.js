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
import '../Style/plane.css';
import AirlineSeatReclineExtraOutlinedIcon from '@mui/icons-material/AirlineSeatReclineExtraOutlined';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import NavBarUser from './MyNavbarUser.js';



function ViewSeats() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [HasError, setHasError] = useState(false);
  const [Error, setError] = useState('');
  const [  Success, setSuccess  ] = useState(false);
  const [Msg, setMsg] = useState('');

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
  const { TicketId } = useParams();

  async function handleReserve(chosenSeatId) {
    try {
        console.log(chosenSeatId)
      await axios.post(`http://localhost:8000/user/viewSeats/${chosenSeatId}/${TicketId}`)
      .then(
        setShow(false),
        setSuccess(true),
        setMsg("You have Succeccfuly reserved the seat , To view your ticket please Click the button Below !")
)

    } catch (error) {
      setHasError(true);
      setError('Sorry , An error occured');
    }
  }
  let navigateBack = useNavigate();

  function handleBack() {
    navigateBack(-1)
  }
  

    const [seats, setSeats] = useState([]);
     
    const { FlightId } = useParams();
    const { Cabin } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8000/user/viewSeats/${FlightId}/${Cabin}/${TicketId}`).then(res => {
            console.log(res.data);
            setSeats(res.data);
        }).catch((err)=> {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
           if (err.response) {
              setHasError(true);
              setError("No Seats Available")
           }
         })
    }, []);
    return (
      <>
      <NavBarUser></NavBarUser>
        <div style={{backgroundColor:'#FFF'}}>
        <Container className='mt-5 mb-5'style={{backgroundColor:'#FFF'}} >
            <Modal isOpen={show} style={{marginTop:'20%'}} >
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
            style={{color:'#FFFFFF',backgroundColor:'#d4902a'}}
            onClick={() => handleReserve(chosenSeatId)
            }
          >
            Yes
          </Button>
          {' '}
          <Button onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
        
      {!(HasError) && (!Success)&& <Card style={{width:'50%',marginTop:'30%',marginLeft:'10%'}}>
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
                       
                        <td> <Button style={{color:'#FFFFFF',backgroundColor:'#d4902a'}} onClick={() => handleShow(seat._id,seat.SeatNumber)}> <AirlineSeatReclineExtraOutlinedIcon></AirlineSeatReclineExtraOutlinedIcon> Reserve </Button>

                         </td>
                      </tr>
                       ))
                      }
                      
                    </tbody>

                  </Table>

                </Container>
                
              </CardBody>
              
            </Card>}
            {/* <div class="plane" style={{marginLeft:'70%',marginTop:'-60%'}}>
  <div class="cockpit">
    <h1>Seat plan </h1>
  </div>
  <div class="exit exit--front fuselage">
    
  </div>
  <ol class="cabin fuselage">
    <li class="row row--1">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="1A" />
          <label for="1A">1A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="1B" />
          <label for="1B">1B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="1C" />
          <label for="1C">1C</label>
        </li>
        <li class="seat">
          <input type="checkbox" disabled id="1D" />
          <label for="1D">Occupied</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="1E" />
          <label for="1E">1E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="1F" />
          <label for="1F">1F</label>
        </li>
      </ol>
    </li>
    <li class="row row--2">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="2A" />
          <label for="2A">2A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="2B" />
          <label for="2B">2B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="2C" />
          <label for="2C">2C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="2D" />
          <label for="2D">2D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="2E" />
          <label for="2E">2E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="2F" />
          <label for="2F">2F</label>
        </li>
      </ol>
    </li>
    <li class="row row--3">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="3A" />
          <label for="3A">3A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="3B" />
          <label for="3B">3B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="3C" />
          <label for="3C">3C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="3D" />
          <label for="3D">3D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="3E" />
          <label for="3E">3E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="3F" />
          <label for="3F">3F</label>
        </li>
      </ol>
    </li>
    <li class="row row--4">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="4A" />
          <label for="4A">4A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="4B" />
          <label for="4B">4B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="4C" />
          <label for="4C">4C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="4D" />
          <label for="4D">4D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="4E" />
          <label for="4E">4E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="4F" />
          <label for="4F">4F</label>
        </li>
      </ol>
    </li>
    <li class="row row--5">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="5A" />
          <label for="5A">5A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="5B" />
          <label for="5B">5B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="5C" />
          <label for="5C">5C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="5D" />
          <label for="5D">5D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="5E" />
          <label for="5E">5E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="5F" />
          <label for="5F">5F</label>
        </li>
      </ol>
    </li>
    <li class="row row--6">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="6A" />
          <label for="6A">6A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="6B" />
          <label for="6B">6B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="6C" />
          <label for="6C">6C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="6D" />
          <label for="6D">6D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="6E" />
          <label for="6E">6E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="6F" />
          <label for="6F">6F</label>
        </li>
      </ol>
    </li>
    <li class="row row--7">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="7A" />
          <label for="7A">7A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="7B" />
          <label for="7B">7B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="7C" />
          <label for="7C">7C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="7D" />
          <label for="7D">7D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="7E" />
          <label for="7E">7E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="7F" />
          <label for="7F">7F</label>
        </li>
      </ol>
    </li>
    <li class="row row--8">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="8A" />
          <label for="8A">8A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="8B" />
          <label for="8B">8B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="8C" />
          <label for="8C">8C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="8D" />
          <label for="8D">8D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="8E" />
          <label for="8E">8E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="8F" />
          <label for="8F">8F</label>
        </li>
      </ol>
    </li>
    <li class="row row--9">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="9A" />
          <label for="9A">9A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="9B" />
          <label for="9B">9B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="9C" />
          <label for="9C">9C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="9D" />
          <label for="9D">9D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="9E" />
          <label for="9E">9E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="9F" />
          <label for="9F">9F</label>
        </li>
      </ol>
    </li>
    <li class="row row--10">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="10A" />
          <label for="10A">10A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="10B" />
          <label for="10B">10B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="10C" />
          <label for="10C">10C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="10D" />
          <label for="10D">10D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="10E" />
          <label for="10E">10E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="10F" />
          <label for="10F">10F</label>
        </li>
      </ol>
    </li>
  </ol>
  <div class="exit exit--back fuselage">
    
  </div>
</div> */}
            


<div>
      <Button onClick={handleBack}><ArrowCircleLeftRoundedIcon fontSize="large"></ArrowCircleLeftRoundedIcon> Back </Button>
      </div>

{HasError &&  <Col className="bg-light "> <Alert align="center" color="danger" Row > 
<a align="center" style={(Error)?{display: 'block',color:'red',fontSize:'20px'}:{display: 'none'}}><CardTitle>{Error}</CardTitle></a></Alert></Col> 
}
{Success && 
  <Col className="bg-light "> <Alert align="center" color="success" Row > 
<a align="center" style={(Success)?{display: 'block',color:'red',fontSize:'20px'}:{display: 'none'}}><CardTitle>{Msg}</CardTitle></a></Alert></Col> 
&&
<Link to={{ pathname:`/user/viewReserved` 
                        
                           }}className="btn btn-primary " style={{color:'#FFFFFF',backgroundColor:'#d4902a'}}>View My tickets</Link> }
            </Container>

   </div>
   </>
     )
}
export default ViewSeats;



