import express from 'express';
import * as registeredPlayerDao from '../../mongo/dao/registeredPlayersDao';
import firebase from '../../firebase';

const router = express.Router();
/**
 * Retrieve leater board. Only top 5 players are retrieved. Sorted by decreasing games played.
 */
router.get('/', async (_req, res) => {
  let registeredPlayers = await registeredPlayerDao.retrieveAllRegisteredPlayers();
  function sortByNumGames(a, b) {
    if (a.gameRecords.length < b.gameRecords.length) {
      return 1;
    }
    if (a.gameRecords.length > b.gameRecords.length) {
      return -1;
    }
    return 0;
  }

  registeredPlayers.sort(sortByNumGames);
  registeredPlayers = registeredPlayers.slice(0, 5);

  const responseData = [];
  const firebaseUsersPromise = [];
  for (let i = 0; i < registeredPlayers.length; i += 1) {
    const player = registeredPlayers[i].toObject();
    if (player.firebaseUID) {
      firebaseUsersPromise.push(firebase.auth().getUser(player.firebaseUID));
    } else {
      firebaseUsersPromise.push(null);
    }
    responseData.push(player);
  }

  const firebaseUsers = await Promise.all(firebaseUsersPromise);
  for (let i = 0; i < responseData.length; i += 1) {
    if (!firebaseUsersPromise[i]) {
      // eslint-disable-next-line no-continue
      continue;
    }
    const user = firebaseUsers[i];
    responseData[i].name = user.displayName;
    responseData[i].photoURL = user.photoURL;
  }

  res.json(responseData);
});

export default router;
