import React from 'react'
import '../App.css'

function LandingSlide(){

  const slides = [
    {
      title: 'Choices, Choices, Choices..',
      subtitle: 'Confused? No worries',
      image: '/Images/ladyArrows.jpeg',
      alt: 'women in forked road'
    },
    {
      title: 'Alt-lane is for you',
      subtitle: 'explore alternative paths',
      image: '/Images/flyArrows.jpeg',
      alt: 'paper planes with paths'
    }, 
    {
      title: 'Find Your Passion',
      subtitle: 'with the help of industry professionals',
      image: '/Images/lightPath.png',
      alt: 'two people finding path'
    }
  ]
  const [curr, setCurr] = React.useState(0);
  const { length } = slides;
  
  const goToNext = () => {
    setCurr(curr === length - 1 ? 0 : curr + 1);
  }
  
  React.useEffect(() => {
    setTimeout(goToNext, 6000);
    return function() {
      clearTimeout(goToNext);
    }
  })
  
  if (!Array.isArray(slides) || length <= 0) {
    return null;
  }

  return (
    <div>
      <section className="landingSlide">
      {slides.map((s, i) => (
        <div
          className={i === curr ? "landingSlider activeSlide" : "landingSlider"}
          key={s.title}
          aria-hidden={i !== curr}>
          <div className="landingSliderText" style= {{ backgroundColor: "rgba(232,232,232,0.5)"}}>
            <h1 className= "fw-bold">{s.title}</h1>
            <h2>{s.subtitle}</h2>
          </div>
          {i === curr && (
            <img className="landingImage" src={s.image} alt={s.alt}/>
          )}
        </div>
      ))}
    </section>
    </div>
    )
}
export default LandingSlide;

