import React, { Component ,useContext} from 'react';
 
import { Link } from "react-router-dom";
 
import '../Style/Navbar.css'
import "../css/style.css";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginIcon from '@mui/icons-material/Login';
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
  { href: '/user/', text: 'Home Page',className:'px-2' },
  { href: '/user/viewFlights', text: 'Book a Flight',className:'px-2' },
 { href: `/user/userProfile`, text: 'View My Profile',className:'px-2' },
 { href: `/user/updateProfile`, text: 'Update My Profile' ,className:'px-2'}
   
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
      
        <header id="header" >
				<div class="container" >
					<div class="row">
						<div class="col-sm-12">

                           
							<div class="logo-nav">
								<a href="/home">
									<img class="logoN" src="https://i.pinimg.com/564x/66/fa/7f/66fa7fc53033d53ed3e9497cedb0ce0d.jpg" alt="Sky OverFlow" />
								</a>
							</div>
                       
							<div class="clear-toggle"></div>
							<div id="main-menu" class="collapse scroll navbar-right">
								<ul class="nav">
                <a> <label style={{color:'#FFFFFF',fontSize:'30px',marginLeft:'20%'}}></label></a>

                                
									<li class="active"> <a href="/home"> <HomeOutlinedIcon></HomeOutlinedIcon> Home</a> </li>
									
									<li> <a href="/authorize/login"><LoginIcon></LoginIcon> Login</a> </li>
                  <li> <a href="/user/userProfile"><AccountCircleOutlinedIcon></AccountCircleOutlinedIcon> Profile</a> </li>
                                    
                                   
								  <li> <a href="/authorize/signup"><BorderColorOutlinedIcon></BorderColorOutlinedIcon> Sign Up</a> </li>
																		                                    
									<li> <a href="#contact"><ContactPhoneOutlinedIcon></ContactPhoneOutlinedIcon> Contact Us</a> </li>
										
								</ul>
							</div>
						</div>
					</div>
				</div>
			</header>
  
       
      );
    }
  }
