import { MAX_PLAYERS_IN_GAME } from '../../domains/gameConfig';
import { LobbyRegister } from '../../domains/LobbyRegister';
/**
 * When a player joins a lobby. If there is an error, the callback is called with an error message.
 */
export function joinLobby(socket, cb = null) {
  socket.on('join lobby', async ({ lobbyId, name, firebaseUserTokenId }, callback) => {
    if (LobbyRegister.lobbyExists(lobbyId)) {
      const lobby = LobbyRegister.getLobby(lobbyId);
      if (lobby.users?.size === MAX_PLAYERS_IN_GAME) {
        callback('lobby is full');
        return;
      }
      if (lobby.containsName(name)) {
        callback('name is already taken');
        return;
      }
      if (lobby.containsAccount(firebaseUserTokenId)) {
        callback('there should only be one player per account');
        return;
      }
      if (lobby.game?.finished === false) {
        callback('game has already started');
        return;
      }
      socket.join(lobby.lobbyId);
      await lobby.addUser(socket, name, firebaseUserTokenId);
    } else {
      callback('lobby does not exist');
    }

    if (cb) {
      cb();
    }
  });
}
