import { React, useState, useEffect } from 'react';
import axios from 'axios'
import { get, patch, put } from 'axios';
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    CardBody, Card, CardTitle, CardText, Badge, Button, Container, Row, Col
} from 'reactstrap';
import MyNavBar from './MyNavbar';
function UserProfile(props) {
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
        PhoneNumber: 0,
        VisaNumber: 0,
        Filghts: []
    }
    const { id } = useParams()
    const myLink = `/user/updateProfile/${id}`;

    const [user, setUser] = useState(initialstate);
    useEffect(() => {
        async function getUser() {
            try {
                const response = await get(`http://localhost:8000/user/${id}`);
                console.log(id);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [props]);



    return (
        <Container className='m-3'>
            <div>
                <Card
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
                </Card>
            </div>

        </Container>

    );
}




export default UserProfile;