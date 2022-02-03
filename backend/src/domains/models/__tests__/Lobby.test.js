import { Lobby } from '../Lobby';

jest.mock('../../../sockets/emit/index.js');
jest.mock('../../LobbyRegister.js');

test('Lobby addUser test', async (done) => {
  const lobby = new Lobby('testHost', done);
  await lobby.addUser({ id: 'testUser' }, 'testUser', null);
  expect(lobby.userExists('testUser')).toBe(true);
  done();
});

test('Lobby removeUser test', async (done) => {
  const lobby = new Lobby('testHost', 'test');
  await lobby.addUser({ id: 'testUser' }, 'testUser', null);
  expect(lobby.userExists('testUser')).toBe(true);
  lobby.removeUser('testUser');
  expect(lobby.userExists('testUser')).toBe(false);
  done();
});
