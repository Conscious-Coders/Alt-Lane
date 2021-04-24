import React from 'react'
import InfoCard from '../Components/InfoCard'
import LandingSlide from '../Components/LandingSlide'
import '../App.css'

function DefaultHome () {
  const team = {
    dillen:  {
      title: 'Dillen L', 
      subTitle: 'Backend Developer', 
      img: "/Images/dillenSlides.png" ,
      bio : 'Meet Dillen, an aspiring full stack engineer who enjoys building his knowledge and skill set about computer programming', 
      github: 'https://github.com/Code-33', 
      linkedIn: 'https://www.linkedin.com/in/dillenlewis/'
    },
  tracey:  {
      title: 'Tracey T', 
      subTitle: 'Scrum Master', 
      img: "/Images/TraceySlides.png" ,
      bio : 'Meet Tracey, a distinguished software engineer with experience building and deploying scalable applications', 
      github: 'https://github.com/Mfstat27', 
      linkedIn: 'https://www.linkedin.com/in/tracey-thomas/'
    }, 
    joli:  {
      title: 'Jolizbeth B', 
      subTitle: 'Frontend Developer', 
      img: "/Images/joliSlides.png" ,
      bio : 'Meet Jolizbeth, a full stack developer who enjoys frontend development with React and building data driven products', 
      github: 'https://github.com/jolizbeth', 
      linkedIn: 'https://www.linkedin.com/in/jolizbeth/'
    }, 
    shruti:  {
      title: 'Shruti T', 
      subTitle: 'Project Manager', 
      img: "/Images/shrutiSlides.png" ,
      bio : 'Meet Shruti, a software developer who is passionate about finding solutions to difficult business problems by leveraging technology', 
      github: 'https://github.com/ShrutiTamrakarTuladhar', 
      linkedIn: 'https://www.linkedin.com/in/shrutitamrakartuladhar/'
    }
  }
    
return (
  <div>
    <div>
      <LandingSlide />
    </div>
      <div className="marketing" style={{margin: '0 5%', maxWidth: '100%'}}>
        <div className="row featurette text-start" style={{marginTop: '5%', marginLeft: '5%'}}>
          <div className="col-md-7 align-self-center">
                <h2 className="featurette-heading">Problem: 
                  <span style={{color: "#764288"}}> The average debt of a 4-year institution graduate in the United States is $29,900.</span>
                </h2>
                <p style={{paddingTop: '1%'}} className="lead">
                Highschool students are going into college unsure about their future and unaware of opportunities that don’t require a traditional 4-year college education.
                 Due to the lack of information on other possible paths, due to the lack of knowledge many students spend thousands on degrees then don’t end up using or fall into careers they’re not passionate about.
                </p>
          </div>
          <div className="col-md-5">
            <img className="img-responsive" src="/Images/student_debt.png" alt="student debt" style={{maxHeight: "50vh", margin: 'auto', display: 'block'}}/>
          </div>
        </div>
        <div className="row featurette text-start" style={{ marginBottom: '2%', marginRight: '5%'}}>
        <div className="col-md-5">
            <img className="img-responsive" src="https://cdn.dribbble.com/users/17473/screenshots/4341605/soqola.png" alt="student debt" style={{maxHeight: "50vh", display: 'block'}}/>
          </div>
          <div className="col-md-7 align-self-center">
            <h2 className="featurette-heading">Solution: <span style={{color: "#764288"}}> Alt-Lane</span></h2>
            <p style={{paddingTop: '1%'}} className="lead">
              Alt-Lane helps students explore alternative career options by connecting them with industry professionals in various fields. 
              Access to mentors from various fields will help guide students on their journey to finding their passion!</p>
          </div>
        </div>
        <hr className="featurette-divider" />
      </div>

      <div className="" style={{padding: "2% 0", maxWidth: '100%'}} >
        <div>
          <h2 className="text-start" style={{padding: "1% 5%"}}>Meet The Team</h2>
        </div>
        <div className="row row-cols-4"  style={{padding: "0% 5%", maxWidth:'100%'}}>
          <div className="col">
            <div className="p-3">
              <InfoCard info={team.shruti}/>
            </div>
          </div>
          <div className="col">
            <div className="p-3">
              <InfoCard info={team.tracey}/>
            </div>
          </div>
          <div className="col">
            <div className="p-3">
              <InfoCard info={team.joli}/>
            </div>
          </div>
          <div className="col">
            <div className="p-3">
              <InfoCard info={team.dillen}/>
            </div>
          </div>
        </div>
      </div>
</div>
)

}

export default DefaultHome; 