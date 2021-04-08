import React from 'react'

function InfoCard(props) {
  return (
    <div className="d-flex jusify-content-center">
      <div className="card" style={{ width: '18rem'}}>
        <div className="text-center">
          <img className="rounded-circle z-depth-2" style={{ width: '10rem'}} src= "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="profile img"/>
         </div>
         <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
  )
}
 
export default InfoCard; 