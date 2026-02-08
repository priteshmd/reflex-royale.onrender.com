import { Server } from "socket.io";
import { Room, Player } from "../types";

export const rooms: Record<string, Room> = {};

export function createRoom(
  roomId: string,
  socketId: string,
  playerName: string
): void {
  rooms[roomId] = {
    players: [{ id: socketId, name: playerName, score: 0 }],
    round: 0,
    gameStarted: false,
    isGreen: false,
  };
}

export function joinRoom(
  roomId: string,
  socketId: string,
  playerName: string
): boolean {
  const room = rooms[roomId];

  if (!room || room.players.length >= 2) {
    return false;
  }

  room.players.push({ id: socketId, name: playerName, score: 0 });
  return true;
}

export function getRoom(roomId: string): Room | undefined {
  return rooms[roomId];
}

export function getPlayer(
  roomId: string,
  socketId: string
): Player | undefined {
  const room = rooms[roomId];
  if (!room) return undefined;
  return room.players.find((p) => p.id === socketId);
}
