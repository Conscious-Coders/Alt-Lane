import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

function LandingNavBar(){
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return(
    <div>
      <Navbar className="ml-auto" sticky="top" color="dark" dark expand="md" >
        <NavbarBrand href="/">
          <img src='/alt_lane_logo.png' style={{ marginLeft: '1em' ,width: '90px', height: 'auto' }} alt="alt lane logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav style={{marginLeft: "auto"}}>
              <NavItem className="nav-link">
                <li className="nav-item">
                    <Link className="nav-link btn btn-dark" to="/login">LOGIN</Link>
                </li>
              </NavItem>
              <NavItem  className="nav-link">
                <li className="nav-item">
                  <Link className="nav-link btn btn-dark" to="/register">REGISTER</Link>
                </li>
              </NavItem>
            </Nav>
          </Collapse>
      </Navbar>
    </div>
  )
}
export default LandingNavBar;