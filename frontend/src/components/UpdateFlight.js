import {React,useState, useEffect }from 'react';
import axios from 'axios'
import { get, patch,put } from 'axios';
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import{
   CardBody,Card , CardHeader , Form,Input , FormGroup , Label , Button, Container, Row , Col
} from 'reactstrap';
import MyNavBar from './MyNavbar';
import logo from './Plane Loop.gif';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';

function UpdateFlight(props) {
  let navigateBack = useNavigate();
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

  
  function handleBack() {
    navigateBack(-1)
  }
  
   
  return (
    <div style={{padding:"10%" , backgroundColor:"#22577E" ,color:"#22577E" , fontWeight: "bold" }}>
       <div > <img style={{width:"100%" , height:"400px"}} src= {logo}></img></div> 
       <h1 style={{color:"#ECDBBA" , padding:"2%"}} >Update Flight {flight.FlightNumber}</h1>
      <Container className='m-3'>
        <Card className='p-3' style={{backgroundColor:"rgb(85, 132, 172)"}}>
    {/* <CardHeader className='mb-2'  >
      Update The Flight {flight.FlightNumber}
    </CardHeader> */}
    <CardBody>
    
    <Form >
    
    <FormGroup>
    <Label for="FlightNumber" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Flight Number
    </Label>
    <Input
      id="FlightNumber"
      name="FlightNumber"
      placeholder="Flight Number"
      type="text"
      value={flight.FlightNumber}
      onChange={handleChange}
    />
    <Label for="From" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
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
    <Label for="FromTerminal" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
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
    <Label for="To" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
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
    <Label for="ToTerminal" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
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
    <Label for="exampleDate" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Departure Date
    </Label>
    <Input
      id="DepartureDate"
      name="DepartureDate"
      placeholder="date placeholder"
      type="date"
      required      //value={flight.Departure.Date}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Departure" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
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
    <Label for="exampleDate" style={{color:"#ECDBBA", fontWeight: "bold"}}>
      Arrival Date
    </Label>
    <Input
      id="ArrivalDate"
      name="ArrivalDate"
      placeholder="date placeholder"
      type="date"
      required
      //value={flight.Arrival.Date}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Arrival" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
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
    <Label for="Economy" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Number of Economy Class Seats
    </Label>
    <Input
      id="Economy"
      name="Economy"
      placeholder=""
      type="number"
      required
      // value={flight.Economy.SeatId.length}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="EconomyPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Price of Economy Seat for Adults
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
    <Label for="EconomyChildPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
    Price of Economy Seat for Children
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
    <Label for="Business" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Number of Business Class Seats
    </Label>
    <Input
      id="Business"
      name="Business"
      placeholder=""
      type="number"
      required
      // value={flight.Economy.SeatId.length}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="BusinessPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Price of Business Seat for Adults
    </Label>
    <Input
      id="BusinessPrice"
      name="BusinessPrice"
      placeholder=""
      type="number"
      required
      value={flight.Economy.Price}
      onChange={handleChange}
    />
  </FormGroup>
  
  <FormGroup>
    <Label for="BusinessChildPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
    Price of Business Seat for Children
    </Label>
    <Input
      id="BusinessChildPrice"
      name="BusinessChildPrice"
      placeholder=""
      required
      type="number"
      value= {flight.Economy.Price}
      onChange={handleChange}
    />
  </FormGroup>
  
  <FormGroup>
    <Label for="First" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Number of First Class Seats
    </Label>
    <Input
      id="First"
      name="First"
      required
      placeholder=""
      type="number"
      // value= {flight.First.SeatId.length}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="FirstPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Price of First Class Seat for Adults
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
    <Label for="FirstChildPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
    Price of First Class Seat for Children
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
   style={{backgroundColor:"#22577E",color:"white" , width:"300px",fontWeight: "bold"}}
   color="success"
   size="lg"
     >
Update Flight  </Button> 


</div>

 
</Form>
</CardBody>
</Card>
</Container>

<Button onClick={handleBack}><ArrowCircleLeftRoundedIcon fontSize="large"></ArrowCircleLeftRoundedIcon> Back </Button>
</div>
    
  );
}




export default UpdateFlight;