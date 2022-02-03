/**
 * Emits a create lobby even to backend sockets
 * @param {*} socket
 * @param {*} name
 * @param {*} setLobbyId
 */
export function createLobby(socket, name, firebaseUserIdToken, setLobbyId) {
    socket.emit('create lobby', { name, firebaseUserIdToken }, (id) => {
        setLobbyId(id);
    });
};
