import React, {useState} from "react";
import Frontpage from "./pages/Frontpage.jsx";

function App(){
    const [isClicked, setisClicked] = useState(false);

    function handleonclick(){
        setisClicked(!isClicked);
    }
    
    return (
    <div>{isClicked ? undefined :<button onClick={handleonclick}>Expand</button>}
    <Frontpage expand = {isClicked}/>
    {isClicked ? <button onClick={handleonclick}>Collapse</button> : undefined}
    </div>
    );
}

export default App;