import { LobbyRegister } from '../../domains/LobbyRegister';

/**
 * Creates a new lobby, returns the lobby id to the frontend.
 */
export function createLobby(socket, cb = null) {
  socket.on('create lobby', async ({ name, firebaseUserIdToken }, callback) => {
    const lobby = LobbyRegister.createLobby(socket.id);
    socket.join(lobby.lobbyId);
    await lobby.addUser(socket, name, firebaseUserIdToken);
    if (callback) {
      callback(lobby.lobbyId);
    }
  });

  // testing
  if (cb) {
    cb();
  }
}
