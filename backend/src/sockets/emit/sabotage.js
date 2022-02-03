import { getSocketIO } from '..';

export function sabotage(lobbyId, socketId, data) {
  getSocketIO().to(lobbyId).emit('sabotage', { socketId, data });
}
