
import React, {useState,useContext} from 'react';
import { useNavigate} from 'react-router-dom'
import axios from 'axios';
 
import AuthContext from "./AuthContext";

import 'bootstrap/dist/css/bootstrap.min.css';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

import{
   CardBody,Card , CardHeader , Form,Input , FormGroup , Label , Button, Container, Row , Col ,Alert
} from 'reactstrap';
import'../Style/forms.css';
function SignIn(){
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);
  const [notCorrect, setAvailable] = useState(false);

 
  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };
        await axios.post("http://localhost:8000/authorize/login",loginData)
        await getLoggedIn();
        navigate('/user', { replace: true });
        setAvailable(false);

      }
      catch(err){
        console.error(err);
        setAvailable(true);

      }}

return(
  <div style={{backgroundColor:'#FFFFFF'}}>
      <Form onSubmit={login} style={{marginTop:'10%',margin:'10%',backgroundColor:'#95D1CC',width:'80%',paddingTop:'5%' ,paddingBottom:'5%' ,borderRadius:'5px'}}>
      <FormGroup>
      <h1>Login to your account</h1>

    <Label >
      Email:
    </Label>
        <input
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
        <input
          type="password"
          placeholder="Password"
          required
          minlength="6"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        </FormGroup>
        <button class="orange" type="submit"><FlightTakeoffIcon color="white" ></FlightTakeoffIcon> Login</button>

      </Form>
      {(notCorrect) &&<Alert color="danger"><a align="center">Invalid Username Or Password Please Try Again  </a></Alert>
}
</div>
);
}
export default SignIn;