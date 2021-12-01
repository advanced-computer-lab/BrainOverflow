import React from "react";
import { Switch, Route, Link, useSearchParams } from "react-router-dom";
import { get, patch,put } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {useParams,useLocation} from "react-router-dom";
import { CardBody, Card, CardColumns,CardImg,CardSubtitle,CardText,
          Button,CardTitle } from 'reactstrap';
      
function ViewFlight(props){
    const initialstate=
    {From:{
    Airport:'',
    Terminal:''
},
      To:{
  Airport:'',
  Terminal:''
},
Economy:{
  SeatId:[],
  Price:0,
  Baggage:0
},
Business:{
  SeatId:[],
  Price:0,
  Baggage:0
},
First:{
  SeatId:[],
  Price:0,
  Baggage:0
},
Departure:{
  Date:new Date(),
  Time:''
},
Arrival:{
  Date:new Date(),
  Time:''
}

};
 
    let location = useLocation();
    let search=new URLSearchParams(location)
    const [flight, setFlight] = useState(initialstate);
    const { id } = useParams();
    useEffect(() => {
      console.log(search);
     
        axios.get(`http://localhost:8000/user/viewFlight/${id}`).then(res => {
          setFlight(res.data);
           })
      }, [props]);

      return(
        <CardColumns>
        <Card>
          <CardImg
            alt="Card image cap"
            src="https://picsum.photos/256/186"
            top
            width="100%"
          />
          <CardBody>
            <CardTitle tag="h5">
              Flight From {flight.From.Airport} to {flight.To.Airport}
            </CardTitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              Flight on 
            </CardSubtitle>
            <CardText>
              
            </CardText>
            <Button>
              Book
            </Button>
          </CardBody>
        </Card>
       
      </CardColumns>
      
      )
}
export default ViewFlight;