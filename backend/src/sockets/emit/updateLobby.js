import { getSocketIO } from '..';

export function updateLobby(lobbyId, lobby) {
  const newLobby = { host: lobby.host };
  newLobby.players = Array.from(lobby.users,
    ([, player]) => ({ name: player.name, socketId: player.socket.id, photoURL: player.photoURL }));
  getSocketIO().to(lobbyId).emit('update lobby', { lobby: newLobby });
}
