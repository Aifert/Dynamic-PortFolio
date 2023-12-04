import React, {useState, useEffect} from "react";

function Time(){
    const[time, setTime] = useState("");

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await fetch("http://localhost:4000/api/getTime");
                const data = await response.json();
                setTime(data.time);
            }
            catch(error){
                console.log(error.message);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return(
        <div className = "container">
            <h3 class = "mt-5 mb-2">{time} </h3>
            <h4 class = "mb-5"> Current Time for Me </h4>
        </div>
    )
}  

export default Time;