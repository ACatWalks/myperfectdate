import React from 'react'
import './App.css';
import NavBar from './NavBar';
import Carousel from './Carousel';

function App() {
  const images = [
    'https://buddyblogger.com/wp-content/uploads/2020/10/happy-couple.jpg',
    'https://timeformarriage.org.uk/wp-content/uploads/2012/01/happy-couple-1024-2.jpg',
    'https://wallpapercave.com/wp/wp4055688.jpg',
    'https://wallpapercave.com/wp/wp4055647.jpg'
  ]
  return (
    <div className="App">
      <NavBar />
      <h1>Get Started with My Perfect Date today!</h1>
      <h2>Testimonials</h2>
      <ul>
        <div className='col1'><li><p>"It's A Date! helped me find my current husband. We've been happily married for 4 years now and still going strong. Thank you!" - Maria Delgado, Golan Heights, Nebraska</p></li></div>
        <div className='col2'><li><p>"The first date was awesome and I hope to have many more with her. Thank you It's A Date! I couldn't have done it without you." - Peter Nguyen, Fallbrook, California</p></li></div>
        <div className='col3'><li><p>"It's A Date! really helped me find a compatible partner. It's like we were tailored to each other. I've told all my single friends about It's A Date!" - Emmy Anderson, Podunk, Iowa</p></li></div>
      </ul>
      <Carousel images={images} />
    </div>
  );
}

export default App;
