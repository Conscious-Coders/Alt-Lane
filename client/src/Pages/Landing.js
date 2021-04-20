import React from 'react'
import InfoCard from '../Components/InfoCard'
import LandingNavBar from '../Components/LandingNavBar'
import Footer from '../Components/Footer'
import { UncontrolledCarousel } from 'reactstrap';
import '../App.css'


function Landing () {
  const items = [
    {
      src: 'https://media.npr.org/assets/img/2019/10/25/mentorship-ask2_web-site-copy-2_wide-3c1c1befbe5ce9d478855883d38d74d417632c94.png',
      altText: 'Slide 1',
      caption: 'Temp caption',
      header: 'Info Can Be Added Here',
      key: '1'
    },
    {
      src: 'https://clf1.medpagetoday.net/media/images/89xxx/89633.jpg',
      altText: 'Slide 2',
      caption: 'Temp caption',
      header: 'Info Can Be Added Here',
      key: '2'
    }
  ]

  const bio = 
    {
      Dillen: 'Meet Dillen, an aspiring full stack engineer who enjoys building his knowledge and skill set about computer programming.', 
      Tracey: 'Meet Tracey, a distinguished software engineer with experience building and deploying scalable applications.',
      Jolizbeth: 'Meet Jolizbeth, fullstack developer. She enjoys frontend development with React and building data driven products', 
      Shruti: 'Meet Shruti, software developer who is passionate about finding solutions to diffcult bussiness problems.'
    }

return (
    // https://www.webprofits.com.au/
  <div >
    <LandingNavBar />

    <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Alt-Lane</h1>

            <p>Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>

            <p>Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle ßit to your liking.</p>

          </div>

      <div>
        <div >
        {/* need to pick images & make them same size */}
          <UncontrolledCarousel items={items} controls={false}/>

        </div>
        <div className="container marketing">
        <div className="container marketing">
          <div className="row featurette text-start" style={{margin: '10% 0'}}>
            <div className="col-md-7">
              <h2 className="featurette-heading">Passion.<span className="text-muted">It’ll blow your mind.</span></h2>
              <p className="lead">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
            </div>
          </div>
          {/* <hr className="featurette-divider"/> */}
          <div className="row featurette text-end" style={{margin: '10% 0'}}>
            <div className="col-md-5">
            </div>
            <div className="col-md-7">
              <h2 className="featurette-heading">First featurette heading. <span className="text-muted">It’ll blow your mind.</span></h2>
              <p className="lead">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
            </div>
          </div>
          </div>
        </div>
        <hr className="featurette-divider"/>
        <div style={{padding: "2% 0"}}  className="container">
          <div>
            <h2 className="text-start">Meet The Team</h2>
          </div>
          <div className="row row-cols-4">
            <div className="col">
              <div className="p-3">
                <InfoCard name="Shruti T" subTitle="Product Mananger" bio={bio.Shruti}/>
              </div>
            </div>
            <div className="col">
              <div className="p-3">
                <InfoCard name="Tracey T" subTitle="Scrum Master" bio={bio.Tracey}/>
              </div>
            </div>
            <div className="col">
              <div className="p-3">
                <InfoCard name="Jolizbeth B" subTitle="Frontend Developer" bio={bio.Jolizbeth}/>
              </div>
            </div>
            <div className="col">
              <div className="p-3">
                <InfoCard name="Dillen L" subTitle="Backend Developer" bio={bio.Dillen}/>
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