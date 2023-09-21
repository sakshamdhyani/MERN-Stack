import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";



const About = () => {
  const visitLinkedIn = () => {
    window.location = "https://www.linkedin.com/in/saksham-dhyani-6b19aa196/";
  };
  const visitGitHub = () => {
    window.location = "https://github.com/sakshamdhyani";
  };
  return (
    <div className="aboutSection">

      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dbgwuttkx/image/upload/v1694454047/avatars/d7tjleym7jntnhn5kokf.jpg"
              alt="Founder"
            />
            <Typography>Saksham Dhyani</Typography>
            <Button onClick={visitLinkedIn} color="primary">
              Visit LinkedIn
            </Button>
            <Button onClick={visitGitHub} color="primary">
              Visit GitHub
            </Button>
            <span>
            Hello, I am Saksham an Enthusiastic MERN stack developer with a strong foundation in full-stack web development, 
            specializing in frontend technologies. Eager to leverage my proficiency in React and passion for
             crafting intuitive user interfaces to excel in a frontend developer role. Recently graduated 
             with a BCA degree from KIIT Gurugram, I am excited to contribute my skills and creativity to 
             deliver captivating user experiences. 
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default About;
