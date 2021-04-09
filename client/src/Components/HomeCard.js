import React from 'react'

function HomeCard(props) {
  let isMentor = props.isMentor; 

  return (
    <div className="card mb-3" style={{width: "700px", height: "auto"}}>
    <div className="d-flex flex-wrap align-items-center row g-0">
      <div className="col-md-3">
        <img className="rounded-circle z-depth-2" style={{ width: '8rem'}} src= "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="profile img"/>
      </div>
      <div className="col">
        <div className="card-body">
        <div className="container">
        <div className="row">
            <div className="text-start col">
            <h5 className="card-title">{props.name}</h5>
              { isMentor && <h6 class="card-subtitle mb-2 text-muted">{props.title}</h6>}
            </div> 
          </div>
        </div>
          <p className="text-start card-text">{props.bio}</p>
          { !isMentor && <p> </p>}
        </div>
      </div>
    </div>
  </div>
  )
}
 
export default HomeCard; 
