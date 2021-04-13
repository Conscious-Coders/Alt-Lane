import React from 'react'
import Footer from "../Components/Footer"
import MentorCard from "../Components/MentorCard"
import MenteeNavBar from "../Components/MenteeNavBar"
import { Slide } from "react-slideshow-image";
//import "./styles.css";
import "react-slideshow-image/dist/styles.css";

function FindMentor() {
    const slideRef = React.useRef();
    const [state, setState] = React.useState({current:0})
 
    const back = ()=> {
      slideRef.current.goBack();
    }

    const next =()=> {
      slideRef.current.goNext();
    }
    const properties = {
      duration: 5000,
      autoplay: false,
      transitionDuration: 500,
      arrows: false,
      infinite: true,
      easing: "ease",
    };
    
    const [mentors, setMentors] = React.useState([])
    React.useEffect(()=>{
      fetch("http://localhost:9000/mentors")
      .then(response =>response.json())
      .then(res => {
          const allMentors = []
          res.data.map( mentor =>
            allMentors.push({ 
              mentorId: mentor.id,
              userId: mentor.user_id,
              firstName: mentor.first_name,
              lastName: mentor.last_name,
              email: mentor.email,
              bio: mentor.bio,
              careerField: mentor.career_field_id,
              company: mentor.company,
              photo: mentor.photo_url,
              linkedin: mentor.linkedin_url,
              typeOfUser: mentor.user_type,
          }))
          setMentors(allMentors)
          return mentors

      }).catch(err => console.log(err))  
    }, [state])

    const slideImages = [];
      mentors.forEach(mentor =>{
        slideImages.push(<MentorCard name={mentor.firstName} photo={mentor.photo} company={mentor.company} bio={mentor.bio}/>)
      })

    return (
      <div className="contianer-fluid" >
        <MenteeNavBar/>
        <div className="contianer-fluid"style={{ paddingTop:"8%",  marginBottom:"10%"}}>
          <div style={{paddingBottom:"10px"}}>
            <h1>Find a Mentor</h1>
          </div>
          <div className="slide-container">
            <Slide ref={slideRef} {...properties}>
              {slideImages.map((each, index) => (
                <div key={index} className=" text-center">
                  <div className="slide-container buttons d-flex justify-content-center">
                    <button style={{backgroundColor:"white", border: "none"}} onClick={back} type="button">
                      <span className="carousel-control-prev-icon" style={{filter:"invert(1)"}} ></span>
                    </button>
                    {each}
                    <button style={{backgroundColor:"white", border: "none"}} onClick={next} type="button">
                      <span className="carousel-control-next-icon" style={{filter:"invert(1)"}} ></span>
                    </button>
                  </div>
                </div>
              ))}
            </Slide>
          </div>
        </div>
        <Footer/>
      </div>
    );
  
}

export default FindMentor;
