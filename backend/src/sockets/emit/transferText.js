import { getSocketIO } from '..';

export function transferText(lobbyId, text) {
  getSocketIO().to(lobbyId).emit('transfer text', { text });
}
