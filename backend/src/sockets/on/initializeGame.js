import { LobbyRegister } from '../../domains/LobbyRegister';

/**
 * Start game
 */
export function initializeGame(socket, cb = null) {
  socket.on('initialize game', async ({ lobbyId }) => {
    console.log(`initializing game with Id: ${lobbyId}`);
    const lobby = LobbyRegister.getLobby(lobbyId);
    lobby.game.startGame();

    if (cb) {
      cb();
    }
  });
}
