import {React,useState, useEffect }from 'react';
import axios from 'axios'
import { get, patch,put } from 'axios';
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import{
   CardBody,Card , CardHeader , Form,Input , FormGroup , Label , Button, Container, Row , Col
} from 'reactstrap';
import MyNavBar from './MyNavbar';
function UpdateProfile(props) {
  const navigate= useNavigate;
   const initialstate= {
    Email:'',
    FirstName:'',
    LastName:'',
    Password:'',
    Passport:'',
    Address:'',
    PhoneNumber:0,
    VisaNumber:0,
    Filghts:[]
  }
  const { id } = useParams()
  const [user, setUser] = useState(initialstate);
  useEffect(() => {
    async function getUser() {
      try {
        const response = await get(`http://localhost:8000/user/updateProfile/${id}`);
        console.log(id);
        setUser(response.data);        
      } catch(error) {
        console.log(error);
      }
    }
    getUser(); 
  }, [props]);
  function handleSubmit(event) {
    event.preventDefault();
 
    console.log(user);
    async function updateProfile() {
      try {
         put(`http://localhost:8000/user/updateProfile/${id}`, user).then(
          window.location.href = `/user/${id}` )
        
         
      } catch(error) {
        console.log(error);
      }
    }
    updateProfile();
  }

  function handleChange(event) {
    setUser({...user, [event.target.name]: event.target.value})
  }

  return (
      <Container className='m-3'>
        <Card className='p-3'>
    <CardHeader className='mb-2'  >
      Update 
      {user.FirstName+" "+user.LastName+"'s Profile"}
    </CardHeader>
    <CardBody>

    <Form >
    <FormGroup>
    <Label for="From">
      First Name
    </Label>
    <Input
      id="FirstName"
      name="FirstName"
      placeholder=""
      type="text"
      value={user.FirstName}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="LastName">
    Last Name
    </Label>
    <Input
      id="LastName"
      name="LastName"
      placeholder="Last Name"
      type="text"
      value={user.LastName}
      onChange={handleChange}
    />
  </FormGroup>


  <FormGroup>
    <Label for="Email">
      Email
    </Label>
    <Input
      id="Email"
      name="Email"
      placeholder="something@idk.cool"
      type="email"
      value={user.Email}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Password">
        Password   </Label>
    <Input
      id="Password"
      name="Password"
      placeholder=""
      type="password"
      value={user.Password}
      onChange={handleChange}
       
    />
  </FormGroup>
  <FormGroup>
    <Label for="Passport">
    Passport number
    </Label>
    <Input
      id="Passport"
      name="Passport"
      placeholder=""
      type="text"
      value={user.Passport}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="VisaNumber">
Visa card number    </Label>
    <Input
      id="VisaNumber"
      name="VisaNumber"
      placeholder=""
      type="number"
      value={user.VisaNumber}
      onChange={handleChange}
    />
  </FormGroup>
  
  <FormGroup>
    <Label for="Address">
    Address
    </Label>
    <Input
      id="Address"
      name="Address"
      placeholder=""
      type="text"
      value={user.Address}
      onChange={handleChange}
    />
  </FormGroup>
  
 
  <div className="float-right">
   <Button 
   onClick={handleSubmit}
   color="success"
   size="lg"
     >
Update Profile  </Button> 
</div>
 
</Form>
</CardBody>
</Card>
</Container>
    
  );
}




export default UpdateProfile;