import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import {
  rooms,
  createRoom,
  joinRoom,
  getRoom,
  getPlayer,
} from "./socket/roomManager";
import { startRound, handlePlayerClick } from "./socket/gameLogic";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // temporary for testing
    // methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("create_room", ({ name }, callback) => {
    const roomId = Math.random().toString(36).substring(2, 7);

    rooms[roomId] = {
      players: [{ id: socket.id, name, score: 0 }],
      round: 0,
      gameStarted: false,
      isGreen: false,
    };

    socket.join(roomId);
    callback({ roomId });
  });

  socket.on("join_room", ({ roomId, name }, callback) => {
  const room = rooms[roomId];

  if (!room || room.players.length >= 2) {
    return callback({ error: "Room full or not found" });
  }

  room.players.push({ id: socket.id, name, score: 0 });
  socket.join(roomId);

  io.to(roomId).emit("players_update", room.players);

  // Start game automatically if 2 players
  if (room.players.length === 2) {
    startRound(io, roomId);
  }

  callback({ success: true });
});

socket.on("player_click", ({ roomId }) => {
  handlePlayerClick(io, roomId, socket.id, []);
});

});

// server.listen(4000, () => {
//   console.log("Server running on port 4000");
// });

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
