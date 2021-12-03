import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import{
   CardBody,Card , CardHeader , Form,Input , FormGroup , Label , Button, Container, Row , Col ,Alert
} from 'reactstrap';
import MyNavBar from './MyNavbar';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

function CreateFlight() {
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
  return (
   
      <Container className='m-3'>
        {!hasError &&
        <Card className='p-3'>
    <CardHeader className='mb-2'  >
      Create New Flight
    </CardHeader>
    <CardBody>

    <Form>
    <FormGroup>
    <Label for="FlightNumber">
      Flight Number
    </Label>
    <Input
      id="FlightNumber"
      name="FlightNumber"
      placeholder="Flight Number airport"
      type="text"
      onChange={(e)=>{
        setFlightNumber(e.target.value);
      }}
    />
    </FormGroup>
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
        setFromAirport(e.target.value);
      }}
    />
    <Label for="Terminal">
      Departure Terminal
    </Label>
    <Input
      id="DepartTerminal"
      name="DepartTerminal"
      placeholder="Departure Teminal"
      type="number"
      onChange={(e)=>{
        setFromTerminal(e.target.value);
      }}
    />
    <Label for="exampleDate">
      Departure Date
    </Label>
    <Input
      id="date"
      name="date"
      placeholder="datetime-local"
      type="datetime-local"
      onChange={(e)=>{
        setDepartureDate(e.target.value);
      }}
    />
     <Label for="exampleDate">
      Departure Time
    </Label>
    <Input
      id="Departure Time"
      name="Departure Time"
      placeholder="time placeholder"
      type="time"
      onChange={(e)=>{
        setDepartureTime(e.target.value);
      }}
    />
  </FormGroup>
  <br />
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
        setToAirport(e.target.value);
      }}
    />
    <Label for="To">
      Arrival Terminal
    </Label>
    <Input
      id="Arrival Terminal"
      name="Arrival Termina"
      placeholder="Arrival Terminal"
      type="number"
      onChange={(e)=>{
        setToTerminal(e.target.value);
      }}
    />
    <Label for="exampleDate">
      Arrival Date
    </Label>
    <Input
      id="Arrivaldate"
      name="Arrivaldate"
      placeholder="datetime-local"
      type="datetime-local"
      onChange={(e)=>{
        setArrivalDate(e.target.value);
      }}
    />
     <Label for="exampleDate">
      Arrival Time
    </Label>
    <Input
      id="Arrival Time"
      name="Arrival Time"
      placeholder="time placeholder"
      type="time"
      onChange={(e)=>{
        setArrivalTime(e.target.value);
      }}
    />
  </FormGroup>
  <br />
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
        setEconomySeats(e.target.value);
      }}
    />
    <Label for="EconomyPrice">
     Price of Economy class seat for aduults
    </Label>
    <Input
      id="economyPrice"
      name="EconomyPrice"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setEconomyPrice(e.target.value);
      }}
    />
    <Label for="EconomyChildPrice">
     Price of Economy class seat for children
    </Label>
    <Input
      id="economyPriceChild"
      name="EconomyPriceChild"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setEconomyChildPrice(e.target.value);
      }}
    />
    <Label for="EconomyBaggege">
     Number of Allowed Baggage in Economy class 
    </Label>
    <Input
      id="EconomyBaggege"
      name="EconomyBaggege"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setEconomyBaggage(e.target.value);
      }}
    />
  </FormGroup>
  <br/>
  <FormGroup>
    <Label for="BusinessSeats">
     Number of Business class seats
    </Label>
    <Input
      id="BusinessSeats"
      name="BusinessSeats"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setBusinessSeats(e.target.value);
      }}
    />
        <Label for="BusinessPrice">
     Price of Business class seat for adults
    </Label>
    <Input
      id="BusinessPrice"
      name="BusinessPrice"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setBusinessPrice(e.target.value);
      }}
    />
    <Label for="BusinessChildPrice">
     Price of Business class seat for children
    </Label>
    <Input
      id="BusinessChildPrice"
      name="BusinessChildPrice"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setBusinessChildPrice(e.target.value);
      }}
    />
    <Label for="BusinessBaggege">
     Number of Allowed Baggage in Business class 
    </Label>
    <Input
      id="BusinessBaggege"
      name="BusinessBaggege"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setBusinessBaggage(e.target.value);
      }}
    />
  </FormGroup>
  <br/>
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
        setFirstSeats(e.target.value);
      }}
    />
     <Label for="FirstPrice">
     Price of First class seat for adults
    </Label>
    <Input
      id="FirstPrice"
      name="FirstPrice"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setFirstPrice(e.target.value);
      }}
    />
     <Label for="FirstPriceChild">
     Price of First class seat for children
    </Label>
    <Input
      id="FirstPriceChild"
      name="FirstPriceChild"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setFirstChildPrice(e.target.value);
      }}
    />
    <Label for="FirstBaggege">
     Number of Allowed Baggage in Fisrt class 
    </Label>
    <Input
      id="FirstBaggege"
      name="FirstBaggege"
      placeholder=""
      type="number"
      onChange={(e)=>{
        setFirstBaggage(e.target.value);
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
</Card>}
{hasError &&<Alert><a align="center" style={(Error)?{display: 'block'}:{display: 'none'}}>{Error}</a></Alert>
}
</Container>
    
    );
}

export default CreateFlight;
