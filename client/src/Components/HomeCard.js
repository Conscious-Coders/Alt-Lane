import React from 'react';
import Button from '../Components/Button';
import { Link } from 'react-router-dom';

function HomeCard(props) {
  //const [chat, setChat] = React.useState(null)
  const [roomName, setRoomName] = React.useState(""); 
  // set the room we want the user to join
  React.useEffect(()=>{
    const roomId = props.userId + props.mentorshipId
    setRoomName(roomId)
  },[props.mentorshipId, props.userId])

  return (
    <div className="card mb-3" style={{width: "700px", height: "auto" , background:"linear-gradient(345deg, #A0AAE7 40%, #BA92F3 90%)"}}>
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
                 {props.userType === "mentor"? <div>Interests: {props.interests}</div> :
                  <div></div>
                 } 
                </div> 
              </div>
          </div>  
          <p className="text-start card-text">{props.bio}</p>
        </div>
        <Link to={`${roomName}`}> <Button name='Chat With Me'/></Link>
                 
      </div>
    </div>
  </div>
  )
}
 
export default HomeCard; 
