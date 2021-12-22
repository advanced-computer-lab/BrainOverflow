import '../Style/Navbar.css'
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
    { href: '/user/viewFlights', text: 'Book a Flight' },
    { href: '/user/Login', text: 'Login | Sign up' },
     
  
   
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
      
        <header id="header">
				<div class="container">
					<div class="row">
						<div class="col-sm-12">
							{/* <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-menu">
								<span class="sr-only">Toggle navigation</span>
								<span class="fa fa-bars"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button> */}
                           
							<div class="logo-nav">
								<a href="index.html">
									<img class="logoN" src="https://i.pinimg.com/564x/66/fa/7f/66fa7fc53033d53ed3e9497cedb0ce0d.jpg" alt="Sky OverFlow" />
								</a>
							</div>
                           
							<div class="clear-toggle"></div>
							<div id="main-menu" class="collapse scroll navbar-right">
								<ul class="nav">
                                
									<li class="active"> <a href="/home">Home</a> </li>
									
									<li> <a href="/login">Login</a> </li>
                                    
                                   
								  <li> <a href="/admin/createFlight">Create A Flight</a> </li>
																		
									<li> <a href="#blog">Blog</a></li>
                                    
                  <li> <a href="#testimonials">Testimonials</a></li>
                                     
									<li> <a href="#contact">Contact</a> </li>
										
								</ul>
							</div>
						</div>
					</div>
				</div>
			</header>
  
       
      );
    }
  }