import { getSocketIO } from '..';

export function updateGameTimeLeft(lobbyId, totalSecondsLeft) {
  getSocketIO().to(lobbyId).emit('update game time left', { totalSecondsLeft });
}
