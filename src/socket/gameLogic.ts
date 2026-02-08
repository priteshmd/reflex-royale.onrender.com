import { Server } from "socket.io";
import { Room } from "../types";
import { getRoom } from "./roomManager";

export function startRound(io: Server, roomId: string): void {
  const room = getRoom(roomId);
  if (!room) return;

  room.round++;
  room.isGreen = false;

  io.to(roomId).emit("round_start", { round: room.round });

  // Countdown 3 sec
  setTimeout(() => {
    io.to(roomId).emit("countdown", 3);
  }, 500);

  setTimeout(() => {
    io.to(roomId).emit("countdown", 2);
  }, 1500);

  setTimeout(() => {
    io.to(roomId).emit("countdown", 1);
  }, 2500);

  setTimeout(() => {
    const randomDelay = Math.floor(Math.random() * 3000) + 2000;

    room.timer = setTimeout(() => {
      room.isGreen = true;
      io.to(roomId).emit("go_green");
    }, randomDelay);
  }, 3500);
}

export function handlePlayerClick(
  io: Server,
  roomId: string,
  socketId: string,
  players: any[]
): void {
  const room = getRoom(roomId);
  if (!room) return;

  const player = room.players.find((p) => p.id === socketId);
  if (!player) return;

  // False start
  if (!room.isGreen) {
    player.score -= 1;
    io.to(roomId).emit("false_start", {
      playerId: socketId,
      players: room.players,
    });
    return;
  }

  // Valid click
  room.isGreen = false;
  player.score += 1;

  io.to(roomId).emit("round_winner", {
    winnerId: socketId,
    players: room.players,
  });

  if (room.round >= 5) {
    io.to(roomId).emit("game_over", room.players);
    return;
  }

  setTimeout(() => {
    startRound(io, roomId);
  }, 3000);
}
