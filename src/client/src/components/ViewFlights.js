
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewFlightsList extends Component {


  render() {
    

    return (
      <div className="ViewFlightsList">
       

            <div className="col-md-11">
              <Link to="/create-flight" className="btn btn-outline-warning float-right">
                + Add New User
              </Link>
             
            </div>
      </div>
    );
  }
}

export default ViewFlightsList;