/**
 * Receive the full text to type from the backend
 * @param {*} socket 
 * @param {*} callback 
 */
export function transferText(socket, callback = null) {
    socket.on('transfer text', ({ text }) => {
        if(callback){
            callback(text);
        }
    });
  }
  