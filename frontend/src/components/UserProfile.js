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
    const myLink = `/user/updateProfile/${id}`;

    const [user, setUser] = useState(initialstate);
    useEffect(() => {
        const response =axios.get(`http://localhost:8000/user/userProfile/${id}`).then(res => {
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



    return (

        <Container className='m-3'>
            <div>
            {!(hasError) && <Card
                    body
                    color="light"
                >
                    <CardBody>
                        <CardTitle tag="h5">
                            {"Hello " + user.FirstName + " " + user.LastName}
                        </CardTitle>
                        <CardText>
                            <div>
                                <Row xs="2">
                                    <Col className="bg-light border "> First Name
                                    </Col><Col className="bg-light border ">   {user.FirstName}</Col>
                                </Row>
                                <Row xs="2">
                                    <Col className="bg-light border "> Last Name
                                    </Col><Col className="bg-light border ">   {user.LastName}</Col>
                                </Row>
                                <Row xs="2">
                                    <Col className="bg-light border "> Passport number
                                    </Col><Col className="bg-light border ">   {user.Passport}</Col>
                                </Row>
                                <Row xs="2">
                                    <Col className="bg-light border "> Country
                                    </Col><Col className="bg-light border ">   {user.Country}</Col>
                                </Row>
                                <Row xs="2">
                                    <Col className="bg-light border "> Address
                                    </Col><Col className="bg-light border ">   {user.Address}</Col>
                                </Row>
                                <Row xs="2">
                                    <Col className="bg-light border "> Phone Number
                                    </Col><Col className="bg-light border ">   {user.PhoneNumber}</Col>
                                </Row>


                            </div>
                        </CardText>
                        <Link to={myLink} className="btn btn-primary">Update Profile</Link>

                    </CardBody>
                </Card>}
            </div>
            {hasError &&  <Col className="bg-light "> <Alert align="center" color="danger" Row > 
<a align="center" style={(Error)?{display: 'block',color:'red',fontSize:'20px'}:{display: 'none'}}><CardTitle>{Error}</CardTitle></a></Alert></Col> 
}

        </Container>
        

    );
}




export default UserProfile;