/**
 * Receive time left for the game round, before the results screen is displayed.
 * NOTE: game will end if someone has finished regardless of the time left
 * @param {*} socket 
 * @param {*} callback 
 */
export function getGameTimeLeft(socket, callback = null) {
    socket.on('update game time left', ({ totalSecondsLeft }) => {
        if (callback) {
            callback(totalSecondsLeft);
        }
    });
}
