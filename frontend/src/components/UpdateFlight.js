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
  const [DepartureDate,setDepartureDate]=useState(new Date());
  const [DepartureTime,setDepartureTime]=useState(0);
  const [ArrivalDate,setArrivalDate]=useState(new Date());
  const [ArrivalTime,setArrivalTime]=useState(0);
  const [FromAirport,setFromAirport]=useState("");
  const [ToAirport,setToAirport]=useState("");
  const [FromTerminal,setFromTerminal]=useState(0);
  const [ToTerminal,setToTerminal]=useState(0);
  const [EconomyPrice,setEconomyPrice]=useState(0);
  const [EconomyChildPrice,setEconomyChildPrice]=useState(0);
  const [BusinessChildPrice,setBusinessChildPrice]=useState(0);
  const [FirstChildPrice,setFirstChildPrice]=useState(0);
  const [EconomyBaggage,setEconomyBaggage]=useState(0);
  const [BusinessPrice,setBusinessPrice]=useState(0);
  const [BusinessBaggage,setBusinessBaggage]=useState(0);
  const [FirstPrice,setFirstPrice]=useState(0);
  const [FirstBaggage,setFirstBaggage]=useState(0);
  const [hasError, setHasError] = useState(false);


  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams()
  const initialstate= {
    FlightNumber:'',
  }
  const [flight, setFlight] = useState(initialstate);
  useEffect(() => {
    async function getFlight() {
      try {
        const response = await get(`http://localhost:8000/admin/updateFlight/${id}`);
        console.log(id);
        setFlight(response.data); 
        setBusinessBaggage(response.data.Business.Baggage);  
        setFirstBaggage(response.data.First.Baggage);
        setEconomyBaggage(response.data.Economy.Baggage);
        setEconomyPrice(response.data.Economy.Price);
        setEconomyChildPrice(response.data.Economy.ChildPrice);
        setFirstPrice(response.data.First.Price);
        setFirstChildPrice(response.data.First.ChildPrice);
        setBusinessPrice(response.data.Business.Price);
        setBusinessChildPrice(response.data.Business.ChildPrice);
        setToAirport(response.data.To.Airport);
        setFromAirport(response.data.From.Airport);
        setToTerminal(response.data.To.Terminal);
        setFromTerminal(response.data.From.Terminal);      
     
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
         put(`http://localhost:8000/admin/updateFlight/${id}`,{ 'flight':flight,'DepTime':DepartureTime,'DepDate':DepartureDate,
         'ArrDate':ArrivalDate,'ArrTime':ArrivalTime,
          'DepAirport':FromAirport,'DepTerminal':FromTerminal,
          'ToAirport':ToAirport,'ToTerminal':ToTerminal,'busPrice':BusinessPrice,
          'BusBaggage':BusinessBaggage,'BusChildPrice':BusinessChildPrice,
          'EcoPrice':EconomyPrice,'EcoChildPrice':EconomyChildPrice,
          'EcoBaggage':EconomyBaggage,'FirstPrice':FirstPrice,'FirstChildPrice':FirstChildPrice,'FirstBaggage':FirstBaggage       
        
        
        }).then(
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
    
    <Form onSubmit={handleSubmit}>
    
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
      value={FromAirport}
      onChange={(e)=>{
        setFromAirport(e.target.value);
      }}    />
    <Label for="FromTerminal" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
    Departure Terminal
    </Label>
    <Input
      id="FromTerminal"
      name="FromTerminal"
      placeholder="Departure Terminal"
      type="number"
      value={FromTerminal}
      required
      onChange={(e)=>{
        setFromTerminal(e.target.value);
      }}    />
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
      value={ToAirport}
      required
      onChange={(e)=>{
        setToAirport(e.target.value);
      }}/>
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
      value={ToTerminal}
      onChange={(e)=>{
        setToTerminal(e.target.value);
      }}    />
  </FormGroup>


  <FormGroup>
    <Label for="exampleDate" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Departure Date
    </Label>
    <Input
      id="date"
      name="date"
      placeholder="date placeholder"
      type="date"
      required
      
      onChange={(e)=>{
        setDepartureDate(e.target.value);
      }}></Input>
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
      onChange={(e)=>{
        setDepartureTime(e.target.value);
      }}
       
    />
  </FormGroup>
  <FormGroup>
    <Label for="exampleDate" style={{color:"#ECDBBA", fontWeight: "bold"}}>
      Arrival Date
    </Label>
    <Input
      id="Arrivaldate"
      name="Arrivaldate"
      placeholder="date placeholder"
      type="date"
      required
      onChange={(e)=>{
        setArrivalDate(e.target.value);
      }}
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
      //value={flight.Arrival.Time}
      onChange={(e)=>{
        setArrivalTime(e.target.value);
      }}    />
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
      value={EconomyPrice}

      onChange={(e)=>{
        setEconomyPrice(e.target.value);
      }}      onChange={handleChange}
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
      value= {EconomyChildPrice}
      onChange={(e)=>{
        setEconomyChildPrice(e.target.value);
      }}
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
      value={BusinessPrice}
      onChange={(e)=>{
        setBusinessPrice(e.target.value);
      }}
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
      value= {BusinessChildPrice}
      onChange={(e)=>{
        setBusinessChildPrice(e.target.value);
      }}/>    
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
      value={FirstPrice}
      onChange={(e)=>{
        setFirstPrice(e.target.value);
      }}/>   
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
      type="number"
      value= {FirstChildPrice}
      onChange={(e)=>{
        setFirstChildPrice(e.target.value);
      }}    />
  </FormGroup>

  <div className="float-right">
   <Button 
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