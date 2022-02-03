/**
 * recieves and updates game object that contains typed words for all users
 * @param {*} socket 
 * @param {*} setGame 
 */
export function updateGame(socket, setGame) {
    socket.on('update game', ({ game }) => {
      setGame(game);
    });
  }
  