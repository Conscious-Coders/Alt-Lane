import React, {useState, useEffect, useContext} from 'react'
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

function LoginedNavBar(props){

  const userType = props.userType; 
  const token = props.authToken; 


  const { state: authState } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  const userType = authState.userType; 
  const [isLoggedOut, setLogOut] = useState(false)
  
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  console.log(userType)
 
  const logout = () => {
    console.log("this is logout")
    localStorage.clear();
    setLogOut(true)
  }

  if(isLoggedOut) {
    console.log("inside if statement")
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
              <NavItem className="nav-link">
                <li className="nav-item">
                    <Link className="nav-link btn btn-dark" to="/homepage">HOME</Link>
                </li>
              </NavItem>
              { userType === "mentee" &&
                <NavItem  className="nav-link">
                  <li className="nav-item">
                    <Link className="nav-link btn btn-dark" to="/find-mentor">FIND MENTOR</Link>
                  </li>
                </NavItem>
              }
              <NavItem className="nav-link">
                  <li className="nav-item">
                    <Link className="nav-link btn btn-dark" to="/profile">PROFILE</Link>
                  </li>
              </NavItem>
              <NavItem  className="nav-link">
                <li className="nav-item">
                  <Link className="nav-link btn btn-dark" to="/settings">SETTINGS</Link>
                </li>
              </NavItem>
              <NavItem  className="nav-link">
              <li className="nav-item">
                  <button className="nav-link btn btn-dark" onClick={logout}>LOGOUT</button>
                </li>
              </NavItem>
            </Nav>
          </Collapse>
      </Navbar>
    </div>
  )
}
export default LoginedNavBar;