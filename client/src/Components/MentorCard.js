import React from 'react'

function MentorCard(props) {
  const handleClick = (event=>{
    const connectMentorship = async (currentMentor, currentMentee)=>{
      try{
      await fetch("http://localhost:9000/mentorship",{
        method: 'POST',
        //credentials : 'include',
        headers: {
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
      <div className="card" style={{ width: '22rem', background:"linear-gradient(45deg, #A0AAE7 40%, #BA92F3 90%)"}}>
        <div className="text-center" style={{paddingTop:"20px"}}>
          <img className="rounded-circle z-depth-2" style={{ width: '10rem'}} src= {props.photo} alt="profile img"/>
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