/**
 * Receives an event that the game is over; someone has finished typing their text!
 * @param {*} socket 
 * @param {*} callback 
 */
export function endGame(socket, callback = null) {
    socket.on('end game', ({results}) => {
        if(callback){
            callback(results);
        }
    });
  }
  