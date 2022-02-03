/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
import express from 'express';
import * as registeredPlayers from '../../mongo/dao/registeredPlayersDao';
import firebaseAuth from '../../firebase/auth';
import { RegisteredPlayer } from '../../mongo/models/registeredPlayers';
import { Game } from '../../mongo/models/games';
import firebase from '../../firebase';

const MAX_NUM_GAME_RECORDS = 5;

const router = express.Router();

function findOtherPlayerGameIndex(otherPlayer, currentGameId) {
  for (let i = 0; i < otherPlayer.games.length; i += 1) {
    if (otherPlayer.games[i].equals(currentGameId)) {
      return i;
    }
  }
  return null;
}

async function getPlayerName(player) {
  if (player.firebaseUID) {
    const firebaseUser = await firebase.auth().getUser(player.firebaseUID);
    const name = firebaseUser.displayName;
    return name;
  }
  if (player.name) {
    return player.name;
  }
  return 'Guest';
}

async function getPlayerPicture(player) {
  if (player.firebaseUID) {
    const firebaseUser = await firebase.auth().getUser(player.firebaseUID);
    const { photoURL } = firebaseUser;
    return photoURL;
  }
  return null;
}

/**
 * Get the most recent 5 game records of a firebase user.
 */
router.get('/', firebaseAuth, async (req, res) => {
  const responseData = [];
  const { firebaseUID } = req.body;
  const registeredPlayer = await registeredPlayers
    .retrieveRegisteredPlayerByFirebaseUID(firebaseUID);

  if (!registeredPlayer?.gameRecords) {
    res.status(404).json(responseData);
    return;
  }
  await RegisteredPlayer.populate(registeredPlayer, 'games');

  const numGameRecords = registeredPlayer.gameRecords.length;
  const numRecordsToRetrieve = numGameRecords - (MAX_NUM_GAME_RECORDS + 1) >= 0
    ? (MAX_NUM_GAME_RECORDS + 1) : numGameRecords;

  for (let i = numGameRecords - 1; i >= numGameRecords - numRecordsToRetrieve; i -= 1) {
    const gameRecord = registeredPlayer.gameRecords[i];
    const game = registeredPlayer.games[i];
    const tempGameRecord = {};
    // eslint-disable-next-line no-underscore-dangle
    tempGameRecord._id = gameRecord._id;
    tempGameRecord.date = new Date(game.createdAt).toDateString();
    tempGameRecord.wpm = gameRecord.wpm;
    tempGameRecord.textTyped = gameRecord.textTyped;
    tempGameRecord.photoURL = await getPlayerPicture(registeredPlayer);
    tempGameRecord.otherPlayers = [];

    let place = 1;
    let count = 0;

    await Game.populate(game, 'players');

    for (const gamePlayer of game.players) {
      const otherPlayer = {};

      const otherPlayerGameIndex = findOtherPlayerGameIndex(gamePlayer, game._id);
      const otherPlayerGameRecord = gamePlayer.gameRecords[otherPlayerGameIndex];
      otherPlayer.name = await getPlayerName(gamePlayer);
      otherPlayer.wpm = otherPlayerGameRecord.wpm;
      otherPlayer.photoURL = await getPlayerPicture(gamePlayer);

      otherPlayer._id = count;
      tempGameRecord.otherPlayers.push(otherPlayer);

      if (tempGameRecord.textTyped.length < otherPlayerGameRecord.textTyped.length) {
        place += 1;
      }
      count += 1;
    }
    tempGameRecord.place = place;
    responseData.push(tempGameRecord);
  }
  res.json(responseData);
});

export default router;
