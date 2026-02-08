# Reflex Royale Server

A real-time multiplayer game server built with Express, Socket.io, and TypeScript.

## Overview

Reflex Royale is a competitive reflex-based game where players compete in real-time matches. The server manages game rooms, player connections, game logic, and scoring.

## Features

- **Room Management**: Create and join game rooms with unique IDs
- **Real-time Communication**: Socket.io for instant player updates
- **Game Logic**: Automatic round management and click-based gameplay
- **Player Scoring**: Track player scores throughout the game
- **CORS Enabled**: Support for cross-origin requests

## Project Structure

```
src/
├── index.ts              # Main server entry point
├── types.ts              # TypeScript type definitions
└── socket/
    ├── gameLogic.ts      # Game round logic and click handling
    └── roomManager.ts    # Room and player management
```

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **Socket.io**: Real-time communication library
- **TypeScript**: Static typing for JavaScript
- **CORS**: Cross-origin resource sharing middleware

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

To start the development server with hot-reloading:

```bash
npm run dev
```

The server will start on the port specified by the `PORT` environment variable (defaults to 4000).

## API Events

### Client → Server

- **create_room**: Create a new game room
  - Payload: `{ name: string }`
  - Response: `{ roomId: string }`

- **join_room**: Join an existing game room
  - Payload: `{ roomId: string, name: string }`
  - Response: `{ success: true } | { error: string }`

- **player_click**: Register a player click during gameplay
  - Payload: `{ roomId: string }`

### Server → Client

- **players_update**: Updates the list of players in the room
  - Data: `Player[]`

## Environment Variables

- `PORT`: Server port (default: 4000)

## Game Flow

1. Player A creates a room → receives `roomId`
2. Player B joins room with `roomId`
3. When 2 players are in a room, the game automatically starts
4. Round begins, players click to register responses
5. Scores are updated and displayed

## License

ISC
