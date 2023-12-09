import React, {useState} from "react";
import Frontpage from "./pages/Frontpage.jsx";
import Music from "./Music.jsx";

function App(){
    const [isClicked, setisClicked] = useState(false);

    function handleonclick(){
        setisClicked(!isClicked);
    }
    
    return (
    <div>
    <Music expand = {!isClicked}/>
    {isClicked ? undefined :<img onClick={handleonclick} className = "button dropdown mt-5" src={process.env.PUBLIC_URL + '/images/button-arrow-expand-1-64.png'} alt="Button" />}
    <Frontpage expand = {isClicked}/>
    {isClicked ? 
    <img
        onClick={handleonclick}
        className={`button up mt-5 ${isClicked ? 'rotate' : ''}`}
        src={process.env.PUBLIC_URL + '/images/button-arrow-expand-1-64.png'}
        alt="Button"
    /> :
    undefined
    }
    </div>
    );
}

export default App;