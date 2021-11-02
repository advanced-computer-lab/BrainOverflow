import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateUser extends Component {
    constructor() {
      super();
      this.state = {
        Name: '',
        Email:'',
        Age:'',
        BornIn:'',
        LivesIn:'',
        MartialStatus:'',
        PhoneNumber:'',
        Job:''
      };
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    onSubmit = e => {
        e.preventDefault();
    
    const data = {
        Name: this.state.Name,
        Email: this.state.Email,
        Age: this.state.Age,
        BornIn: this.state.BornIn,
        LivesIn: this.state.LivesIn,
        MartialStatus: this.state.MartialStatus,
        PhoneNumber:this.state.PhoneNumber,
        Job:this.state.Job
      };
      axios
      .post('http://localhost:8000/add-user', data)
      .then(res => {
        this.setState({
            Name: '',
            Email:'',
            Age:'',
            BornIn:'',
            LivesIn:'',
            MartialStatus:'',
            PhoneNumber:'',
            Job:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in CreateUser!");
      })
  };
  render() {
    return (
      <div className="CreateUser">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/view-users" className="btn btn-outline-warning float-left">
                  Show user list
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add User</h1>
              <p className="lead text-center">
                  add a new user
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Name'
                    name='Name'
                    className='form-control'
                    value={this.state.Name}
                    onChange={this.onChange}
                  />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Email'
                    name='Email'
                    className='form-control'
                    value={this.state.Email}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Age'
                    name='Age'
                    className='form-control'
                    value={this.state.Age}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='BornIn'
                    name='BornIn'
                    className='form-control'
                    value={this.state.BornIn}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='LivesIn'
                    name='LivesIn'
                    className='form-control'
                    value={this.state.LivesIn}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='MartialStatus'
                    name='MartialStatus'
                    className='form-control'
                    value={this.state.MartialStatus}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='PhoneNumber'
                    name='PhoneNumber'
                    className='form-control'
                    value={this.state.PhoneNumber}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Job'
                    name='Job'
                    className='form-control'
                    value={this.state.Job}
                    onChange={this.onChange}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;