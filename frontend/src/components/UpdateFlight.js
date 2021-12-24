import { Component,  useEffect } from 'react';
import React, {useState} from 'react';
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import{
   CardBody,Card , CardHeader , Form,Input , FormGroup , Label , Button, Container, Row , Col
} from 'reactstrap';
import MyNavBar from './MyNavbar';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
function UpdateFlight() {
  const[_id,setID]=React.useState("");
  const [From,setFrom]=React.useState("");
  const [To,setTo]=React.useState("");
  const [FlightDate,setFlightDate]=React.useState(new Date());
  const [Arrival,setArrival]=React.useState("");
  const [Departure,setDeparture]=React.useState("");
  const [Terminal,setTerminal]=React.useState(0);
  const [Economy,setEconomy]=React.useState(0);
  const [Business,setBusiness]=React.useState(0);
  const [First,setFirst]=React.useState(0);
=======
=======
>>>>>>> Stashed changes
import logo from './Plane Loop.gif';

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
>>>>>>> Stashed changes
 

  const UpdateList=()=>{
      //console.log(ArrivalTime,DepartureTime)
      
    
    Axios.put("http://localhost:8000/admin/UpdateFlight/:id", {

      From:From,
      To:To,
      FlightDate:FlightDate,
      Economy:Economy,
      Business:Business,
      First:First,
      Departure:Departure,
      Arrival:Arrival,
      Terminal:Terminal
  }).then( res => {
      alert('Updated successfully!');
     }   )
     .catch(err => {
       console.log(err.response);
       alert('An error occurred! Try submitting the form again.');
     });
        
    }
    
   
    const [flights, setFlights] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:8000/admin/UpdateFlight/:id').then(res => {
      setFlights(res.data);

    })
  }, []);
  
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
  function handleClick() {
    navigateBack(-1)
  }
  
   
>>>>>>> Stashed changes
  return (
    <div style={{padding:"10%" , backgroundColor:"#22577E" ,color:"#22577E" , fontWeight: "bold" }}>
       <div > <img style={{width:"100%" , height:"400px"}} src= {logo}></img></div> 
       <h1 style={{color:"#ECDBBA" , padding:"2%"}} >Update Flight {flight.FlightNumber}</h1>
      <Container className='m-3'>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <Card className='p-3'>
    <CardHeader className='mb-2'  >
      Update the flight
    </CardHeader>
    <CardBody>

    <Form>
    <FormGroup>
    <Label for="From">
=======
        <Card className='p-3' style={{backgroundColor:"rgb(85, 132, 172)"}}>
    {/* <CardHeader className='mb-2'  >
      Update The Flight {flight.FlightNumber}
    </CardHeader> */}
    <CardBody>
=======
        <Card className='p-3' style={{backgroundColor:"rgb(85, 132, 172)"}}>
    {/* <CardHeader className='mb-2'  >
      Update The Flight {flight.FlightNumber}
    </CardHeader> */}
    <CardBody>
>>>>>>> Stashed changes
    
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      From
    </Label>
    <Input
      id="From"
      name="From"
      placeholder="Departure airport"
      type="text"
<<<<<<< Updated upstream
      onChange={(e)=>{
        setFrom(e.target.value);
      }}
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      onChange={(e)=>{
        setTo(e.target.value);
      }}
=======
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
>>>>>>> Stashed changes
    />
  </FormGroup>


  <FormGroup>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <Label for="exampleDate">
      Flight Date
=======
=======
>>>>>>> Stashed changes
    <Label for="exampleDate" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Departure Date
>>>>>>> Stashed changes
    </Label>
    <Input
      id="date"
      name="FlightDate"
      placeholder="date placeholder"
      type="date"
      onChange={(e)=>{
        setTo(e.target.value);
      }}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Departure" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
Departure Time    </Label>
    <Input
<<<<<<< Updated upstream
      id="Departure"
      name="Departure"
      placeholder=""
      type="text"
      onChange={(e)=>{
        setDeparture(e.target.value);
      }}
=======
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
      type="datetime-local"
      required
      //value={flight.Arrival.Date}
      onChange={handleChange}
>>>>>>> Stashed changes
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
      type="text"
      onChange={(e)=>{
        setArrival(e.target.value);
      }}
    />
  </FormGroup>
  <FormGroup>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <Label for="Terminal">
Terminal    </Label>
=======
=======
>>>>>>> Stashed changes
    <Label for="Economy" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Number of Economy Class Seats
    </Label>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <Label for="Economy">
     Number of Economy class seats
=======
    <Label for="EconomyPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Price of Economy Seat for Adults
>>>>>>> Stashed changes
=======
    <Label for="EconomyPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Price of Economy Seat for Adults
>>>>>>> Stashed changes
    </Label>
    <Input
      id="Economy"
      name="Economy"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setEconomy(e.target.value);
      }}
    />
  </FormGroup>
  
  <FormGroup>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <Label for="Business">
     Number of Business class seats
=======
    <Label for="EconomyChildPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
    Price of Economy Seat for Children
>>>>>>> Stashed changes
=======
    <Label for="EconomyChildPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
    Price of Economy Seat for Children
>>>>>>> Stashed changes
    </Label>
    <Input
      id="Business"
      name="Business"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setBusiness(e.target.value);
      }}
    />
  </FormGroup>
  
  <FormGroup>
    <Label for="First" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Number of First Class Seats
    </Label>
    <Input
      id="First"
      name="First"
<<<<<<< Updated upstream
=======
      required
      placeholder=""
      type="number"
      value= {flight.First.SeatId.length}
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
>>>>>>> Stashed changes
      placeholder=""
      type="number"
<<<<<<< Updated upstream
      onChange={(e)=>{
        setFirst(e.target.value);
      }}
=======
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
>>>>>>> Stashed changes
    />
  </FormGroup>

  <div className="float-right">
<<<<<<< Updated upstream
  <Button 
    color="success"
    size="lg"
    onClick={UpdateList}>
Update Flight  </Button>
=======
   <Button 
   onClick={handleSubmit}
   style={{backgroundColor:"#22577E",color:"white" , width:"300px",fontWeight: "bold"}}
   color="success"
   size="lg"
     >
Update Flight  </Button> 

<<<<<<< Updated upstream
<button onClick={handleClick}>go back</button> 
>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes
</div>

 
</Form>
</CardBody>
</Card>
<<<<<<< Updated upstream
</Container></div>
=======
</Container>

<Button 
onClick={handleClick} 
style={{backgroundColor:"white",color:"#22577E" , width:"300px",fontWeight: "bold" }}
// size="lg"
>go back</Button> 

</div>
>>>>>>> Stashed changes
    
  );
}




export default UpdateFlight;