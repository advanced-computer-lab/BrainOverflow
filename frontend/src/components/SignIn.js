
import React, {useState,useContext} from 'react';
import { useNavigate} from 'react-router-dom'
import axios from 'axios';
 
import AuthContext from "./AuthContext";

import 'bootstrap/dist/css/bootstrap.min.css';
import{
   CardBody,Card , CardHeader , Form,Input , FormGroup , Label , Button, Container, Row , Col ,Alert
} from 'reactstrap';

function SignIn(){
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);
 
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
      }
      catch(err){
        console.error(err);
      }}
return(
  <div>
      <h1>Login to your account</h1>
      <Form onSubmit={login}>
      <FormGroup>
    <Label >
      Email:
    </Label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        </FormGroup>
        <FormGroup>
    <Label >
      Password:
    </Label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        </FormGroup>
        <button type="submit">login</button>

      </Form>
</div>
);
}
export default SignIn;