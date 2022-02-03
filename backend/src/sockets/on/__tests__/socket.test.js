import * as SocketOn from '..';
import { ServerHandler } from '../../utils/ServerHandler';

jest.mock('../../../domains/LobbyRegister.js');
jest.mock('../../emit/updateGame.js');

let serverHandler;

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
  serverHandler = new ServerHandler();
  done();
});

/**
 * Run before each test
 */
beforeEach((done) => {
  serverHandler.setUpSocket(done);
});

/**
*  Cleanup WS & HTTP servers
*/
afterAll((done) => {
  serverHandler.cleanUp();
  done();
});

test('create lobby socket test', (done) => {
  SocketOn.createLobby(serverHandler.serverSocket, done);
  serverHandler.socket.emit('create lobby', { name: 'test' });
});

test('disconnect socket test', (done) => {
  SocketOn.disconnect(serverHandler.serverSocket, done);
  serverHandler.socket.close();
});

test('initialize game socket test', (done) => {
  SocketOn.initializeGame(serverHandler.serverSocket, done);
  serverHandler.socket.emit('initialize game', { lobbyId: 'test' });
});

test('join lobby socket with correct lobbyId test', (done) => {
  SocketOn.joinLobby(serverHandler.serverSocket, done);
  serverHandler.socket.emit('join lobby', { lobbyId: 'test', name: 'test', firebaseUserIdToken: 'firebaseID' });
});

test('join lobby socket with incorrect lobbyId test', (done) => {
  SocketOn.joinLobby(serverHandler.serverSocket);
  serverHandler.socket.emit('join lobby', { lobbyId: 'fail test', name: 'test', firebaseUserIdToken: 'firebaseID' }, () => {
    done();
  });
});

test('update player progress socket test', (done) => {
  SocketOn.updatePlayerProgress(serverHandler.serverSocket, done);
  serverHandler.socket.emit('update player progress', { lobbyId: 'test', text: 'test' });
});

test('disconnecting socket test', (done) => {
  serverHandler.serverSocket.join('test');
  SocketOn.disconnecting(serverHandler.serverSocket, done);
  serverHandler.socket.close();
});
