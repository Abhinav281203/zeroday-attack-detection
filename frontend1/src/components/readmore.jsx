import React from 'react'
import Navbar from './navbar'
import "./readmore.css"

const Readmore = ({user, logout}) => {
  return (
    <div>
      <Navbar user={user} logout={logout}/>
      <div class="abouttitle">
        <p>Zero Day Attack Detection</p>
      </div>
      <div class="aboutreadus">
        <p>Welcome to our website! Our primary focus is on zero-day attack detection, a critical aspect of cybersecurity. Zero-day attacks refer to security breaches that exploit previously unknown vulnerabilities in software or systems, making them particularly challenging to detect and defend against.</p>
        <p>At our web application, we leverage the power of machine learning to provide robust protection. Our approach involves a two-layer system designed to identify various types of attacks, including DDoS (Distributed Denial of Service), DDoS Golden Eye, bot attacks, sshpatator attacks, FTP patator attacks, and more.</p>
        <p>In the first layer, we employ a Random Forest model with an impressive accuracy rate of 98%. This model analyzes network logs and determines whether they contain any malicious activities. If the logs are flagged as potentially harmful, they proceed to the second layer for further examination.</p>
        <p>In the second layer, we create an Isolation Forest model tailored to each specific type of attack. By comparing the network logs against these attack-specific models, we can accurately identify known attacks. However, our system doesn't stop there. If the logs do not match any of the pre-defined attack patterns, they are classified as zero-day attacks, indicating potential novel threats that have not been previously encountered.</p>
        <p>Our website aims to address these concerns by offering a reliable network analysis and providing you with the most accurate assessment of the safety or maliciousness of your network logs. We strive to enhance your security posture and protect your valuable assets from the ever-evolving landscape of cyber threats.</p>
        {/* <p>Thank you for choosing our website as your partner in safeguarding your digital infrastructure.</p> */}
      </div>
      <p class='details'>- Team G70.</p>
      <p class='details'>KMIT.</p>


      <footer className="footer">
        <div className="contact-details">
          <a href="#" style={{ color: 'white' }}>Github</a>
        </div>
      </footer>
    </div>
  )
}

export default Readmore