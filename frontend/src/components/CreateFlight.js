import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import{
   CardBody,Card , CardHeader , Form,Input , FormGroup , Label , Button, Container, Row , Col
} from 'reactstrap';
import MyNavBar from './MyNavbar';
function CreateFlight() {
  const navigate = useNavigate();

  const [From,setFrom]=React.useState("");
  const [To,setTo]=React.useState("");
  const [FlightDate,setFlightDate]=React.useState(new Date());
  const [Economy,setEconomy]=React.useState(0);
  const [Business,setBusiness]=React.useState(0);
  const [First,setFirst]=React.useState(0);
  const [Departure,setDeparture]=React.useState("");
  const [Arrival,setArrival]=React.useState("");
  const [Terminal,setTerminal]=React.useState(0);


  const addtoList=()=>{
      console.log(From,To,FlightDate,Economy,First,Business)
    Axios.post("http://localhost:8000/admin/createFlight",{
        From:From,
        To:To,
        FlightDate:FlightDate,
        Economy:Economy,
        Business:Business,
        First:First,
        Departure:Departure,
        Arrival:Arrival,
        Terminal:Terminal
    }).then(navigate('/admin', { replace: true }));
  }
  return (
      <Container className='m-3'>
       
        <Card className='p-3'>
    <CardHeader className='mb-2'  >
      Create New Flight
    </CardHeader>
    <CardBody>

    <Form>
    <FormGroup>
    <Label for="From">
      From
    </Label>
    <Input
      id="From"
      name="From"
      placeholder="Departure airport"
      type="text"
      onChange={(e)=>{
        setFrom(e.target.value);
      }}
    />
  </FormGroup>
  <FormGroup>
    <Label for="To">
      To
    </Label>
    <Input
      id="To"
      name="To"
      placeholder="Arrival airport"
      type="text"
      onChange={(e)=>{
        setTo(e.target.value);
      }}
    />
  </FormGroup>


  <FormGroup>
    <Label for="exampleDate">
      Flight Date
    </Label>
    <Input
      id="date"
      name="date"
      placeholder="date placeholder"
      type="date"
      onChange={(e)=>{
        setFlightDate(e.target.value);
      }}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Departure">
Departure Time    </Label>
    <Input
      id="Departure"
      name="Departure"
      placeholder=""
      type="time"
      onChange={(e)=>{
        setDeparture(e.target.value);
      }}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Arrival">
    Arrival Time
    </Label>
    <Input
      id="Arrival"
      name="Arrival"
      placeholder="time placeholder"
      type="time"
      onChange={(e)=>{
        setArrival(e.target.value);
      }}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Terminal">
Terminal    </Label>
    <Input
      id="Terminal"
      name="Terminal"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setTerminal(e.target.value);
      }}
    />
  </FormGroup>
  
  <FormGroup>
    <Label for="Economy">
     Number of Economy class seats
    </Label>
    <Input
      id="economy"
      name="Economy"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setEconomy(e.target.value);
      }}
    />
  </FormGroup>
  
  <FormGroup>
    <Label for="Business">
     Number of Business class seats
    </Label>
    <Input
      id="business"
      name="business"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setBusiness(e.target.value);
      }}
    />
  </FormGroup>
  
  <FormGroup>
    <Label for="First">
     Number of first class seats
    </Label>
    <Input
      id="first"
      name="first"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setFirst(e.target.value);
      }}
    />
  </FormGroup>
  <div className="float-right">
  <Button 
    color="success"
    size="lg"
    onClick={addtoList}>
Create Flight  </Button>
</div>
 
</Form>
</CardBody>
</Card>
</Container>
    
  );
}

export default CreateFlight;
