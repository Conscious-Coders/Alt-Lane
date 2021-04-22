import React from 'react'
import '../App.css'

function LandingSlide(){

  const slides = [
    {
      title: 'Choices, Choices, Choices..',
      subtitle: 'Confused? No worries',
      image: 'https://www.theladders.com/wp-content/uploads/career_paht_190530.jpg',
      alt: 'women in forked road'
    },
    {
      title: 'Alt-lane is for you',
      subtitle: 'explore alternative paths',
      image: 'https://assets-global.website-files.com/5b5aa355afe474a8b1329a37/5f4d2388f0d1852dade8f393_career-change.jpg',
      alt: 'paper planes with paths'
    }, 
    {
      title: 'Find your passion',
      subtitle: 'with the help of industry professionals',
      image: 'https://media.npr.org/assets/img/2019/10/25/mentorship-ask2_web-site-copy-2_wide-3c1c1befbe5ce9d478855883d38d74d417632c94.png',
      alt: 'two people finding path'
    }
  ]
  const [curr, setCurr] = React.useState(0);
  const { length } = slides;
  
  const goToNext = () => {
    setCurr(curr === length - 1 ? 0 : curr + 1);
  }
  
  React.useEffect(() => {
    setTimeout(goToNext, 10000);
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
          aria-hidden={i !== curr}
        >
          <div className="landingSliderText">
            <h1>{s.title}</h1>
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

