import { Link } from 'react-router-dom'

function MenteeNavBar(){

  return(
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"> 
            <img src='/alt_lane_logo.png' style={{ width: '105px', height: 'auto' }} alt="" />
            </a>
            <div className=" d-flex" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link " aria-current="page" href="#">HOME</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">FIND MENTOR</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " aria-current="page" href="#">PROFILE</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">SETTINGS</a>
                </li>
              </ul>
            </div>    
        </div>
      </nav>

  )
}
export default MenteeNavBar;