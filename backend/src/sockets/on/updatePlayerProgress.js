import { LobbyRegister } from '../../domains/LobbyRegister';
import { updateGame } from '../emit';

/**
 * Updates how much text a player has typed. Currently only one correctly typed word at a time.
 * One character at a time will be too taxing for the server.
 */
export function updatePlayerProgress(socket, cb = null) {
  socket.on('update player progress', ({
    lobbyId, text, firebaseUserIdToken, wpm,
  }) => {
    const lobby = LobbyRegister.getLobby(lobbyId);
    lobby.game.updateGameData(socket.id, text, firebaseUserIdToken, wpm);
    updateGame(lobbyId, lobby.game.gameData);

    if (cb) {
      cb();
    }
  });
}
