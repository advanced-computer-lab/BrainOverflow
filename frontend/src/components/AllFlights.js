import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState, useEffect } from 'react';
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CardBody, Card, CardHeader, Form, Input, FormGroup, Label, Button, Container, Row, Col, Table
} from 'reactstrap';

function AllFlights() {

  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/admin/viewFlights').then(res => {
      setFlights(res.data);

    })
  }, []);

  return (
    <div className="">
      <div className="content">
        <h1>Flights available : </h1>

        <br />
        <Container>

            <Table striped>
              <thead><tr>
                  <th>From</th>
                  <th>To</th>
                  <th> Flight Date</th>
                  <th> Economy </th>
                  <th>Business</th>
                  <th>First class</th>
                  <th>Arrival time </th>
                  <th>Departure time</th>
                  <th>Terminal</th>
                  <th>        </th>
                </tr>
              </thead>
              </Table>
              </Container>



        {flights.map((flights) => (
          <Container>

            <Table striped>
              
              <tbody>

                <tr>
                  <td>{flights.From }</td>
                  <td>{flights.To}</td>
                  <td>{flights.FlightDate}</td>
                  <td>{flights.Economy}</td>
                  <td>{flights.Business}</td>
                  <td>{flights.First}</td>
                  <td>{flights.Arrival}</td>
                  <td>{flights.Departure}</td>
                  <td>{flights.Terminal}</td>
                  <td><button>update</button>
                  <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            </Table>

          </Container>



        ))}

      </div>
    </div>

  );
}




export default AllFlights;
