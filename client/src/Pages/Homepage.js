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
          <div Nameclass="homepage">
            <div className="col">
            <div className="row d-flex justify-content-center">
              <HomeCard name="Clark Kent" title="Editor" isMentor={isMentor}/>
            </div>
            <div className="row d-flex justify-content-center">
              <HomeCard name="Peter Parker" title="Photographer" isMentor={isMentor} bio={"This would be bio"}/>
            </div>
            </div>
          </div>
        </div> 
      <Footer/>
    </div>
  )
}

export default Homepage; 