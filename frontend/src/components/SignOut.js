
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

 
  async function logout(e) {

        await axios.post("http://localhost:8000/authorize/logout")

      }


      

return(
  <div style={{backgroundColor:'#FFFFFF',marginTop:"30%"}}>
      {(getLoggedIn) &&<Button onClick={logout} color="danger" align="center">Log Out</Button>}


</div>
);
}
export default SignIn;