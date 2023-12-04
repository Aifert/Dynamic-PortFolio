import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 4000;
const baseUrl = "https://timeapi.io/api/Time/current/zone";

app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());

app.get("/api/getTime", async (req, res) =>{
    var time;
    try{
        const response = await axios.get(`${baseUrl}?timeZone=Australia/Perth`);
        const {hour, minute, seconds} = response.data;
        time = `${hour} : ${minute} : ${seconds}`;
        res.json({time});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.listen(port, ()=>{
    console.log(`Server running on ${port} successfully`);
})