import React from 'react'
import Footer from "../Components/Footer"
import InfoCard from '../Components/InfoCard';
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
      //indicators: (i) => <div className="indicator">{i + 1}</div>
    };
    const slideImages = [
    <InfoCard name="Joli"/>,
    <InfoCard name="Tracey"/>,
    <InfoCard name="Shruti"/>,
    <InfoCard name="Dillen"/>,
    ];
    return (
      <div className="App">
        <MenteeNavBar/>
        <div className="contianer"style={{ marginTop:"10%",  marginBottom:"10%"}}>
        <h1>Find a Mentor</h1>
          <div className="slide-container">
          
            <Slide ref={slideRef} {...properties}>
              {slideImages.map((each, index) => (
                <div key={index} className=" text-center">
                  <div className="slide-container buttons d-flex justify-content-center">
                    <button className="btn btn-dark" onClick={back} type="button">
                      Go Back
                    </button>
                    {each}
                    <button className="btn btn-dark" onClick={next} type="button">
                      Go Next
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
