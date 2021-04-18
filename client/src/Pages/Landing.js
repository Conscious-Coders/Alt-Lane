import React from 'react'
import InfoCard from '../Components/InfoCard'
import LandingNavBar from '../Components/LandingNavBar'
import Footer from '../Components/Footer'

function Landing () {
  return (
  <div>
    <LandingNavBar />
    <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Alt-Lane</h1>
<<<<<<< HEAD
            <p>Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
=======
            <p>Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle ßit to your liking.</p>
>>>>>>> 23ff631b53c11136f4644e63d22797201841e83d
          </div>
        </div>
    </div>
    <div className="container">
        <div className="row row-cols-4">
          <div className="col">
            <div className="p-3">
              <InfoCard name="shruti"/>
            </div>
          </div>
          <div className="col">
            <div className="p-3">
              <InfoCard name="Joli"/>
            </div>
          </div>
          <div className="col">
            <div className="p-3">
              <InfoCard name="Tracey"/>
            </div>
          </div>
          <div className="col">
            <div className="p-3">
              <InfoCard name="Dillen"/>
            </div>
          </div>
        </div>
      </div>
    <Footer/>
 </div>
)

}

export default Landing; 