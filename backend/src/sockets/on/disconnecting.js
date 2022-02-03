import { LobbyRegister } from '../../domains/LobbyRegister';
/**
 * Removes the player from the lobby before they disconnect.
 */
export function disconnecting(socket, cb = null) {
  socket.on('disconnecting', () => {
    const socketRooms = Array.from(socket.rooms);
    const lobbyId = socketRooms.filter((id) => id !== socket.id)[0];
    if (lobbyId) {
      const lobby = LobbyRegister.getLobby(lobbyId);
      lobby.removeUser(socket.id);
    }

    if (cb) {
      cb();
    }
  });
}
