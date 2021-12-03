import {React,useState, useEffect }from 'react';
import axios from 'axios'
import { get, patch,put } from 'axios';
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import{
   CardBody,Card , CardHeader , Form,Input , FormGroup , Label , Button, Container, Row , Col ,FormFeedback
} from 'reactstrap';
import MyNavBar from './MyNavbar';
function UpdateProfile(props) {
  // const navigate= useNavigate;
  // const [EmailErr, setEmailErr] = React.useState('');
  // const [FirstNameErr, setFirstNameErr] = React.useState('');
  // const [LastNameErr,setLastNameErr]=React.useState("");
  // const [PasswordErr,setPasswordErr]=React.useState("");

   const initialstate= {   
    Email:'',
    FirstName:'',
    LastName:'',
    Password:'',
    Passport:'',
    Country:'',
    Address:'',
    PhoneNumber:0,
    VisaNumber:0,
  }
 function handleFormValidation() {    
    let formIsValid = true;    
  console.log(user);
    //Student name     
    if (!(user.FirstName)) {  
        formIsValid = false;    
        // setFirstNameErr("First Name is required.");    
    }    
    if (!user.LastName) {    
      formIsValid = false;    
      // setLastNameErr("Last Name is required.");    
  } 

    //Email    
    if (!user.Email) {    
        formIsValid = false;    
        // setEmailErr("Email is required.");    
    }    
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.Email))) {    

        formIsValid = false;    
        // setEmailErr("Invalid email address");    
    }    
    //Password    
    if (!user.Password) {    
      formIsValid = false;    
      // setPasswordErr("Password is required.");    
  }   
    
  

    //Phone number    
    // if (!user.PhoneNumber) {    
    //     formIsValid = false;    
    //     "Phone number is required.";    
    // }    
       

    //City    
    // if (user.Country === '') {    
    //     formIsValid = false;    
    //     formErrors["Country"] = "Please Provide a country";    
    // }
    // setUser({...user,[formErrors]: formErrors })
    return formIsValid;    
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
    if (handleFormValidation()) {    
     
  
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
  else{
    alert('You Must fill all required info')    

  }
}
  

  function handleChange(event) {
    setUser({...user, [event.target.name]: event.target.value})
    handleFormValidation();
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
      required
    />
   {/* <FormFeedback valid style={!(FirstNameErr)?{display: 'block'}:{display: 'none'}}>
     valid input
    </FormFeedback>
    <FormFeedback invalid style={(FirstNameErr)?{display: 'block'}:{display: 'none'}}>
     You Must enter your first name
    </FormFeedback> */}
  </FormGroup>
  <FormGroup>
    <Label for="LastName">
    Last Name
    </Label>
    <Input
    required
      id="LastName"
      name="LastName"
      placeholder="Last Name"
      type="text"
      value={user.LastName}
      onChange={handleChange}
    />
    {/* <FormFeedback valid style={!(LastNameErr)?{display: 'block'}:{display: 'none'}}>
     valid input
    </FormFeedback>
    <FormFeedback invalid style={((LastNameErr))?{display: 'block'}:{display: 'none'}}>
     You Must enter your last name
    </FormFeedback> */}
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
     {/* <FormFeedback valid style={!(EmailErr)?{display: 'block'}:{display: 'none'}}>
     valid input
    </FormFeedback>
    <FormFeedback invalid style={((EmailErr))?{display: 'block'}:{display: 'none'}}>
     You Must enter your Email address in the specified pattern 
    </FormFeedback> */}
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
     {/* <FormFeedback valid style={!(user.formErrors.Password)?{display: 'block'}:{display: 'none'}}>
     valid input
    </FormFeedback>
    <FormFeedback invalid style={((user.formErrors.Password))?{display: 'block'}:{display: 'none'}}>
     You Must enter a password
    </FormFeedback> */}
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
    <Label for="PhoneNumber">
Visa card number    </Label>
    <Input
      id="PhoneNumber"
      name="PhoneNumber"
      placeholder=""
      type="tel"
      value={user.PhoneNumber}
      onChange={handleChange}
    />
     {/* <FormFeedback valid style={!(user.formErrors.PhoneNumber)?{display: 'block'}:{display: 'none'}}>
     valid input
    </FormFeedback>
    <FormFeedback invalid style={((user.formErrors.PhoneNumber))?{display: 'block'}:{display: 'none'}}>
     You Must enter your phone number
    </FormFeedback> */}
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
    <Label for="Country">
    Country
    </Label>
    <Input
      id="Country"
      name="Country"
      placeholder=""
      type="text"
      value={user.Country}
      onChange={handleChange}
      
    />
     {/* <FormFeedback valid style={!(user.formErrors.Country)?{display: 'block'}:{display: 'none'}}>
     valid input
    </FormFeedback>
    <FormFeedback invalid style={((user.formErrors.Country))?{display: 'block'}:{display: 'none'}}>
     You Must enter your Country
    </FormFeedback> */}
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