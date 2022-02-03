import { getSocketIO } from '..';

export function endGame(lobbyId, results) {
  getSocketIO().to(lobbyId).emit('end game', { results });
}
