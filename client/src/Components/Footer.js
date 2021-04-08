import { Link } from 'react-router-dom'

function Footer(){

  return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid justify-content-center">
          <div className="d-flex flex-column justify-content-center">
          <a className="navbar-brand" href="#"> 
                <img src='/alt_lane_logo.png' style={{ width: '50px', height: 'auto' }} alt="" />
              </a>
            <div className=" d-flex ">
             
              <ul className="navbar-nav">
                <li className="">
                  <a className="nav-link " aria-current="page" href="#">Contact Us</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " aria-current="page" href="#">About Us</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Careers</a>
                </li>
              </ul>
            </div> 
              <h6 className="text-muted">@ copyright 2021 | All rights reserved </h6>
          </div>  
        </div>
      </nav>

  )
}
export default Footer;