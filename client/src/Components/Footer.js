import { Link } from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavItem
} from 'reactstrap';

function Footer(){

  return(
    <div >
      <footer className="footer py-3 bg-dark">
          <Navbar>
              <Nav className="mx-auto">
                <NavItem className="nav-link nav-item" style={{padding: "5px 50px"}}>
                      <Link className="btn btn-dark" style={{color: "#white"}} to="/">Contact Us</Link>
                </NavItem>
                <NavItem className="nav-link nav-item" style={{padding: "5px 50px"}}>
                    <Link className="btn btn-dark" style={{color: "#white"}} to="/">About Us</Link>
                </NavItem>
                <NavItem className="nav-link nav-item" style={{padding: "5px 50px"}}>
                    <Link className="btn btn-dark" style={{color: "#white"}} to="/">Careers</Link>
                </NavItem>
              </Nav>
            </Navbar>
            <div clasName="test-muted">
              <h6 className="text-muted">&copy; copyright 2021 Alt-Lane | All rights reserved </h6>
            </div>
       </footer>
  </div>
  )
}
export default Footer;