import React from 'react'
import InfoCard from '../Components/InfoCard'

function DefaultHome () {
  return (
  <div>
    <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Alt-Lane</h1>
            <p>Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
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
 </div>
)

}

export default DefaultHome; 