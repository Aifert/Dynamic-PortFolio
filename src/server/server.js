import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import 'dotenv/config';

const app = express();
const port = 4000;
const timeUrl = "https://timeapi.io/api/Time/current/zone";
const spotifyUrl = "https://accounts.spotify.com/api/";

app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use(express.static('public'));

function generateRandomNumber(max_number){
    return (Math.floor(Math.random() * max_number));
}

async function getAccessToken(){
    try{
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
              'grant_type': 'client_credentials',
              'client_id': process.env.clientID,
              'client_secret': process.env.clientSecret
            })
          );
        const {access_token} = response.data;
        return access_token;
        }
    catch(error){
        console.log(error.message);
    }
}

async function getTracks(access_token){
    try{
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${process.env.newpathID}`,{
            headers : {
                'Authorization' : `Bearer ${access_token}`
            }
        });
        const {tracks} = response.data;
        return tracks.items;
    }
    catch(error){
        console.log(error.message);
    }
}


app.get("/api/getTime", async (req, res) =>{
    var time;
    try{
        const response = await axios.get(`${timeUrl}?timeZone=Australia/Perth`);
        const {hour, minute, seconds} = response.data;
        if(minute < 10){
            if(seconds < 10){
                time = `${hour} : 0${minute} : 0${seconds}`
            }
            else{
                time = `${hour} : 0${minute} : ${seconds}`
            }
        }
        else if(seconds < 10){
            time = `${hour} : ${minute} : 0${seconds}`
        }
        res.json({time});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get("/api/getSong", async (req, res) => {
    const access_token = await getAccessToken();
    const tracks = await getTracks(access_token);
    var randomSong = await tracks[generateRandomNumber(tracks.length)];
    const {album, name, preview_url} = randomSong.track;
    while(album === null || name === null || preview_url===null){
        randomSong = await tracks[generateRandomNumber(tracks.length)];
    }
    const {images} = album;
    const image = images.filter((p) => p.height === 640)
    res.json({
        imageURL : image[0].url,
        songName : name,
        previewURL : preview_url
    })
})



app.listen(port, ()=>{
    console.log(`Server running on ${port} successfully`);
})