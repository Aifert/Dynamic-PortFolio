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
    <Music />
    {isClicked ? undefined :<button onClick={handleonclick} className="mt-5">Expand</button>}
    <Frontpage expand = {isClicked}/>
    {isClicked ? <button onClick={handleonclick}>Collapse</button> : undefined}
    </div>
    );
}

export default App;