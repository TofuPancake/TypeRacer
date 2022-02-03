/**
 * Emits a join lobby event to backend sockets
 * @param {*} socket
 * @param {*} lobbyId
 * @param {*} name
 */
 export function joinLobby( socket, lobbyId, name, firebaseUserTokenId, cb = null) {
  socket.emit('join lobby', { lobbyId, name, firebaseUserTokenId }, (err) =>{
    if(cb){
      cb(err);
    }
  });
};
