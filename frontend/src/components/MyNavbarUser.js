import '/Users/ok/Documents/GitHub/BrainOverflow/frontend/src/Style/Navbar.css';
import React, { Component } from 'react';

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
  { href: '/user/viewFlights', text: 'Find a flight Flight' },

 
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
          <NavbarBrand href="/home"> <img class='logo' src="https://i.pinimg.com/564x/1b/63/98/1b6398ec7c18f9e3adf043304e875246.jpg" ></img></NavbarBrand>
          <NavbarBrand href="/home"><b>SkyOverFlow</b></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {links.map(createNavItem)}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
