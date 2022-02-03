import * as SocketEmit from '../../sockets/emit';

import {
  SABOTAGE_SAFE_TIME_PERCENTAGE,
  SABOTAGE_CHANCE_SECTIONS,
  SABOTAGE_CHANCE_SCALE,
  SABOTAGE_TYPES_CHANCE,
  SABOTAGE_TYPES,
} from '../gameConfig';

/**
 * this function manages if a sabotage will be tripped
 * chances and scales can be set in config file
 * @param {*} userData
 * @returns
 */
function sabotageChanceCalculator(userData) {
  const currentProgress = userData.textTyped.length;
  const textLength = userData.text.join(' ').length;

  for (let i = 0; i < SABOTAGE_CHANCE_SECTIONS.length; i += 1) {
    if (currentProgress < textLength * SABOTAGE_CHANCE_SECTIONS[i]) {
      if (Math.random() < SABOTAGE_CHANCE_SCALE[i]) {
        return true;
      }
      return false;
    }
  }
  return false;
}

/**
 * this function manages which sabotage to trigger
 * chances and sabotages can be added/changed in config file
 * @returns index value of sabotage totn trigger
 */
function whichSabotage() {
  const roll = Math.random();
  let chance = 0;
  for (let i = 0; i < SABOTAGE_TYPES.length; i += 1) {
    chance += SABOTAGE_TYPES_CHANCE[i];
    if (roll < chance) {
      return i;
    }
  }
  return SABOTAGE_TYPES.length - 1;
}

function shuffle(array) {
  let currentIndex = array.length; let
    randomIndex;

  // While there remain elements to shuffle...
  // eslint-disable-next-line eqeqeq
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    // eslint-disable-next-line no-plusplus
    currentIndex--;

    // And swap it with the current element.
    // eslint-disable-next-line no-param-reassign
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function sabotage(socketId, game) {
  const userData = game.gameData.get(socketId);

  if (sabotageChanceCalculator(userData)) {
    // Sabotage the first player in the array
    const playerSocketIds = shuffle(Array.from(game.gameData.keys()));
    // eslint-disable-next-line no-restricted-syntax
    for (const stabotagedSocketId of playerSocketIds) {
      if (stabotagedSocketId !== socketId) { // Player cannot sabotage themselves
        const playerData = game.gameData.get(stabotagedSocketId);

        /**
         * if a player is in first X% they cannot be sabotaged, percentage et in config file
         */
        if (playerData.textTyped.length < userData.text.join(' ').length * SABOTAGE_SAFE_TIME_PERCENTAGE) {
          // eslint-disable-next-line no-continue
          continue;
        }
        const sabotageType = SABOTAGE_TYPES[whichSabotage()];
        const sabotageData = { type: sabotageType, saboteur: socketId };
        game.gameData.set(stabotagedSocketId, { ...playerData, sabotage: sabotageData });
        SocketEmit.sabotage(game.lobbyId, stabotagedSocketId, sabotageData);
        break;
      }
    }
  }
}
