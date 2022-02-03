/**
 * Find the player in the lobby array and return the player nickname they have entered
 */
export function getPlayerName(socketId, lobby) {
    const player = lobby?.players.find((player) => player.socketId === socketId);
    return player?.name ? player.name : null;
}

/**
 * Get the player's avatar picture.
 */
export function getPlayerPicture(socketId, lobby) {
    const player = lobby?.players.find((player) => player.socketId === socketId);
    return player?.photoURL ? player.photoURL : null;
}
