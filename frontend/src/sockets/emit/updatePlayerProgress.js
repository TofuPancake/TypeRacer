/**
 * Update the player's progress in the game, i.e. its text that they have typed and their wpm.
 * NOTE: To calculate the length of the text that a user must type, use: text.join(' ').length
 * @param {*} socket 
 * @param {*} lobbyId 
 * @param {*} text 
 * @param {*} firebaseUserIdToken 
 * @param {*} wpm 
 */
export function updatePlayerProgress(socket, lobbyId, text, firebaseUserIdToken, wpm) {
    socket.emit('update player progress', { lobbyId, text, firebaseUserIdToken, wpm });
}
  