import React from 'react'
import LoginNav from "../Components/LoginedNavBar"
import HomeCard from '../Components/HomeCard'
import Footer from '../Components/Footer'
import { AuthContext } from "../App";

function Homepage (props) {
  const { state: authState } = React.useContext(AuthContext);
  const [data, setData] = React.useState([])
  //get all the mentors or mentees for the user if they have 
  //
  return (
    <div >
    <LoginNav />
        <div style={{paddingTop: '5%', width: "100vw",height: "100vh"}}>
          <div className="homepage">
              {authState.userType === "mentor" ? <h1 className="text-left">Meet Your Mentee</h1> : <h1>Meet Your Mentor</h1>}
            <div className="col">
              <div className="row d-flex justify-content-center">
                <HomeCard name="Clark Kent" title="Editor" userId={authState.user} userType={authState.userType} bio={"this is a mentee"} bio={"this is a mentee"} interests={["STEM", "Art", "Social Work"]}/>
              </div>
              <div className="col">
              <div className="row d-flex justify-content-center">
                <HomeCard name="Clark Kent" title="Editor" userId={authState.user} userType={authState.userType} bio={"this is a mentee"} interests={["STEM", "Art", "Social Work"]}/>
              </div>
            </div>
            </div>
          </div>
        </div> 
      <Footer/>
    </div>
  )
}

export default Homepage;