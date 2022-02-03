/**
 * Receive an even that they have been sabotaged!
 * Data: includes who was the saboteur, who was sabotaged and the type
 * @param {*} socket 
 * @param {*} callback 
 */
export function sabotage(socket, callback = null) {
    socket.on('sabotage', ({ socketId, data }) => {
        if(callback){
            callback(socketId, data);
        }
    });
  }
  