import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import {Modal,ModalHeader,ModalBody,ModalFooter,CardBody, Card, CardHeader, Form, Input, FormGroup,
        Label, Button, Container, Row, Col, Table} from 'reactstrap';
function ReserveFlight(){
    const [departureNumber,setdeparureNumber]=React.useState("");
    const [returnNumber,returnNumber]=React.useState(0);
    const [departureDate,departureDate]=React.useState(new Date());
    const [ArrivalDate,ArrivalDate]=React.useState(new Date());
    const [ departureDTime,departureDTime]=React.useState("");
    const [departureATime,departureATime]=React.useState("");
    const [returnDTime,returnDTime]=React.useState("");
    const [returnATime,returnATime]=React.useState("");
    const [departureDuration,departureDuration]=React.useState(0);
    const [returnDuration,returnDuration]=React.useState(0);
    const [departurePrice,departurePrice]=React.useState(0);
    const [returnPrice,returnPrice]=React.useState(0);
    const [departurCabin,departurCabin]=React.useState("");
    const [returnCabin,returnCabin]=React.useState("");
    const [departureSeats,departureSeats]=React.useState("");
    const [returnSeats,returnSeats]=React.useState("");
}