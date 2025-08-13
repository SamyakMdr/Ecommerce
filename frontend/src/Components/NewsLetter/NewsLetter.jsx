import React from 'react'
import './NewsLetter.css?v=1.0.0'

const NewsLetter = () => {
  return (
    <div className='news-letter'>
        <h1>Get Execlusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
    <div>
    <input type="email" placeholder='Enter your email' className='email-input'/>
    <button className='subscribe-button'>Subscribe</button>
    </div>
    </div>
  )
}

export default NewsLetter