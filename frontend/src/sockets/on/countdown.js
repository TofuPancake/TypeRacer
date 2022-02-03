/**
 * Receives an update to the countdown, that occurs before the game starts.
 * @param {*} socket 
 * @param {*} callback 
 */
export function countdown(socket, callback = null) {
    socket.on('countdown', ({count}) => {
        if(callback){
            callback(count);
        }
    });
  }
  