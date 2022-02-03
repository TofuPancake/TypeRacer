import * as SocketEmit from '..';
import { ServerHandler } from '../../utils/ServerHandler';

let serverHandler;

/**
 * Setup servers
 */
beforeAll((done) => {
    serverHandler = new ServerHandler();
    done();
})

/** Set up individual sockets for each test.
 * This keeps each test separate and clean.
 */
beforeEach((done) => {
  serverHandler.setUpSocket(done);
});

/**
 * Clean up server resources after the tests.
 */
 afterAll((done) => {
  serverHandler.cleanUp();
  done();
});

test('create lobby socket emit test', (done) => {
  serverHandler.serverSocket.on('create lobby', ({ name }, callback) => {
    callback(name);
  });
  const callback = ( id ) => {
    expect(id).toBe('test');
    done();
  }
  SocketEmit.createLobby(serverHandler.socket, 'test', null, callback);
});

test('initialize game socket emit test', (done) => {
  serverHandler.serverSocket.on('initialize game', ({lobbyId}) => {
    expect(lobbyId).toBe('test');
    done();
  })
  SocketEmit.initializeGame(serverHandler.socket, 'test');
})

test('join lobby socket emit success test', (done) => {
  serverHandler.serverSocket.on('join lobby', ({lobbyId, name}) =>{
    expect(lobbyId).toBe('test');
    expect(name).toBe('testUser');
    done();
  })
  SocketEmit.joinLobby(serverHandler.socket, 'test', 'testUser', 'firebaseID')
})

test('join lobby socket emit failure test', (done) => {
  serverHandler.serverSocket.on('join lobby', ({lobbyId, name}, callback) => {
    expect(lobbyId).toBe('test');
    expect(name).toBe('testUser');
    callback('err test');
  })
  const callback = ( err ) => {
    expect(err).toBe('err test');
    done();
  }
  SocketEmit.joinLobby(serverHandler.socket, 'test', 'testUser', 'firebaseID', callback)
})

test('update player progress socket emit test', (done) => {
  serverHandler.serverSocket.on('update player progress', ({lobbyId, text}) => {
    expect(lobbyId).toBe('test');
    expect(text).toBe('testText');
    done();
  })
  SocketEmit.updatePlayerProgress(serverHandler.socket, 'test', 'testText');
})




