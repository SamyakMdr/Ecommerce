import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png' // Assuming you have a hand icon image
import arrow_icon from '../Assets/arrow.png' // Assuming you have an arrow icon image
import hero_image from '../Assets/hero_image.png' // Assuming you have a hero image

const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-left'>
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
                <div className='hero-hand-icon'>
                <p>new <img src={hand_icon} alt=''/></p>
                
                </div>
                <p>collection</p>
                <p>for everyone</p>
            </div>
            <div className='hero-latest-btn'>
                <div>Latest Collection</div>
                <img src={arrow_icon} alt=''/>
            </div>
        </div>
    <div className='hero-right'>
            <img src={hero_image} alt="Hero" className='hero-image' />
    </div>
    </div>
  )
}

export default Hero