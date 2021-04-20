import React from 'react'
import InfoCard from '../Components/InfoCard'
import LandingNavBar from '../Components/LandingNavBar'
import Footer from '../Components/Footer'
import LandingSlide from '../Components/LandingSlide'
import '../App.css'


function Landing () {

  const team = {
    dillen:  {
      title: 'Dillen L', 
      subTitle: 'Backend Developer', 
      bio : 'Meet Dillen, an aspiring full stack engineer who enjoys building his knowledge and skill set about computer programming.', 
      github: 'https://github.com/Code-33', 
      linkedIn: 'https://www.linkedin.com/in/dillenlewis/'
    },
  tracey:  {
      title: 'Tracey T', 
      subTitle: 'Backend Developer', 
      bio : 'Meet Tracey, a distinguished software engineer with experience building and deploying scalable applications', 
      github: 'https://github.com/Mfstat27', 
      linkedIn: 'https://www.linkedin.com/in/tracey-thomas/'
    }, 
    joli:  {
      title: 'Jolizbeth B', 
      subTitle: 'Backend Developer', 
      bio : 'Meet Jolizbeth, fullstack developer. She enjoys frontend development with React and building data driven products.', 
      github: 'https://github.com/jolizbeth', 
      linkedIn: 'https://www.linkedin.com/in/jolizbeth/'
    }, 
    shruti:  {
      title: 'Shruti T', 
      subTitle: 'Backend Developer', 
      bio : 'Meet Shruti, software developer who is passionate about finding solutions to diffcult bussiness problems by leveraging technology.', 
      github: 'https://github.com/ShrutiTamrakarTuladhar', 
      linkedIn: 'https://www.linkedin.com/in/shrutitamrakartuladhar/'
    }
  }
    
return (
    // https://www.webprofits.com.au/
  <div >
    <LandingNavBar />
      <div>
      <div >
        {/* need to pick images & make them same size */}
          {/* <UncontrolledCarousel items={items} controls={false}/> */}
          <LandingSlide />
        </div>
        <div className="container marketing">
          <div className="row featurette text-start" style={{marginTop: '5%'}}>
            <div className="col-md-7 align-self-center">
                  <h2 className="featurette-heading">Problem: 
                    <span style={{color: "#BA92F3"}}> The average debt of a college graudates in the united states is $29,900.</span>
                  </h2>
                  <p style={{paddingTop: '1%'}} className="lead">Highschool students are going into college unsure about their future and unaware of alternative careers opportunities. Due to the lack of information on posssible paths students are forced to pay for unused degrees or forced persue careers they are not passionate about.</p>
            </div>
            <div className="col-md-5">
              <img className="img-responsive" src="https://www.insidehighered.com/sites/default/server_files/media/iStock-1156003227.jpg" alt="student debt" style={{maxHeight: "50vh", margin: 'auto', display: 'block'}}/>
            </div>
          </div>
          {/* <hr className="featurette-divider"/> */}
          <div className="row featurette text-start" style={{marginTop: '5%', marginBottom: '5%'}}>
          <div className="col-md-5">
              <img className="img-responsive" src="https://cdn.dribbble.com/users/17473/screenshots/4341605/soqola.png?" alt="student debt" style={{maxHeight: "50vh", margin: 'auto', display: 'block'}}/>
            </div>
            <div className="col-md-7 align-self-center">
              <h2 className="featurette-heading">Solution: <span style={{color: "#BA92F3"}}> Alt-Lane</span></h2>
              <p style={{paddingTop: '1%'}} className="lead">Alt-Lane brings information about career opportunities to high school students. Students will be exposed to alternative careers paths in their chosen fields by connecting with industry professionals and gain meaningful insight. Access to mentors from various fields will help guide their journey to finding their passion!</p>
            </div>
          </div>

          <hr className="featurette-divider"/>
        </div>
        <div style={{padding: "3% 0"}}  className="container">
          <div>
            <h2 className="text-start" style={{padding: "2% 0"}}>Meet The Team</h2>
          </div>
          <div className="row row-cols-4">
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
    <Footer/>
  </div>
)

}

export default Landing; 