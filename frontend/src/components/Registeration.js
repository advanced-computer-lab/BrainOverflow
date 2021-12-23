import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import{
   CardBody,Card , CardHeader , Form,Input , FormGroup , Label , Button, Container, Row , Col ,Alert
} from 'reactstrap';
 
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

    }
    catch(err){
        console.error(err);
    }
}

 
return(
    <div style={{padding:"10%" , backgroundColor:"rgb(34, 87, 126)"}}>
      <h1 style={{color:"rgb(149, 209, 204)"}}>Register a new account</h1>
      
      <Form onSubmit={register}>
      <FormGroup>
    <Label >
      First Name:
    </Label>
      <input
          type="name"
          placeholder="Your FirstName"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
        />
        </FormGroup>
        <FormGroup>
    <Label >
      Last Name:
    </Label>
         <input
          type="name"
          placeholder="Your LastName"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
        />
        </FormGroup>
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
        <FormGroup>
    <Label >
      Verify Your Password :
    </Label>
        <input
          type="password"
          placeholder="Verify your password"
          onChange={(e) => setPasswordVerify(e.target.value)}
          value={passwordverify}
        />
        </FormGroup>

        <FormGroup>
    <Label >
      Passport Number:
    </Label>
          <input
          type="passport"
          placeholder="Passport Number "
          onChange={(e) => setPassport(e.target.value)}
          value={passport}
        />
        </FormGroup>
        <FormGroup>
    <Label >
      Address:
    </Label>
        <input
          type="address"
          placeholder="Your Address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
         </FormGroup>
         <FormGroup>
    <Label >
      Country Code:
    </Label>
         <input
          type="Countrycode"
          placeholder="Your country code"
          onChange={(e) => setCountrycode(e.target.value)}
          value={countrycode}
        />
        </FormGroup>
        <FormGroup>
    <Label >
      Phone Number:
    </Label>
         <input
          type="phone"
          placeholder="Your Phonenumber"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        </FormGroup>
       
        <button type="submit">Register</button>
      </Form>
    </div>
);

}
export default Registeration;