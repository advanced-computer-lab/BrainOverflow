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
import profile from './Profile.jpg'
<<<<<<< Updated upstream
=======
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';

>>>>>>> Stashed changes
function UpdateProfile(props) {
  // const navigate= useNavigate;
  // const [EmailErr, setEmailErr] = React.useState('');
  // const [FirstNameErr, setFirstNameErr] = React.useState('');
  // const [LastNameErr,setLastNameErr]=React.useState("");
  // const [PasswordErr,setPasswordErr]=React.useState("");
  let navigateBack = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
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

    

    if(user.PhoneNumber.length>15){
      setErrorMessage('Please enter a Correct phone Number that is at least Shorter than 16 digits!');  
    }
    else if(user.VisaNumber.length>16){
      setErrorMessage('Please enter a Correct Visa Card Number that is at least Shorter than 17 digits!');
    }

    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.Email)) && user.Email.length>0){
      setErrorMessage('Please enter a Correct email!');
    }
    else if(user.Passport.length>9){
      setErrorMessage('Please enter a Correct Passport Number that is at least Shorter than 10 digits!');
    }
    else if (user.Password.length<6  && user.Password.length>0){
      setErrorMessage('Please enter a Correct Password Number that is at least longer than 6 digits!');
    }
    else if (user.PhoneNumber<0 || user.VisaNumber<0 || user.Passport<0 ){
      setErrorMessage('Please Do not enter any Negative Numbers!');

    }
    else if (user.FirstName=='' || user.LastName==''|| user.Country==''|| user.Email==''
     || user.Password==''||user.Passport==''|| user.Address==''||user.PhoneNumber==0||user.VisaNumber==0){
      setErrorMessage('Please fill all the fields!');
     }
    else  {    
     
  
    async function updateProfile() {
      try {
<<<<<<< Updated upstream
         put(`http://localhost:8000/user/updateProfile/${id}`, user).then(
          window.location.href = `/user/${id}` )
=======
         put(`http://localhost:8000/user/updateProfile/`, user).then(
          window.location.href = `/user/userProfile` )
>>>>>>> Stashed changes
        
         
      } catch(error) {
        console.log(error);
      }
    }
    updateProfile();
  }
  
}
  

  function handleChange(event) {
    setUser({...user, [event.target.name]: event.target.value})
    handleFormValidation();
  }
  function handleBack() {
    navigateBack(-1)
  }

  return (
    <div style={{padding:"10%" , backgroundColor:"#22577E" ,color:"#22577E" , fontWeight: "bold" }}>
     <div style={{position:"absolute" , left:"50%"}}><img src={profile} style={{width:"100%" , height:"100%"}}></img></div> 
    
      <Container className='m-3' style={{backgroundColor:"#22577E" , width:"600px" }} >
        <Card className='p-3' style={{backgroundColor:"#C9CCD5"}} >
    {/* <CardHeader className='mb-2'  >
      Update 
      {user.FirstName+" "+user.LastName+"'s Profile"}
    </CardHeader> */}
    <CardBody style={{backgroundColor:"#C9CCD5" ,color:"#22577E" , fontWeight: "bold" , width:"400px" }} >

    <Form >
    <FormGroup>
    <Label for="From" style={{color:"#39251c"}}>
      First Name
    </Label>
    <Input
<<<<<<< Updated upstream
      style={{width:"400px" }}
=======
    
      style={{width:"400px"  , borderRadius:"8px"}}
>>>>>>> Stashed changes
      id="FirstName"
      name="FirstName"
      placeholder="First Name"
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
    <Label for="LastName" style={{color:"#39251c"}}>
    Last Name
    </Label>
    <Input
    required
<<<<<<< Updated upstream
    style={{width:"400px" }}
=======
    style={{width:"400px" , borderRadius:"8px"}}
>>>>>>> Stashed changes
      id="LastName"
      name="LastName"
      placeholder="Last Name"
      type="text"
      required
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
    <Label for="Email" style={{color:"#39251c"}}>
      Email
    </Label>
    <Input
<<<<<<< Updated upstream
      style={{width:"400px" }}
=======
      style={{width:"400px" , borderRadius:"8px" }}
>>>>>>> Stashed changes
      id="Email"
      name="Email"
      placeholder="something@idk.cool"
      type="email"
      value={user.Email}
      required
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
    <Label for="Password" style={{color:"#39251c"}}>
        Password   </Label>
    <Input
<<<<<<< Updated upstream
      style={{width:"400px" }}
=======
      style={{width:"400px" , borderRadius:"8px"}}
>>>>>>> Stashed changes
      id="Password"
      name="Password"
      placeholder="Password"
      type="password"
      value={user.Password}
      required
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
    <Label for="Passport" style={{color:"#39251c"}}>
    Passport Number
    </Label>
    <Input
      
<<<<<<< Updated upstream
      style={{width:"400px" }}
=======
      style={{width:"400px" , borderRadius:"8px"}}
>>>>>>> Stashed changes
      id="Passport"
      name="Passport"
      placeholder="Passport"
      type="text"
      value={user.Passport}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="PhoneNumber" style={{color:"#39251c"}}>
Phone Number    </Label>
    <Input
<<<<<<< Updated upstream
      style={{width:"400px" }}
=======
      style={{width:"400px" , borderRadius:"8px"}}
>>>>>>> Stashed changes
      id="PhoneNumber"
      name="PhoneNumber"
      placeholder="Phone Number"
      type="tel"
      value={user.PhoneNumber}
      required
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
    <Label for="VisaNumber" style={{color:"#39251c"}}>
Visa Card Number    </Label>
    <Input
<<<<<<< Updated upstream
      style={{width:"400px" }}
=======
      style={{width:"400px", borderRadius:"8px" }}
>>>>>>> Stashed changes
      id="VisaNumber"
      name="VisaNumber"
      placeholder="Visa Card Number"
      type="number"
      value={user.VisaNumber}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="Country" style={{color:"#39251c"}}>
    Country
    </Label>
    <Input
<<<<<<< Updated upstream
      style={{width:"400px" }}
=======
      style={{width:"400px" , borderRadius:"8px"}}
>>>>>>> Stashed changes
      id="Country"
      name="Country"
      placeholder="Country"
      type="text"
      value={user.Country}
      onChange={handleChange}
      required
    />
     {/* <FormFeedback valid style={!(user.formErrors.Country)?{display: 'block'}:{display: 'none'}}>
     valid input
    </FormFeedback>
    <FormFeedback invalid style={((user.formErrors.Country))?{display: 'block'}:{display: 'none'}}>
     You Must enter your Country
    </FormFeedback> */}
  </FormGroup>
  
  
  <FormGroup>
    <Label for="Address" style={{color:"#39251c"}}>
    Address
    </Label>
    <Input
<<<<<<< Updated upstream
      style={{width:"400px"}}
=======
      style={{width:"400px" , borderRadius:"8px"}}
>>>>>>> Stashed changes
      id="Address"
      name="Address"
      placeholder="Address"
      type="text"
      value={user.Address}
      onChange={handleChange}
    />
  </FormGroup>
  
 
  <div className="float-right">
   <Button 
   style={{backgroundColor:"#22577E" ,color:"white"}}
   onClick={handleSubmit}
   color="success"
   size="lg"
     >
Update Profile  </Button> 
</div>
 
</Form>
</CardBody>
</Card>
<<<<<<< Updated upstream
</Container></div>
=======
</Container>
{errorMessage && (
  <p className="error" style={{color:"orange"}}> {errorMessage} </p>
)}
<Button onClick={handleBack}><ArrowCircleLeftRoundedIcon fontSize="large"></ArrowCircleLeftRoundedIcon> Back </Button>
</div>
>>>>>>> Stashed changes
    
  );
}

export default UpdateProfile;