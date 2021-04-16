import React from 'react'
import LoginNav from "../Components/LoginedNavBar"
import HomeCard from '../Components/HomeCard'
import Footer from '../Components/Footer'
import { AuthContext } from "../App";
import DefaultHome from "../Pages/DefaultHome"

function Homepage (props) {
  const { state: authState } = React.useContext(AuthContext);
  const [data, setData] = React.useState([])
  const [homeInfo, setHomeInfo] = React.useState([])
  const [careers, setCareers] = React.useState([])
  //get all the mentors or mentees for the user if they have 
  const relationship = []
  const allRelation = []
  React.useEffect(()=>{
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
    // console.log("data",data)
   
   

  },[authState.token, authState.user, authState.userType])

  React.useEffect(()=>{
    let fetchType = ""
    if(authState.userType === "mentee"){
      fetchType = "mentor"
    }else{
      fetchType = "mentee"
    }
      //for each mentor a mentee has get their first and last name , bio, position 
    //for each mentee get a mentor gets their first and last name and all of their interests 
    async function getInfoDisplay(){
       data.forEach(mentor =>{
        async function getStuff (){
          const response = await fetch(`http://localhost:9000/${fetchType}s/${mentor.user}`,{ 
            headers:{
            'Authorization': `Bearer ${authState.token}`
           }})
            const result = await response.json()
            allRelation.push({
              name: result.data[0].first_name + " "+ result.data[0].last_name,
              firsName: result.data[0].first_name,
              lastName: result.data[0].last_name,
              bio: result.data[0].bio,
              career: result.data[0].career_field_id,
              photoUrl: result.data[0].photo_url
            })
          setHomeInfo(allRelation)
        }
        getStuff()
      })
    }
    getInfoDisplay()

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

  }, [authState.token, authState.userType, data])
//  console.log(data)
//  console.log(homeInfo)
  if(homeInfo){
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
        {!data? <DefaultHome/>: 
          <div style={{paddingTop: '5%', width: "100vw",height: "100vh"}}>
            <div className="homepage">
                {authState.userType === "mentor" ? <h1 className="text-left">Meet Your Mentee</h1> : <h1>Meet Your Mentor</h1>}
              <div className="container">
                {homeInfo && (
                <div className="row d-flex justify-content-center">
                 {homeInfo.map( mentor  => (
                  <div className= "row d-flex justify-content-center">
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