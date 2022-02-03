/**
 * Host has started the game, and now the backend will start the timer 
 * @param {*} socket 
 * @param {*} lobbyId 
 */
export function initializeGame(socket, lobbyId) {
    socket.emit('initialize game', { lobbyId });
}
  