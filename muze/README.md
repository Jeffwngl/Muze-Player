# Muze Player

A modular Spotify miniplayer desktop application built with React, TypeScript, Rust, and Tauri.

## Features

- Modular control windows that can be positioned anywhere on the screen
- Playback controls (play/pause)
- Volume control with slider
- Track navigation (next/previous)
- Spotify integration
- Beautiful, modern UI with transparent controls

## Prerequisites

- Node.js (v16 or later)
- Rust (latest stable version)
- Tauri CLI
- Spotify Developer Account

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/muze-player.git
cd muze-player
```

2. Install frontend dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Spotify API credentials:
```
VITE_SPOTIFY_CLIENT_ID=your_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
VITE_SPOTIFY_REDIRECT_URI=http://localhost:1420/callback
```

4. Build and run the application:
```bash
npm run tauri dev
```

## Usage

1. Launch the application
2. Click "Login with Spotify" to authenticate
3. Use the control buttons to create modular control windows:
   - Playback Control: Play/pause the current track
   - Volume Control: Adjust the volume with a slider
   - Navigation Control: Skip to next/previous track

4. Drag the control windows to position them anywhere on your screen
5. The controls will stay on top of other windows and can be moved independently

## Development

- Frontend code is in the `src` directory
- Backend code is in the `src-tauri` directory
- Run `npm run tauri dev` for development
- Run `npm run tauri build` to create a production build

## License

MIT 