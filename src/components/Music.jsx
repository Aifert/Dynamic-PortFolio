import React, {useState, useEffect} from "react";

function Music(props){
    const [imageURL, setImageURL] = useState('');
    const [songName, setSongName] = useState('');
    const [previewURL, setPreviewURL] = useState('');
    const [artistName, setArtistName] = useState('');
    const [audio, setAudio] = useState(null);
    const [play, setPlay] = useState(false);
    const [preview, setPreview] = useState("Play Preview");

    const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:4000/api/getSong");
          const data = await response.json();
          const { imageURL, songName, previewURL, artist} = data;
          setImageURL(imageURL);
          setSongName(songName);
          setPreviewURL(previewURL);
          setArtistName(artist);
          console.log(artist);
        } catch (error) {
          console.log(error.message);
        }
    };

    const playAudio = () => {
        if (!audio) {
          // Create new Audio object if it doesn't exist
          const newAudio = new Audio(previewURL);
          setAudio(newAudio);
          newAudio.play();
          setPlay(true);
          setPreview("Pause");
        } else {
          // Toggle between play and pause
          if (play) {
            setPreview("Play");
            audio.pause();
          } else {
            setPreview("Pause");
            audio.play();
          }
        }
    
        setPlay(!play);
      };

    useEffect(() => {
        if(props.expand){
            fetchData();
            setPreview("Play Preview");
        }
      }, []);
    
    if(props.expand){
        return (
        <div className="record">
            <div className="recordCard mb-3"> 
                <img src={imageURL} alt="albumURL"/>
            </div>
            <p>Currently listening to... </p>
            <h3 className = "songName mb-4">{songName} - {artistName}</h3>
            <button onClick={async () => {
                if (previewURL === null) {
                    setPreview("No preview found, skipping to next song");
                    setTimeout(async () => {
                        await fetchData();
                        setPreview("Play Preview");
                    }, 3000);
                } else {
                    playAudio();
                }
            }} >{preview}</button>
        </div>
    )
    }
    else{
        return null;
    }
    
}

export default Music;