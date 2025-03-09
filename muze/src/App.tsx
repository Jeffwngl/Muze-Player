import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import axios from 'axios';

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const redirect_uri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  console.log(redirect_uri);

  // requesting token
  async function getToken(code: String) {
    const url = "https://accounts.spotify.com/api/token";

    // const grant = `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`;

    try {
      const response = await axios.post(url, {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function (response) {
        const token = response;
        console.log(token);
        return token;
      })
      .catch(function (error) {
        console.log(`Error: ${error}`);
      })
    }
    catch(error) {
      console.log(error);
    }
  }

  // authorizes user
  async function handleLogin() {
    var url = new URL('https://accounts.spotify.com/authorize?');
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('client_id', client_id);
    url.searchParams.append('scope', 'user-read-playback-state%20user-modify-playback-state');
    url.searchParams.append('redirect_uri', redirect_uri);

    try {
      window.location.replace(url);
    }
    catch(error) {
      console.log(`Error: ${error}`);
    }
  }

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      console.log(`ParamL:`, urlParams);
      console.log('URL code:', code);
  
      if (code && !isLoggedIn) {
        setIsLoggedIn(true);
        const token = getToken(code);
        console.log("Authentication Successful");
      }
    }
    catch(error) {
      console.log(`Authentication error: ${error}`);
    }
  })

  

  return (
    <div className="app">
      { !isLoggedIn ? (
        <div className="loginPage">
          <div className="functions">
            <button className="login" onClick={handleLogin}>
              <img className="image" src="src\images\pixil-frame-0.png" alt="CD"></img>
              <div className="wrapper">
                <p className="subHeader">Login With Spotify</p>
              </div>
            </button>
            <button>
              <img className="image" src="src\images\collab.png" alt="GITHUB"></img>
              <div className="wrapper">
                <p className="subHeader">Contribute</p>
              </div>
            </button>
            <button>
              <img className="image" src="src\images\settings.png" alt="VER"></img>
              <div className="wrapper">
                <p className="subHeader">Version Info</p>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="dashboard">
          <h3>Controls</h3>
          <div className="controls">
            <button>// Add Volume Control_</button>
            <button>// Add Playback Control_</button>
            <button>// Add Queue Control_</button>
          </div>
          <p>To use Muze player, simply click on the controls you need from the list above
             and drag and position them on your window to your liking.</p>
          <button>Contribute</button>
        </div>
      )}
    </div>
  );
}

export default App;
