import { getSocketIO } from '..';

export function countdown(lobbyId, count) {
  getSocketIO().to(lobbyId).emit('countdown', { count });
}
