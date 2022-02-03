import * as SocketEmit from '..';
import { ServerHandler } from '../../utils/ServerHandler';

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

test('countdown socket test', (done) => {
  serverHandler.socket.on('countdown', ({ count }) => {
    expect(count).toBe('test');
    done();
  });
  serverHandler.serverSocket.join('test');
  SocketEmit.countdown('test', 'test');
});

test('end game socket test', (done) => {
  serverHandler.socket.on('end game', () => {
    done();
  });
  serverHandler.serverSocket.join('test');
  SocketEmit.endGame('test');
});

test('transfer text socket test', (done) => {
  serverHandler.socket.on('transfer text', ({ text }) => {
    expect(text).toBe('test');
    done();
  });
  serverHandler.serverSocket.join('test');
  SocketEmit.transferText('test', 'test');
});

test('update game socket test', (done) => {
  serverHandler.socket.on('update game', ({ game }) => {
    expect(game.length).toBe(2);
    expect(game[0].name).toBe('test1');
    expect(game[0].value).toBe('test1');
    expect(game[1].name).toBe('test2');
    expect(game[1].value).toBe('test2');
    done();
  });
  serverHandler.serverSocket.join('test');
  const gameMap = new Map();
  gameMap.set('test1', 'test1');
  gameMap.set('test2', 'test2');
  SocketEmit.updateGame('test', gameMap);
});

test('update lobby socket test', (done) => {
  serverHandler.socket.on('update lobby', ({ lobby }) => {
    expect(lobby.host).toBe('user1');
    expect(lobby.players.length).toBe(2);

    expect(lobby.players[0].name).toBe('user1');
    expect(lobby.players[0].socketId).toBe('123');

    expect(lobby.players[1].name).toBe('user2');
    expect(lobby.players[1].socketId).toBe('321');
    done();
  });
  serverHandler.serverSocket.join('test');
  const userMap = new Map();

  const socket1 = { id: '123' };
  const socket2 = { id: '321' };

  userMap.set('user1', { name: 'user1', socket: socket1 });
  userMap.set('user2', { name: 'user2', socket: socket2 });
  const lobby = { host: 'user1', users: userMap };
  SocketEmit.updateLobby('test', lobby);
});

test('sabotage test', (done) => {
  serverHandler.socket.on('sabotage', ({ socketId, data }) => {
    expect(socketId).toBe('1234');
    expect(data).toEqual({ type: 'blind' });
    done();
  });
  serverHandler.serverSocket.join('test');
  SocketEmit.sabotage('test', '1234', { type: 'blind' });
});

test('`update game time left` emits correct number of seconds', (done) => {
  serverHandler.serverSocket.join('lobbyId');
  serverHandler.socket.on('update game time left', ({ totalSecondsLeft }) => {
    expect(totalSecondsLeft).toBe(123);
    done();
  });
  SocketEmit.updateGameTimeLeft('lobbyId', 123);
});
