import React from 'react'

const Footer = () => {
  return (
   <footer className="clearfix">
   <div className="wrapper">
        <div className="social-media">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
          <a href="#"><i className="fab fa-twitter-square"></i></a>
        </div>
        <div className="copyright">
          <span>Website made by </span>
          <span>&copy;</span>
          <span> 2019 Shabora Global Inc.</span>
        </div>
        <div className="maker">
          <p>Design by Rafaela, Bojan & Shahyn </p>
        </div>
   </div>
   </footer>
   
  )
}

export default Footer;