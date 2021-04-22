import React from 'react'
import LoginNav from "../Components/LoginedNavBar"
import HomeCard from '../Components/HomeCard'
import Footer from '../Components/Footer'
import { AuthContext } from "../App";
import DefaultHome from "../Pages/DefaultHome"
import Chat from '../Components/Chat/Chat'


function Homepage () {
  const { state: authState } = React.useContext(AuthContext);
  const [data, setData] = React.useState([])
  const [homeInfo, setHomeInfo] = React.useState([])
  const [careers, setCareers] = React.useState([])
  const [display, setDisplay] = React.useState([])
  const [menteeInterest, setMenteeInterest] = React.useState([])
  
  //get all the mentors or mentees for the user if they have 
  React.useEffect(()=>{
    const relationship = []
    async function getMentorship(){
      const res = await fetch('http://localhost:9000/mentorship',{ 
        headers:{
        'Authorization': `Bearer ${authState.token}`
       }})
      const result = await res.json()
      result.data.forEach(user => {
        if(authState.userType === "mentor"){
            if(user.mentor_id === authState.user){
              relationship.push({user: user.mentee_id,status:user.status})
            }
        }else {
          if(user.mentee_id === authState.user){
            relationship.push({user: user.mentor_id, status:user.status})
          }
        }
      })
      setData(relationship)
    }
    getMentorship()
    
    async function getMenteeInterests(){
      const res = await fetch('http://localhost:9000/mentee_interests',{ 
        headers:{
        'Authorization': `Bearer ${authState.token}`
       }})
      const result = await res.json()
      setMenteeInterest(result.data)
    }
    getMenteeInterests()

    async function getCareers(){
      const fields = await fetch("http://localhost:9000/careers",{ 
        headers:{
        'Authorization': `Bearer ${authState.token}`
        }})
      const allCareers = await fields.json();
      let careers =[];
      allCareers.data.forEach(field =>{
        careers.push({key: field.name, id: field.id})
      })
      setCareers(careers)
    }
    getCareers()

  },[authState.token, authState.user, authState.userType])
 
  // for each mentor a mentee has get their first and last name , bio, position 
  // or for each mentee get a mentor gets their first and last name and all of their interests 
  React.useEffect(()=>{
    let fetchType = ""
    if(authState.userType === "mentee"){
      fetchType = "mentor"
    }else{
      fetchType = "mentee"
    }
    async function getStuff() {
      await fetch(`http://localhost:9000/${fetchType}s`, {
        headers: {
          'Authorization': `Bearer ${authState.token}`
        }
      }).then(res => res.json())
      .then(result =>{
        setDisplay(result.data)
      })
    }
    getStuff()
  
  }, [authState.token, authState.userType, data])

  React.useEffect(()=>{
      if(data){
      const info = []
      data.forEach(id =>{
        display.forEach(user =>{
          if(user.user_id === id.user){
            info.push({
              id: user.user_id,
              status: id.status,
              name: user.first_name + " " + user.last_name,
              firsName: user.first_name,
              lastName: user.last_name,
              bio: user.bio,
              career: user.career_field_id,
              photoUrl: user.photo_url,
              interestId: "",
              interestNames: "",
            })
          }
        })
      })
      setHomeInfo(info)
    }
  }, [authState.userType, data, display])
  
  //get mentee interests for each mentee 
  if(menteeInterest !== 0){
    homeInfo.forEach(user=>{
      const interests = []
      menteeInterest.forEach(mentee => {
        if(mentee.mentee_id === user.id){
          interests.push(mentee.career_field_id)
        }
      })
      user.interestId = interests
    })
  }
  
  //get the name of the interests for the mentees
  if(careers.length !== 0 &&  authState.userType === "mentor"){
    homeInfo.forEach(user =>{
      let interestName = "";
      user.interestId.forEach(field =>{
        careers.forEach(career =>{
          if(career.id === field){  
            interestName = interestName + " " + career.key
          }
        })     
      })
      user.interestNames = interestName 
    })
  }

  //get the career field names for mentors 
  if(homeInfo.length !== 0 && careers.length !== 0 &&  authState.userType === "mentee"){
    homeInfo.forEach(user =>{
      careers.forEach(career =>{
        if(career.id === user.career){
          user.career = career.key
        }
      })
    })
  } 
  return (
    <div >
      <LoginNav /> 
        {!data ? <DefaultHome/> : 
          <div style={{paddingTop: '5%'}}>
            <div className="homepage">
                {authState.userType === "mentor" ? <h1 className="text-left">Meet Your Mentee</h1> : <h1>Meet Your Mentor</h1>}
              <div className="container">
                {homeInfo && authState.userType === "mentee" &&(
                <div className="row d-flex justify-content-center">
                 {homeInfo.map((mentor, index ) => (
                  
                  <div className= "row d-flex justify-content-center" key={index}>
                    <HomeCard token={authState.token} name={mentor.name} photo={mentor.photoUrl} status={mentor.status} mentorshipId= {mentor.id} career={mentor.career} userId={authState.user} userType={authState.userType} bio={mentor.bio}  />
                  </div>
                ))}
                </div>
              )}{" "}
              </div>
              <div> 
              {homeInfo && authState.userType === "mentor" &&(
                <div className="row d-flex justify-content-center">
                 {homeInfo.map((mentee, index ) => (
                  <div className= "row d-flex justify-content-center" key={index}>
                    <HomeCard token={authState.token} name={mentee.name} photo={mentee.photoUrl} status={mentee.status} interests={mentee.interestNames} userId={authState.user} mentorshipId= {mentee.id} userType={authState.userType} bio={mentee.bio}  />
                  </div>
                ))}
                </div>
              )}{" "}
              </div>
            </div>
          </div> 
        }   
        
      <Footer/>
    </div>
  )
}

export default Homepage;