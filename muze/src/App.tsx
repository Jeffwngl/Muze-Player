import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import axios from 'axios';
import { getCurrentWindow } from "@tauri-apps/api/window"; // appWindow deprecated

function App() {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const redirect_uri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  console.log(redirect_uri);

  // appWindow
  const appWindow = getCurrentWindow();

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

  function contribute() {
    let url = "https://github.com/Jeffwngl/Muze-Player";
    window.open(url);
  }

  function releases() {
    let url = "https://github.com/Jeffwngl/Muze-Player/releases";
    window.open(url);
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
    <body>

    <div data-tauri-drag-region className="titlebar">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5" width="20px" height="20px">
        <path fillRule="evenodd" d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z" clipRule="evenodd" />
      </svg>

      <p className="titleName">muze player</p>

      <div className="buttons">
        <button className="titlebar-button" id="titlebar-minimize" onClick={() => appWindow.minimize()}>
          <img
            src="https://api.iconify.design/mdi:window-minimize.svg"
            alt="minimize"
          />
        </button>
        <button className="titlebar-button" id="titlebar-maximize" onClick={() => appWindow.maximize()}>
          <img
            src="https://api.iconify.design/mdi:window-maximize.svg"
            alt="maximize"
          />
        </button>
        <button className="titlebar-button" id="titlebar-close" onClick={() => appWindow.close()}>
          <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
        </button>
      </div>
    </div>

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
            <button className="contribute" onClick={contribute}>
              <img className="image" src="src\images\collab.png" alt="GITHUB"></img>
              <div className="wrapper">
                <p className="subHeader">Contribute</p>
              </div>
            </button>
            <button onClick={releases}>
              <img className="image" src="src\images\settings.png" alt="VER"></img>
              <div className="wrapper">
                <p className="subHeader">Version Info</p>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="dashboard">
          <p>To use Muze player, simply click on the controls you need from the list above
          and drag and position them on your window to your liking.</p>
          <h3>Controls</h3>
          <div className="controls">
            <button>// Add Volume Control_</button>
            <button>// Add Playback Control_</button>
            <button>// Add Queue Control_</button>
          </div>
          <button>Contribute</button>
        </div>
      )}
    </div>
    </body>
  );
}

export default App;
