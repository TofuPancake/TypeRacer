/**
 * Receives an event that someone has joined the lobby, or has left the lobby
 * @param {*} socket 
 * @param {*} setLobby 
 */
export function updateLobby(socket, setLobby) {
    socket.on('update lobby', ({ lobby }) => {
        setLobby(lobby);
    });
}
