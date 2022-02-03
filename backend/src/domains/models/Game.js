import * as SocketEmit from '../../sockets/emit';
import { getSocketIO } from '../../sockets';
import { getRandomText } from '../utils/randomTextUtil';
import { sabotage } from '../utils/sabotage';
import { PlayerInfo } from './PlayerInfo';
// eslint-disable-next-line import/no-cycle
import { saveGame } from '../utils/saveGame';
import { GAME_LENGTH_MS, GAME_LENGTH_SECONDS } from '../gameConfig';

/**
   *
   * @param {*} ms
   * @return {*}
   */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getGameUsers(lobbyId) {
  return getSocketIO().sockets.adapter.rooms.get(lobbyId);
}

/**
   * Handles countdown from 3 before game start
   * Note: emits 3, 2, 1, 0.
   * 0 represents the start of the game (calling nextRound)
   */
async function startCountdown(lobbyId, game) {
  const textPromise = getRandomText();
  for (let i = 5; i > -1; i -= 1) {
    SocketEmit.countdown(lobbyId, i);

    // eslint-disable-next-line no-await-in-loop
    await sleep(1000);
  }
  const text = await textPromise;

  // initialise text to type for each user
  getGameUsers(lobbyId).forEach((user) => {
    game.gameData.set(user, { textTyped: '', text });
    const playerInfo = new PlayerInfo('', null, 0);
    game.playerInfoRegister.set(user, playerInfo);
  });

  SocketEmit.countdown(lobbyId, 'Start');
  // send intial text to all users in lobby
  SocketEmit.transferText(lobbyId, text);
}

/**
 * Main game controller for the application.
 * Controls the timing of each round and state of the game
 */
export class Game {
  /**
     */
  constructor(lobbyId, host) {
    this.lobbyId = lobbyId;
    this.host = host;
    this.gameData = new Map();
    // this map contains all the information for players. the key will be the player socket
    // which identifies them, and the value is a PlayerInfo object that contains the text
    // typed, wpm, and firebase sessionId if they have one.
    this.playerInfoRegister = new Map();
    this.finished = true;
  }

  async startGame() {
    this.finished = false;
    console.log(`----- Start game for ${this.lobbyId} -----`);
    SocketEmit.countdown(this.lobbyId, 0); // Signal to change to the game screen

    // initialise users in game map
    getGameUsers(this.lobbyId).forEach((user) => {
      this.gameData.set(user, { textTyped: '', text: '' });
    });
    SocketEmit.updateGame(this.lobbyId, this.gameData); // Send the players to the frontend

    await startCountdown(this.lobbyId, this);
    await this.startTimer(this.lobbyId);
    this.setEndGameCondition(GAME_LENGTH_MS);
  }

  async startTimer(lobbyId) {
    let secondsLeft = GAME_LENGTH_SECONDS;
    this.gameTimeLeftIntervalId = setInterval(() => {
      SocketEmit.updateGameTimeLeft(lobbyId, secondsLeft);
      secondsLeft -= 1;
    }, 1000);
  }

  updateGameData(socketId, textTyped, sessionId, wpm) {
    if (this.finished) {
      return;
    }
    const userData = this.gameData.get(socketId);
    this.gameData.set(socketId, { ...userData, textTyped });

    sabotage(socketId, this);

    // Compare length, as we never send the sabotage text to the backend
    if (textTyped.length === userData.text.join(' ').length) {
      clearTimeout(this.gameTimeoutId);
      clearInterval(this.gameTimeLeftIntervalId);
      this.endGame();
    }

    this.updatePlayerInfo(socketId, textTyped, sessionId, wpm);
  }

  updatePlayerInfo(socketId, textTyped, firebaseId, wpm) {
    if (this.playerInfoRegister.has(socketId)) {
      const playerInfo = this.playerInfoRegister.get(socketId);
      playerInfo.update(textTyped, firebaseId, wpm);
    } else {
      const playerInfo = new PlayerInfo(textTyped, firebaseId, wpm);
      this.playerInfoRegister.set(socketId, playerInfo);
    }
  }

  setEndGameCondition(gameLength) {
    this.gameTimeoutId = setTimeout(() => {
      clearInterval(this.gameTimeLeftIntervalId);
      this.endGame();
    }, gameLength); // After 5 minutes, end the game
  }

  getPlayerInfo(socketId) {
    return this.playerInfoRegister.get(socketId);
  }

  async endGame() {
    this.finished = true;
    await saveGame(this.lobbyId);
    console.log(`----- End game for ${this.lobbyId} -----`);
    const playerArray = Array.from(this.playerInfoRegister, ([name, value]) => ({ name, value }));
    SocketEmit.endGame(this.lobbyId, playerArray);
    this.gameData = new Map();
    this.playerInfoRegister = new Map();
  }
}
