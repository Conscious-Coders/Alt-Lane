import React, {useState, useContext} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { AuthContext } from "../App";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

function LoginedNavBar(){
  const { state: authState } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  const userType = authState.userType; 
  const [isLoggedOut, setLogOut] = useState(false)
  
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    localStorage.clear();
    setLogOut(true)
  }

  if(isLoggedOut) {
    dispatch({
      type: "LOGOUT"
    })
      return <Redirect to='/'/>
  }

  return(
    <div>
      <Navbar className="ml-auto" sticky="top" color="dark" dark expand="md" >
        <NavbarBrand href="/">
          <img src='/alt_lane_logo.png' style={{ marginLeft: '1em' ,width: '90px', height: 'auto' }} alt="alt lane logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav style={{marginLeft: "auto"}}>
            <NavItem className="nav-link nav-item" style={{padding: 0}}>
                    <Link className="nav-link btn btn-dark" to="/homepage">HOME</Link>
              </NavItem>
              { userType === "mentee" &&
              <NavItem className="nav-link nav-item" style={{padding: 0}}>
                    <Link className="nav-link btn btn-dark" to="/find-mentor">FIND MENTOR</Link>
                </NavItem>
              }
              <NavItem className="nav-link nav-item" style={{padding: 0}}>
                    <Link className="nav-link btn btn-dark" to="/profile">PROFILE</Link>
              </NavItem>
              <NavItem className="nav-link nav-item" style={{padding: 0}}>
                  <Link className="nav-link btn btn-dark" to="/settings">SETTINGS</Link>
              </NavItem>
              <NavItem  className="nav-link nav-item" style={{padding: 0}}>
                  <button className="nav-link btn btn-dark" onClick={logout}>LOGOUT</button>
              </NavItem>
            </Nav>
          </Collapse>
      </Navbar>
    </div>
  )
}
export default LoginedNavBar;