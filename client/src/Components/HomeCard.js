import React from 'react'

function HomeCard(props) {
  let isMentor = props.isMentor;
  let interests = props.interests; 
  return (
    <div className="card mb-3" style={{width: "700px", height: "auto"}}>
    <div className="d-flex flex-wrap align-items-center row g-0">
      <div className="col-md-3">
        <img className="rounded-circle z-depth-2" style={{ width: '8rem', height: '8rem'}} src= {props.photo} alt="profile img"/>
      </div>
      <div className="col">
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="text-start col">
                <div className="d-flex text-start justify-content-start">
                  <h5 className="card-title" style={{marginRight: "10px"}} >{props.name}</h5>
                  <h5 className="card-title text-muted">{props.career}</h5>
                </div>

                  {isMentor && (
                <div>
                
                  {interests.map((field) => (
                    <p>{field}</p>
                  ))}
                </div>
              )}{" "}
                </div> 
              </div>
          </div>
          { !isMentor && 
          <p className="text-start card-text">{props.bio}</p>
          } 
        </div>
      </div>
    </div>
  </div>
  )
}
 
export default HomeCard; 
