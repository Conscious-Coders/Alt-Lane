import React from 'react';
import Button from '../Components/Button';
import { Link } from 'react-router-dom';

const FETCH_URL = process.env.NODE_ENV === 'production' ? 'https://alt-lane.herokuapp.com/' : 'http://localhost:9000/'

function HomeCard(props) {
  //const [chat, setChat] = React.useState(null)
  const [roomName, setRoomName] = React.useState(""); 
  // set the room we want the user to join
  React.useEffect(()=>{
    const roomId = props.userId + props.mentorshipId
    setRoomName(roomId)
  },[props.mentorshipId, props.userId])
  let data = {}
  if(props.userType === "mentee"){
    data ={
      mentee_id: props.userId,
      mentor_id: props.mentorshipId,
    }
  }else{
    data = {
      mentee_id: props.userId,
      mentor_id: props.mentorshipId
    }
  }
  
  const removeMentorship = async ()=>{
    await fetch(`${FETCH_URL}mentorship`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
  }
  const handleRemove = (event) => {
    event.preventDefault()
    removeMentorship()
  }
 console.log(props)
  
  return (
    <div className="card mb-3" style={{width: "700px", height: "auto" ,background: "linear-gradient(to left,  #A0AAE7, #BA92F3)"}}>
    <div className="d-flex flex-wrap align-items-center row g-0">
      <div className="col-md-3">
        <img className="rounded-circle z-depth-2" style={{ width: '8rem', height: '8rem'}} src= {props.photo} alt="profile img"/>
      </div>
      <div className="col">
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="text-start col">
                <div className="d-flex justify-content-between">
                  <div className="d-flex text-start justify-content-start">
                    <h5 className="card-title" style={{marginRight: "10px"}} >{props.name}</h5>
                    <h5 className="card-title text-muted">{props.career}</h5>
                  </div> 
                  <div className="d-flex justify-content-end"  >
                    
                  </div>
                </div>
                 {props.userType === "mentor"? <div>Interests: {props.interests}</div> :
                  <div></div>
                 } 
                </div> 
              </div>
          </div>  
          <p className="text-start card-text">{props.bio}</p>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start">
          <Button name='Remove' disabled onClick={handleRemove}/> 
          </div>
          <div className="d-flex justify-content-end" style={{paddingBottom: "1rem", paddingRight: "1rem"}}>
            {props.status === "pending"? 
              <Button name='Pending' disabled/> :
              <Link to={`${roomName}/${props.name}`}> <Button name='Chat With Me'/></Link>
            }
          </div>
        </div>     
      </div>
    </div>
  </div>
  )
}
 
export default HomeCard; 
