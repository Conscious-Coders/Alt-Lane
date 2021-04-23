import React from 'react'

const FETCH_URL = process.env.NODE_ENV === 'production' ? 'https://alt-lane.herokuapp.com/' : 'http://localhost:9000/'

function MentorCard(props) {

  const handleClick = (event=>{
    const connectMentorship = async (currentMentor, currentMentee)=>{
      try{
      await fetch(`${FETCH_URL}mentorship`,{
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`
        },
        body: JSON.stringify({
          mentee_id: currentMentee, 
          mentor_id: currentMentor
        })
      })
      }catch(err){
        console.log(err) 
      }
    } 
    connectMentorship(props.mentor_id, props.mentee_id)
  })


  return (
    <div className="d-flex justify-content-center">
      <div className="card" style={{ width: '22rem', background:"linear-gradient(45deg, #A0AAE7 20%, #BA92F3 90%)"}}>
        <div className="text-center" style={{paddingTop:"20px"}}>
          <img className="rounded-circle z-depth-2" style={{ width: '8rem', height: '8rem'}} src= {props.photo} alt="profile img"/>
         </div>
         <div className="card-bod " style={{padding:"20px"}}>
          <h2 className="card-title fw-normal" style={{ color: 'white'}}>{props.name}</h2>
          <h5 className="card-subtitle  fw-light" style={{ color: 'white'}}>{props.company}</h5>
          <div className="d-flex justify-content-center">
          <hr style={{align:"center", width:"50%", background:"white", height:"2px", border:"none"}}/>
          </div>
            <p className="card-text text-dark fw-light">{props.bio}</p>
            <div className="d-flex justify-content-end">
              <button className="btn btn-light" onClick={handleClick}> Connect </button>
            </div>
        </div>
      </div>
    </div>
  )
}
 
export default MentorCard; 