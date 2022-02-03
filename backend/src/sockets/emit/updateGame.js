import { getSocketIO } from '..';

/**
 *  sends game object that contains typed words for all users
 * @param {*} lobbyId
 * @param {*} game
 */
export function updateGame(lobbyId, game) {
  const gameArray = Array.from(game, ([name, value]) => ({ name, value }));
  getSocketIO().to(lobbyId).emit('update game', { game: gameArray });
}
