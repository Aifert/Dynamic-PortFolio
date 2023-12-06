import React from "react";

function Frontpage(props){
    if(props.expand){
        return (    
        <div>
        <ul className = "container guide">
        <li className = "p-2"><a href = "./about.html">About</a></li>
        <li className = "p-2"><a href = "./socials.html">Socials</a></li>
        <li className = "p-2"><a href = "./education.html">Education</a></li>
        <li className = "p-2"><a href = "./commit.html">Commitments</a></li>
        <li className = "p-2"><a href = "./work.html">Work Experience</a></li>
        <li className = "p-2"><a href = "./project.html">Projects</a></li>
        <li className = "p-2"><a href = "./skills.html">Skills</a></li>
        </ul></div>             
        );
    }
}

export default Frontpage