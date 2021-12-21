import React, { Component ,useContext} from 'react';
 
import { Link } from "react-router-dom";
import AuthContext from './AuthContext';
 
import '../Style/Navbar.css'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const links = [
  { href: '/user/viewFlights', text: 'Book a Flight' },
   

 
];

const createNavItem = ({ href, text, className }) => (
  <NavItem>
    <NavLink href={href} className={className}>{text}</NavLink>
  </NavItem>
);

export default class MyNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (

      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"> <img class='logo' src="https://i.pinimg.com/564x/1b/63/98/1b6398ec7c18f9e3adf043304e875246.jpg" ></img></NavbarBrand>
          <NavbarBrand href="/"><b>SkyOverFlow</b></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
         
           <  Nav className="ml-auto" navbar>
          
              { links.map(createNavItem)}
             
            </Nav>
           
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
