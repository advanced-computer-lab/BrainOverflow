import React, {useState} from 'react';
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import{
   CardBody,Card , CardHeader , Form,Input , FormGroup , Label , Button, Container, Row , Col
} from 'reactstrap';
import MyNavBar from './MyNavbar';
<<<<<<< Updated upstream
=======
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import logo from './Plane Loop.gif';

>>>>>>> Stashed changes
function CreateFlight() {
<<<<<<< Updated upstream
  const [From,setFrom]=React.useState("");
  const [To,setTo]=React.useState("");
  const [FlightDate,setFlightDate]=React.useState(new Date());
  const [Arrival,setArrival]=React.useState("");
  const [Departure,setDeparture]=React.useState("");
  const [Terminal,setTerminal]=React.useState(0);
  const [Economy,setEconomy]=React.useState(0);
  const [Business,setBusiness]=React.useState(0);
  const [First,setFirst]=React.useState(0);

  const addtoList=()=>{
      //console.log(ArrivalTime,DepartureTime)
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
    }).then(() => this.setState({ redirect: true }));
  }
  return (
<<<<<<< Updated upstream
      <Container className='m-3'>
        <Card className='p-3'>
    <CardHeader className='mb-2'  >
      Create New Flight
    </CardHeader>
=======
    <div style={{padding:"10%" , backgroundColor:"#22577E" ,color:"#22577E" , fontWeight: "bold" }}>
      <div > <img style={{width:"100%" , height:"400px"}} src= {logo}></img></div> 
      <h1 style={{color:"#ECDBBA" , padding:"2%"}} >Create Flight</h1>
      <Container className='m-3'>
=======
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [Error, setError] = useState('');
  const [FlightNumber,setFlightNumber]=React.useState("");
  const [FromAirport,setFromAirport]=React.useState("");
  const [ToAirport,setToAirport]=React.useState("");
  const [FromTerminal,setFromTerminal]=React.useState(0);
  const [ToTerminal,setToTerminal]=React.useState(0);
  const [DepartureDate,setDepartureDate]=React.useState(new Date());
  const [DepartureTime,setDepartureTime]=React.useState(0);
  const [ArrivalDate,setArrivalDate]=React.useState(new Date());
  const [ArrivalTime,setArrivalTime]=React.useState(0);
  const [EconomySeats,setEconomySeats]=React.useState(0);
  const [EconomyPrice,setEconomyPrice]=React.useState(0);
  const [EconomyChildPrice,setEconomyChildPrice]=React.useState(0);
  const [BusinessChildPrice,setBusinessChildPrice]=React.useState(0);
  const [FirstChildPrice,setFirstChildPrice]=React.useState(0);
  const [EconomyBaggage,setEconomyBaggage]=React.useState(0);
  const [BusinessSeats,setBusinessSeats]=React.useState(0);
  const [BusinessPrice,setBusinessPrice]=React.useState(0);
  const [BusinessBaggage,setBusinessBaggage]=React.useState(0);
  const [FirstSeats,setFirstSeats]=React.useState(0);
  const [FirstPrice,setFirstPrice]=React.useState(0);
  const [FirstBaggage,setFirstBaggage]=React.useState(0);
  let navigateBack = useNavigate();
  const addtoList=()=>{
    try {
      if (ArrivalDate<DepartureDate || (ArrivalDate==DepartureDate && ArrivalTime<=DepartureTime )) {
        setError("Arrival Must Be After Departure");
        setHasError(true);
        console.log(ArrivalDate ,DepartureDate , ArrivalTime ,DepartureTime );
        throw new Error("Arrival Must Be After Departure");
      }
    } catch {
      return;
    }
    
    
      //console.log(From,To,FlightDate,Economy,First,Business)
    Axios.post("http://localhost:8000/admin/createFlight",{
      FlightNumber:FlightNumber,
        FromAirport:FromAirport,
        FromTerminal:FromTerminal,
        ToAirport:ToAirport,
        ToTerminal:ToTerminal,
        DepartureDate:DepartureDate,
        DepartureTime:DepartureTime,
        ArrivalDate:ArrivalDate,
        ArrivalTime:ArrivalTime,
        EconomySeats:EconomySeats,
        EconomyPrice:EconomyPrice,
        EconomyChildPrice:EconomyChildPrice,
        EconomyBaggage:EconomyBaggage,
        BusinessSeats:BusinessSeats,
        BusinessPrice:BusinessPrice,
        BusinessChildPrice:BusinessChildPrice,
        BusinessBaggage:BusinessBaggage,
        FirstSeats:FirstSeats,
        FirstPrice:FirstPrice,
        FirstChildPrice:FirstChildPrice,
        FirstBaggage:FirstBaggage
    }).then(navigate('/admin', { replace: true }));


     
 
    
}

function handleClick() {
  navigateBack(-1)
}
  return (
    <div style={{padding:"10%" , backgroundColor:"#22577E" ,color:"#22577E" , fontWeight: "bold" }}>
      <div > <img style={{width:"100%" , height:"400px"}} src= {logo}></img></div> 
      <h1 style={{color:"#ECDBBA" , padding:"2%"}} >Create Flight</h1>
      <Container className='m-3'>
>>>>>>> Stashed changes
        {!hasError &&
        <Card className='p-3' style={{backgroundColor:"rgb(85, 132, 172)"}}>
    {/* <CardHeader className='mb-2'  style={{backgroundColor:"white"}}  >
     <h3> Create New Flight</h3>
    </CardHeader> */}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    <CardBody>

    <Form >
    <FormGroup>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <Label for="From">
=======
=======
>>>>>>> Stashed changes
    <Label for="FlightNumber" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Flight Number
    </Label>
    <Input
      id="FlightNumber"
      name="FlightNumber"
      placeholder="Flight Number airport"
      type="text"
      required
      onChange={(e)=>{
        setFlightNumber(e.target.value);
      }}
    />
    </FormGroup>
    <FormGroup>
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
=======
      required
      onChange={(e)=>{
        setFromAirport(e.target.value);
      }}
    />
    <Label for="Terminal" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Departure Terminal
    </Label>
    <Input
      id="DepartTerminal"
      name="DepartTerminal"
      placeholder="Departure Teminal"
      type="number"
      required
      onChange={(e)=>{
        setFromTerminal(e.target.value);
      }}
    />
    <Label for="exampleDate" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Departure Date
    </Label>
    <Input
      id="date"
      name="date"
      placeholder="datetime-local"
      type="datetime-local"
      required
      onChange={(e)=>{
        setDepartureDate(e.target.value);
      }}
    />
     <Label for="exampleDate" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Departure Time
    </Label>
    <Input
      id="Departure Time"
      name="Departure Time"
      placeholder="time placeholder"
      type="time"
      required
>>>>>>> Stashed changes
      onChange={(e)=>{
        setFrom(e.target.value);
      }}
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
      onChange={(e)=>{
<<<<<<< Updated upstream
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
      name="FlightDate"
      placeholder="date placeholder"
      type="date"
=======
        setToAirport(e.target.value);
      }}
    />
    <Label for="To" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Arrival Terminal
    </Label>
    <Input
      id="Arrival Terminal"
      name="Arrival Termina"
      placeholder="Arrival Terminal"
      type="number"
      required
      onChange={(e)=>{
        setToTerminal(e.target.value);
      }}
    />
    <Label for="exampleDate" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Arrival Date
    </Label>
    <Input
      id="Arrivaldate"
      name="Arrivaldate"
      placeholder="datetime-local"
      type="datetime-local"
      required
      onChange={(e)=>{
        setArrivalDate(e.target.value);
      }}
    />
     <Label for="exampleDate" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
      Arrival Time
    </Label>
    <Input
      id="Arrival Time"
      name="Arrival Time"
      placeholder="time placeholder"
      type="time"
      required
>>>>>>> Stashed changes
      onChange={(e)=>{
        setTo(e.target.value);
      }}
    />
  </FormGroup>
  <FormGroup>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <Label for="Departure">
Departure Time    </Label>
=======
=======
>>>>>>> Stashed changes
    <Label for="Economy" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Number of Economy Class Seats
    </Label>
>>>>>>> Stashed changes
    <Input
      id="Departure"
      name="Departure"
      placeholder=""
      type="text"
      onChange={(e)=>{
        setDeparture(e.target.value);
      }}
    />
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  </FormGroup>
  <FormGroup>
    <Label for="Arrival">
      Arrival Time
=======
    <Label for="EconomyPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Price of Economy Class Seat for Adults
>>>>>>> Stashed changes
=======
    <Label for="EconomyPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Price of Economy Class Seat for Adults
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  </FormGroup>
  <FormGroup>
    <Label for="Terminal">
Terminal    </Label>
=======
=======
>>>>>>> Stashed changes
    <Label for="EconomyChildPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Price of Economy Class Seat for Children
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  </FormGroup>
  
  <FormGroup>
    <Label for="Economy">
     Number of Economy class seats
=======
    <Label for="EconomyBaggege" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Number of Allowed Baggage in Economy Class 
>>>>>>> Stashed changes
=======
    <Label for="EconomyBaggege" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Number of Allowed Baggage in Economy Class 
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
    <Label for="BusinessSeats" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Number of Business Class Seats
>>>>>>> Stashed changes
=======
    <Label for="BusinessSeats" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Number of Business Class Seats
>>>>>>> Stashed changes
    </Label>
    <Input
      id="Business"
      name="Business"
      placeholder=""
      type="number"
      onChange={(e)=>{
<<<<<<< Updated upstream
        setBusiness(e.target.value);
=======
        setBusinessSeats(e.target.value);
      }}
    />
        <Label for="BusinessPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Price of Business Class Seat for Adults
    </Label>
    <Input
      id="BusinessPrice"
      name="BusinessPrice"
      placeholder=""
      type="number"
      required
      onChange={(e)=>{
        setBusinessPrice(e.target.value);
      }}
    />
    <Label for="BusinessChildPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Price of Business Class Seat for Children
    </Label>
    <Input
      id="BusinessChildPrice"
      name="BusinessChildPrice"
      placeholder=""
      type="number"
      required
      onChange={(e)=>{
        setBusinessChildPrice(e.target.value);
      }}
    />
    <Label for="BusinessBaggege" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Number of Allowed Baggage in Business Class 
    </Label>
    <Input
      id="BusinessBaggege"
      name="BusinessBaggege"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setBusinessBaggage(e.target.value);
>>>>>>> Stashed changes
      }}
    />
  </FormGroup>
  
  <FormGroup>
    <Label for="First" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Number of First Class Seats
    </Label>
    <Input
<<<<<<< Updated upstream
      id="First"
      name="First"
=======
      id="first"
      required
      name="first"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setFirstSeats(e.target.value);
      }}
    />
     <Label for="FirstPrice" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Price of First Class Seat for Adults
    </Label>
    <Input
      id="FirstPrice"
      name="FirstPrice"
      placeholder=""
      type="number"
      required
      onChange={(e)=>{
        setFirstPrice(e.target.value);
      }}
    />
     <Label for="FirstPriceChild" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Price of First Class Seat for Children
    </Label>
    <Input
      id="FirstPriceChild"
      name="FirstPriceChild"
      placeholder=""
      required
      type="number"
      onChange={(e)=>{
        setFirstChildPrice(e.target.value);
      }}
    />
    <Label for="FirstBaggege" style={{color:"#ECDBBA" , fontWeight: "bold"}}>
     Number of Allowed Baggage in First Class 
    </Label>
    <Input
      id="FirstBaggege"
      name="FirstBaggege"
>>>>>>> Stashed changes
      placeholder=""
      type="number"
      onChange={(e)=>{
        setFirst(e.target.value);
      }}
    />
  </FormGroup>
  <div className="float-right">
  <Button 
     style={{backgroundColor:"#22577E",color:"white" , width:"300px",fontWeight: "bold"}}
    color="success"
    size="lg"
    onClick={addtoList}>
Create Flight  </Button>
</div>
 

</Form>
</CardBody>
<<<<<<< Updated upstream
</Card>
</Container>
=======
</Card>}
{hasError &&<Alert><a align="center" style={(Error)?{display: 'block'}:{display: 'none'}}>{Error}</a></Alert>
<<<<<<< Updated upstream
}
</Container></div>
>>>>>>> Stashed changes
=======
}  
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

export default CreateFlight;