import React from 'react'
import LoginNav from "../Components/LoginedNavBar"
import HomeCard from '../Components/HomeCard'
import Footer from '../Components/Footer'
import { AuthContext } from "../App";
import DefaultHome from "../Pages/DefaultHome"

function Homepage () {
  const { state: authState } = React.useContext(AuthContext);
  const [data, setData] = React.useState([])
  const [homeInfo, setHomeInfo] = React.useState([])
  const [careers, setCareers] = React.useState([])
  const [display, setDisplay] = React.useState([])
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
              relationship.push({user: user.mentee_id})
            }
        }else {
          if(user.mentee_id === authState.user){
            relationship.push({user: user.mentor_id})
          }
        }
      })
      setData(relationship)
    }
    getMentorship()

    if(authState.userType === "mentee"){
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
    }

  },[authState.token, authState.user, authState.userType])

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
        console.log(result.data)
        setDisplay(result.data)
      })
    }
    getStuff()
     // for each mentor a mentee has get their first and last name , bio, position 
    // or for each mentee get a mentor gets their first and last name and all of their interests 
    if(data){
      console.log(display)
      const info = []
      data.forEach(id =>{
        display.forEach(user =>{
          if(user.user_id === id.user){
            info.push({
              name: user.first_name + " " + user.last_name,
              firsName: user.first_name,
              lastName: user.last_name,
              bio: user.bio,
              career: user.career_field_id,
              photoUrl: user.photo_url
            })
          }
        })
      })
      setHomeInfo(info)
    }

  }, [authState.token, authState.userType, data, display])

  if(homeInfo !==0){
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
          <div style={{paddingTop: '5%', width: "100vw",height: "100vh"}}>
            <div className="homepage">
                {authState.userType === "mentor" ? <h1 className="text-left">Meet Your Mentee</h1> : <h1>Meet Your Mentor</h1>}
              <div className="container">
                {homeInfo &&(
                <div className="row d-flex justify-content-center">
                 {homeInfo.map((mentor, index ) => (
                  <div className= "row d-flex justify-content-center" key={index}>
                    <HomeCard name={mentor.name} photo={mentor.photoUrl} career={mentor.career} userId={authState.user} userType={authState.userType} bio={mentor.bio}  />
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