import React from 'react'
import MentorNavBar from '../Components/MentorNavBar'
import MenteeNavBar from '../Components/MenteeNavBar'
import HomeCard from '../Components/HomeCard'
import Footer from '../Components/Footer'

function Homepage (props) {
  let isMentor = props.isMentor; 
 
  return (
    <div>
      
      {isMentor ? <MentorNavBar/> : <MenteeNavBar/>}
        <div style={{paddingTop: '10%'}}>
          <div className="homepage">
              {isMentor ? <h1 className="text-left">Meet Your Mentee</h1> : <h1>Meet Your Mentor</h1>}
            <div className="col">
              <div className="row d-flex justify-content-center">
                <HomeCard name="Clark Kent" title="Editor" isMentor={isMentor} bio={"this is a mentee"} interests={["STEM", "Art", "Social Work"]}/>
              </div>
              <div className="col">
              <div className="row d-flex justify-content-center">
                <HomeCard name="Clark Kent" title="Editor" isMentor={isMentor} bio={"this is a mentee"} interests={["STEM", "Art", "Social Work"]}/>
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