import React, { Component } from 'react';
import "./About.css";
import Hailey_Moon_Headshot from "../assets/Hailey_Moon_Headshot.jpg";  

export default class About extends Component {
  render() {
    return (
      <div>
        <div class="split left">
          <div className="centered">
            <img 
              className="profile_image"
              src={ Hailey_Moon_Headshot }
              alt="Profile Pic"
            ></img>
          </div>
        </div>
      <div className="split right">
        <div className="centered">
          <div className="name_title">Hailey Moon</div>
          <div className="brief_description">
            <p>IBM Accelerate Participant <br/> 
            UI/UX Designer <br/> 
            Avid Rock Climber <br/>
            What's Next...</p>
          </div>
        </div>
      </div>
    </div>
    )
  }
}