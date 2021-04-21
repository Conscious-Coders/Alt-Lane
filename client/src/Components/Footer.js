import { Link } from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavItem
} from 'reactstrap';

function Footer(){

  return(
    <div >
    {/* add fixed-bottom to class foor sticky footer*/}
      <footer className="footer py-3 bg-dark">
      {/* <div style={{paddingTop: "10px"}}>
         <img src='/alt_lane_logo.png' style={{ width: '50px', height: 'auto' }} alt="" />
        <span className="rounded" style={{padding: "5px 25px", color: "#000000", background: "#7D98DD"}}> Alt-Lane </span>
      </div> */}
          <Navbar>
              <Nav className="mx-auto">
                <NavItem className="nav-link nav-item" style={{padding: "5px 50px"}}>
                      <Link className="btn btn-dark" style={{color: "#7D98DD"}} to="/">Contact Us</Link>
                </NavItem>
                <NavItem className="nav-link nav-item" style={{padding: "5px 50px"}}>
                    <Link className="btn btn-dark" style={{color: "#7D98DD"}} to="/">About Us</Link>
                </NavItem>
                <NavItem className="nav-link nav-item" style={{padding: "5px 50px"}}>
                    <Link className="btn btn-dark" style={{color: "#7D98DD"}} to="/">Careers</Link>
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