import { Link } from 'react-router-dom'

function LoginedNavBar(props){

  const userType = props.userType; 
  const token = props.authToken; 


  return(
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"> 
            <img src='/alt_lane_logo.png' style={{ width: '105px', height: 'auto' }} alt="" />
            </a>
            <div className=" d-flex" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link " to="/homepage">HOME</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/find-mentor">FIND MENTOR</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile/mentee">PROFILE</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/settings">SETTINGS</Link>
                </li>
              </ul>
            </div>    
        </div>
      </nav>

  )
}
export default LoginedNavBar;