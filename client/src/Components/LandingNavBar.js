import { Link } from 'react-router-dom'

function LandingNavBar(){

  return(

      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"> 
            <img src='/alt_lane_logo.png' style={{ width: '105px', height: 'auto' }} alt="" />
            </a>
            <div class=" d-flex" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="#">Login</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Register</a>
                </li>
              </ul>
            </div>    
        </div>
      </nav>

  )
}
export default LandingNavBar;