import {React,useState, useEffect }from 'react';
import axios from 'axios'
import { get, patch,put } from 'axios';
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import{
   CardBody,Card , CardHeader , Form,Input , FormGroup , Label , Button, Container, Row , Col
} from 'reactstrap';
import MyNavBar from './MyNavbar';
function UpdateFlight(props) {
  const navigate= useNavigate;
  const initialstate= {
  
    From:'',
    To:'',
    FlightDate:'',
    Economy:0,
    Business:0,
    First:0,
    Departure:'',
    Arrival:'',
    Terminal:0
  }
  const { id } = useParams()
  const [flight, setFlight] = useState(initialstate);
  useEffect(() => {
    async function getFlight() {
      try {
        const response = await get(`http://localhost:8000/admin/updateFlight/${id}`);
        console.log(id);
        setFlight(response.data);        
      } catch(error) {
        console.log(error);
      }
    }
    getFlight(); 
  }, [props]);
 
 
  function handleSubmit(event) {
    event.preventDefault();
 
    console.log(flight);
    async function updateFlight() {
      try {
         put(`http://localhost:8000/admin/updateFlight/${id}`, flight).then(
         window.location.href = "/admin" )
        
         
      } catch(error) {
        console.log(error);
      }
    }
    updateFlight();
  }

  function handleChange(event) {
    setFlight({...flight, [event.target.name]: event.target.value})
  }

  
  
  
   
  return (
      <Container className='m-3'>
        <Card className='p-3'>
    <CardHeader className='mb-2'  >
      Update the flight
      {flight.From}
    </CardHeader>
    <CardBody>

    <Form >
    <FormGroup>
    <Label for="From">
      From
    </Label>
    <Input
      id="From"
      name="From"
      placeholder="Departure airport"
      type="text"
      value={flight.From}
      onChange={handleChange}
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
      value={flight.To}
      onChange={handleChange}
    />
  </FormGroup>


  <FormGroup>
    <Label for="exampleDate">
      Flight Date
    </Label>
    <Input
      id="date"
      name="FlightDate"
      placeholder="date placeholder"
      type="date"
      value={flight.FlightDate}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Departure">
Departure Time    </Label>
    <Input
      id="Departure"
      name="Departure"
      placeholder=""
      type="text"
      value={flight.Departure}
      onChange={handleChange}
       
    />
  </FormGroup>
  <FormGroup>
    <Label for="Arrival">
      Arrival Time
    </Label>
    <Input
      id="Arrival"
      name="Arrival"
      placeholder=""
      type="text"
      value={flight.Departure}
      onChange={handleChange}
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
      value={flight.Terminal}
      onChange={handleChange}
    />
  </FormGroup>
  
  <FormGroup>
    <Label for="Economy">
     Number of Economy class seats
    </Label>
    <Input
      id="Economy"
      name="Economy"
      placeholder=""
      type="number"
      value={flight.Economy}
      onChange={handleChange}
    />
  </FormGroup>
  
  <FormGroup>
    <Label for="Business">
     Number of Business class seats
    </Label>
    <Input
      id="Business"
      name="Business"
      placeholder=""
      type="number"
      value= {flight.Business}
      onChange={handleChange}
    />
  </FormGroup>
  
  <FormGroup>
    <Label for="First">
     Number of first class seats
    </Label>
    <Input
      id="First"
      name="First"
      placeholder=""
      type="number"
      value= {flight.First}
      onChange={handleChange}
    />
  </FormGroup>
  <div className="float-right">
   <Button 
   onClick={handleSubmit}
   color="success"
   size="lg"
     >
Update Flight  </Button> 
</div>
 
</Form>
</CardBody>
</Card>
</Container>
    
  );
}




export default UpdateFlight;