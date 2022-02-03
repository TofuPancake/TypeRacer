import { LOBBY_ID_LENGTH } from '../gameConfig';
import { LobbyRegister } from '../LobbyRegister';

test('LobbyRegister, register a lobby test', (done) => {
  const lobby = LobbyRegister.createLobby('test');
  expect(lobby.host).toBe('test');
  expect(LobbyRegister.getLobby(lobby.lobbyId)).toBe(lobby);
  expect(LobbyRegister.lobbyExists(lobby.lobbyId)).toBe(true);
  done();
});

test('LobbyRegister, get a lobby that does not exist test', (done) => {
  LobbyRegister.createLobby('test');
  expect(LobbyRegister.getLobby('test')).toBeUndefined();
  done();
});

test('LobbyRegister, check a lobby that does not exist test', (done) => {
  LobbyRegister.createLobby('test');
  expect(LobbyRegister.lobbyExists('test')).toBe(false);
  done();
});

test('LobbyRegister, remove a lobby that does not exist test', (done) => {
  const lobby = LobbyRegister.createLobby('test');
  expect(LobbyRegister.lobbyExists(lobby.lobbyId)).toBe(true);
  done();
});

test('LobbyRegister, test create LobbyId', (done) => {
  const id = LobbyRegister.createLobbyId();
  expect(id.length).toBe(LOBBY_ID_LENGTH);
  done();
});

test('LobbyRegister, test getNewId', (done) => {
  const id = LobbyRegister.getNewId();
  expect(id.length).toBe(LOBBY_ID_LENGTH);
  done();
});
