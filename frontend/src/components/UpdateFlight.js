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
    FlightNumber:'',
    From:{Airport:'',Terminal:0},
    To:{Airport:'',Terminal:0},
    Economy:{SeatId:[],Price:0,ChildPrice:0,Baggage:0},
    Business:{SeatId:[],Price:0,ChildPrice:0,Baggage:0},
    First:{SeatId:[],Price:0,ChildPrice:0,Baggage:0},
    Departure:{Date:new Date(),Time:''},
    Arrival:{Date:new Date(),Time:''}
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
      {flight.FlightNumber}
    </CardHeader>
    <CardBody>

    <Form >
    <FormGroup>
    <Label for="FlightNumber">
      From
    </Label>
    <Input
      id="FlightNumber"
      name="FlightNumber"
      placeholder="Flight Number"
      type="text"
      value={flight.FlightNumber}
      onChange={handleChange}
    />
    <Label for="From">
      From
    </Label>
    <Input
      id="From"
      name="From"
      placeholder="Departure airport"
      type="text"
      required
      value={flight.From.Airport}
      onChange={handleChange}
    />
    <Label for="FromTerminal">
    Departure Terminal
    </Label>
    <Input
      id="FromTerminal"
      name="FromTerminal"
      placeholder="Departure Terminal"
      type="number"
      value={flight.From.Terminal}
      required
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
      value={flight.To.Airport}
      required
      onChange={handleChange}
    />
  </FormGroup>

  <FormGroup>
    <Label for="ToTerminal">
      Arrival Terminal
    </Label>
    <Input
      id="ToTerminal"
      name="ToTerminal"
      placeholder="Arrival Terminal"
      type="number"
      required
      value={flight.To.Terminal}
      onChange={handleChange}
    />
  </FormGroup>


  <FormGroup>
    <Label for="exampleDate">
      Departure Date
    </Label>
    <Input
      id="DepartureDate"
      name="DepartureDate"
      placeholder="date placeholder"
      type="datetime-local"
      required      //value={flight.Departure.Date}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Departure">
Departure Time    </Label>
    <Input
      id="DepartureTime"
      name="DepartureTime"
      placeholder="date placeholder"
      type="time"
      required
      //value={flight.Departure.Time}
      onChange={handleChange}
       
    />
  </FormGroup>
  <FormGroup>
    <Label for="exampleDate">
      Arrival Date
    </Label>
    <Input
      id="ArrivalDate"
      name="ArrivalDate"
      placeholder="date placeholder"
      type="datetime-local"
      required
      //value={flight.Arrival.Date}
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
      required
      type="time"
      //v/alue={flight.Arrival.Time}
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
      required
      value={flight.Economy.SeatId.length}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="EconomyPrice">
      Price of Economy seat for Adults
    </Label>
    <Input
      id="EconomyPrice"
      name="EconomyPrice"
      placeholder=""
      type="number"
      required
      value={flight.Economy.Price}
      onChange={handleChange}
    />
  </FormGroup>
  
  <FormGroup>
    <Label for="EconomyChildPrice">
    Price of Economy seat for children
    </Label>
    <Input
      id="EconomyChildPrice"
      name="EconomyChildPrice"
      placeholder=""
      required
      type="number"
      value= {flight.Economy.Price}
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
      required
      placeholder=""
      type="number"
      value= {flight.First.SeatId.length}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="FirstPrice">
      Price of First class seat for Adults
    </Label>
    <Input
      id="FirstPrice"
      name="FirstPrice"
      placeholder=""
      required
      type="number"
      value={flight.First.Price}
      onChange={handleChange}
    />
  </FormGroup>
  
  <FormGroup>
    <Label for="FirstChildPrice">
    Price of First class seat for children
    </Label>
    <Input
      id="FirstChildPrice"
      name="FirstChildPrice"
      placeholder=""
      required
      type="FirstChildPrice"
      value= {flight.First.ChildPrice}
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