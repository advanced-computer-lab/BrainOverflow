import React, {useState,useContext} from 'react';
import { useNavigate} from 'react-router-dom'
import Axios from 'axios';
import AuthContext from "./AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import{
   CardBody,Card , CardHeader , Form,Input , FormGroup , Label , Button, Container, Row , Col ,Alert,CardTitle
} from 'reactstrap';
import'../Style/forms.css';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

 
function Registeration() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [passwordverify, setPasswordVerify] = useState("");
const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");
const [address, setAddress] = useState("");
const [countrycode, setCountrycode] = useState("");
const [phone, setPhone] = useState("");
const [passport, setPassport] = useState("");
const [HasError, setHasError] = useState(false);
const [Error, setError] = useState('');
const [success,setSuccess]=useState('');
const navigate = useNavigate();
const { getLoggedIn } = useContext(AuthContext);
 
async function register(e){
    e.preventDefault();

    try{
        const registerData = {
            email,
            password,
            passwordverify,
            firstname,
            lastname,
            address,
            countrycode,
            phone,
            passport 
          };
    
           
          await Axios.post(
            "http://localhost:8000/authorize/signup",
            registerData
        
          );
        await getLoggedIn();
        navigate('/user', { replace: true });

    }
    catch(err){
        console.error(err);
        if (err.response) {
          setHasError(true);
          if(password!=passwordverify){
            setError("Passwords Don't Match");
          }
          else{
          setError("Account Already Exist");
        }
       }
       else{
        setHasError(false);
        setSuccess(true);

       }

    }
}

 
return(
    <div style={{backgroundColor:'#FFFFFF'}}>
    
      <Form onSubmit={register} style={{marginTop:'10%',margin:'10%',backgroundColor:'#95D1CC',width:'80%',paddingTop:'5%' ,paddingBottom:'5%' ,borderRadius:'5px'}}>
      <h1>Register a new account</h1>
      <FormGroup>
    <Label >
      First Name:
    </Label><br/>
      <input
          type="name"
          placeholder="Your FirstName"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
          required
        />
        </FormGroup>
        <FormGroup>
    <Label >
      Last Name:
    </Label>
    <br/>
         <input style={{borderColor: 'rgb(250, 250, 250)',padding: '10px',borderRadius:'5px'}}
          type="name"
          placeholder="Your LastName"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
          required
        />
        </FormGroup>
        <FormGroup>
    <Label >
      Email:
    </Label>
    <br/>
        <input style={{borderColor: 'rgb(250, 250, 250)',padding: '10px',borderRadius:'5px'}}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        </FormGroup>
        <FormGroup>
    <Label >
      Password:
    </Label>
    <br/>
        <input style={{borderColor: 'rgb(250, 250, 250)',padding: '10px',borderRadius:'5px'}}
          type="password"
          placeholder="Password"
          minlength="6"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        </FormGroup>
        <FormGroup>
    <Label >
      Verify Your Password :
    </Label>
    <br/>
        <input style={{borderColor: 'rgb(250, 250, 250)',padding: '10px',borderRadius:'5px'}}
          type="password"
          placeholder="Verify your password"
          onChange={(e) => setPasswordVerify(e.target.value)}
          value={passwordverify}
          required
        />
        </FormGroup>

        <FormGroup>
    <Label >
      Passport Number:
    </Label>
    <br/>
          <input style={{borderColor: 'rgb(250, 250, 250)',padding: '10px',borderRadius:'5px'}}
          type="passport"
          placeholder="Passport Number "
          onChange={(e) => setPassport(e.target.value)}
          value={passport}
          required
        />
        </FormGroup>
        <FormGroup>
    <Label >
      Address:
    </Label>
    <br/>
        <input style={{borderColor: 'rgb(250, 250, 250)',padding: '10px',borderRadius:'5px'}}
          type="address"
          placeholder="Your Address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          required
        />
         </FormGroup>
         <FormGroup>
    <Label >
      Country Code:
    </Label>
    <br/>
         <input style={{borderColor: 'rgb(250, 250, 250)',padding: '10px',borderRadius:'5px'}}
          type="Countrycode"
          placeholder="Your country code"
          onChange={(e) => setCountrycode(e.target.value)}
          value={countrycode}
          required
        />
        </FormGroup>
        <FormGroup>
    <Label >
      Phone Number:
    </Label>
    <br/>
         <input 
          type="phone"
          placeholder="Your Phonenumber"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          required
        />
        </FormGroup>
       
        <button type="submit" class="orange"><FlightTakeoffIcon color="white" ></FlightTakeoffIcon> Register</button>
        <br/><br/>
        {HasError &&  <Col className="bg-light "> <Alert align="center" color="danger" Row > 
<a align="center" style={(Error)?{display: 'block',color:'red',fontSize:'20px'}:{display: 'none'}}><CardTitle>{Error}</CardTitle></a></Alert></Col> 
}
{(success) &&<Alert color="info"><a align="center">Registered Successfully</a></Alert>}


      </Form>

    </div>

);

}
export default Registeration;