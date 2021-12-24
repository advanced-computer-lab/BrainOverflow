import { React, useState, useEffect } from 'react';
import axios from 'axios'
import { get, patch, put } from 'axios';
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    CardBody, Card, CardTitle, CardText, Badge, Button, Container, Row, Col,Alert , ReactCenter
} from 'reactstrap';
import MyNavBar from './MyNavbar';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import { Wave } from 'react-animated-text';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Con1 from "./Con1.jpg";
import Con2 from "./Con2.jpg";
import Con3 from "./Con3.jpg";

import Con4 from "./Con4.jpg";
import Con5 from "./Con5.jpg";
import Con6 from "./Con6.jpg";

import Con7 from "./Con7.jpg";
import Con8 from "./Con8.jpg";
import Con9 from "./Con9.jpg";

import Con10 from "./Con10.jpg";
import Con11 from "./Con11.jpg";
import Con12 from "./TravelOne.jpg";

function UserProfile(props) {
    const [hasError, setHasError] = useState(false);
    const [Error, setError] = useState('');
    const navigate = useNavigate;
    const handleSubmit=()=>{
        navigate(`user/${id}`, { replace: true });
    }
    const initialstate = {
        Email: '',
        FirstName: '',
        LastName: '',
        Password: '',
        Passport: '',
        Address: '',
        Country:'',
        PhoneNumber: 0,
        VisaNumber: 0,
    }
    const { id } = useParams();
    // const myLink = `/userProfile/updateProfile/${id}`;
    const myLink = `/userProfile/updateProfile/`;
 

    const [user, setUser] = useState(initialstate);
    useEffect(() => {
        // const response =axios.get(`http://localhost:8000/user/userProfile/${id}`)
        const response =axios.get(`http://localhost:8000/user/userProfile/`).then(res => {
           if(!(res.data.FirstName)|| res.status==404){
               console.log("Iam null")
               setHasError(true);
               setError("No user Exists with this id")
           }
          setUser(res.data);
        
        }).catch((err)=> {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
             if (err.response) {
                setHasError(true);
                setError("You entered non valid id")
             }
           })
      }, []);      

   

      const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

      const ExampleOne = () => (
        <Wave text="EXAMPLE TEXT" />
      );

      let UserC =user.FirstName;
      let result1 = UserC.substring(0,1);

      const itemData = [
        {
          img: Con1,
          title: 'Breakfast',
        },
        {
          img: Con2,
          title: 'Burger',
        },
        {
          img: Con3,
          title: 'Camera',
        },
        {
          img: Con4,
          title: 'Coffee',
        },
        {
          img: Con5,
          title: 'Hats',
        },
        {
          img: Con6,
          title: 'Honey',
        },
        {
          img: Con12,
          title: 'Basketball',
        },
        {
          img: Con7,
          title: 'Fern',
        },
        {
          img: Con8,
          title: 'Mushrooms',
        },
        {
          img: Con9,
          title: 'Tomato basil',
        },
        {
          img: Con10,
          title: 'Sea star',
        },
        {
          img: Con11,
          title: 'Bike',
        },
      ];
      

    return (


<div style={{ padding:"10%" , width:"200%" ,backgroundColor:"#22577E", height:"200%" ,color:"#22577E" , fontWeight: "bold" }}>
<Stack direction="row" spacing={2} style={{position:"absolute" , left:"85%" , top:"5%"}}>
     
      <Avatar sx={{ color: 'primary.main'}}>{result1}</Avatar>
      
    </Stack>
<div style={{color:"white",fontSize:"200%" }}> 
<Wave  text={"Hello " + user.FirstName + " " + user.LastName} effect="stretch" effectChange={1.3}/></div>


        <Container className='m-3' style={{backgroundColor:"#22577E" , height:"300px"}}>
            <div>
            {!(hasError) && <Card
                    
                    body
                    color="light"
                >
                    <CardBody >
                        <CardTitle tag="h5">
                        
                            
                        </CardTitle>
                        <CardText>
                            <div>
                                
<Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>First Name:   {user.FirstName}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item> Last Name :  {user.LastName}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item> Passport number:  {user.Passport}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Country:   {user.Country}</Item>
        </Grid>

        <Grid item xs={6}>
          <Item>  Address: {user.Address}</Item>
        </Grid>
         
        <Grid item xs={6}>
          <Item> Phone Number:  {user.PhoneNumber}</Item>
        </Grid>


      </Grid>
    </Box>

                            </div>
                        </CardText>
                        <Link to={myLink} className="btn btn-primary"style={{backgroundColor:"white" ,color:"#22577E" , position:"absolute" , left:"43%" , top:"120%"}}>Update Profile</Link>
                        <Link to={`/user/viewReserved/${id}`} className="btn btn-success ml-2 " style={{backgroundColor:"white" ,color:"#22577E" ,position:"absolute" , left:"41%" , top:"150%"}}>View My Reserved flights</Link>

                    </CardBody>
                </Card>}
            </div>
            {hasError &&  <Col className="bg-light "> <Alert align="center" color="danger" Row > 
<a align="center" style={(Error)?{display: 'block',color:'red',fontSize:'20px'}:{display: 'none'}}><CardTitle>{Error}</CardTitle></a></Alert></Col> 
}

        </Container>
        
        <h4 style={{color:"white"}}>Countries That Matches Your Intrests</h4>
        <ImageList sx={{ width: 500, height: 450 , top:"10%"}} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
        
        
        </div>
    
    


     



        

    );
}




export default UserProfile;