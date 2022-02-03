import * as SocketOn from '..';
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

test('countdown socket on test', (done) => {
    const callback = (count) => {
        expect(count).toBe('test');
        done();
    }
    SocketOn.countdown(serverHandler.socket, callback);
    serverHandler.ioServer.emit('countdown', {count: 'test'})
})

test('end game socket on test', (done => {
    SocketOn.endGame(serverHandler.socket, done);
    serverHandler.ioServer.emit('end game', {});
}))

test('transfer text socket on test', (done) => {
    const callback = (text) => {
        expect(text).toBe('test');
        done();
    }
    SocketOn.transferText(serverHandler.socket, callback);
    serverHandler.ioServer.emit('transfer text', {text: 'test'});
})

test('update game socket on test', (done) => {
    const callback = (game) => {
        expect(game).toBe('test');
        done();
    }
    SocketOn.updateGame(serverHandler.socket, callback);
    serverHandler.ioServer.emit('update game', {game: 'test'})
})

test('update lobby socket on test', (done) => {
    const callback = (lobby) => {
        expect(lobby).toBe('test');
        done();
    }
    SocketOn.updateLobby(serverHandler.socket, callback);
    serverHandler.ioServer.emit('update lobby', {lobby: 'test'})
})

test('update game time left test', (done) => {
    serverHandler.serverSocket.join('lobbyId');
    const callback = (totalSecondsLeft) => {
        expect(totalSecondsLeft).toBe(123);
        done();
    }
    SocketOn.getGameTimeLeft(serverHandler.socket, callback);
    serverHandler.ioServer.to('lobbyId').emit('update game time left', { totalSecondsLeft: 123 });
})

test('sabotage test', (done) => {
    serverHandler.serverSocket.join('lobbyId');
    const callback = (socketId, data) => {
        expect(socketId).toBe('1234');
        expect(data).toEqual({ type: 'blind' });
        done();
    }
    SocketOn.sabotage(serverHandler.socket, callback);
    serverHandler.ioServer.to('lobbyId').emit('sabotage', {socketId: '1234', data: { type: 'blind' }});
})
