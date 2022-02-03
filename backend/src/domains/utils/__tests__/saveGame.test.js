import { saveGame } from '../saveGame';

jest.mock('../../LobbyRegister.js');
jest.mock('../../../mongo/dao/gamesDao.js');
jest.mock('../../../mongo/dao/registeredPlayersDao.js');

test('saveGame test for guest player', async (done) => {
  await saveGame('test');
  done();
});

test('saveGame test for new player', async (done) => {
  await saveGame('new player');
  done();
});
