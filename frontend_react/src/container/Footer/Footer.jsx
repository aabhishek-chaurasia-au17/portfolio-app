import React, {useState, useEffect} from 'react'

import {images} from '../../constants'
import {AppWrap, MotionWrap} from '../../wrapper'
import {client} from '../../client'
import './Footer.scss'

const Footer = () => {
  const [fromData, setFromData] = useState({name: '', email: '', message: ''})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {name, email, message} = fromData;

  const handleChangeInput = (e) => {
    const {name, value} = e.target;

    setFromData({ ...fromData, [name]: value });
  }

  const handleSubmit = (e) => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
  }

  return (
    <>
      <h2 className="head-text">Take a coffe & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:abhishekc838@gmail.com" className="p-text">
            abhishekc838@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +91 783-808-3337" className="p-text">
            +91 783-808-3337
          </a>
        </div>
      </div>
      {!isFormSubmitted ? 
      <div className="app__footer-form app__flex">
        <div className="app__flex">
          <input type="text" className="p-text" placeholder="Your Name" name="name" value={name} onChange={handleChangeInput}/>
        </div>
        <div className="app__flex">
          <input type="email" className="p-text" placeholder="Email" name="email" value={email} onChange={handleChangeInput}/>
        </div>
        <div>
          <textarea className="p-text" placeholder="Your Message"
          value={message}
          name="message"
          onChange={handleChangeInput}
          />
        </div>
        <button type="button" className="p-text" onClick={() => handleSubmit()}>{loading ? 'Sending' : 'Send Message'}</button>
      </div>
      : <div>
        <h3 className="head-text">Thank you for getting in touch!</h3>
      </div>
      }
    </>
  )
}

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__whitebg')